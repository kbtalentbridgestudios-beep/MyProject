// // ⬆️ your imports remain same
// import { useEffect, useState } from "react";
// import {
//   LayoutDashboard,
//   Users,
//   BadgeCheck,
//   Building2,
//   Image as ImageIcon,
//   FileWarning,
// } from "lucide-react";

// import CandidatesPage from "../pages/admin/CandidatesPage";
// import EmployersPage from "../pages/admin/EmployersPage";
// import AdminGallery from "../pages/admin/AdminGallery";
// import Query from "../pages/admin/Query";
// import AdminJobPost from "../pages/admin/AdminJobPost";
// import CandidatesApplied from "../components/CandidatesApplied";

// export default function AdminDashboard() {
//   const [candidates, setCandidates] = useState([]);
//   const [employers, setEmployers] = useState([]);
//   const [appliedCandidates, setAppliedCandidates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("dashboard");

//   const token = localStorage.getItem("token");

//   // ---- FETCH DATA (NO CHANGE) ----
//   useEffect(() => {
//     if (!token) return;

//     const fetchData = async () => {
//       try {
//         const resCandidates = await fetch(
//           "https://my-backend-knk9.onrender.com/api/admin/candidates",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setCandidates(await resCandidates.json());

//         const resEmployers = await fetch(
//           "https://my-backend-knk9.onrender.com/api/admin/employers",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setEmployers(await resEmployers.json());

//         const resApplied = await fetch(
//           "https://my-backend-knk9.onrender.com/api/admin/payments",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const appliedData = await resApplied.json();
//         setAppliedCandidates(appliedData.data || []);

//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   // ---- DELETE FUNCTIONS (NO CHANGE) ----

//   const deleteCandidate = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this candidate?"))
//       return;

//     try {
//       await fetch(
//         `https://my-backend-knk9.onrender.com/api/admin/candidate/${id}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCandidates(candidates.filter((c) => c._id !== id));
//     } catch {
//       alert("Failed to delete candidate");
//     }
//   };

//   const deleteEmployer = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this employer?"))
//       return;

//     try {
//       await fetch(
//         `https://my-backend-knk9.onrender.com/api/admin/employer/${id}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setEmployers(employers.filter((e) => e._id !== id));
//     } catch {
//       alert("Failed to delete employer");
//     }
//   };

//   if (loading) return <div className="p-6 text-center text-white">Loading...</div>;

//   // -------------------------------------
//   // ⭐ MODERN SIDEBAR ITEMS
//   // -------------------------------------
//   const menu = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { id: "candidates", label: "Candidates", icon: Users },
//     { id: "candidateapplied", label: "Paid Candidates", icon: BadgeCheck },
//     { id: "employers", label: "Employers", icon: Building2 },
//     { id: "gallery", label: "Admin Gallery", icon: ImageIcon },
//     { id: "contacts", label: "Queries", icon: FileWarning },
//     { id: "adminjob", label: "Job Posts", icon: BadgeCheck },
//   ];

//   // -------------------------------------
//   // ⭐ RETURN UI (MODERN DASHBOARD)
//   // -------------------------------------

//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* ---- MODERN SIDEBAR ---- */}
//       <aside className="w-64 bg-[#1f1f1f] text-white p-6 shadow-xl">
//         <h1 className="text-xl font-bold mb-8">KBTalentBridge Admin</h1>

//         <nav className="space-y-4">
//           {menu.map(({ id, label, icon: Icon }) => (
//             <div
//               key={id}
//               onClick={() => setActiveTab(id)}
//               className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
//                 ${
//                   activeTab === id
//                     ? "bg-red-600 text-white"
//                     : "text-gray-300 hover:bg-gray-800"
//                 }`}
//             >
//               <Icon size={20} />
//               <span>{label}</span>
//             </div>
//           ))}
//         </nav>
//       </aside>

//       {/* ---- MAIN CONTENT ---- */}
//       <div className="flex-1 p-6 space-y-8">

//         {/* TOP HEADING */}
//         <h1 className="text-3xl font-bold">SYSTEM OVERVIEW</h1>

//         {/* ---- RED STATS CARDS ---- */}
//         <div className="grid grid-cols-4 gap-4">
//           <StatCard title="Total Candidates" value={candidates.length} />
//           <StatCard red title="Paid Candidates" value={appliedCandidates.length} />
//           <StatCard title="Employers" value={employers.length} />
//           <StatCard title="Pending Requests" value="12" />
//         </div>

//         {/* ---- TWO COLUMN LAYOUT ---- */}
//         <div className="grid grid-cols-3 gap-6">

//           {/* LEFT MAIN BOX */}
//           <div className="col-span-2 bg-white p-5 rounded-xl shadow-md">
//             {activeTab === "candidates" && (
//               <CandidatesPage
//                 candidates={candidates}
//                 deleteCandidate={deleteCandidate}
//               />
//             )}

//             {activeTab === "candidateapplied" && (
//               <CandidatesApplied
//                 candidatesApplied={appliedCandidates}
//               />
//             )}

//             {activeTab === "employers" && (
//               <EmployersPage
//                 employers={employers}
//                 deleteEmployer={deleteEmployer}
//               />
//             )}

//             {activeTab === "gallery" && <AdminGallery />}
//             {activeTab === "contacts" && <Query />}
//             {activeTab === "adminjob" && <AdminJobPost />}
//           </div>

//           {/* RIGHT ACTIVITY FEED */}
//           <div className="bg-white p-5 rounded-xl shadow-md h-[400px] overflow-y-auto">
//             <h2 className="text-lg font-semibold mb-4">Recent Activity Feed</h2>
//             <p className="text-gray-600">Activity logs will appear here...</p>
//           </div>
//         </div>

//         {/* ---- CONTENT MODERATION PANEL ---- */}
//         <ModerationPanel />
//       </div>
//     </div>
//   );
// }

// // -------------------------------------
// // ⭐ STATS CARD COMPONENT
// // -------------------------------------
// function StatCard({ title, value, red }) {
//   return (
//     <div
//       className={`p-5 rounded-xl shadow-md ${
//         red ? "bg-red-600 text-white" : "bg-white"
//       }`}
//     >
//       <p className="text-sm opacity-80">{title}</p>
//       <h2 className="text-3xl font-bold mt-2">{value}</h2>
//     </div>
//   );
// }

// // -------------------------------------
// // ⭐ MODERN MODERATION PANEL
// // -------------------------------------
// function ModerationPanel() {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-md">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Content Moderation</h2>

//         <div className="flex gap-3">
//           <button className="px-4 py-1 rounded-lg bg-red-600 text-white">All</button>
//           <button className="px-4 py-1 rounded-lg bg-gray-200">Images</button>
//           <button className="px-4 py-1 rounded-lg bg-gray-200">Videos</button>
//           <button className="px-4 py-1 rounded-lg bg-gray-200">PDFs</button>
//           <button className="px-4 py-1 rounded-lg bg-gray-200">Approved</button>
//         </div>
//       </div>

//       <div className="grid grid-cols-4 gap-4">
//         <div className="bg-gray-100 rounded-xl h-28"></div>
//         <div className="bg-gray-100 rounded-xl h-28"></div>
//         <div className="bg-gray-100 rounded-xl h-28"></div>
//         <div className="bg-gray-100 rounded-xl h-28"></div>
//       </div>
//     </div>
//   );
// }

// ⬆️ your imports remain same
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  BadgeCheck,
  Building2,
  Image as ImageIcon,
  FileWarning,
} from "lucide-react";

import CandidatesPage from "../pages/admin/CandidatesPage";
import EmployersPage from "../pages/admin/EmployersPage";
import AdminGallery from "../pages/admin/AdminGallery";
import Query from "../pages/admin/Query";
import AdminJobPost from "../pages/admin/AdminJobPost";
import CandidatesApplied from "../components/CandidatesApplied";

// ✅ BASE URL FROM .env (ONE SOURCE OF TRUTH)
const BASE_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [appliedCandidates, setAppliedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const token = localStorage.getItem("token");

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const resCandidates = await fetch(
          `${BASE_URL}/api/admin/candidates`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCandidates(await resCandidates.json());

        const resEmployers = await fetch(
          `${BASE_URL}/api/admin/employers`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployers(await resEmployers.json());

        const resApplied = await fetch(
          `${BASE_URL}/api/admin/payments`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const appliedData = await resApplied.json();
        setAppliedCandidates(appliedData.data || []);

        setLoading(false);
      } catch (err) {
        console.error("Admin dashboard fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // ---------------- DELETE FUNCTIONS ----------------

  const deleteCandidate = async (id) => {
    if (!window.confirm("Are you sure you want to delete this candidate?"))
      return;

    try {
      await fetch(`${BASE_URL}/api/admin/candidate/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCandidates((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Failed to delete candidate");
    }
  };

  const deleteEmployer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employer?"))
      return;

    try {
      await fetch(`${BASE_URL}/api/admin/employer/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployers((prev) => prev.filter((e) => e._id !== id));
    } catch {
      alert("Failed to delete employer");
    }
  };

  if (loading)
    return <div className="p-6 text-center text-white">Loading...</div>;

  // ---------------- SIDEBAR MENU ----------------
  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "candidates", label: "Candidates", icon: Users },
    { id: "candidateapplied", label: "Paid Candidates", icon: BadgeCheck },
    { id: "employers", label: "Employers", icon: Building2 },
    { id: "gallery", label: "Admin Gallery", icon: ImageIcon },
    { id: "contacts", label: "Queries", icon: FileWarning },
    { id: "adminjob", label: "Job Posts", icon: BadgeCheck },
  ];

  // ---------------- UI ----------------
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1f1f1f] text-white p-6 shadow-xl">
        <h1 className="text-xl font-bold mb-8">KBTalentBridge Admin</h1>

        <nav className="space-y-4">
          {menu.map(({ id, label, icon: Icon }) => (
            <div
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                activeTab === id
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 space-y-8">
        <h1 className="text-3xl font-bold">SYSTEM OVERVIEW</h1>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard title="Total Candidates" value={candidates.length} />
          <StatCard red title="Paid Candidates" value={appliedCandidates.length} />
          <StatCard title="Employers" value={employers.length} />
          <StatCard title="Pending Requests" value="12" />
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-5 rounded-xl shadow-md">
            {activeTab === "candidates" && (
              <CandidatesPage
                candidates={candidates}
                deleteCandidate={deleteCandidate}
              />
            )}

            {activeTab === "candidateapplied" && (
              <CandidatesApplied candidatesApplied={appliedCandidates} />
            )}

            {activeTab === "employers" && (
              <EmployersPage
                employers={employers}
                deleteEmployer={deleteEmployer}
              />
            )}

            {activeTab === "gallery" && <AdminGallery />}
            {activeTab === "contacts" && <Query />}
            {activeTab === "adminjob" && <AdminJobPost />}
          </div>

          {/* ACTIVITY FEED */}
          <div className="bg-white p-5 rounded-xl shadow-md h-[400px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Recent Activity Feed</h2>
            <p className="text-gray-600">Activity logs will appear here...</p>
          </div>
        </div>

        <ModerationPanel />
      </div>
    </div>
  );
}

// ---------------- STATS CARD ----------------
function StatCard({ title, value, red }) {
  return (
    <div
      className={`p-5 rounded-xl shadow-md ${
        red ? "bg-red-600 text-white" : "bg-white"
      }`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

// ---------------- MODERATION PANEL ----------------
function ModerationPanel() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Content Moderation</h2>

        <div className="flex gap-3">
          <button className="px-4 py-1 rounded-lg bg-red-600 text-white">
            All
          </button>
          <button className="px-4 py-1 rounded-lg bg-gray-200">Images</button>
          <button className="px-4 py-1 rounded-lg bg-gray-200">Videos</button>
          <button className="px-4 py-1 rounded-lg bg-gray-200">PDFs</button>
          <button className="px-4 py-1 rounded-lg bg-gray-200">Approved</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-100 rounded-xl h-28"></div>
        <div className="bg-gray-100 rounded-xl h-28"></div>
        <div className="bg-gray-100 rounded-xl h-28"></div>
        <div className="bg-gray-100 rounded-xl h-28"></div>
      </div>
    </div>
  );
}
