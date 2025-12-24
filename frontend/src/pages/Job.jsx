import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Job() {
  const [jobsRaw, setJobsRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fallback pricing
  const categoryPrices = {
    Marketing: 199,
    Design: 299,
    Development: 499,
    Management: 399,
    Internship: 49,
    default: 99,
  };

  /* ---------------- FETCH JOBS ---------------- */
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      const endpoints = ["/api/jobs", "/api/admin/jobs", "/admin/jobs"];
      let found = false;

      for (let p of endpoints) {
        try {
          const res = await axios.get(apiUrl(p));
          const data = res?.data;
          let arr = [];

          if (Array.isArray(data)) arr = data;
          else if (Array.isArray(data?.jobs)) arr = data.jobs;
          else if (Array.isArray(data?.data?.jobs)) arr = data.data.jobs;
          else if (Array.isArray(data?.results)) arr = data.results;
          else if (Array.isArray(data?.data)) arr = data.data;

          // Handle object with numeric keys
          if (!Array.isArray(arr) && data && typeof data === "object") {
            const numericKeys = Object.keys(data).filter((k) => /^\d+$/.test(k));
            if (numericKeys.length) {
              arr = numericKeys.sort().map((k) => data[k]);
            }
          }

          if (!Array.isArray(arr) && data?._id) arr = [data];

          setJobsRaw(Array.isArray(arr) ? arr.slice().reverse() : []);
          setLoading(false);
          found = true;
          break;
        } catch (err) {
          if (err?.response?.status === 404) continue;
          setError("Failed to fetch jobs. Try again later.");
          setLoading(false);
          return;
        }
      }

      if (!found) {
        setJobsRaw([]);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* ---------------- HELPERS ---------------- */
  const getCategoryName = (job) =>
    job?.categorySnapshot?.name ||
    job?.category ||
    job?.categoryName ||
    "Unspecified";

  const getJobPriceINR = (job) => {
    const sources = [
      job?.finalPrice,
      job?.jobPrice,
      job?.categorySnapshot?.fee,
      job?.price,
    ];

    for (let s of sources) {
      if (typeof s === "number" && s >= 0) return s;
      if (typeof s === "string" && !isNaN(Number(s))) return Number(s);
    }

    const cat = getCategoryName(job);
    return categoryPrices[cat] ?? categoryPrices.default;
  };

  const jobsArr = Array.isArray(jobsRaw) ? jobsRaw : [];

  /* ---------------- UI ---------------- */
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-white">
          Explore <span className="text-red-600">Opportunities</span>
        </h1>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center mt-32">
            <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="text-center text-red-400 text-lg">{error}</p>
        )}

        {/* Empty */}
        {!loading && !error && jobsArr.length === 0 && (
          <p className="text-center text-gray-400 text-lg">
            No jobs available right now.
          </p>
        )}

        {/* Jobs Grid */}
        {!loading && !error && jobsArr.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {jobsArr.map((job) => {
              const priceINR = getJobPriceINR(job);
              const categoryName = getCategoryName(job);

              return (
                <div
                  key={job._id || job.id}
                  className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-600"
                >
                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {job.company} • {job.location}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-red-600/10 text-red-500 px-3 py-1 rounded-full text-xs font-medium">
                      {categoryName}
                    </span>

                    {job.gender && (
                      <span className="bg-green-600/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                        {job.gender}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {job.description?.slice(0, 140) ||
                      "No description provided"}
                    ...
                  </p>

                  {/* Footer */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-500">
                        Application Fee
                      </p>
                      <p className="text-2xl font-extrabold text-white">
                        ₹{priceINR}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/payment", {
                          state: {
                            jobId: job._id,
                            title: job.title,
                            company: job.company,
                            priceINR,
                          },
                        })
                      }
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-lg shadow-red-600/20"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
