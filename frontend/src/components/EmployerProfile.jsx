// src/components/EmployerProfile.jsx
import { useState, useEffect } from "react";

// ✅ BASE URL FROM ENV
const BASE_URL = import.meta.env.VITE_API_URL;

export default function EmployerProfile({ profile, setProfile }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: profile?.companyName || "",
    email: profile?.email || "",
    mobile: profile?.mobile || "",
    address: profile?.address || "",
    city: profile?.city || "",
    state: profile?.state || "",
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    setFormData({
      companyName: profile?.companyName || "",
      email: profile?.email || "",
      mobile: profile?.mobile || "",
      address: profile?.address || "",
      city: profile?.city || "",
      state: profile?.state || "",
    });
  }, [profile]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ---------------- UPDATE PROFILE ---------------- */
  const handleSave = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/employer/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      setProfile(updated);
      setEditing(false);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  /* ---------------- FILE UPLOAD ---------------- */
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append(type, file);
    setUploading(true);

    try {
      const res = await fetch(
        `${BASE_URL}/api/employer/upload/${type}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const updated = await res.json();
      setProfile(updated.profile);
      setMessage(updated.message || `${type} uploaded successfully!`);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed, try again.");
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (!profile) return <p className="text-gray-600">Loading profile...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto mt-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {/* ---------------- LOGO ---------------- */}
      <div className="flex items-center gap-4">
        {profile.logo ? (
          <img
            src={`${BASE_URL}/uploads/${profile.logo}`}
            alt="Company Logo"
            className="w-20 h-20 rounded object-cover border"
          />
        ) : (
          <div className="w-20 h-20 rounded bg-gray-200 flex items-center justify-center text-gray-500 text-sm border">
            No Logo
          </div>
        )}
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          {uploading ? "Uploading..." : "Upload Logo"}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "logo")}
          />
        </label>
      </div>

      {/* ---------------- DOCUMENT ---------------- */}
      <div className="flex items-center gap-4">
        {profile.document ? (
          <a
            href={`https://docs.google.com/gview?url=${BASE_URL}/uploads/${profile.document}&embedded=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Document
          </a>
        ) : (
          <span className="text-gray-500">No Document</span>
        )}
        <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          {uploading ? "Uploading..." : "Upload Document"}
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileUpload(e, "document")}
          />
        </label>
      </div>

      {/* ---------------- PROFILE INFO ---------------- */}
      {!editing ? (
        <div className="space-y-2">
          <p><span className="font-bold">Company:</span> {profile.companyName}</p>
          <p><span className="font-bold">Email:</span> {profile.email}</p>
          <p><span className="font-bold">Mobile:</span> {profile.mobile}</p>
          <p>
            <span className="font-bold">Address:</span>{" "}
            {profile.address}, {profile.city}, {profile.state}
          </p>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {["companyName", "email", "mobile", "address", "city", "state"].map(
            (field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-3 border rounded"
              />
            )
          )}
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && <p className="text-green-500 mt-2">{message}</p>}
    </div>
  );
}



// // src/components/EmployerProfile.jsx
// import { useState, useEffect } from "react";

// export default function EmployerProfile({ profile, setProfile }) {
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     companyName: profile?.companyName || "",
//     email: profile?.email || "",
//     mobile: profile?.mobile || "",
//     address: profile?.address || "",
//     city: profile?.city || "",
//     state: profile?.state || "",
//   });
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     setFormData({
//       companyName: profile?.companyName || "",
//       email: profile?.email || "",
//       mobile: profile?.mobile || "",
//       address: profile?.address || "",
//       city: profile?.city || "",
//       state: profile?.state || "",
//     });
//   }, [profile]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSave = async () => {
//     try {
//       const res = await fetch(
//         "https://my-backend-knk9.onrender.com/api/employer/profile",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       if (!res.ok) throw new Error("Failed to update profile");

//       const updated = await res.json();
//       setProfile(updated);
//       setEditing(false);
//       setMessage("Profile updated successfully!");
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error(err);
//       setMessage("Error updating profile");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   const handleFileUpload = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const form = new FormData();
//     form.append(type, file);
//     setUploading(true);

//     try {
//       const res = await fetch(
//         `https://my-backend-knk9.onrender.com/api/employer/upload/${type}`,
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: form,
//         }
//       );
//       if (!res.ok) throw new Error("Upload failed");
//       const updated = await res.json();
//       setProfile(updated.profile);
//       setMessage(updated.message || `${type} uploaded successfully!`);
//     } catch (err) {
//       console.error(err);
//       setMessage("Upload failed, try again.");
//     } finally {
//       setUploading(false);
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   if (!profile) return <p className="text-gray-600">Loading profile...</p>;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto mt-6 space-y-6">
//       <h2 className="text-2xl font-bold mb-4">My Profile</h2>

//       {/* Profile Photo / Logo */}
//       <div className="flex items-center gap-4">
//         {profile.logo ? (
//           <img
//             src={`https://my-backend-knk9.onrender.com/uploads/${profile.logo}`}
//             alt="Company Logo"
//             className="w-20 h-20 rounded object-cover border"
//           />
//         ) : (
//           <div className="w-20 h-20 rounded bg-gray-200 flex items-center justify-center text-gray-500 text-sm border">
//             No Logo
//           </div>
//         )}
//         <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
//           {uploading ? "Uploading..." : "Upload Logo"}
//           <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, "logo")} />
//         </label>
//       </div>

//       {/* Document */}
//       <div className="flex items-center gap-4">
//         {profile.document ? (
//           <a
//             href={`https://docs.google.com/gview?url=https://my-backend-knk9.onrender.com/uploads/${profile.document}&embedded=true`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 underline"
//           >
//             View Document
//           </a>
//         ) : (
//           <span className="text-gray-500">No Document</span>
//         )}
//         <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
//           {uploading ? "Uploading..." : "Upload Document"}
//           <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, "document")} />
//         </label>
//       </div>

//       {/* Profile Info */}
//       {!editing ? (
//         <div className="space-y-2">
//           <p><span className="font-bold">Company:</span> {profile.companyName}</p>
//           <p><span className="font-bold">Email:</span> {profile.email}</p>
//           <p><span className="font-bold">Mobile:</span> {profile.mobile}</p>
//           <p><span className="font-bold">Address:</span> {profile.address}, {profile.city}, {profile.state}</p>
//           <button onClick={() => setEditing(true)} className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Edit Profile</button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {["companyName","email","mobile","address","city","state"].map((field) => (
//             <input
//               key={field}
//               type={field === "email" ? "email" : "text"}
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               className="w-full p-3 border rounded"
//             />
//           ))}
//           <div className="flex space-x-3">
//             <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">Save</button>
//             <button onClick={() => setEditing(false)} className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
//           </div>
//         </div>
//       )}

//       {message && <p className="text-green-500 mt-2">{message}</p>}
//     </div>
//   );
// }
