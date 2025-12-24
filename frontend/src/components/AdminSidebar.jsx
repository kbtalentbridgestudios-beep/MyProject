// src/components/AdminSidebar.jsx
import { FaUserTie, FaUsers, FaBriefcase, FaChartBar, FaCog, FaAppStore, FaEnvelope, FaUserCheck } from "react-icons/fa";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { key: "candidates", label: "Candidates", icon: <FaUsers /> },
    {key: "appliedcandidates", label: "AppliedCandidates", icon: <FaUserCheck/>},
    { key: "employers", label: "Employers", icon: <FaUserTie /> },
    { key: "jobs", label: "Jobs", icon: <FaBriefcase /> },
    {key : "adminjob", label : "MyJob", icon: <FaBriefcase />},
    { key: "gallery", label: "Admin-Gallery", icon: <FaAppStore /> },
    { key: "contacts", label: "Contact Messages", icon: <FaEnvelope /> }, // New tab
    { key: "reports", label: "Reports", icon: <FaChartBar /> },
    { key: "settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex items-center gap-2 p-2 mb-2 rounded cursor-pointer transition ${
              activeTab === item.key ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}







// // src/components/AdminSidebar.jsx
// import { FaUserTie, FaUsers, FaBriefcase, FaChartBar, FaCog, FaAppStore } from "react-icons/fa";
// import Gallery from "../pages/Gallery";

// export default function AdminSidebar({ activeTab, setActiveTab }) {
//   const menuItems = [
//     { key: "candidates", label: "Candidates", icon: <FaUsers /> },
//     { key: "employers", label: "Employers", icon: <FaUserTie /> },
//     { key: "jobs", label: "Jobs", icon: <FaBriefcase /> },
//     {key: "gallery", label: "Admin-Gallery", icon:<FaAppStore/>},
//     { key: "reports", label: "Reports", icon: <FaChartBar /> },
//     { key: "settings", label: "Settings", icon: <FaCog /> },
//   ];

//   return (
//     <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
//       <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
//       <ul>
//         {menuItems.map((item) => (
//           <li
//             key={item.key}
//             onClick={() => setActiveTab(item.key)}
//             className={`flex items-center gap-2 p-2 mb-2 rounded cursor-pointer transition ${
//               activeTab === item.key ? "bg-gray-700" : "hover:bg-gray-800"
//             }`}
//           >
//             {item.icon}
//             {item.label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
