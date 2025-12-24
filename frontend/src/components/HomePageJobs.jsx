// src/components/HomePageJobs.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api";

export default function HomePageJobs() {
  const [jobsRaw, setJobsRaw] = useState(null); // raw response holder
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // track current user info (from token)
  const [userRole, setUserRole] = useState(null);

  // fallback category -> price map (only used when no price info present on job)
  const categoryPrices = {
    Marketing: 199,
    Design: 299,
    Development: 499,
    Management: 399,
    Internship: 49,
    default: 99,
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      const endpoints = ["/api/jobs", "/api/admin/jobs", "/admin/jobs"];
      let found = false;

      for (let p of endpoints) {
        try {
          const fullUrl = apiUrl(p);
          const res = await axios.get(fullUrl);
          // Normalize different shapes into an array
          const data = res?.data;
          let arr = [];

          if (Array.isArray(data)) arr = data;
          else if (Array.isArray(data?.jobs)) arr = data.jobs;
          else if (Array.isArray(data?.data?.jobs)) arr = data.data.jobs;
          else if (Array.isArray(data?.data)) arr = data.data;
          else if (Array.isArray(data?.results)) arr = data.results;
          else if (data && typeof data === "object" && Object.keys(data).length === 0) arr = [];
          else if (data && typeof data === "object") {
            // try to pick the most plausible array-valued prop
            const possible = ["jobs", "data", "results", "items"];
            for (let key of possible) {
              if (Array.isArray(data[key])) {
                arr = data[key];
                break;
              }
            }
          }
          // if still not array, but some object with keys that look like jobs, try coercion
          if (!Array.isArray(arr) && data && typeof data === "object") {
            // if object has numeric keys (0,1,..) convert to array
            const numericKeys = Object.keys(data).filter((k) => /^\d+$/.test(k));
            if (numericKeys.length > 0) {
              arr = numericKeys
                .sort((a, b) => Number(a) - Number(b))
                .map((k) => data[k]);
            }
          }

          // final fallback: if nothing found, but res.data has a single job object, wrap it
          if (!Array.isArray(arr) && data && (data._id || data.id)) arr = [data];

          // ensure it's an array (else set to empty)
          const finalArr = Array.isArray(arr) ? arr.slice().reverse() : [];

          setJobsRaw(finalArr);
          found = true;
          setLoading(false);
          break;
        } catch (err) {
          const status = err?.response?.status;
          if (status === 404) {
            // try next
            continue;
          }
          console.error("Fetch jobs error:", err);
          setError(err?.response?.data?.message || err.message || "Failed to fetch jobs");
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

  // decode jwt payload (client-side) and extract role — safe best-effort
  const decodeJwtPayload = (token) => {
    try {
      if (!token) return null;
      const parts = token.split(".");
      if (parts.length < 2) return null;
      const payload = parts[1];
      const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const json = decodeURIComponent(
        atob(b64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(json);
    } catch (err) {
      return null;
    }
  };

  // read token on mount and set role
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      const payload = decodeJwtPayload(token);
      const pUser = payload?.user || payload || {};
      const role = pUser?.role || payload?.role || null;
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, []);

  // Determine the display category name
  const getCategoryName = (job) =>
    job?.categorySnapshot?.name || job?.category || job?.categoryName || "Unspecified";

  // Determine the price (INR) for a job with robust fallbacks
  const getJobPriceINR = (job) => {
    const sources = [
      job?.finalPrice,
      job?.jobPrice,
      job?.categorySnapshot?.fee,
      job?.price,
    ];

    for (let s of sources) {
      if (typeof s === "number" && !Number.isNaN(s) && s >= 0) return s;
      if (typeof s === "string" && s.trim() !== "") {
        const n = Number(s);
        if (!Number.isNaN(n) && n >= 0) return n;
      }
    }

    const catName = getCategoryName(job);
    if (catName && typeof categoryPrices[catName] !== "undefined") return categoryPrices[catName];

    return categoryPrices["default"];
  };

  // Navigate to payment page with job id & price (frontend only, real order created on payment page)
  const handleApply = (job) => {
    // must be logged-in candidate
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      alert("Please login as a candidate to apply.");
      navigate("/login");
      return;
    }

    // check role from previously decoded value (best-effort)
    if (userRole !== "candidate") {
      const payload = decodeJwtPayload(token);
      const pUser = payload?.user || payload || {};
      const role = pUser?.role || payload?.role || null;
      if (role !== "candidate") {
        alert("Only logged-in candidates can apply. Please login with a candidate account.");
        navigate("/login");
        return;
      }
    }

    const priceINR = getJobPriceINR(job);
    navigate("/payment", {
      state: {
        jobId: job._id || job.id,
        title: job.title,
        company: job.company,
        priceINR,
      },
    });
  };

  // Safely derive an array for rendering
  const jobsArr = Array.isArray(jobsRaw) ? jobsRaw : [];
  const visibleJobs = jobsArr.slice(0, 6);

  return (
    <section className="py-10 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-6 text-red-600 text-center">Hiring For !!</h2>

        {loading ? (
          <p className="text-white text-center">Loading jobs…</p>
        ) : error ? (
          <p className="text-red-400 text-center">Error: {error}</p>
        ) : jobsArr.length === 0 ? (
          <p className="text-white text-center">No job postings yet.</p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleJobs.map((job) => {
                const categoryName = getCategoryName(job);
                const priceINR = getJobPriceINR(job);
                return (
                  <div
                    key={job._id || job.id || `${job.title}-${Math.random()}`}
                    className="p-5 bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>

                    <p className="text-gray-600 mt-1">
                      <span className="font-medium">{job.company}</span> — {job.location}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {categoryName && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {categoryName}
                        </span>
                      )}
                      {job.gender && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {job.gender}
                        </span>
                      )}
                    </div>

                    {job.openings && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2 inline-block">
                        {job.openings}
                      </span>
                    )}

                    {job.description && (
                      <p className="text-gray-700 mt-2">
                        {job.description.length > 120 ? job.description.substring(0, 120) + "..." : job.description}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-lg font-semibold text-gray-900">₹ {priceINR != null ? priceINR : "—"}</div>

                      <button
                        className="ml-4 bg-red-600 hover:bg-black text-white font-semibold py-2 px-3 rounded transition"
                        onClick={() => handleApply(job)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {jobsArr.length > 6 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => navigate("/job")}
                  className="bg-orange-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition text-lg"
                >
                  Show More Jobs →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

