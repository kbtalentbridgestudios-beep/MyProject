import { useState, useEffect } from "react";
import CandidateProfile from "../components/CandidateProfile";

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [candidate, setCandidate] = useState(null);
  const [applications, setApplications] = useState([]);

  const BASE_URL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://my-backend-knk9.onrender.com"; // hosted backend

  // Fetch Candidate Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${BASE_URL}/api/candidate/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setCandidate(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [BASE_URL]);

  // Fetch Candidate Applications
  useEffect(() => {
    if (activeTab !== "applications") return;

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          `${BASE_URL}/api/applications/my-applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchApplications();
  }, [activeTab, BASE_URL]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Candidate Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "profile" ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              My Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("applications")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "applications"
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              My Applications
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === "settings" ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              Settings
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "profile" &&
          (candidate ? (
            <CandidateProfile
              candidate={candidate}
              setCandidate={setCandidate}
            />
          ) : (
            <p>Loading profile...</p>
          ))}

        {activeTab === "applications" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Applications</h2>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white p-4 rounded shadow-md border-l-4 border-blue-500"
                  >
                    <h3 className="text-lg font-semibold">
                      {app.jobId?.title || "Job Title Not Found"}
                    </h3>
                    <p className="text-gray-600">
                      Status:{" "}
                      <span className="font-medium text-green-600">
                        {app.status || "Pending"}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Applied on:{" "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                You haven't applied to any jobs yet.
              </p>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="mt-2 text-gray-600">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
