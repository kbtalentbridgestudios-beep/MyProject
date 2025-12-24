
// src/components/AdminJobPost.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../utils/api"; // adjust path if needed

export default function AdminJobPost() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company: "",
    categoryId: "",   // now store category id
    jobPrice: "",     // job-specific price (optional) - number or empty
    gender: "",
    openings: "",
  });
  const [loading, setLoading] = useState(false);

  // categories fetched from backend
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      setCatLoading(true);
      setCatError(null);
      try {
        const res = await axios.get(apiUrl("/api/jobcategories"));
        if (!mounted) return;
        // if backend returns { jobs: [...] } or array
        const data = Array.isArray(res.data) ? res.data : res.data?.categories ?? [];
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setCatError("Could not load categories");
      } finally {
        if (mounted) setCatLoading(false);
      }
    };
    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  // when admin picks category, set categoryId and optionally prefill jobPrice
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const cat = categories.find((c) => String(c._id) === String(categoryId));
    setJob((prev) => ({
      ...prev,
      categoryId,
      // prefill jobPrice only if currently empty string (so admin can override including 0)
      jobPrice: prev.jobPrice !== "" ? prev.jobPrice : (cat ? String(cat.fee ?? "") : ""),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Admin not logged in");
      return;
    }

    // Basic validation
    if (!job.title || !job.categoryId) {
      alert("Please provide job title and category.");
      return;
    }

    if (job.jobPrice !== "" && Number(job.jobPrice) < 0) {
      alert("Job price cannot be negative.");
      return;
    }

    if (job.openings !== "" && Number(job.openings) < 0) {
      alert("Openings cannot be negative.");
      return;
    }

    try {
      setLoading(true);

      const postUrl = apiUrl("/api/admin/jobs/post"); // keep your existing endpoint
      // Build body expected by backend:
      const body = {
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        company: job.company,
        categoryId: job.categoryId,
        jobPrice: job.jobPrice === "" ? null : Number(job.jobPrice),
        gender: job.gender,
        openings: job.openings === "" ? null : Number(job.openings),
      };

      const res = await axios.post(postUrl, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      alert(res.data.message || "Job posted successfully");

      setJob({
        title: "",
        description: "",
        location: "",
        salary: "",
        company: "",
        categoryId: "",
        jobPrice: "",
        gender: "",
        openings: "",
      });
    } catch (err) {
      console.error("Job post error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Error posting job"
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find((c) => String(c._id) === String(job.categoryId));

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="p-2 rounded bg-gray-800"
        />

        <input
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="p-2 rounded bg-gray-800"
        />

        <input
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 rounded bg-gray-800"
        />

        <input
          name="salary"
          value={job.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="p-2 rounded bg-gray-800"
        />

        {/* Category select populated from backend (shows fee) */}
        <div>
          <label className="text-sm text-gray-300">Category</label>
          <select
            name="categoryId"
            value={job.categoryId}
            onChange={handleCategoryChange}
            className="w-full p-2 rounded bg-gray-800 mt-1"
            disabled={catLoading}
          >
            <option value="">Select Category</option>
            {catLoading && <option value="">Loading...</option>}
            {catError && <option value="">{catError}</option>}
            {!catLoading &&
              !catError &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                  {typeof c.fee !== "undefined" && ` — Fee: ₹${c.fee}`}
                </option>
              ))}
          </select>
          {selectedCategory && typeof selectedCategory.fee !== "undefined" && (
            <p className="text-xs text-gray-400 mt-1">Category fee: ₹{selectedCategory.fee}</p>
          )}
        </div>

        {/* Job-specific price (admin can override category fee) */}
        <input
          type="number"
          min="0"
          name="jobPrice"
          value={job.jobPrice}
          onChange={handleChange}
          placeholder="Job Price (optional — leave blank to use category fee)"
          className="p-2 rounded bg-gray-800"
        />

        <select
          name="gender"
          value={job.gender}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="any">Any</option>
        </select>

        <input
          type="number"
          min="0"
          name="openings"
          value={job.openings}
          onChange={handleChange}
          placeholder="Number of Openings"
          className="p-2 rounded bg-gray-800"
        />

        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="p-2 rounded bg-gray-800"
        />

        <button
          type="submit"
          disabled={loading || catLoading}
          className="bg-orange-600 hover:bg-orange-700 p-2 rounded font-semibold mt-2 disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
