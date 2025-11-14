import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await axios.post(
        "https://my-backend-knk9.onrender.com/api/contact", // ✅ your Render backend URL
        form
      );

      if (res.status === 200) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setForm({ name: "", email: "", message: "" }); // clear form
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          err.response?.data?.error ||
          "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20 pb-20 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-red-600">
          Contact Us
        </h1>
        <p className="mt-4 text-gray-400">
          Have questions or want to work with{" "}
          <span className="text-red-400 font-semibold">
            KB TalentBridge Studio
          </span>
          ? We’d love to hear from you.
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Details */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Mail className="text-white" size={22} />
            </div>
            <p className="text-gray-300">support@kbtalentbridge.com</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Phone className="text-white" size={22} />
            </div>
            <p className="text-gray-300">+91-9205300231</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-full">
              <MapPin className="text-white" size={22} />
            </div>
            <p className="text-gray-300">Mumbai, India</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6"
        >
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-red-500"
              required
            ></textarea>
          </div>

          {status && (
            <p
              className={`text-center font-medium ${
                status.type === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {status.message}
            </p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-600" : "bg-red-600 hover:bg-red-700"
            } transition text-white font-semibold py-3 rounded-lg`}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}










// // src/components/ContactUs.jsx
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin } from "lucide-react";

// export default function ContactUs() {
//   return (
//     <div className="bg-black text-white min-h-screen pt-20 pb-20 px-6">
//       {/* Heading */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-semibold text-red-600">
//           Contact Us
//         </h1>
//         <p className="mt-4 text-gray-400">
//           Have questions or want to work with{" "}
//           <span className="text-red-400 font-semibold">KB TalentBridge Studio</span>?  
//           We’d love to hear from you.
//         </p>
//       </div>

//       {/* Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//         {/* Contact Details */}
//         <motion.div
//           initial={{ x: -50, opacity: 0 }}
//           whileInView={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="space-y-6"
//         >
//           <div className="flex items-center gap-4">
//             <div className="bg-red-600 p-3 rounded-full">
//               <Mail className="text-white" size={22} />
//             </div>
//             <p className="text-gray-300">support@kbtalentbridge.com</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="bg-red-600 p-3 rounded-full">
//               <Phone className="text-white" size={22} />
//             </div>
//             <p className="text-gray-300">+91-9205300231</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="bg-red-600 p-3 rounded-full">
//               <MapPin className="text-white" size={22} />
//             </div>
//             <p className="text-gray-300">Mumbai, India</p>
//           </div>
//         </motion.div>

//         {/* Contact Form */}
//         <motion.form
//           initial={{ x: 50, opacity: 0 }}
//           whileInView={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6"
//         >
//           <div>
//             <label className="block text-gray-300 mb-2">Name</label>
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-red-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-300 mb-2">Email</label>
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-red-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-300 mb-2">Message</label>
//             <textarea
//               placeholder="Your Message"
//               rows="5"
//               className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-red-500"
//             ></textarea>
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-lg"
//           >
//             Send Message
//           </motion.button>
//         </motion.form>
//       </div>
//     </div>
//   );
// }
