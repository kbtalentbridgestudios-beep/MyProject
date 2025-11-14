import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import CandidatesPage from "../pages/admin/CandidatesPage";
import EmployersPage from "../pages/admin/EmployersPage";
import AdminGallery from "../pages/admin/AdminGallery";
import Query from "../pages/admin/Query"; // Import Query component
import AdminJobPost from "../pages/admin/AdminJobPost";

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("candidates");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch candidates
        const resCandidates = await fetch(
          "https://my-backend-knk9.onrender.com/api/admin/candidates",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const candidatesData = await resCandidates.json();
        setCandidates(candidatesData);

        // Fetch employers
        const resEmployers = await fetch(
          "https://my-backend-knk9.onrender.com/api/admin/employers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const employersData = await resEmployers.json();
        setEmployers(employersData);

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Delete candidate
  const deleteCandidate = async (id) => {
    if (!window.confirm("Are you sure you want to delete this candidate?"))
      return;

    try {
      await fetch(`https://my-backend-knk9.onrender.com/api/admin/candidate/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates(candidates.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete candidate");
    }
  };

  // Delete employer
  const deleteEmployer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employer?"))
      return;

    try {
      await fetch(`https://my-backend-knk9.onrender.com/api/admin/employer/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployers(employers.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete employer");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-white">Loading dashboard...</div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Candidates Tab */}
        {activeTab === "candidates" && (
          <CandidatesPage
            candidates={candidates.map((c) => ({
              ...c,
              photo: c.photo ? `/uploads/${c.photo}` : null,
              resume: c.resume ? `/uploads/${c.resume}` : null,
            }))}
            deleteCandidate={deleteCandidate}
          />
        )}

        {/* Employers Tab */}
        {activeTab === "employers" && (
          <EmployersPage
            employers={employers.map((e) => ({
              ...e,
              logo: e.logo ? `/uploads/${e.logo}` : null,
              document: e.document ? `/uploads/${e.document}` : null,
            }))}
            deleteEmployer={deleteEmployer}
          />
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && <AdminGallery />}

        {/* Contact Messages Tab */}
        {activeTab === "contacts" && <Query />}
        {activeTab === "adminjob" && <AdminJobPost/>}

        {/* Other Tabs */}
        {activeTab === "jobs" && <p>Jobs management coming soon...</p>}
        {activeTab === "reports" && <p>Reports and analytics coming soon...</p>}
        {activeTab === "settings" && <p>Settings page coming soon...</p>}
      </div>
    </div>
  );
}






// import { useEffect, useState } from "react";
// import AdminSidebar from "../components/AdminSidebar";
// import CandidatesPage from "../pages/admin/CandidatesPage";
// import EmployersPage from "../pages/admin/EmployersPage";
// import AdminGallery from "../pages/admin/AdminGallery"; // Import AdminGallery

// export default function AdminDashboard() {
//   const [candidates, setCandidates] = useState([]);
//   const [employers, setEmployers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("candidates");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return;

//     const fetchData = async () => {
//       try {
//         // Fetch candidates
//         const resCandidates = await fetch(
//           "https://my-backend-knk9.onrender.com/api/admin/candidates",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const candidatesData = await resCandidates.json();
//         setCandidates(candidatesData);

//         // Fetch employers
//         const resEmployers = await fetch(
//           "https://my-backend-knk9.onrender.com/api/admin/employers",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const employersData = await resEmployers.json();
//         setEmployers(employersData);

//         setLoading(false);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   // Delete candidate
//   const deleteCandidate = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this candidate?"))
//       return;

//     try {
//       await fetch(`https://my-backend-knk9.onrender.com/api/admin/candidate/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCandidates(candidates.filter((c) => c._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete candidate");
//     }
//   };

//   // Delete employer
//   const deleteEmployer = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this employer?"))
//       return;

//     try {
//       await fetch(`https://my-backend-knk9.onrender.com/api/admin/employer/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEmployers(employers.filter((e) => e._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete employer");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-white">Loading dashboard...</div>
//     );
//   }

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//         {/* Candidates Tab */}
//         {activeTab === "candidates" && (
//           <CandidatesPage
//             candidates={candidates.map((c) => ({
//               ...c,
//               photo: c.photo ? `/uploads/${c.photo}` : null,
//               resume: c.resume ? `/uploads/${c.resume}` : null,
//             }))}
//             deleteCandidate={deleteCandidate}
//           />
//         )}

//         {/* Employers Tab */}
//         {activeTab === "employers" && (
//           <EmployersPage
//             employers={employers.map((e) => ({
//               ...e,
//               logo: e.logo ? `/uploads/${e.logo}` : null,
//               document: e.document ? `/uploads/${e.document}` : null,
//             }))}
//             deleteEmployer={deleteEmployer}
//           />
//         )}

//         {/* Gallery Tab */}
//         {activeTab === "gallery" && <AdminGallery />}

//         {/* Other Tabs */}
//         {activeTab === "jobs" && <p>Jobs management coming soon...</p>}
//         {activeTab === "reports" && <p>Reports and analytics coming soon...</p>}
//         {activeTab === "settings" && <p>Settings page coming soon...</p>}
//       </div>
//     </div>
//   );
// }









// // src/pages/AdminDashboard.jsx
// import { useEffect, useState } from "react";
// import AdminSidebar from "../components/AdminSidebar";
// import CandidatesPage from "../pages/admin/CandidatesPage";
// import EmployersPage from "../pages/admin/EmployersPage";

// export default function AdminDashboard() {
//   const [candidates, setCandidates] = useState([]);
//   const [employers, setEmployers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("candidates");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return;

//     const fetchData = async () => {
//       try {
//         // Fetch candidates
//         const resCandidates = await fetch(
//           "https://my-backend-knk9.onrender.com/api/admin/candidates",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const candidatesData = await resCandidates.json();
//         setCandidates(candidatesData);

//         // Fetch employers
//         const resEmployers = await fetch(
//           "https://my-backend-knk9.onrender.com/api/admin/employers",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const employersData = await resEmployers.json();
//         setEmployers(employersData);

//         setLoading(false);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   // Delete candidate
//   const deleteCandidate = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this candidate?"))
//       return;

//     try {
//       await fetch(`https://my-backend-knk9.onrender.com/api/admin/candidate/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCandidates(candidates.filter((c) => c._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete candidate");
//     }
//   };

//   // Delete employer
//   const deleteEmployer = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this employer?"))
//       return;

//     try {
//       await fetch(`https://my-backend-knk9.onrender.com/api/admin/employer/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEmployers(employers.filter((e) => e._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete employer");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-white">Loading dashboard...</div>
//     );
//   }

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//         {/* Candidates Tab */}
//         {activeTab === "candidates" && (
//           <CandidatesPage
//             candidates={candidates.map((c) => ({
//               ...c,
//               photo: c.photo ? `/uploads/${c.photo}` : null,
//               resume: c.resume ? `/uploads/${c.resume}` : null,
//             }))}
//             deleteCandidate={deleteCandidate}
//           />
//         )}

//         {/* Employers Tab */}
//         {activeTab === "employers" && (
//           <EmployersPage
//             employers={employers.map((e) => ({
//               ...e,
//               logo: e.logo ? `/uploads/${e.logo}` : null,
//               document: e.document ? `/uploads/${e.document}` : null,
//             }))}
//             deleteEmployer={deleteEmployer}
//           />
//         )}

//         {/* Other Tabs */}
//         {activeTab === "jobs" && <p>Jobs management coming soon...</p>}
//         {activeTab === "reports" && <p>Reports and analytics coming soon...</p>}
//         {activeTab === "settings" && <p>Settings page coming soon...</p>}
//       </div>
//     </div>
//   );
// }
