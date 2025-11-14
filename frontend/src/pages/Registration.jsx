// // src/pages/Registration.jsx
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate, Link } from "react-router-dom";
// import png from "../assets/reg.png"; // Employer image
// import log from "../assets/log.jpg"; // Candidate image

// //  Backend URL (Render)
// const API_URL = "https://my-backend-knk9.onrender.com/api";

// export default function Registration() {
//   const [role, setRole] = useState(null);
//   const [gstVerified, setGstVerified] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   // Candidate State
//   const [candidateData, setCandidateData] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     category: "",
//     address: "",
//     mobile: "",
//     city: "",
//     state: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Employer State
//   const [employerData, setEmployerData] = useState({
//     companyName: "",
//     mobile: "",
//     email: "",
//     yearOfEstablishment: "",
//     password: "",
//     confirmPassword: "",
//     gstNumber: "",
//     websiteLink: "",
//     address: "",
//     city: "",
//     state: "",
//     district: "",
//     vacancy: "",
//   });

//   const containerVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
//   };
//   const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

//   const inputClass = `w-full px-4 py-3 rounded-lg bg-black/60 border border-red-600 text-white placeholder-gray-400 focus:outline-none focus:border-white hover:border-white transition`;

//   // ====== Handle Input Change ======
//   const handleCandidateChange = (e) => {
//     setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
//   };
//   const handleEmployerChange = (e) => {
//     setEmployerData({ ...employerData, [e.target.name]: e.target.value });
//   };

//   // ====== Candidate Submit ======
//   const handleCandidateSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API_URL}/auth/register/candidate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(candidateData),
//       });
//       const result = await res.json();
//       if (res.ok) {
//         setSuccess(true);
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         setError(result.message || "Registration failed");
//       }
//     } catch (err) {
//       setError("Candidate registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ====== Employer Submit ======
//   const handleEmployerSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API_URL}/auth/register/employer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(employerData),
//       });
//       const result = await res.json();
//       if (res.ok) {
//         setSuccess(true);
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         setError(result.message || "Registration failed");
//       }
//     } catch (err) {
//       setError("Employer registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center min-h-screen bg-black bg-cover bg-center">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className={`p-6 rounded-xl w-full max-w-5xl mt-10 sm:mt-[30px] ${
//           !role
//             ? "bg-transparent border-0 shadow-none max-w-md"
//             : "bg-black/50 backdrop-blur-lg border border-red-600/30 shadow-2xl"
//         }`}
//       >
//         {/* Heading */}
//         <div className="text-center mb-6">
//           <motion.h1
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl font-semibold text-red tracking-wider"
//           >
//             Registration
//           </motion.h1>
//           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-300 text-sm mt-2">
//             Create your account below
//           </motion.p>
//         </div>

//         {/* Loader */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-10">
//             <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-white mt-4">Processing...</p>
//           </div>
//         )}

//         {/* Success */}
//         {success && !loading && (
//           <div className="flex flex-col items-center justify-center py-10">
//             <p className="text-green-400 text-lg font-semibold">✅ Registration successful!</p>
//             <p className="text-gray-300 text-sm mt-2">Redirecting to login...</p>
//           </div>
//         )}

//         {/* Error */}
//         {error && !loading && (
//           <div className="flex flex-col items-center justify-center py-5">
//             <p className="text-red-400 text-sm">{error}</p>
//           </div>
//         )}

//         {/* Role Selection */}
//         {!role && !loading && !success && (
//           <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-4">
//             <motion.button
//               variants={itemVariants}
//               whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px #dc2626" }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setRole("candidate")}
//               className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
//             >
//               Register as Candidate
//             </motion.button>
//             <motion.button
//               variants={itemVariants}
//               whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px #dc2626" }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setRole("employer")}
//               className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
//             >
//               Register as Employer
//             </motion.button>
//           </motion.div>
//         )}

//         {/* Candidate Form */}
//         {role === "candidate" && !loading && !success && (
//           <div className="grid md:grid-cols-2 gap-8 items-center">    
//             <div className="hidden md:block">
//               <motion.img src={log} alt="Candidate" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 10, x: 0 }} transition={{ duration: 0.6 }} className="rounded-xl shadow-lg w-full max-h-[600px] object-contain opacity-10" />  {/* className="relative flex items-center justify-center min-h-screen  bg-center" */}
//             </div>
            
//             <motion.form onSubmit={handleCandidateSubmit} variants={containerVariants} initial="hidden" animate="visible" className="space-y-5 w-full">
//               <div className="flex flex-wrap gap-4">
//                 <div className="flex-1 min-w-[45%] space-y-5">
//                   {[{ label: "First Name", key: "firstName", type: "text" },
//                     { label: "Last Name", key: "lastName", type: "text" },
//                     { label: "Date of Birth", key: "dateOfBirth", type: "date" },
//                     { label: "Address", key: "address", type: "text" },
//                     { label: "Mobile", key: "mobile", type: "tel" }].map(({ label, key, type }, idx) => (
//                     <motion.div key={idx} variants={itemVariants}>
//                       <label className="block text-gray-200 text-sm mb-2">{label}</label>
//                       <input type={type} name={key} value={candidateData[key]} onChange={handleCandidateChange} className={inputClass} placeholder={`Enter ${label}`} />
//                     </motion.div>
//                   ))}
//                 </div>

//                 <motion.div variants={itemVariants}>
//                   <label className="block text-gray-200 text-sm mb-2">Category</label>
//                   <div className="flex gap-3">
//                     <input type="text" name="category" value={candidateData.category} onChange={handleCandidateChange} placeholder="Select or type category" className="w-full px-4 py-2 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500" />
//                     <select className="px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
//                       onChange={(e) => setCandidateData((prev) => ({ ...prev, category: e.target.value }))}>
//                       <option value="">-- Select --</option>
//                       <option value="Acting">Acting</option>
//                       <option value="Singing">Singing</option>
//                       <option value="Music">Music</option>
//                       <option value="Dancing">Dancing</option>
//                       <option value="Makeup">Makeup</option>
//                       <option value="Sound Recording">Sound Recording</option>
//                       <option value="Writer">Writer</option>
//                       <option value="Choreographer">Choreographer</option>
//                       <option value="Dress Designer">Dress Designer</option>
//                       <option value="Direction">Direction</option>
//                       <option value="Fight Director">Fight Director</option>
//                       <option value="Spotboy">Spotboy</option>
//                     </select>
//                   </div>
//                 </motion.div>

//                 <div className="flex-1 min-w-[45%] space-y-5">
//                   {[{ label: "City", key: "city", type: "text" },
//                     { label: "State", key: "state", type: "text" },
//                     { label: "Email", key: "email", type: "email" },
//                     { label: "Password", key: "password", type: "password" },
//                     { label: "Confirm Password", key: "confirmPassword", type: "password" }].map(({ label, key, type }, idx) => (
//                     <motion.div key={idx} variants={itemVariants}>
//                       <label className="block text-gray-200 text-sm mb-2">{label}</label>
//                       <input type={type} name={key} value={candidateData[key]} onChange={handleCandidateChange} className={inputClass} placeholder={`Enter ${label}`} />
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <motion.button type="submit" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition">
//                 Register as Candidate
//               </motion.button>
//             </motion.form>
//           </div>
//         )}

//         {/* Employer Form */}
//         {role === "employer" && !loading && !success && (
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <div className="hidden md:block">
//               <motion.img src={png} alt="Employer" 
//               initial={{ opacity: 0, x: -50 }} 
//               animate={{ opacity: 1, x: 0 }} 
//               transition={{ duration: 0.6 }} 
//               className="rounded-xl shadow-lg w-full max-h-[600px] object-contain" />
//             </div>
//             <motion.form onSubmit={handleEmployerSubmit} variants={containerVariants} initial="hidden" animate="visible" className="space-y-5 w-full">
//               <div className="flex flex-wrap gap-4">
//                 <div className="flex-1 min-w-[45%] space-y-5">
//                   {[{ label: "Company Name", key: "companyName", type: "text" },
//                     { label: "Mobile", key: "mobile", type: "tel" },
//                     { label: "Email", key: "email", type: "email" },
//                     { label: "Year of Establishment", key: "yearOfEstablishment", type: "number" },
//                     { label: "Password", key: "password", type: "password" },
//                     { label: "Confirm Password", key: "confirmPassword", type: "password" }].map(({ label, key, type }, idx) => (
//                     <motion.div key={idx} variants={itemVariants}>
//                       <label className="block text-gray-200 text-sm mb-2">{label}</label>
//                       <input type={type} name={key} value={employerData[key]} onChange={handleEmployerChange} className={inputClass} placeholder={`Enter ${label}`} />
//                     </motion.div>
//                   ))}
//                   <motion.div variants={itemVariants} className="relative">
//                     <label className="block text-gray-200 text-sm mb-2">GST Number</label>
//                     <input type="text" name="gstNumber" value={employerData.gstNumber} onChange={handleEmployerChange} className={inputClass} placeholder="Enter GST number" />
//                     <span onClick={() => setGstVerified(true)} className="absolute bottom-3 right-4 text-xs text-red-400 cursor-pointer">
//                       {gstVerified ? "Verified" : "Verify"}
//                     </span>
//                   </motion.div>
//                 </div>

//                 <div className="flex-1 min-w-[45%] space-y-5">
//                   {[{ label: "Website Link", key: "websiteLink", type: "url" },
//                     { label: "Address", key: "address", type: "text" },
//                     { label: "City", key: "city", type: "text" },
//                     { label: "State", key: "state", type: "text" },
//                     { label: "District", key: "district", type: "text" },
//                     { label: "Vacancy", key: "vacancy", type: "number" }].map(({ label, key, type }, idx) => (
//                     <motion.div key={idx} variants={itemVariants}>
//                       <label className="block text-gray-200 text-sm mb-2">{label}</label>
//                       <input type={type} name={key} value={employerData[key]} onChange={handleEmployerChange} className={inputClass} placeholder={`Enter ${label}`} />
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <motion.button type="submit" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition">
//                 Register as Employer
//               </motion.button>
//             </motion.form>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }
// src/pages/Registration.jsx
// src/pages/Registration.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import png from "../assets/reg.png"; // Employer image
import log from "../assets/log.png"; // Candidate image

const API_URL = "https://my-backend-knk9.onrender.com/api";

export default function Registration() {
  const [role, setRole] = useState(null);
  const [gstVerified, setGstVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [candidateData, setCandidateData] = useState({
    firstName: "", lastName: "", dateOfBirth: "", category: "", address: "",
    mobile: "", city: "", state: "", email: "", password: "", confirmPassword: "",
  });

  const [employerData, setEmployerData] = useState({
    companyName: "", mobile: "", email: "", yearOfEstablishment: "", password: "",
    confirmPassword: "", gstNumber: "", websiteLink: "", address: "", city: "",
    state: "", district: "", vacancy: "",
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const inputClass = `w-full px-4 py-3 rounded-lg bg-black/60 border border-red-600 text-white placeholder-gray-400 focus:outline-none focus:border-white hover:border-white transition`;

  const handleCandidateChange = (e) => setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
  const handleEmployerChange = (e) => setEmployerData({ ...employerData, [e.target.name]: e.target.value });

  const handleCandidateSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/register/candidate`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(candidateData)
      });
      const result = await res.json();
      if (res.ok) { setSuccess(true); setTimeout(() => navigate("/login"), 2000); }
      else setError(result.message || "Registration failed");
    } catch { setError("Candidate registration failed"); }
    finally { setLoading(false); }
  };

  const handleEmployerSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/register/employer`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(employerData)
      });
      const result = await res.json();
      if (res.ok) { setSuccess(true); setTimeout(() => navigate("/login"), 2000); }
      else setError(result.message || "Registration failed");
    } catch { setError("Employer registration failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`p-6 rounded-xl w-full max-w-5xl mt-10 sm:mt-[30px] ${!role ? "bg-transparent border-0 shadow-none max-w-md" : "bg-black/50 border border-red-600 shadow-2xl"}`}
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold text-red tracking-wider"
          >
            Registration
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-300 text-sm mt-2">
            Create your account below
          </motion.p>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4">Processing...</p>
          </div>
        )}

        {/* Success */}
        {success && !loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-green-400 text-lg font-semibold">✅ Registration successful!</p>
            <p className="text-gray-300 text-sm mt-2">Redirecting to login...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-5">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Role Selection */}
        {!role && !loading && !success && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-4">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px #dc2626" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRole("candidate")}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
            >
              Register as Candidate
            </motion.button>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px #dc2626" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRole("employer")}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
            >
              Register as Employer
            </motion.button>
          </motion.div>
        )}

        {/* Candidate Form */}
        {role === "candidate" && !loading && !success && (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <motion.img src={log} alt="Candidate"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-xl shadow-lg w-full max-h-[600px] object-contain"
              />
            </div>

            <motion.form onSubmit={handleCandidateSubmit} variants={containerVariants} initial="hidden" animate="visible" className="space-y-5 w-full">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[45%] space-y-5">
                  {[{ label: "First Name", key: "firstName", type: "text" },
                    { label: "Last Name", key: "lastName", type: "text" },
                    { label: "Date of Birth", key: "dateOfBirth", type: "date" },
                    { label: "Address", key: "address", type: "text" },
                    { label: "Mobile", key: "mobile", type: "tel" }].map(({ label, key, type }, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <label className="block text-gray-200 text-sm mb-2">{label}</label>
                      <input type={type} name={key} value={candidateData[key]} onChange={handleCandidateChange} className={inputClass} placeholder={`Enter ${label}`} />
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={itemVariants}>
                  <label className="block text-gray-200 text-sm mb-2">Category</label>
                  <div className="flex gap-3">
                    <input type="text" name="category" value={candidateData.category} onChange={handleCandidateChange} placeholder="Select or type category" className="w-full px-4 py-2 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500" />
                    <select className="px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                      onChange={(e) => setCandidateData((prev) => ({ ...prev, category: e.target.value }))}>
                      <option value="">-- Select --</option>
                      <option value="Acting">Acting</option>
                      <option value="Singing">Singing</option>
                      <option value="Music">Music</option>
                      <option value="Dancing">Dancing</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Sound Recording">Sound Recording</option>
                      <option value="Writer">Writer</option>
                      <option value="Choreographer">Choreographer</option>
                      <option value="Dress Designer">Dress Designer</option>
                      <option value="Direction">Direction</option>
                      <option value="Fight Director">Fight Director</option>
                      <option value="Spotboy">Spotboy</option>
                    </select>
                  </div>
                </motion.div>

                <div className="flex-1 min-w-[45%] space-y-5">
                  {[{ label: "City", key: "city", type: "text" },
                    { label: "State", key: "state", type: "text" },
                    { label: "Email", key: "email", type: "email" },
                    { label: "Password", key: "password", type: "password" },
                    { label: "Confirm Password", key: "confirmPassword", type: "password" }].map(({ label, key, type }, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <label className="block text-gray-200 text-sm mb-2">{label}</label>
                      <input type={type} name={key} value={candidateData[key]} onChange={handleCandidateChange} className={inputClass} placeholder={`Enter ${label}`} />
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.button type="submit" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition">
                Register as Candidate
              </motion.button>
            </motion.form>
          </div>
        )}

        {/* Employer Form */}
        {role === "employer" && !loading && !success && (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <motion.img src={png} alt="Employer"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-xl shadow-lg w-full max-h-[600px] object-contain"
              />
            </div>

            <motion.form onSubmit={handleEmployerSubmit} variants={containerVariants} initial="hidden" animate="visible" className="space-y-5 w-full">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[45%] space-y-5">
                  {[{ label: "Company Name", key: "companyName", type: "text" },
                    { label: "Mobile", key: "mobile", type: "tel" },
                    { label: "Email", key: "email", type: "email" },
                    { label: "Year of Establishment", key: "yearOfEstablishment", type: "number" },
                    { label: "Password", key: "password", type: "password" },
                    { label: "Confirm Password", key: "confirmPassword", type: "password" }].map(({ label, key, type }, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <label className="block text-gray-200 text-sm mb-2">{label}</label>
                      <input type={type} name={key} value={employerData[key]} onChange={handleEmployerChange} className={inputClass} placeholder={`Enter ${label}`} />
                    </motion.div>
                  ))}
                  <motion.div variants={itemVariants} className="relative">
                    <label className="block text-gray-200 text-sm mb-2">GST Number</label>
                    <input type="text" name="gstNumber" value={employerData.gstNumber} onChange={handleEmployerChange} className={inputClass} placeholder="Enter GST number" />
                    <span onClick={() => setGstVerified(true)} className="absolute bottom-3 right-4 text-xs text-red-400 cursor-pointer">
                      {gstVerified ? "Verified" : "Verify"}
                    </span>
                  </motion.div>
                </div>

                <div className="flex-1 min-w-[45%] space-y-5">
                  {[{ label: "Website Link", key: "websiteLink", type: "url" },
                    { label: "Address", key: "address", type: "text" },
                    { label: "City", key: "city", type: "text" },
                    { label: "State", key: "state", type: "text" },
                    { label: "District", key: "district", type: "text" },
                    { label: "Vacancy", key: "vacancy", type: "number" }].map(({ label, key, type }, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <label className="block text-gray-200 text-sm mb-2">{label}</label>
                      <input type={type} name={key} value={employerData[key]} onChange={handleEmployerChange} className={inputClass} placeholder={`Enter ${label}`} />
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.button type="submit" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition">
                Register as Employer
              </motion.button>
            </motion.form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
