import { useState, useEffect } from "react";

export default function CandidateProfile({ candidate, setCandidate }) {
  const [formData, setFormData] = useState({
    firstName: candidate?.firstName || "",
    lastName: candidate?.lastName || "",
    city: candidate?.city || "",
    state: candidate?.state || "",
    dob: candidate?.dateOfBirth || "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(candidate?.photoUrl || "");

  const token = localStorage.getItem("token");

  useEffect(() => {
    setFormData({
      firstName: candidate?.firstName || "",
      lastName: candidate?.lastName || "",
      city: candidate?.city || "",
      state: candidate?.state || "",
      dob: candidate?.dateOfBirth || "",
    });

    setPhotoPreview(candidate?.photoUrl || "");
  }, [candidate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validDob = (d) => {
    if (!d) return true;
    const re =
      /^(0[1-9]|[12][0-9]|3[01])[-\/](0[1-9]|1[0-2])[-\/](19|20)\d{2}$/;
    return re.test(d);
  };

  /* ---------------- PROFILE PHOTO UPLOAD ---------------- */
  const uploadProfilePhoto = async () => {
    if (!photoFile) return alert("Please select a profile image");

    try {
      const fd = new FormData();
      fd.append("file", photoFile);

      const res = await fetch(
        "https://my-backend-knk9.onrender.com/api/v1/upload/Candidate/photo",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        }
      );

      if (!res.ok) throw new Error("Photo upload failed");

      const data = await res.json();
      setCandidate(data.user || data.candidate || data);
      setPhotoFile(null);

      alert("Profile photo updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload profile photo");
    }
  };

  /* ---------------- PROFILE SAVE ---------------- */
  const handleSave = async () => {
    try {
      if (!validDob(formData.dob)) {
        alert("Please enter DOB as DD/MM/YYYY");
        return;
      }

      const res = await fetch(
        "https://my-backend-knk9.onrender.com/api/candidate/profile",
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
      setCandidate(updated.candidate || updated);

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error updating profile");
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 shadow-md rounded-xl p-6 space-y-6 text-white">

      <h2 className="text-2xl font-bold">My Profile Details</h2>

      {/* ✅ PROFILE PHOTO SECTION RESTORED */}
      <div className="flex items-center gap-5">
        <img
          src={photoPreview || "https://via.placeholder.com/120"}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border border-gray-700"
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setPhotoFile(file);
              setPhotoPreview(URL.createObjectURL(file));
            }}
            className="block text-sm text-gray-300"
          />

          <button
            onClick={uploadProfilePhoto}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-1 rounded text-sm"
          >
            Upload Profile Photo
          </button>
        </div>
      </div>

      {/* ✅ FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="bg-[#111] border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-rose-600 outline-none"
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="bg-[#111] border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-rose-600 outline-none"
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="bg-[#111] border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-rose-600 outline-none"
        />

        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          className="bg-[#111] border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-rose-600 outline-none"
        />

        <input
          type="text"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          placeholder="Date of Birth (DD/MM/YYYY)"
          className="bg-[#111] border border-gray-700 px-3 py-2 rounded-lg focus:ring-2 focus:ring-rose-600 outline-none md:col-span-2"
        />
      </div>

      <div className="text-right">
        <button
          onClick={handleSave}
          className="bg-rose-600 hover:bg-rose-700 px-6 py-2 rounded-lg shadow text-white"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

