import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const API_URL =
          import.meta.env.VITE_API_URL ||
          "https://my-backend-knk9.onrender.com/api";

        const res = await axios.get(`${API_URL}/admin/jobs`);

        console.log("Jobs from backend:", res.data);

        // Match your backend response { success, count, jobs }
        const jobsArray = Array.isArray(res.data.jobs) ? res.data.jobs : [];
        setJobs(jobsArray.reverse()); // newest first
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch jobs");
        console.error("Fetch jobs error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading)
    return <p className="text-gray-700 p-4">Loading jobs...</p>;
  if (error)
    return <p className="text-red-500 p-4">{error}</p>;

  const jobList = Array.isArray(jobs) ? jobs : [];

  return (
    <section className="py-10 bg-grey-900">
      <div className="max-w-6xl mx-auto px-4">
                  <h2 className="text-4xl font-semibold mb-6 text-red-600 text-center">
                         Urgently Hiring For !!
                     </h2>

        {jobList.length === 0 ? (
          <p className="text-gray-700">No job postings yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobList.map((job) => (
              <div
                key={job._id}
                className="p-5 bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1"
              >
                {/* Job Title */}
                <h3 className="text-xl font-semibold text-gray-900">
                  {job.title}
                </h3>

                {/* Company & Location */}
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">{job.company}</span> — {job.location}
                </p>

                {/* Salary */}
                {job.salary && (
                  <p className="text-gray-500 mt-1">Salary: {job.salary}</p>
                )}

                {/* Category & Gender */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.category && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {job.category}
                    </span>
                  )}
                  {job.gender && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {job.gender}
                    </span>
                  )}
                </div>
                 {job.openings && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {job.openings}
                    </span>
                    )}

                {/* Job Description */}
                {job.description && (
                  <p className="text-gray-700 mt-2">
                    {job.description.length > 120
                      ? job.description.substring(0, 120) + "..."
                      : job.description}
                  </p>
                )}

                {/* Apply Button */}
                <button
                  className="mt-4 w-full bg-red-600 hover:bg-black text-white font-semibold py-2 rounded transition"
                  onClick={() => alert("Apply functionality coming soon!")}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
