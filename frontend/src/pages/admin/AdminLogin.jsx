import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext.jsx";
import { apiUrl } from "../../utils/api";
import banner from "../../assets/banner.png";

export default function AdminLogin() {
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
      const res = await fetch(apiUrl("/api/auth/login/admin"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);
        login(result);
        navigate("/dashboard/admin");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Login request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-black bg-cover bg-center relative"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-red-500/20 to-purple-600/30 backdrop-blur-sm animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-black/70 backdrop-blur-md border border-red-600/40 p-8 rounded-3xl shadow-[0_0_40px_rgba(255,0,80,0.5)] w-full max-w-md"
      >
        <div className="flex justify-center items-center gap-3 mb-6">
          <FaUserShield className="text-red-500 text-2xl animate-pulse" />
          <h1 className="text-3xl font-bold text-white tracking-wide">
            ADMIN LOGIN
          </h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4 text-lg font-medium">Logging In...</p>
          </div>
        ) : (
          <>
            {error && (
              <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Admin Email"
                required
                className="w-full px-5 py-3 rounded-xl bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-5 py-3 rounded-xl bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl"
              >
                Sign In
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}


// import { useState, useContext } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { FaUserShield } from "react-icons/fa";
// import { AuthContext } from "../../context/AuthContext.jsx";
// import banner from "../../assets/banner.png"; // your background image

// export default function AdminLogin() {
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
//       const res = await fetch("https://my-backend-knk9.onrender.com/api/auth/login/admin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", result.token);
//         localStorage.setItem("role", result.role);
//         login(result);
//         alert("Admin login successful!");
//         navigate("/dashboard/admin");
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
//       className="flex justify-center items-center min-h-screen bg-black bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${banner})` }}
//     >
//       {/* Glow overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-red-500/20 to-purple-600/30 backdrop-blur-sm animate-pulse"></div>

//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 bg-black/70 backdrop-blur-md border border-red-600/40 p-8 rounded-3xl shadow-[0_0_40px_rgba(255,0,80,0.5)] w-full max-w-md"
//       >
//         <div className="flex justify-center items-center gap-3 mb-6">
//           <FaUserShield className="text-red-500 text-2xl animate-pulse" />
//           <h1 className="text-3xl font-bold text-white tracking-wide">
//             ADMIN LOGIN
//           </h1>
//         </div>

//         {/* Loader */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-10">
//             <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-white mt-4 text-lg font-medium">Logging In...</p>
//           </div>
//         ) : (
//           <>
//             {error && (
//               <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <input
//                 type="email"
//                 name="email"
//                 value={loginData.email}
//                 onChange={handleChange}
//                 placeholder="Admin Email"
//                 required
//                 className="w-full px-5 py-3 rounded-xl bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 value={loginData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 required
//                 className="w-full px-5 py-3 rounded-xl bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
//               />
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 disabled={loading}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-lg transition"
//               >
//                 Sign In
//               </motion.button>
//             </form>

//             <p className="text-gray-400 text-center mt-6 text-sm">
//               Only authorized admins can login.
//             </p>
//           </>
//         )}
//       </motion.div>
//     </div>
//   );
// }






// import { useState, useContext } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { FaUserShield } from "react-icons/fa";
// import { AuthContext } from "../../context/AuthContext.jsx";
// import banner from "../../assets/banner.png"; // your background image

// export default function AdminLogin() {
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("https://my-backend-knk9.onrender.com/api/auth/login/admin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginData),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", result.token);
//         localStorage.setItem("role", result.role);
//         login(result);

//         alert("Admin login successful!");
//         navigate("/dashboard/admin");
//       } else {
//         alert(result.message || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Login error");
//     }
//   };

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen bg-black bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${banner})` }}
//     >
//       {/* Glow overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-red-500/20 to-purple-600/30 backdrop-blur-sm animate-pulse"></div>

//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 bg-black/70 backdrop-blur-md border border-red-600/40 p-8 rounded-3xl shadow-[0_0_40px_rgba(255,0,80,0.5)] w-full max-w-md"
//       >
//         {/* Header */}
//         <div className="flex justify-center items-center gap-3 mb-6">
//           <FaUserShield className="text-red-500 text-2xl animate-pulse" />
//           <h1 className="text-3xl font-bold text-white tracking-wide">ADMIN LOGIN</h1>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             type="email"
//             name="email"
//             value={loginData.email}
//             onChange={handleChange}
//             placeholder="Admin Email"
//             required
//             className="w-full px-5 py-3 rounded-xl bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
//           />
//           <input
//             type="password"
//             name="password"
//             value={loginData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//             className="w-full px-5 py-3 rounded-xl bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
//           />
//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-lg transition"
//           >
//             Sign In
//           </motion.button>
//         </form>

//         <p className="text-gray-400 text-center mt-6 text-sm">
//           Only authorized admins can login.
//         </p>
//       </motion.div>
//     </div>
//   );
// }
