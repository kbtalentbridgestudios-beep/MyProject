import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post(apiUrl("/news-admin/login"), form);

      localStorage.setItem("newsAdminToken", res.data.token);
      navigate("/news-admin/dashboard");
    } catch (err) {
      setMsg("Invalid username or password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-black">
      {/* Glass Card */}
      <div className="w-full max-w-sm bg-neutral-900/80 p-8 rounded-2xl shadow-xl border border-red-600/30 backdrop-blur-md">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">
          <span className="text-orange-400">KBTS</span> News Login
        </h2>

        {/* Error Message */}
        {msg && (
          <p className="text-red-500 text-center mb-3">{msg}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-white">

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-neutral-800 border border-red-600/30 focus:outline-none focus:border-red-500"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-neutral-800 border border-red-600/30 focus:outline-none focus:border-red-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold shadow-md transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
