import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Gallery({ compact = false }) {
  const [media, setMedia] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/gallery`);
        setMedia(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        setMedia([]);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className={`bg-black text-white px-6 ${compact ? "pt-10 pb-10" : "pt-20 pb-20"}`}>
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className={`font-semibold text-red-600 ${compact ? "text-2xl md:text-4xl" : "text-4xl md:text-5xl"}`}>
          Our Gallery
        </h1>
        <p className={`mt-4 ${compact ? "text-sm md:text-base text-gray-400" : "text-gray-400"}`}>
          A glimpse into the vibrant world of{" "}
          <span className="text-red-400 font-semibold">KB TalentBridge Studio</span>
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {media.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            {item.fileType === "photo" && (
              <motion.img
                src={item.url}
                alt="Gallery Item"
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />
            )}

            {item.fileType === "video" && (
              <video src={item.url} className="w-full h-64 object-cover" controls />
            )}

            {item.fileType === "audio" && (
              <div className="flex items-center justify-center h-64 bg-gray-900 rounded-xl">
                <audio src={item.url} controls className="w-full px-4" />
              </div>
            )}

            {item.fileType === "photo" && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <p className="text-lg font-semibold">View Image</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelectedItem(null)}
          >
            {selectedItem.fileType === "photo" && (
              <img src={selectedItem.url} className="max-h-[80vh] max-w-[90vw] rounded-xl" />
            )}

            {selectedItem.fileType === "video" && (
              <video src={selectedItem.url} controls autoPlay className="max-h-[80vh] max-w-[90vw]" />
            )}

            {selectedItem.fileType === "audio" && (
              <div className="bg-gray-900 rounded-xl p-8">
                <audio src={selectedItem.url} controls className="w-full" />
              </div>
            )}

            <button className="absolute top-6 right-6 bg-red-600 p-2 rounded-full">
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import axios from "axios";

// export default function Gallery({ compact = false }) {
//   const [media, setMedia] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const API_URL =
//     import.meta.env.REACT_APP_API_URL ||
//     "https://my-backend-knk9.onrender.com/api";

//   useEffect(() => {
//     const fetchGallery = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/gallery`);
//         console.log("Gallery data:", res.data);

//         // Use backend-provided URL directly
//         const formatted = (res.data || []).map((item) => ({
//           ...item,
//           url: item.url,
//         }));

//         setMedia(formatted);
//       } catch (err) {
//         console.error("Failed to fetch gallery:", err);
//         setMedia([]);
//       }
//     };

//     fetchGallery();
//   }, []);

//   return (
//     <div
//       className={`bg-black text-white px-6 ${
//         compact ? "pt-10 pb-10" : "pt-20 pb-20"
//       }`}
//     >
//       {/* Heading */}
//       <div className="text-center mb-12">
//         <h1
//           className={`font-semibold text-red-600 ${
//             compact ? "text-2xl md:text-4xl" : "text-4xl md:text-5xl"
//           }`}
//         >
//           Our Gallery
//         </h1>
//         <p
//           className={`mt-4 ${
//             compact ? "text-sm md:text-base text-gray-400" : "text-gray-400"
//           }`}
//         >
//           A glimpse into the vibrant world of{" "}
//           <span className="text-red-400 font-semibold">
//             KB TalentBridge Studio
//           </span>
//         </p>
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//         {media.map((item, index) => (
//           <motion.div
//             key={item._id}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
//             onClick={() => setSelectedItem(item)}
//           >
//             {/* Media Preview */}
//             {item.fileType === "photo" && (
//               <motion.img
//                 src={item.url}
//                 alt={item.originalName || "Gallery Item"}
//                 className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
//               />
//             )}
//             {item.fileType === "video" && (
//               <video
//                 src={item.url}
//                 className="w-full h-64 object-cover"
//                 controls
//               />
//             )}
//             {item.fileType === "audio" && (
//               <div className="flex items-center justify-center h-64 bg-gray-900 rounded-xl">
//                 <audio src={item.url} controls className="w-full px-4" />
//               </div>
//             )}

//             {/* Overlay for images */}
//             {item.fileType === "photo" && (
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
//                 <p className="text-lg font-semibold text-white">View Image</p>
//               </div>
//             )}
//           </motion.div>
//         ))}
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
//                 alt={selectedItem.originalName || "Full View"}
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





// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import axios from "axios";

// export default function Gallery({ compact = false }) {
//   const [media, setMedia] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const API_URL =
//     import.meta.env.VITE_REACT_APP_API_URL ||
//     "https://my-backend-knk9.onrender.com/api";

//   // Fetch gallery data
//   useEffect(() => {
//     const fetchGallery = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/gallery`); // Correct route
//         const formatted = res.data.map((item) => ({
//           ...item,
//           url: `${API_URL.replace("/api", "")}/uploads/gallery/${item.filename}`,
//         }));
//         setMedia(formatted);
//       } catch (err) {
//         console.error("Failed to fetch gallery:", err);
//         setMedia([]);
//       }
//     };

//     fetchGallery();
//   }, []);

//   return (
//     <div
//       className={`bg-black text-white px-6 ${
//         compact ? "pt-10 pb-10" : "pt-20 pb-20"
//       }`}
//     >
//       {/* Heading */}
//       <div className="text-center mb-12">
//         <h1
//           className={`font-semibold text-red-600 ${
//             compact ? "text-2xl md:text-4xl" : "text-4xl md:text-5xl"
//           }`}
//         >
//           Our Gallery
//         </h1>
//         <p
//           className={`mt-4 ${
//             compact ? "text-sm md:text-base text-gray-400" : "text-gray-400"
//           }`}
//         >
//           A glimpse into the vibrant world of{" "}
//           <span className="text-red-400 font-semibold">
//             KB TalentBridge Studio
//           </span>
//         </p>
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//         {media.map((item, index) => (
//           <motion.div
//             key={item._id}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
//             onClick={() => setSelectedItem(item)}
//           >
//             {/* Media Preview */}
//             {item.fileType === "photo" && (
//               <motion.img
//                 src={item.url}
//                 alt={item.originalName || "Gallery Item"}
//                 className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
//               />
//             )}
//             {item.fileType === "video" && (
//               <video
//                 src={item.url}
//                 className="w-full h-64 object-cover"
//                 controls
//               />
//             )}
//             {item.fileType === "audio" && (
//               <div className="flex items-center justify-center h-64 bg-gray-900 rounded-xl">
//                 <audio src={item.url} controls className="w-full px-4" />
//               </div>
//             )}

//             {/* Overlay for images */}
//             {item.fileType === "photo" && (
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
//                 <p className="text-lg font-semibold text-white">View Image</p>
//               </div>
//             )}
//           </motion.div>
//         ))}
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
//                 alt={selectedItem.originalName || "Full View"}
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





















// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";

// import Img1 from "../assets/hero1.jpg";
// import Img2 from "../assets/hero2.jpg";
// import Img3 from "../assets/hero3.jpg";
// import Img4 from "../assets/hero4.jpg";
// import Img5 from "../assets/vision1.jpg";
// import Img6 from "../assets/vision2.jpg";
// import Img7 from "../assets/vision3.jpg";
// import Img8 from "../assets/vision4.jpg";

// const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];

// export default function Gallery({ compact = false }) {
//   const [selectedImg, setSelectedImg] = useState(null);

//   return (
//     <div
//       className={`bg-black text-white px-6 ${
//         compact ? "pt-10 pb-10" : "pt-20 pb-20"
//       }`}
//     >
//       {/* Heading */}
//       <div className="text-center mb-12 ">
//         <h1
//           className={`font-bold text-red-500 ${
//             compact ? "text-2xl md:text-4xl" : "text-4xl md:text-5xl"
//           }`}
//         >
//           Our Gallery
//         </h1>
//         <p
//           className={`mt-4 ${
//             compact ? "text-sm md:text-base text-gray-400" : "text-gray-400"
//           }`}
//         >
//           A glimpse into the vibrant world of{" "}
//           <span className="text-red-400 font-semibold">
//             KB TalentBridge Studio
//           </span>
//         </p>
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//         {images.map((src, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
//             onClick={() => setSelectedImg(src)}
//           >
//             {/* Image */}
//             <motion.img
//               src={src}
//               alt={`Gallery ${index + 1}`}
//               className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
//               whileHover={{ rotate: 2 }}
//             />

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
//               <p className="text-lg font-semibold text-white">View Image</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Fullscreen Modal */}
//       <AnimatePresence>
//         {selectedImg && (
//           <motion.div
//             key="modal"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
//             onClick={() => setSelectedImg(null)}
//           >
//             <motion.img
//               src={selectedImg}
//               alt="Selected"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
//             />
//             <button
//               className="absolute top-6 right-6 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition"
//               onClick={() => setSelectedImg(null)}
//             >
//               <X size={24} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
