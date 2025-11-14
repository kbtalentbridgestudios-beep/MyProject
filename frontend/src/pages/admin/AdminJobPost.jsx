import { useState } from "react";
import axios from "axios";

export default function AdminJobPost() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company: "",
    category: "",
    gender: "",
    openings: "",
  });
  const [loading, setLoading] = useState(false);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://my-backend-knk9.onrender.com/api";

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Admin not logged in");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/admin/jobs/post`, job, {
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
        category: "",
        gender: "",
        openings: "",
      });
    } catch (err) {
      console.error("Job post error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error posting job"
      );
    } finally {
      setLoading(false);
    }
  };

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
        <select
          name="category"
          value={job.category}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
        >
          <option value="">Select Category</option>
          <option value="acting">Acting</option>
          <option value="singing">Singing</option>
          <option value="dancing">Dancing</option>
          <option value="spotboy">Spotboy</option>
        </select>
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
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 p-2 rounded font-semibold mt-2"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
