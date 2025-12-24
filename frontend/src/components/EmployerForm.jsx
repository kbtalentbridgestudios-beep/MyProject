// // src/components/EmployerForm.jsx
// import { motion } from "framer-motion";

// const gstRegex =
//   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

// export default function EmployerForm({
//   employerData,
//   setEmployerData,
//   onSubmit,
//   inputClass,
//   containerVariants,
//   itemVariants,
//   gstVerified,
//   setGstVerified,
//   setError,
//   loading,
// }) {
//   const handleChange = (e) =>
//     setEmployerData({ ...employerData, [e.target.name]: e.target.value });

//   // GST verification logic (placeholder unless you add backend API)
//   const verifyGst = async () => {
//     setError(null);

//     if (!employerData.gstNumber) {
//       setError("Enter GST number to verify");
//       return;
//     }

//     if (!gstRegex.test(employerData.gstNumber)) {
//       setError("GST format invalid");
//       setGstVerified(false);
//       return;
//     }

//     try {
//       // If you have a real API, replace it here
//       // For now, mark as verified instantly
//       setGstVerified(true);
//     } catch (err) {
//       console.error(err);
//       setError("GST verification failed");
//       setGstVerified(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!employerData.companyName || !employerData.email || !employerData.password) {
//       setError("Please fill required fields");
//       return;
//     }

//     onSubmit(employerData);
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
//             { label: "Company Name", key: "companyName", type: "text" },
//             { label: "Mobile", key: "mobile", type: "tel" },
//             { label: "Email", key: "email", type: "email" },
//             { label: "Year of Establishment", key: "yearOfEstablishment", type: "number" },
//             { label: "Password", key: "password", type: "password" },
//             { label: "Confirm Password", key: "confirmPassword", type: "password" },
//           ].map(({ label, key, type }, idx) => (
//             <motion.div key={idx} variants={itemVariants}>
//               <label className="block text-gray-200 text-sm mb-2">{label}</label>
//               <input
//                 type={type}
//                 name={key}
//                 value={employerData[key]}
//                 onChange={handleChange}
//                 className={inputClass}
//                 placeholder={`Enter ${label}`}
//               />
//             </motion.div>
//           ))}

//           {/* GST NUMBER */}
//           <motion.div variants={itemVariants} className="relative">
//             <label className="block text-gray-200 text-sm mb-2">GST Number</label>

//             <input
//               type="text"
//               name="gstNumber"
//               value={employerData.gstNumber}
//               onChange={handleChange}
//               className={inputClass}
//               placeholder="Enter GST Number"
//             />

//             <button
//               type="button"
//               onClick={verifyGst}
//               className="absolute bottom-3 right-4 text-xs text-red-400"
//             >
//               {gstVerified ? "Verified" : "Verify"}
//             </button>
//           </motion.div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="flex-1 min-w-[45%] space-y-5">
//           {[
//             { label: "Website Link", key: "websiteLink", type: "url" },
//             { label: "Address", key: "address", type: "text" },
//             { label: "City", key: "city", type: "text" },
//             { label: "State", key: "state", type: "text" },
//             { label: "District", key: "district", type: "text" },
//             { label: "Vacancy", key: "vacancy", type: "number" },
//           ].map(({ label, key, type }, idx) => (
//             <motion.div key={idx} variants={itemVariants}>
//               <label className="block text-gray-200 text-sm mb-2">{label}</label>
//               <input
//                 type={type}
//                 name={key}
//                 value={employerData[key]}
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
//         {loading ? "Processing..." : "Register as Employer"}
//       </motion.button>
//     </motion.form>
//   );
// }
