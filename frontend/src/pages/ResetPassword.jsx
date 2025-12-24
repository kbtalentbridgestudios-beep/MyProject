import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_BASE =
        import.meta.env.VITE_API_URL || "https://my-backend-knk9.onrender.com";

      const res = await fetch(`${API_BASE}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Password reset successful");
      } else {
        setMessage(result.message || "Failed to reset password");
      }
    } catch (err) {
      setMessage("Error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-black/70 border border-red-600 p-6 rounded-xl w-full max-w-sm">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {message && <p className="text-red-400 text-center mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            className="w-full p-3 bg-transparent border border-gray-600 rounded-lg text-white"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 py-3 rounded-lg text-white font-semibold"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
