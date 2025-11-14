import { useState, useEffect } from "react";

export default function CandidateProfile({ candidate, setCandidate }) {
  const [formData, setFormData] = useState({
    firstName: candidate?.firstName || "",
    lastName: candidate?.lastName || "",
    city: candidate?.city || "",
    state: candidate?.state || "",
  });

  const [files, setFiles] = useState({
    photo: null,
    resume: null,
    audio: null,
    video: null,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    setFormData({
      firstName: candidate?.firstName || "",
      lastName: candidate?.lastName || "",
      city: candidate?.city || "",
      state: candidate?.state || "",
    });
  }, [candidate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (type, file) => {
    setFiles({ ...files, [type]: file });
  };

  const handleSave = async () => {
    try {
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
      console.error("Error updating profile:", err);
      alert("Error updating profile");
    }
  };

  // Validate audio/video duration
  const validateMedia = (file, type) =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const media = document.createElement(type);
      media.src = url;
      media.onloadedmetadata = () => {
        if (type === "audio" && media.duration > 60) reject("Audio must be max 1 minute");
        else if (type === "video" && media.duration > 30) reject("Video must be max 30 seconds");
        else resolve(true);
      };
    });

  const handleUpload = async (type) => {
    try {
      const file = files[type];
      if (!file) return alert(`Please select a ${type} first`);

      if (type === "audio" || type === "video") await validateMedia(file, type);

      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const res = await fetch(
        `https://my-backend-knk9.onrender.com/api/v1/upload/Candidate/${type}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formDataUpload,
        }
      );
      if (!res.ok) throw new Error(`Failed to upload ${type}`);

      const updated = await res.json();
      setCandidate(updated.candidate || updated);

      setFiles({ ...files, [type]: null });
      alert(`${type} uploaded successfully!`);
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
      alert(err.message || `Error uploading ${type}`);
    }
  };

  // Utility to get preview URL
  const previewUrl = (type) => {
    if (files[type]) return URL.createObjectURL(files[type]);
    return candidate?.[`${type}Url`] || candidate?.[type] || null;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>

      {/* Profile Photo */}
      <div className="flex items-center gap-6">
        <img
          src={previewUrl("photo") || "https://via.placeholder.com/120"}
          alt="Profile"
          className="w-28 h-28 object-cover rounded-full border border-black"
        />
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange("photo", e.target.files[0])}
            className="block text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
          <button onClick={() => handleUpload("photo")} className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm">
            Upload Photo
          </button>
        </div>
      </div>

      {/* Resume */}
      <div>
        <p className="font-semibold">Resume:</p>
        {previewUrl("resume") ? (
          <a href={previewUrl("resume")} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
            View Uploaded Resume
          </a>
        ) : (
          <p className="text-gray-500 text-sm">No resume uploaded</p>
        )}
        <div className="mt-2">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange("resume", e.target.files[0])}
            className="block text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
          <button onClick={() => handleUpload("resume")} className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm">
            Upload Resume
          </button>
        </div>
      </div>

      {/* Audio */}
      <div>
        <p className="font-semibold">Audio (Max 1 min):</p>
        {previewUrl("audio") ? <audio controls src={previewUrl("audio")} className="mt-2 w-full" /> : <p className="text-gray-500 text-sm">No audio uploaded</p>}
        <div className="mt-2">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileChange("audio", e.target.files[0])}
            className="block text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
          <button onClick={() => handleUpload("audio")} className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm">
            Upload Audio
          </button>
        </div>
      </div>

      {/* Video */}
      <div>
        <p className="font-semibold">Video (Max 30 sec):</p>
        {previewUrl("video") ? <video controls src={previewUrl("video")} className="mt-2 w-full rounded-lg border" /> : <p className="text-gray-500 text-sm">No video uploaded</p>}
        <div className="mt-2">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange("video", e.target.files[0])}
            className="block text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
          <button onClick={() => handleUpload("video")} className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm">
            Upload Video
          </button>
        </div>
      </div>

      {/* Editable Form */}
      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="border border-black px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border border-black px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="border border-black px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="border border-black px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Update Button */}
      <div className="text-right">
        <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md">
          Update Profile
        </button>
      </div>
    </div>
  );
}








// import { useState, useEffect } from "react";

// export default function CandidateProfile({ candidate, setCandidate }) {
//   const [formData, setFormData] = useState({
//     firstName: candidate?.firstName || "",
//     lastName: candidate?.lastName || "",
//     city: candidate?.city || "",
//     state: candidate?.state || "",
//   });

//   const [photoFile, setPhotoFile] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [audioFile, setAudioFile] = useState(null);
//   const [videoFile, setVideoFile] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     setFormData({
//       firstName: candidate?.firstName || "",
//       lastName: candidate?.lastName || "",
//       city: candidate?.city || "",
//       state: candidate?.state || "",
//     });
//   }, [candidate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const res = await fetch(
//         "https://my-backend-knk9.onrender.com/api/candidate/profile",
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
//       setCandidate(updated.candidate || updated);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       alert("Error updating profile");
//     }
//   };

//   // Media validation for audio (1 min) and video (30 sec)
//   const validateMedia = (file, type) => {
//     return new Promise((resolve, reject) => {
//       const url = URL.createObjectURL(file);
//       const media = document.createElement(type);
//       media.src = url;
//       media.onloadedmetadata = () => {
//         if (type === "audio" && media.duration > 60) {
//           reject("Audio must be max 1 minute");
//         } else if (type === "video" && media.duration > 30) {
//           reject("Video must be max 30 seconds");
//         } else {
//           resolve(true);
//         }
//       };
//     });
//   };

//   const handleUpload = async (type) => {
//     try {
//       const file =
//         type === "photo"
//           ? photoFile
//           : type === "resume"
//           ? resumeFile
//           : type === "audio"
//           ? audioFile
//           : videoFile;

//       if (!file) return alert("Please select a file first");

//       // Validate audio/video duration
//       if (type === "audio" || type === "video") {
//         await validateMedia(file, type);
//       }

//       const formDataUpload = new FormData();
//       formDataUpload.append("file", file); // always use "file"

//       // Use generic backend route
//       const res = await fetch(
//         `https://my-backend-knk9.onrender.com/api/v1/upload/Candidate/${type}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formDataUpload,
//         }
//       );

//       if (!res.ok) throw new Error(`Failed to upload ${type}`);

//       const updated = await res.json();
//       setCandidate(updated.candidate || updated);

//       // Reset local file after upload
//       if (type === "photo") setPhotoFile(null);
//       if (type === "resume") setResumeFile(null);
//       if (type === "audio") setAudioFile(null);
//       if (type === "video") setVideoFile(null);

//       alert(`${type} uploaded successfully!`);
//     } catch (err) {
//       console.error(`Error uploading ${type}:`, err);
//       alert(err.message || `Error uploading ${type}`);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
//       <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>

//       {/* Profile Photo */}
//       <div className="flex items-center gap-6">
//         <img
//           src={
//             photoFile
//               ? URL.createObjectURL(photoFile)
//               : candidate?.photoUrl || candidate?.photo || "https://via.placeholder.com/120"
//           }
//           alt="Profile"
//           className="w-28 h-28 object-cover rounded-full border border-black"
//         />
//         <div>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setPhotoFile(e.target.files[0])}
//             className="block text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 
//                        file:rounded-full file:border-0 file:bg-blue-600 
//                        file:text-white hover:file:bg-blue-700 cursor-pointer"
//           />
//           <button
//             onClick={() => handleUpload("photo")}
//             className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm"
//           >
//             Upload Photo
//           </button>
//         </div>
//       </div>

//       {/* Resume */}
//       <div>
//         <p className="font-semibold">Resume:</p>
//         {candidate?.resumeUrl || candidate?.resume ? (
//           <a
//             href={candidate.resumeUrl || candidate.resume}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 underline text-sm"
//           >
//             View Uploaded Resume
//           </a>
//         ) : (
//           <p className="text-gray-500 text-sm">No resume uploaded</p>
//         )}
//         <div className="mt-2">
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => setResumeFile(e.target.files[0])}
//             className="block text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 
//                        file:rounded-full file:border-0 file:bg-blue-600 
//                        file:text-white hover:file:bg-blue-700 cursor-pointer"
//           />
//           <button
//             onClick={() => handleUpload("resume")}
//             className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm"
//           >
//             Upload Resume
//           </button>
//         </div>
//       </div>

//       {/* Audio */}
//       <div>
//         <p className="font-semibold">Audio (Max 1 min):</p>
//         {candidate?.audioUrl || candidate?.audio ? (
//           <audio
//             controls
//             src={candidate.audioUrl || candidate.audio}
//             className="mt-2 w-full"
//           />
//         ) : (
//           <p className="text-gray-500 text-sm">No audio uploaded</p>
//         )}
//         <div className="mt-2">
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => setAudioFile(e.target.files[0])}
//             className="block text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 
//                        file:rounded-full file:border-0 file:bg-blue-600 
//                        file:text-white hover:file:bg-blue-700 cursor-pointer"
//           />
//           <button
//             onClick={() => handleUpload("audio")}
//             className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm"
//           >
//             Upload Audio
//           </button>
//         </div>
//       </div>

//       {/* Video */}
//       <div>
//         <p className="font-semibold">Video (Max 30 sec):</p>
//         {candidate?.videoUrl || candidate?.video ? (
//           <video
//             controls
//             src={candidate.videoUrl || candidate.video}
//             className="mt-2 w-full rounded-lg border"
//           />
//         ) : (
//           <p className="text-gray-500 text-sm">No video uploaded</p>
//         )}
//         <div className="mt-2">
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setVideoFile(e.target.files[0])}
//             className="block text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 
//                        file:rounded-full file:border-0 file:bg-blue-600 
//                        file:text-white hover:file:bg-blue-700 cursor-pointer"
//           />
//           <button
//             onClick={() => handleUpload("video")}
//             className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm"
//           >
//             Upload Video
//           </button>
//         </div>
//       </div>

//       {/* Editable Form */}
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           placeholder="First Name"
//           className="border border-black px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           placeholder="Last Name"
//           className="border border-black px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           placeholder="City"
//           className="border border-black px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//           placeholder="State"
//           className="border border-black px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Update Button */}
//       <div className="text-right">
//         <button
//           onClick={handleSave}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
//         >
//           Update Profile
//         </button>
//       </div>
//     </div>
//   );
// }
