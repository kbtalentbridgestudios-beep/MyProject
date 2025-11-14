// src/pages/Login.jsx
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaHeart } from "react-icons/fa";
import banner from "../assets/banner.png";
import { AuthContext } from "../context/AuthContext.jsx";

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
      const API_BASE =
        import.meta.env.VITE_API_URL || "https://my-backend-knk9.onrender.com";

      // Use /login/admin if admin email, otherwise universal login
      let loginUrl =
        loginData.email === "admin@example.com"
          ? `${API_BASE}/api/auth/login/admin`
          : `${API_BASE}/api/auth/login`;

      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);
        login(result);

        if (result.role === "candidate") navigate("/dashboard/candidate");
        else if (result.role === "employer") navigate("/dashboard/employer");
        else if (result.role === "admin") navigate("/dashboard/admin");
        else navigate("/dashboard");
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
          <h1 className="text-2xl font-bold text-white tracking-wide">LOGIN</h1>
          <FaHeart className="text-pink-500 text-lg animate-ping" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4 text-lg font-medium">Logging In...</p>
          </div>
        ) : (
          <>
            {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition"
                  placeholder="Password"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
                disabled={loading}
              >
                Sign in
              </motion.button>
            </form>
          </>
        )}

        {/* Hide everything below form when loading */}
        {!loading && (
          <>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-gray-400 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-black/60 border border-red-600 text-red-400 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
                Login With OTP
              </button>
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
//         import.meta.env.VITE_API_URL || "https://my-backend-knk9.onrender.com";
//       const loginUrl = `${API_BASE}/api/auth/login`;

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

//             <div className="flex gap-4">
//               <button className="flex-1 bg-black/60 border border-red-600 text-red-400 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
//                 Login With OTP
//               </button>
//             </div>

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
