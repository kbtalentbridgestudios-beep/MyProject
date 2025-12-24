import { useState, useEffect } from "react";
import axios from "axios";
import EmployerProfile from "../components/EmployerProfile";
import EmpJobPost from "../components/EmpJobPost";
import JobsPosted from "../components/JobsPosted";
import Candidates from "../components/Candidates";
import CandidatesApplied from "../components/CandidatesApplied";
import EmpSettings from "../components/EmpSettings";

// ✅ SAME PATTERN AS ADMIN / CANDIDATE
const BASE_URL = import.meta.env.VITE_API_URL;

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [jobData, setJobData] = useState({
    company: "",
    title: "",
    description: "",
    location: "",
    category: "",
  });
  const [jobsPosted, setJobsPosted] = useState([]);
  const [candidatesApplied, setCandidatesApplied] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState(null);

  const token = localStorage.getItem("token");

  // ----------------------------
  // Fetch Profile and Candidates
  // ----------------------------
  useEffect(() => {
    const fetchProfileAndCandidates = async () => {
      if (!token) return;

      try {
        // Profile
        const profileRes = await axios.get(
          `${BASE_URL}/api/employer/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(profileRes.data);

        // Candidates
        const candidateRes = await axios.get(
          `${BASE_URL}/api/employer/candidates`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCandidates(candidateRes.data);
        setFilteredCandidates(candidateRes.data);

        // Jobs Posted
        await fetchJobsPosted();
      } catch (err) {
        console.error(
          "Error fetching profile/candidates:",
          err.response?.data || err.message
        );
      }
    };

    fetchProfileAndCandidates();
  }, [token]);

  // ----------------------------
  // Fetch Employer Jobs
  // ----------------------------
  const fetchJobsPosted = async () => {
    setLoadingJobs(true);
    setJobsError(null);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/jobs/my-jobs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobsPosted(res.data);

      // Fetch applicants for all jobs
      await fetchAllApplicants(res.data);
    } catch (err) {
      console.error(
        "Error fetching jobs:",
        err.response?.data || err.message
      );
      setJobsError("Failed to fetch jobs");
    } finally {
      setLoadingJobs(false);
    }
  };

  // ----------------------------
  // Fetch Applicants
  // ----------------------------
  const fetchApplicantsForJob = async (jobId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/applications/job/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      console.error(
        `Error fetching applicants for job ${jobId}:`,
        err.response?.data || err.message
      );
      return [];
    }
  };

  const fetchAllApplicants = async (jobs) => {
    const allApplicants = [];
    for (const job of jobs) {
      const applicants = await fetchApplicantsForJob(job._id);
      allApplicants.push(...applicants);
    }
    setCandidatesApplied(allApplicants);
  };

  // ----------------------------
  // Candidate filter by category
  // ----------------------------
  useEffect(() => {
    if (filterCategory.trim()) {
      setFilteredCandidates(
        candidates.filter((c) =>
          c.category?.toLowerCase().includes(filterCategory.toLowerCase())
        )
      );
    } else {
      setFilteredCandidates(candidates);
    }
  }, [filterCategory, candidates]);

  // ----------------------------
  // Handle Job Submit
  // ----------------------------
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/api/jobs/post`,
        jobData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobData({
        company: "",
        title: "",
        description: "",
        location: "",
        category: "",
      });
      await fetchJobsPosted();
      alert("Job posted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error posting job");
    }
  };

  // ----------------------------
  // Handle Job Delete
  // ----------------------------
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(
        `${BASE_URL}/api/jobs/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchJobsPosted();
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  // ----------------------------
  // Handle Job Edit
  // ----------------------------
  const handleEditJob = async (jobId, updatedData) => {
    try {
      await axios.put(
        `${BASE_URL}/api/jobs/${jobId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchJobsPosted();
    } catch (err) {
      console.error(err);
      alert("Failed to update job");
    }
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
          Employer Dashboard
        </h2>
        <ul className="flex-1 space-y-3">
          {[
            "profile",
            "postJob",
            "jobsPosted",
            "candidates",
            "candidatesApplied",
            "settings",
          ].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-gray-800"
                }`}
              >
                {tab === "profile" && "My Profile"}
                {tab === "postJob" && "Post a Job"}
                {tab === "jobsPosted" && "Jobs Posted"}
                {tab === "candidates" && "Candidates"}
                {tab === "candidatesApplied" && "Candidates Applied"}
                {tab === "settings" && "Settings"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {activeTab === "profile" && profile && (
          <EmployerProfile profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "postJob" && (
          <EmpJobPost
            jobData={jobData}
            setJobData={setJobData}
            handleJobSubmit={handleJobSubmit}
          />
        )}

        {activeTab === "jobsPosted" && (
          <JobsPosted
            jobsPosted={jobsPosted}
            onDelete={handleDeleteJob}
            onEdit={handleEditJob}
            loading={loadingJobs}
            error={jobsError}
          />
        )}

        {activeTab === "candidates" && (
          <Candidates
            candidates={filteredCandidates}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        )}

        {activeTab === "candidatesApplied" && (
          <CandidatesApplied candidatesApplied={candidatesApplied} />
        )}

        {activeTab === "settings" && <EmpSettings />}
      </div>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import axios from "axios";
// import EmployerProfile from "../components/EmployerProfile";
// import EmpJobPost from "../components/EmpJobPost";
// import JobsPosted from "../components/JobsPosted";
// import Candidates from "../components/Candidates";
// import CandidatesApplied from "../components/CandidatesApplied";
// import EmpSettings from "../components/EmpSettings";

// export default function EmployerDashboard() {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [profile, setProfile] = useState(null);
//   const [candidates, setCandidates] = useState([]);
//   const [filteredCandidates, setFilteredCandidates] = useState([]);
//   const [filterCategory, setFilterCategory] = useState("");
//   const [jobData, setJobData] = useState({
//     company: "",
//     title: "",
//     description: "",
//     location: "",
//     category: "",
//   });
//   const [jobsPosted, setJobsPosted] = useState([]);
//   const [candidatesApplied, setCandidatesApplied] = useState([]);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [jobsError, setJobsError] = useState(null);

//   const token = localStorage.getItem("token");

//   // ----------------------------
//   // Fetch Profile and Candidates
//   // ----------------------------
//   useEffect(() => {
//     const fetchProfileAndCandidates = async () => {
//       if (!token) return;

//       try {
//         // Profile
//         const profileRes = await axios.get(
//           "https://my-backend-knk9.onrender.com/api/employer/profile",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setProfile(profileRes.data);

//         // Candidates
//         const candidateRes = await axios.get(
//           "https://my-backend-knk9.onrender.com/api/employer/candidates",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setCandidates(candidateRes.data);
//         setFilteredCandidates(candidateRes.data);

//         // Jobs Posted (will also trigger fetching candidatesApplied)
//         await fetchJobsPosted();
//       } catch (err) {
//         console.error("Error fetching profile/candidates:", err.response?.data || err.message);
//       }
//     };

//     fetchProfileAndCandidates();
//   }, [token]);

//   // ----------------------------
//   // Fetch Employer Jobs
//   // ----------------------------
//   const fetchJobsPosted = async () => {
//     setLoadingJobs(true);
//     setJobsError(null);
//     try {
//       const res = await axios.get(
//         "https://my-backend-knk9.onrender.com/api/jobs/my-jobs",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setJobsPosted(res.data);

//       // After fetching jobs, fetch applicants for all jobs
//       await fetchAllApplicants(res.data);
//     } catch (err) {
//       console.error("Error fetching jobs:", err.response?.data || err.message);
//       setJobsError("Failed to fetch jobs");
//     } finally {
//       setLoadingJobs(false);
//     }
//   };

//   // ----------------------------
//   // Fetch All Applicants for Employer Jobs
//   // ----------------------------
//   const fetchApplicantsForJob = async (jobId) => {
//     try {
//       const res = await axios.get(
//         `https://my-backend-knk9.onrender.com/api/applications/job/${jobId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       return res.data; // array of applicants for this job
//     } catch (err) {
//       console.error(`Error fetching applicants for job ${jobId}:`, err.response?.data || err.message);
//       return [];
//     }
//   };

//   const fetchAllApplicants = async (jobs) => {
//     const allApplicants = [];
//     for (const job of jobs) {
//       const applicants = await fetchApplicantsForJob(job._id);
//       allApplicants.push(...applicants);
//     }
//     setCandidatesApplied(allApplicants);
//   };

//   // ----------------------------
//   // Candidate filter by category
//   // ----------------------------
//   useEffect(() => {
//     if (filterCategory.trim()) {
//       setFilteredCandidates(
//         candidates.filter((c) =>
//           c.category?.toLowerCase().includes(filterCategory.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredCandidates(candidates);
//     }
//   }, [filterCategory, candidates]);

//   // ----------------------------
//   // Handle Job Submit
//   // ----------------------------
//   const handleJobSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "https://my-backend-knk9.onrender.com/api/jobs/post",
//         jobData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setJobData({ company: "", title: "", description: "", location: "", category: "" });
//       await fetchJobsPosted();
//       alert("Job posted successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Error posting job");
//     }
//   };

//   // ----------------------------
//   // Handle Job Delete
//   // ----------------------------
//   const handleDeleteJob = async (jobId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this job?");
//     if (!confirmDelete) return;
//     try {
//       await axios.delete(
//         `https://my-backend-knk9.onrender.com/api/jobs/${jobId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       await fetchJobsPosted();
//     } catch (err) {
//       console.error(err);
//       alert(" Failed to delete job");
//     }
//   };

//   // ----------------------------
//   // Handle Job Edit
//   // ----------------------------
//   const handleEditJob = async (jobId, updatedData) => {
//     try {
//       await axios.put(
//         `https://my-backend-knk9.onrender.com/api/jobs/${jobId}`,
//         updatedData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       await fetchJobsPosted();
//     } catch (err) {
//       console.error(err);
//       alert(" Failed to update job");
//     }
//   };

//   // ----------------------------
//   // Render
//   // ----------------------------
//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 text-white p-6 space-y-6 flex flex-col">
//         <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
//           Employer Dashboard
//         </h2>
//         <ul className="flex-1 space-y-3">
//           {["profile", "postJob", "jobsPosted", "candidates", "candidatesApplied", "settings"].map((tab) => (
//             <li key={tab}>
//               <button
//                 onClick={() => setActiveTab(tab)}
//                 className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
//                   activeTab === tab ? "bg-blue-600 shadow-lg" : "hover:bg-gray-800"
//                 }`}
//               >
//                 {tab === "profile" && "My Profile"}
//                 {tab === "postJob" && "Post a Job"}
//                 {tab === "jobsPosted" && "Jobs Posted"}
//                 {tab === "candidates" && "Candidates"}
//                 {tab === "candidatesApplied" && "Candidates Applied"}
//                 {tab === "settings" && "Settings"}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-10">
//         {activeTab === "profile" && profile && (
//           <EmployerProfile profile={profile} setProfile={setProfile} />
//         )}

//         {activeTab === "postJob" && (
//           <EmpJobPost jobData={jobData} setJobData={setJobData} handleJobSubmit={handleJobSubmit} />
//         )}

//         {activeTab === "jobsPosted" && (
//           <JobsPosted
//             jobsPosted={jobsPosted}
//             onDelete={handleDeleteJob}
//             onEdit={handleEditJob}
//             loading={loadingJobs}
//             error={jobsError}
//           />
//         )}

//         {activeTab === "candidates" && (
//           <Candidates
//             candidates={filteredCandidates}
//             filterCategory={filterCategory}
//             setFilterCategory={setFilterCategory}
//           />
//         )}

//         {activeTab === "candidatesApplied" && (
//           <CandidatesApplied candidatesApplied={candidatesApplied} />
//         )}

//         {activeTab === "settings" && <EmpSettings />}
//       </div>
//     </div>
//   );
// }
