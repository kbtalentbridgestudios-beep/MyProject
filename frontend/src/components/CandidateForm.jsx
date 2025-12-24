// // src/components/CandidateForm.jsx
// import { motion } from "framer-motion";

// export default function CandidateForm({
//   candidateData,
//   setCandidateData,
//   onSubmit,
//   inputClass,
//   containerVariants,
//   itemVariants,
//   categories,
//   catLoading,
//   catError,
//   setError,
//   loading,
// }) {
//   const handleChange = (e) =>
//     setCandidateData({ ...candidateData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // BASIC MINIMAL VALIDATION (same behavior as original)
//     if (!candidateData.firstName || !candidateData.email || !candidateData.password) {
//       setError("Please fill required fields");
//       return;
//     }

//     onSubmit(candidateData);
//   };

//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-5 w-full"
//     >
//       <div className="flex flex-wrap gap-4">
        
//         {/* LEFT SECTION */}
//         <div className="flex-1 min-w-[45%] space-y-5">
//           {[
//             { label: "First Name", key: "firstName", type: "text" },
//             { label: "Last Name", key: "lastName", type: "text" },
//             { label: "Date of Birth", key: "dateOfBirth", type: "date" },
            
//             { label: "Mobile", key: "mobile", type: "tel" },
//           ].map(({ label, key, type }, idx) => (
//             <motion.div key={idx} variants={itemVariants}>
//               <label className="block text-gray-200 text-sm mb-2">{label}</label>
//               <input
//                 type={type}
//                 name={key}
//                 value={candidateData[key]}
//                 onChange={handleChange}
//                 className={inputClass}
//                 placeholder={`Enter ${label}`}
//               />
//             </motion.div>
//           ))}
//         </div>

//         {/* CATEGORY SECTION */}
//         <motion.div variants={itemVariants} className="min-w-[45%]">
//           <label className="block text-gray-200 text-sm mb-2">Category</label>
//           <div className="flex gap-3">
//             {/* FREE TEXT FIELD */}
//             <input
//               type="text"
//               name="category"
//               value={candidateData.category}
//               onChange={handleChange}
//               placeholder="Select or type category"
//               className="w-full px-4 py-2 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
//             />

//             {/* DROPDOWN FROM BACKEND */}
//             <select
//               value={candidateData.category}
//               onChange={(e) =>
//                 setCandidateData((prev) => ({ ...prev, category: e.target.value }))
//               }
//               className="px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
//             >
//               <option value="">-- Select --</option>

//               {catLoading && <option>Loading...</option>}
//               {catError && <option>{catError}</option>}

//               {!catLoading &&
//                 !catError &&
//                 categories.map((c) => (
//                   <option key={c.id} value={c.name}>
//                     {c.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </motion.div>

//         {/* RIGHT SECTION */}
//         <div className="flex-1 min-w-[45%] space-y-5">
//           {[
//             { label: "City", key: "city", type: "text" },
//             { label: "State", key: "state", type: "text" },
//             { label: "Address", key: "address", type: "text" },
//             { label: "Email", key: "email", type: "email" },
//             { label: "Password", key: "password", type: "password" },
//             { label: "Confirm Password", key: "confirmPassword", type: "password" },
//           ].map(({ label, key, type }, idx) => (
//             <motion.div key={idx} variants={itemVariants}>
//               <label className="block text-gray-200 text-sm mb-2">{label}</label>
//               <input
//                 type={type}
//                 name={key}
//                 value={candidateData[key]}
//                 onChange={handleChange}
//                 className={inputClass}
//                 placeholder={`Enter ${label}`}
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* SUBMIT BUTTON */}
//       <motion.button
//         type="submit"
//         variants={itemVariants}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         disabled={loading}
//         className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition ${
//           loading ? "opacity-60 cursor-not-allowed" : ""
//         }`}
//       >
//         {loading ? "Processing..." : "Register as Candidate"}
//       </motion.button>
//     </motion.form>
//   );
// }
