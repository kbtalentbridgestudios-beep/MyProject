// src/pages/Registration.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import png from "../assets/reg.png";
import log from "../assets/log.png";

// ✅ BASE URL FROM ENV
const BASE_URL = import.meta.env.VITE_API_URL;

export default function Registration() {
  const [role, setRole] = useState(null);
  const [gstVerified, setGstVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const redirectTimeoutRef = useRef(null);

  const [candidateData, setCandidateData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    category: "",
    address: "",
    mobile: "",
    city: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [employerData, setEmployerData] = useState({
    companyName: "",
    mobile: "",
    email: "",
    yearOfEstablishment: "",
    password: "",
    confirmPassword: "",
    gstNumber: "",
    websiteLink: "",
    address: "",
    city: "",
    state: "",
    district: "",
    vacancy: "",
  });

  /* ---------------- CATEGORIES ---------------- */
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catError, setCatError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      setCatLoading(true);
      setCatError(null);
      try {
        const res = await fetch(`${BASE_URL}/api/jobcategories`, {
          signal: controller.signal,
        });

        const data = await res.json();
        const list = Array.isArray(data?.data) ? data.data : data;

        setCategories(
          Array.isArray(list)
            ? list.map((c) => ({
                id: c._id,
                name: c.name,
              }))
            : []
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setCatError("Could not load categories");
          setCategories([]);
        }
      } finally {
        setCatLoading(false);
      }
    };

    fetchCategories();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-black/60 border border-red-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition";

  const handleCandidateChange = (e) =>
    setCandidateData({ ...candidateData, [e.target.name]: e.target.value });

  const handleEmployerChange = (e) =>
    setEmployerData({ ...employerData, [e.target.name]: e.target.value });

  /* ---------------- CANDIDATE SUBMIT ---------------- */
  const handleCandidateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/register/candidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidateData),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(true);
        redirectTimeoutRef.current = setTimeout(
          () => navigate("/login"),
          2000
        );
      } else {
        setError(result.message || "Registration failed");
      }
    } catch {
      setError("Candidate registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EMPLOYER SUBMIT ---------------- */
  const handleEmployerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/register/employer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employerData),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(true);
        redirectTimeoutRef.current = setTimeout(
          () => navigate("/login"),
          2000
        );
      } else {
        setError(result.message || "Registration failed");
      }
    } catch {
      setError("Employer registration failed");
    } finally {
      setLoading(false);
    }
  };



  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`p-6 rounded-xl w-full max-w-5xl mt-10 sm:mt-[30px] ${
          !role
            ? "bg-transparent border-0 shadow-none max-w-md"
            : "bg-black/50 border border-red-600 shadow-2xl"
        }`}
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-sm mt-2"
          >
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
            <p className="text-green-400 text-lg font-semibold">
              ✅ Registration successful!
            </p>
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
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

        {/* ---------------- CANDIDATE FORM ---------------- */}
        {role === "candidate" && !loading && !success && (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <motion.img
                src={log}
                alt="Candidate"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-xl shadow-lg w-full max-h-[600px] object-contain"
              />
            </div>

            {/* FORM START */}
            <motion.form
              onSubmit={handleCandidateSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5 w-full"
            >
              <div className="flex flex-wrap gap-4">
                
                {/* LEFT SIDE */}
                <div className="flex-1 min-w-[45%] space-y-5">
                  {[ 
                    { label: "First Name", key: "firstName", type: "text" },
                    { label: "Last Name", key: "lastName", type: "text" },
                    { label: "Date of Birth", key: "dateOfBirth", type: "date" },
                  ].map(({ label, key, type }, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <label className="block text-gray-200 text-sm mb-2">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={key}
                        value={candidateData[key]}
                        onChange={handleCandidateChange}
                        className={inputClass}
                        placeholder={`Enter ${label}`}
                      />
                    </motion.div>
                  ))}

                  {/* MOBILE */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-200 text-sm mb-2">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={candidateData.mobile}
                      onChange={handleCandidateChange}
                      className={inputClass}
                      placeholder="Enter mobile (for contact only)"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      OTP will be sent to your email only.
                    </p>
                  </motion.div>
                </div>

                {/* CATEGORY */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-200 text-sm mb-2">
                    Category
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      name="category"
                      value={candidateData.category}
                      onChange={handleCandidateChange}
                      placeholder="Select or type category"
                      className="w-full px-4 py-2 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                    />
                    <select
                      value={candidateData.category}
                      onChange={(e) =>
                        setCandidateData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                    >
                      <option value="">-- Select --</option>
                      {catLoading && <option>Loading...</option>}
                      {catError && <option>{catError}</option>}
                      {!catLoading &&
                        !catError &&
                        categories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </motion.div>

                {/* RIGHT SIDE */}
                <div className="flex-1 min-w-[45%] space-y-5">
                  
                  {/* CITY */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-200 text-sm mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={candidateData.city}
                      onChange={handleCandidateChange}
                      className={inputClass}
                    />
                  </motion.div>

                  {/* STATE */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-200 text-sm mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={candidateData.state}
                      onChange={handleCandidateChange}
                      className={inputClass}
                    />
                  </motion.div>

                  {/* ADDRESS */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-200 text-sm mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={candidateData.address}
                      onChange={handleCandidateChange}
                      className={inputClass}
                    />
                  </motion.div>

                  {/* EMAIL (OTP REMOVED – SIMPLE INPUT ONLY) */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-200 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={candidateData.email}
                      onChange={handleCandidateChange}
                      className={inputClass}
                      placeholder="Enter email"
                    />
                  </motion.div>

                  {/* PASSWORDS */}
                  {[
                    { label: "Password", key: "password", type: "password" },
                    {
                      label: "Confirm Password",
                      key: "confirmPassword",
                      type: "password",
                    },
                  ].map(({ label, key, type }, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <label className="block text-gray-200 text-sm mb-2">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={key}
                        value={candidateData[key]}
                        onChange={handleCandidateChange}
                        className={inputClass}
                        placeholder={`Enter ${label}`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SUBMIT */}
              <motion.button
                type="submit"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
              >
                Register as Candidate
              </motion.button>
            </motion.form>
          </div>
        )}

        {/* ---------------- EMPLOYER FORM ---------------- */}
        {role === "employer" && !loading && !success && (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* IMAGE */}
            <div className="hidden md:block">
              <motion.img
                src={png}
                alt="Employer"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-xl shadow-lg w-full max-h-[600px] object-contain"
              />
            </div>

            {/* FORM */}
            <motion.form
              onSubmit={handleEmployerSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5 w-full"
            >
              <div className="flex flex-wrap gap-4">
                
                {/* LEFT */}
                <div className="flex-1 min-w-[45%] space-y-5">
                  {[
                    { label: "Company Name", key: "companyName", type: "text" },
                    { label: "Mobile", key: "mobile", type: "tel" },
                  ].map(({ label, key, type }, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <label className="block text-gray-200 text-sm mb-2">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={key}
                        value={employerData[key]}
                        onChange={handleEmployerChange}
                        className={inputClass}
                        placeholder={`Enter ${label}`}
                      />
                    </motion.div>
                  ))}

                  {/* GST */}
                  <motion.div variants={itemVariants} className="relative">
                    <label className="block text-gray-200 text-sm mb-2">
                      GST Number
                    </label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={employerData.gstNumber}
                      onChange={handleEmployerChange}
                      className={inputClass}
                      placeholder="Enter GST number"
                    />
                    <span
                      onClick={() => setGstVerified(true)}
                      className="absolute bottom-3 right-4 text-xs text-red-400 cursor-pointer"
                    >
                      {gstVerified ? "Verified" : "Verify"}
                    </span>
                  </motion.div>
                </div>

                {/* RIGHT */}
                <div className="flex-1 min-w-[45%] space-y-5">
                  
                  {/* EMAIL (OTP REMOVED — SIMPLE INPUT) */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-200 text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={employerData.email}
                      onChange={handleEmployerChange}
                      className={inputClass}
                      placeholder="Enter email"
                    />
                  </motion.div>

                  {/* OTHER FIELDS */}
                  {[
                    { label: "Website Link", key: "websiteLink", type: "url" },
                    { label: "Address", key: "address", type: "text" },
                    { label: "City", key: "city", type: "text" },
                    { label: "State", key: "state", type: "text" },
                    { label: "District", key: "district", type: "text" },
                    { label: "Vacancy", key: "vacancy", type: "number" },
                    { label: "Password", key: "password", type: "password" },
                    {
                      label: "Confirm Password",
                      key: "confirmPassword",
                      type: "password",
                    },
                  ].map(({ label, key, type }, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <label className="block text-gray-200 text-sm mb-2">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={key}
                        value={employerData[key]}
                        onChange={handleEmployerChange}
                        className={inputClass}
                        placeholder={`Enter ${label}`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SUBMIT */}
              <motion.button
                type="submit"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
              >
                Register as Employer
              </motion.button>
            </motion.form>
          </div>
        )}
      </motion.div>
    </div>
  );
}

