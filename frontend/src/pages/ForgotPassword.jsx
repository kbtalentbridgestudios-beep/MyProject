// import { useState } from "react";
// import { motion } from "framer-motion";
// import { apiUrl } from "../utils/api";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const API_BASE =
//         import.meta.env.VITE_API_URL || "https://my-backend-knk9.onrender.com";

//       const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setMessage("Reset link sent to your email");
//       } else {
//         setMessage(result.message || "Error occurred");
//       }
//     } catch (error) {
//       setMessage("Request failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-black">
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-black/70 border border-red-600 p-6 rounded-xl w-full max-w-sm"
//       >
//         <h2 className="text-center text-white text-2xl mb-4 font-bold">Forgot Password</h2>

//         {message && <p className="text-red-400 text-center mb-3">{message}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             className="w-full p-3 bg-transparent border border-gray-600 rounded-lg text-white"
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-red-600 py-3 rounded-lg text-white font-semibold"
//           >
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }
