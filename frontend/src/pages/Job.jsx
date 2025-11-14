
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [candidatePaid, setCandidatePaid] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const jobsRes = await axios.get(
          "https://my-backend-knk9.onrender.com/api/jobs/all"
        );
        setJobs(jobsRes.data);

        if (token) {
          const profileRes = await axios.get(
            "https://my-backend-knk9.onrender.com/api/candidate/profile",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setCandidatePaid(profileRes.data.isPaid || false);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    if (!candidatePaid) {
      setSelectedJobId(jobId);
      setShowPaymentModal(true);
      return;
    }
    submitApplication(jobId);
  };

  const submitApplication = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to apply for jobs");
        return;
      }

      const res = await axios.post(
        `https://my-backend-knk9.onrender.com/api/applications/apply/${jobId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
    } catch (err) {
      console.error("Error applying:", err);
      alert(err.response?.data?.message || "Failed to apply for job");
    }
  };

  const handlePayNow = () => {
    navigate(`/payment?jobId=${selectedJobId}`);
    setShowPaymentModal(false);
  };

  // Filter jobs according to search + category
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? job.category === category : true;
    return matchesSearch && matchesCategory;
  });

  if (loading)
    return <p className="text-gray-400 mt-6 text-center">Loading jobs...</p>;
  if (!jobs.length)
    return <p className="text-gray-400 mt-6 text-center">No jobs available.</p>;

  return (
    <div className="p-6 space-y-6 bg-black min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-red-600">Available Jobs</h1>
        <p className="text-gray-400 mt-2">.
          Explore the latest opportunities and apply now.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search jobs by title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Categories</option>
          <option value="Acting">Acting</option>
          <option value="Dance">Dance</option>
          <option value="Singing">Singing</option>
           <option value="Spot-Boy">Spot-Boy</option>
          <option value="Cameraman">Cameraman</option>
          <option value="Directionj">Direction</option>
           {/* <option value="IT"></option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option> */}
        </select>
      </div>

      {/* Jobs List */}
      {filteredJobs.length ? (
        filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-900 rounded-2xl shadow-lg hover:shadow-[0_0_20px_#FF4D4D] transition p-6 border border-gray-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-xl text-white">
                  {job.title}
                </h3>
                <p className="text-green-400 font-medium text-sm mt-1">
                  {job.companyName}
                </p>
                <p className="text-gray-300 font-semibold text-sm mt-1">
                  Category: {job.category}
                </p>
              </div>
              <span className="text-gray-400 font-semibold text-sm">
                {job.location}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-200 font-medium mb-4">{job.description}</p>

            {/* Action + Footer */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleApply(job._id)}
                className={`px-4 py-2 font-semibold rounded-lg transform transition-all duration-300 ${
                  candidatePaid
                    ? "bg-red-600 text-white hover:bg-black hover:text-red-500 hover:shadow-[0_0_15px_#FF4D4D] hover:-translate-y-1"
                    : "bg-yellow-500 text-white hover:bg-orange-600 hover:shadow-[0_0_15px_#FFD700] hover:-translate-y-1"
                }`}
              >
                {candidatePaid ? "Apply Now" : "Pay to Apply"}
              </button>
              <span className="text-gray-500 text-sm font-medium">
                Posted recently
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 mt-6 text-center">No matching jobs.</p>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-96 text-center space-y-4 border-2 border-green-500 shadow-[0_0_15px_#34D399]">
            <h2 className="text-xl font-bold text-white">Complete Payment</h2>
            <p className="text-gray-300">You must pay to apply for this job.</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handlePayNow}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-[0_0_15px_#34D399]"
              >
                Pay Now
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-6 py-2 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

