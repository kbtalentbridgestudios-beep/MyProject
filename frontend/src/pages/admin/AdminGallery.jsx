import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Upload } from "lucide-react";
import axios from "axios";

export default function AdminGallery() {
  const [media, setMedia] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("photo");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const API_URL =
    import.meta.env.REACT_APP_API_URL ||
    "https://myproject-d7zr.onrender.com/api";

  // Fetch gallery
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/gallery`, {       
        headers: { Authorization: `Bearer ${token}` },   
      });
      setMedia(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
      setMedia([]);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Upload file
  const handleUpload = async () => {
    if (!file) return alert("Select a file to upload");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", fileType);

    try {
      setLoading(true);
      await axios.post(`${API_URL}/v1/upload/Admin/${fileType}` , formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setFile(null);
      setFileType("photo");
      fetchGallery();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Delete media
  const handleDelete = async (item) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    try {
      await axios.delete(`${API_URL}/gallery/${item._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGallery();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete media: " + (err.response?.data?.message || err.message));
    }
  };

  const getMediaUrl = (item) => item.url || `/uploads/gallery/${item.filename}`;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Gallery</h1>

      {/* Upload Section */}
      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <select
          className="p-2 rounded bg-gray-800 border border-gray-700"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
        >
          <option value="photo">Photo</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
        >
          <Upload size={18} /> {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => (
          <motion.div
            key={item._id}
            className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            {item.fileType === "photo" && (
              <img
                src={getMediaUrl(item)}
                alt="Gallery Item"
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />
            )}
            {item.fileType === "video" && (
              <video src={getMediaUrl(item)} className="w-full h-64 object-cover" controls />
            )}
            {item.fileType === "audio" && (
              <div className="flex items-center justify-center h-64 bg-gray-800 rounded-xl">
                <audio src={getMediaUrl(item)} controls className="w-full px-4" />
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item);
              }}
              className="absolute top-4 right-4 bg-red-600 p-2 rounded-full hover:bg-red-700 transition z-10"
            >
              <Trash2 size={20} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelectedItem(null)}
          >
            {selectedItem.fileType === "photo" && (
              <motion.img
                src={getMediaUrl(selectedItem)}
                alt="Full View"
                className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
              />
            )}
            {selectedItem.fileType === "video" && (
              <motion.video
                src={getMediaUrl(selectedItem)}
                controls
                autoPlay
                className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
              />
            )}
            {selectedItem.fileType === "audio" && (
              <motion.div className="bg-gray-900 rounded-xl p-8">
                <audio src={getMediaUrl(selectedItem)} controls className="w-full" />
              </motion.div>
            )}

            <button
              className="absolute top-6 right-6 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition"
              onClick={() => setSelectedItem(null)}
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Trash2, Upload } from "lucide-react";
// import axios from "axios";

// export default function AdminGallery() {
//   const [media, setMedia] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [file, setFile] = useState(null);
//   const [fileType, setFileType] = useState("photo");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   const API_URL =
//     import.meta.env.VITE_REACT_APP_API_URL ||
//     "https://my-backend-knk9.onrender.com/api";

//   // Fetch gallery from backend
//   const fetchGallery = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/gallery`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMedia(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Failed to fetch gallery:", err);
//       setMedia([]);
//     }
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   // Upload file
//   const handleUpload = async () => {
//     if (!file) return alert("Select a file to upload");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${API_URL}/v1/upload/Admin/${fileType}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Upload success:", res.data);
//       setFile(null);
//       setFileType("photo");
//       fetchGallery();
//     } catch (err) {
//       console.error("Upload failed:", err.response?.data || err.message);
//       alert("Upload failed: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete media
//   const handleDelete = async (item) => {
//     if (!window.confirm("Are you sure you want to delete this media?")) return;
//     try {
//       await axios.delete(`${API_URL}/gallery/${item._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { public_id: item.public_id }, // Send Cloudinary public_id
//       });
//       fetchGallery();
//     } catch (err) {
//       console.error("Delete failed:", err.response?.data || err.message);
//       alert("Failed to delete media: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Get media URL
//   const getMediaUrl = (item) => item.url || item.secure_url || "";

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold mb-6 text-center">Admin Gallery</h1>

//       {/* Upload Section */}
//       <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
//         <select
//           className="p-2 rounded bg-gray-800 border border-gray-700"
//           value={fileType}
//           onChange={(e) => setFileType(e.target.value)}
//         >
//           <option value="photo">Photo</option>
//           <option value="video">Video</option>
//           <option value="audio">Audio</option>
//         </select>

//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="p-2 rounded bg-gray-800 border border-gray-700"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
//         >
//           <Upload size={18} /> {loading ? "Uploading..." : "Upload"}
//         </button>
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Array.isArray(media) &&
//           media.map((item) => (
//             <motion.div
//               key={item._id}
//               className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
//               onClick={() => setSelectedItem(item)}
//             >
//               {/* Photo */}
//               {item.fileType === "photo" && (
//                 <img
//                   src={getMediaUrl(item)}
//                   alt="Gallery Item"
//                   className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
//                 />
//               )}

//               {/* Video */}
//               {item.fileType === "video" && (
//                 <video
//                   src={getMediaUrl(item)}
//                   className="w-full h-64 object-cover"
//                   controls
//                 />
//               )}

//               {/* Audio */}
//               {item.fileType === "audio" && (
//                 <div className="flex items-center justify-center h-64 bg-gray-800 rounded-xl">
//                   <audio src={getMediaUrl(item)} controls className="w-full px-4" />
//                 </div>
//               )}

//               {/* Delete Button */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(item);
//                 }}
//                 className="absolute top-4 right-4 bg-red-600 p-2 rounded-full hover:bg-red-700 transition z-10"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </motion.div>
//           ))}
//       </div>

//       {/* Fullscreen Modal */}
//       <AnimatePresence>
//         {selectedItem && (
//           <motion.div
//             key="modal"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
//             onClick={() => setSelectedItem(null)}
//           >
//             {selectedItem.fileType === "photo" && (
//               <motion.img
//                 src={getMediaUrl(selectedItem)}
//                 alt="Full View"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
//               />
//             )}

//             {selectedItem.fileType === "video" && (
//               <motion.video
//                 src={getMediaUrl(selectedItem)}
//                 controls
//                 autoPlay
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
//               />
//             )}

//             {selectedItem.fileType === "audio" && (
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="bg-gray-900 rounded-xl p-8"
//               >
//                 <audio src={getMediaUrl(selectedItem)} controls className="w-full" />
//               </motion.div>
//             )}

//             <button
//               className="absolute top-6 right-6 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition"
//               onClick={() => setSelectedItem(null)}
//             >
//               <X size={24} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }






// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Trash2, Upload } from "lucide-react";
// import axios from "axios";

// export default function AdminGallery() {
//   const [media, setMedia] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [file, setFile] = useState(null);
//   const [fileType, setFileType] = useState("photo");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   const API_URL =
//     import.meta.env.VITE_REACT_APP_API_URL ||
//     "https://my-backend-knk9.onrender.com/api";

//   // Fetch gallery
//   const fetchGallery = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/gallery`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMedia(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error(err);
//       setMedia([]);
//     }
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   // Upload file
//   const handleUpload = async () => {
//     if (!file) return alert("Select a file to upload");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${API_URL}/v1/upload/Admin/${fileType}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("✅ Upload success:", res.data);
//       setFile(null);
//       setFileType("photo");
//       fetchGallery();
//     } catch (err) {
//       console.error("❌ Upload failed:", err.response?.data || err.message);
//       alert("Upload failed: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this media?")) return;
//     try {
//       await axios.delete(`${API_URL}/gallery/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchGallery();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete media");
//     }
//   };

//   const getMediaUrl = (filename) =>
//     `${API_URL.replace("/api", "")}/uploads/Admin/${fileType}/${filename}`;

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold mb-6 text-center">Admin Gallery</h1>

//       {/* Upload Section */}
//       <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
//         <select
//           className="p-2 rounded bg-gray-800 border border-gray-700"
//           value={fileType}
//           onChange={(e) => setFileType(e.target.value)}
//         >
//           <option value="photo">Photo</option>
//           <option value="video">Video</option>
//           <option value="audio">Audio</option>
//         </select>

//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="p-2 rounded bg-gray-800 border border-gray-700"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
//         >
//           <Upload size={18} /> {loading ? "Uploading..." : "Upload"}
//         </button>
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Array.isArray(media) &&
//           media.map((item) => (
//             <motion.div
//               key={item._id}
//               className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
//               onClick={() => setSelectedItem(item)}
//             >
//               {item.fileType === "photo" && (
//                 <img
//                   src={getMediaUrl(item.filename)}
//                   alt="Gallery Item"
//                   className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
//                 />
//               )}
//               {item.fileType === "video" && (
//                 <video
//                   src={getMediaUrl(item.filename)}
//                   className="w-full h-64 object-cover"
//                   controls
//                 />
//               )}
//               {item.fileType === "audio" && (
//                 <audio src={getMediaUrl(item.filename)} controls className="w-full" />
//               )}

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(item._id);
//                 }}
//                 className="absolute top-4 right-4 bg-red-600 p-2 rounded-full hover:bg-red-700 transition z-10"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </motion.div>
//           ))}
//       </div>

//       {/* Fullscreen Modal */}
//       <AnimatePresence>
//         {selectedItem && (
//           <motion.div
//             key="modal"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
//             onClick={() => setSelectedItem(null)}
//           >
//             {selectedItem.fileType === "photo" && (
//               <motion.img
//                 src={getMediaUrl(selectedItem.filename)}
//                 alt="Full View"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
//               />
//             )}
//             {selectedItem.fileType === "video" && (
//               <motion.video
//                 src={getMediaUrl(selectedItem.filename)}
//                 controls
//                 autoPlay
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
//               />
//             )}
//             {selectedItem.fileType === "audio" && (
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="bg-gray-900 rounded-xl p-8"
//               >
//                 <audio src={getMediaUrl(selectedItem.filename)} controls className="w-full" />
//               </motion.div>
//             )}

//             <button
//               className="absolute top-6 right-6 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition"
//               onClick={() => setSelectedItem(null)}
//             >
//               <X size={24} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }









// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Trash2, Upload } from "lucide-react";
// import axios from "axios";

// export default function AdminGallery() {
//   const [media, setMedia] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [file, setFile] = useState(null);
//   const [fileType, setFileType] = useState("photo");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   // Fetch gallery
//   const fetchGallery = async () => {
//     try {
//       const res = await axios.get("/api/gallery", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMedia(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error(err);
//       setMedia([]);
//     }
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   // Upload file
//   const handleUpload = async () => {
//     if (!file) return alert("Select a file to upload");
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       await axios.post(`/api/upload/Admin/${fileType}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setFile(null);
//       setFileType("photo");
//       fetchGallery();
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete media
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this media?")) return;
//     try {
//       await axios.delete(`/api/gallery/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchGallery();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete media");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold mb-6 text-center">Admin Gallery</h1>

//       {/* Upload Section */}
//       <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
//         <select
//           className="p-2 rounded bg-gray-800 border border-gray-700"
//           value={fileType}
//           onChange={(e) => setFileType(e.target.value)}
//         >
//           <option value="photo">Photo</option>
//           <option value="video">Video</option>
//           <option value="audio">Audio</option>
//         </select>

//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="p-2 rounded bg-gray-800 border border-gray-700"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
//         >
//           <Upload size={18} /> {loading ? "Uploading..." : "Upload"}
//         </button>
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Array.isArray(media) &&
//           media.map((item) => (
//             <motion.div
//               key={item._id}
//               className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
//               onClick={() => setSelectedItem(item)}
//             >
//               {item.fileType === "photo" && (
//                 <img
//                   src={item.url}
//                   alt={item.originalName}
//                   className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
//                 />
//               )}
//               {item.fileType === "video" && (
//                 <video src={item.url} className="w-full h-64 object-cover" controls />
//               )}
//               {item.fileType === "audio" && (
//                 <div className="flex items-center justify-center h-64 bg-gray-800 rounded-xl">
//                   <audio src={item.url} controls className="w-full px-4" />
//                 </div>
//               )}

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(item._id);
//                 }}
//                 className="absolute top-4 right-4 bg-red-600 p-2 rounded-full hover:bg-red-700 transition z-10"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </motion.div>
//           ))}
//       </div>

//       {/* Fullscreen Modal */}
//       <AnimatePresence>
//         {selectedItem && (
//           <motion.div
//             key="modal"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
//             onClick={() => setSelectedItem(null)}
//           >
//             {selectedItem.fileType === "photo" && (
//               <motion.img
//                 src={selectedItem.url}
//                 alt={selectedItem.originalName}
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
//               />
//             )}

//             {selectedItem.fileType === "video" && (
//               <motion.video
//                 src={selectedItem.url}
//                 controls
//                 autoPlay
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
//               />
//             )}

//             {selectedItem.fileType === "audio" && (
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="bg-gray-900 rounded-xl p-8"
//               >
//                 <audio src={selectedItem.url} controls className="w-full" />
//               </motion.div>
//             )}

//             <button
//               className="absolute top-6 right-6 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition"
//               onClick={() => setSelectedItem(null)}
//             >
//               <X size={24} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Trash2, Upload } from "lucide-react";
// import axios from "axios";

// export default function AdminGallery() {
//   const [media, setMedia] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   // Fetch gallery
//   const fetchGallery = async () => {
//     try {
//       const res = await axios.get("/api/gallery", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMedia(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Fetch gallery error:", err);
//       setMedia([]);
//     }
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   // Upload file
//   const handleUpload = async () => {
//     if (!file) return alert("Select a file to upload");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       await axios.post("/api/gallery/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Reset
//       setFile(null);
//       fetchGallery();
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete media
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this media?")) return;
//     try {
//       await axios.delete(`/api/gallery/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchGallery();
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Failed to delete media");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold mb-6 text-center">Admin Gallery</h1>

//       {/* Upload Section */}
//       <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="p-2 rounded bg-gray-800 border border-gray-700"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
//         >
//           <Upload size={18} /> {loading ? "Uploading..." : "Upload"}
//         </button>
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Array.isArray(media) &&
//           media.map((item) => (
//             <motion.div
//               key={item._id}
//               className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
//               onClick={() => setSelectedItem(item)}
//             >
//               {item.fileType === "photo" && (
//                 <img
//                   src={item.url || item.filepath}
//                   alt={item.originalName || item.filename}
//                   className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
//                 />
//               )}
//               {item.fileType === "video" && (
//                 <video src={item.url || item.filepath} className="w-full h-64 object-cover" controls />
//               )}
//               {item.fileType === "audio" && (
//                 <div className="flex items-center justify-center h-64 bg-gray-800 rounded-xl">
//                   <audio src={item.url || item.filepath} controls className="w-full px-4" />
//                 </div>
//               )}

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(item._id);
//                 }}
//                 className="absolute top-4 right-4 bg-red-600 p-2 rounded-full hover:bg-red-700 transition z-10"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </motion.div>
//           ))}
//       </div>

//       {/* Fullscreen Modal */}
//       <AnimatePresence>
//         {selectedItem && (
//           <motion.div
//             key="modal"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
//             onClick={() => setSelectedItem(null)}
//           >
//             {selectedItem.fileType === "photo" && (
//               <motion.img
//                 src={selectedItem.url || selectedItem.filepath}
//                 alt={selectedItem.originalName || selectedItem.filename}
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
//               />
//             )}

//             {selectedItem.fileType === "video" && (
//               <motion.video
//                 src={selectedItem.url || selectedItem.filepath}
//                 controls
//                 autoPlay
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
//               />
//             )}

//             {selectedItem.fileType === "audio" && (
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="bg-gray-900 rounded-xl p-8"
//               >
//                 <audio src={selectedItem.url || selectedItem.filepath} controls className="w-full" />
//               </motion.div>
//             )}

//             <button
//               className="absolute top-6 right-6 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition"
//               onClick={() => setSelectedItem(null)}
//             >
//               <X size={24} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
