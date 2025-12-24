// src/pages/Login.jsx
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaHeart } from "react-icons/fa";
import banner from "../assets/banner.png";
import { AuthContext } from "../context/AuthContext.jsx";

// ✅ BASE URL (VITE ONLY)
const BASE_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 🔥 decide endpoint
      const loginUrl =
        loginData.email === "admin@example.com"
          ? `${BASE_URL}/api/auth/login/admin`
          : `${BASE_URL}/api/auth/login`;

      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      // ✅ persist auth
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      login(result);

      // ✅ redirect by role
      if (result.role === "candidate") navigate("/dashboard/candidate");
      else if (result.role === "employer") navigate("/dashboard/employer");
      else if (result.role === "admin") navigate("/dashboard/admin");
      else navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Login request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black/70 backdrop-blur-lg border border-red-600/40 p-6 rounded-2xl shadow-[0_0_30px_rgba(255,0,80,0.4)] w-full max-w-sm"
      >
        <div className="flex justify-center items-center gap-2 mb-6">
          <FaSignInAlt className="text-red-500 text-lg animate-pulse" />
          <h1 className="text-2xl font-bold text-white tracking-wide">
            LOGIN
          </h1>
          <FaHeart className="text-pink-500 text-lg animate-ping" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4 text-lg font-medium">
              Logging In...
            </p>
          </div>
        ) : (
          <>
            {error && (
              <p className="text-red-400 text-sm mb-4 text-center">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
              />

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
              >
                Sign in
              </motion.button>
            </form>
          </>
        )}

        {!loading && (
          <>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-gray-400 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <p className="text-gray-300 text-center text-sm mt-6">
              Don’t have an account?{" "}
              <Link to="/register" className="text-red-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}



//  // src/pages/Login.jsx
// import { useState, useContext } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { FaSignInAlt, FaHeart } from "react-icons/fa";
// import banner from "../assets/banner.png";
// import { AuthContext } from "../context/AuthContext.jsx";

// export default function Login() {
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const API_BASE =
//         import.meta.env.REACT_API_URL || "https://my-backend-knk9.onrender.com";

//       // Use /login/admin if admin email, otherwise universal login
//       let loginUrl =
//         loginData.email === "admin@example.com"
//           ? `${API_BASE}/api/auth/login/admin`
//           : `${API_BASE}/api/auth/login`;

//       const res = await fetch(loginUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", result.token);
//         localStorage.setItem("role", result.role);
//         login(result);

//         if (result.role === "candidate") navigate("/dashboard/candidate");
//         else if (result.role === "employer") navigate("/dashboard/employer");
//         else if (result.role === "admin") navigate("/dashboard/admin");
//         else navigate("/dashboard");
//       } else {
//         setError(result.message || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Login request failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen bg-black bg-cover bg-center"
//       style={{ backgroundImage: `url(${banner})` }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-black/70 backdrop-blur-lg border border-red-600/40 p-6 rounded-2xl shadow-[0_0_30px_rgba(255,0,80,0.4)] w-full max-w-sm"
//       >
//         <div className="flex justify-center items-center gap-2 mb-6">
//           <FaSignInAlt className="text-red-500 text-lg animate-pulse" />
//           <h1 className="text-2xl font-bold text-white tracking-wide">LOGIN</h1>
//           <FaHeart className="text-pink-500 text-lg animate-ping" />
//         </div>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-10">
//             <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-white mt-4 text-lg font-medium">Logging In...</p>
//           </div>
//         ) : (
//           <>
//             {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={loginData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
//                   placeholder="Email"
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   name="password"
//                   value={loginData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
//                   placeholder="Password"
//                   required
//                 />
//               </div>

//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
//                 disabled={loading}
//               >
//                 Sign in
//               </motion.button>
//             </form>
//             {/* <p className="text-right mt-2">
//   <Link to="/forgot-password" className="text-red-400 text-sm hover:underline">
//     Forgot Password?
//   </Link>
// </p> */}
//           </>
//         )}

//         {/* Hide everything below form when loading */}
//         {!loading && (
//           <>
//             <div className="flex items-center my-6">
//               <div className="flex-grow border-t border-gray-600"></div>
//               <span className="mx-4 text-gray-400 text-sm">OR</span>
//               <div className="flex-grow border-t border-gray-600"></div>
//             </div>

//             {/* <div className="flex gap-4">
//               <button className="flex-1 bg-black/60 border border-red-600 text-red-400 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
//                 Login With OTP
//               </button>
//             </div> */}

//             <p className="text-gray-300 text-center text-sm mt-6">
//               Don’t have an account?{" "}
//               <Link to="/register" className="text-red-400 hover:underline">
//                 Sign Up
//               </Link>
//             </p>
//           </>
//         )}
//       </motion.div>
//     </div>
//   );
// }






// // src/pages/Login.jsx
// import { useState, useContext } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { FaSignInAlt, FaHeart } from "react-icons/fa";
// import banner from "../assets/banner.png";
// import { AuthContext } from "../context/AuthContext.jsx";

// export default function Login() {
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // states for verification flow
//   const [needsVerification, setNeedsVerification] = useState(false);
//   const [verificationId, setVerificationId] = useState(null);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [resendMessage, setResendMessage] = useState(null);

//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setNeedsVerification(false);
//     setResendMessage(null);

//     try {
//       const API_BASE =
//         import.meta.env.VITE_API_URL || "https://my-backend-knk9.onrender.com";

//       // Use /login/admin if admin email, otherwise universal login
//       let loginUrl =
//         loginData.email === "admin@example.com"
//           ? `${API_BASE}/api/auth/login/admin`
//           : `${API_BASE}/api/auth/login`;

//       const res = await fetch(loginUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", result.token);
//         localStorage.setItem("role", result.role);
//         login(result);

//         if (result.role === "candidate") navigate("/dashboard/candidate");
//         else if (result.role === "employer") navigate("/dashboard/employer");
//         else if (result.role === "admin") navigate("/dashboard/admin");
//         else navigate("/dashboard");
//       } else {
//         // If not verified, show verify UI & allow resend
//         if (res.status === 403 && result.message && result.message.toLowerCase().includes("verify")) {
//           setError(result.message);
//           setNeedsVerification(true);
//           // don't set verificationId here — will be set when resend is used
//         } else {
//           setError(result.message || "Login failed");
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Login request failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // resend OTP via backend
//   const handleResendOtp = async () => {
//     if (!loginData.email) {
//       setError("Enter email to resend OTP");
//       return;
//     }
//     setResendLoading(true);
//     setResendMessage(null);
//     try {
//       const API_BASE =
//         import.meta.env.VITE_API_URL || "https://my-backend-knk9.onrender.com";

//       const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type: "email", value: loginData.email }),
//       });

//       const json = await res.json();
//       if (res.ok) {
//         setVerificationId(json.verificationId || null);
//         setResendMessage("OTP resent to your email. Check spam/primary.");
//         // Optionally navigate to a verify page where user can enter OTP:
//         // navigate(`/verify?email=${encodeURIComponent(loginData.email)}`);
//       } else {
//         setResendMessage(json.message || "Failed to resend OTP");
//       }
//     } catch (err) {
//       console.error("resend-otp error:", err);
//       setResendMessage("Could not resend OTP");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   const goToVerifyPage = () => {
//     // Navigate to a dedicated verify page — adjust route to your app
//     // Pass email and optional verificationId
//     const params = new URLSearchParams();
//     if (loginData.email) params.set("email", loginData.email);
//     if (verificationId) params.set("vid", verificationId);
//     navigate(`/verify?${params.toString()}`);
//   };

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen bg-black bg-cover bg-center"
//       style={{ backgroundImage: `url(${banner})` }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-black/70 backdrop-blur-lg border border-red-600/40 p-6 rounded-2xl shadow-[0_0_30px_rgba(255,0,80,0.4)] w-full max-w-sm"
//       >
//         <div className="flex justify-center items-center gap-2 mb-6">
//           <FaSignInAlt className="text-red-500 text-lg animate-pulse" />
//           <h1 className="text-2xl font-bold text-white tracking-wide">LOGIN</h1>
//           <FaHeart className="text-pink-500 text-lg animate-ping" />
//         </div>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-10">
//             <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-white mt-4 text-lg font-medium">Logging In...</p>
//           </div>
//         ) : (
//           <>
//             {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={loginData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
//                   placeholder="Email"
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   name="password"
//                   value={loginData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
//                   placeholder="Password"
//                   required
//                 />
//               </div>

//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
//                 disabled={loading}
//               >
//                 Sign in
//               </motion.button>
//             </form>

//             {/* If verify required, show actions */}
//             {needsVerification && (
//               <div className="mt-4 bg-yellow-900/20 border border-yellow-700 p-3 rounded">
//                 <p className="text-yellow-200 text-sm mb-2 text-center">
//                   Your account is not verified. You must verify your email before logging in.
//                 </p>

//                 <div className="flex gap-2 justify-center">
//                   <button
//                     onClick={handleResendOtp}
//                     disabled={resendLoading}
//                     className="px-3 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700"
//                   >
//                     {resendLoading ? "Resending..." : "Resend OTP"}
//                   </button>

//                   <button
//                     onClick={goToVerifyPage}
//                     className="px-3 py-2 rounded border border-red-600 text-red-400 text-sm hover:bg-red-600/10"
//                   >
//                     Verify Now
//                   </button>
//                 </div>

//                 {resendMessage && <p className="text-xs text-center text-gray-200 mt-2">{resendMessage}</p>}
//               </div>
//             )}

//             <p className="text-right mt-2">
//               <Link to="/forgot-password" className="text-red-400 text-sm hover:underline">
//                 Forgot Password?
//               </Link>
//             </p>

//             {/* bottom area */}
//             {!loading && (
//               <>
//                 <div className="flex items-center my-6">
//                   <div className="flex-grow border-t border-gray-600"></div>
//                   <span className="mx-4 text-gray-400 text-sm">OR</span>
//                   <div className="flex-grow border-t border-gray-600"></div>
//                 </div>

//                 <div className="flex gap-4">
//                   <button className="flex-1 bg-black/60 border border-red-600 text-red-400 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
//                     Login With OTP
//                   </button>
//                 </div>

//                 <p className="text-gray-300 text-center text-sm mt-6">
//                   Don’t have an account?{" "}
//                   <Link to="/register" className="text-red-400 hover:underline">
//                     Sign Up
//                   </Link>
//                 </p>
//               </>
//             )}
//           </>
//         )}
//       </motion.div>
//     </div>
//   );
// }
