// CandidateDashboard.jsx — FINAL CLEAN VERSION (ENV based like AdminDashboard)
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Home,
  Upload,
  Image as ImageIcon,
  FileText,
  Settings,
  LogOut,
  User,
} from "lucide-react";

import CandidateProfile from "../components/CandidateProfile";
import CandidateGallery from "../components/CandidateGallery";

// ✅ SAME STYLE AS ADMIN DASHBOARD
const BASE_URL = import.meta.env.VITE_API_URL;

export default function CandidateDashboard() {
  const [candidate, setCandidate] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const [uploads, setUploads] = useState([]);

  /* ---------------- FETCH PROFILE ---------------- */
  const fetchProfile = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${BASE_URL}/api/candidate/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCandidate(data);
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const profilePicUrl = candidate?.photoUrl || candidate?.profilePic;

  /* ---------------- DOCUMENT OPEN ---------------- */
  const openDocument = async (item) => {
    try {
      const ext = item.originalName?.split(".").pop().toLowerCase() || "pdf";

      const mime =
        ext === "pdf"
          ? "application/pdf"
          : ext === "docx"
          ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          : ext === "doc"
          ? "application/msword"
          : ext === "pptx"
          ? "application/vnd.openxmlformats-officedocument.presentationml.presentation"
          : ext === "xlsx"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/octet-stream";

      const response = await fetch(item.url);
      const data = await response.arrayBuffer();

      const blob = new Blob([data], { type: mime });
      window.open(URL.createObjectURL(blob), "_blank");
    } catch (err) {
      console.error("Failed to open document:", err);
      alert("Unable to open document.");
    }
  };

  /* ---------------- UPLOAD HANDLER ---------------- */
  const onFilesSelected = (fileList) => {
    const selected = Array.from(fileList).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      file,
      progress: 0,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setUploads((prev) => [...prev, ...selected]);
    selected.forEach(uploadFile);
  };

  const uploadFile = (item) => {
    const form = new FormData();
    form.append("file", item.file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE_URL}/api/v1/upload/Candidate/photoPost`);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        setUploads((prev) =>
          prev.map((u) =>
            u.id === item.id ? { ...u, progress: pct } : u
          )
        );
      }
    };

    xhr.onload = async () => {
      setUploads((prev) =>
        prev.map((u) =>
          u.id === item.id ? { ...u, progress: 100 } : u
        )
      );
      await fetchProfile();
    };

    xhr.send(form);
  };

  const images = candidate?.gallery?.filter((g) => g.type === "photo") || [];
  const videos = candidate?.gallery?.filter((g) => g.type === "video") || [];
  const documents =
    candidate?.gallery?.filter((g) => g.type === "document") || [];

  return (
    <div className="flex bg-[#0f0f0f] text-white min-h-screen">
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="bg-[#131313] border-r border-gray-800 w-64 p-6 min-h-screen">
        <div className="flex items-center gap-3 mb-8">
          <img
            src={profilePicUrl || "https://via.placeholder.com/100"}
            className="w-12 h-12 rounded-full border border-gray-600 object-cover"
          />
          <div>
            <p className="font-bold">
              {candidate?.firstName} {candidate?.lastName}
            </p>
            <p className="text-xs text-gray-400">Candidate</p>
          </div>
        </div>

        <nav className="space-y-2 text-gray-300">
          <SideBtn label="Dashboard" Icon={Home} tab="dashboard" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SideBtn label="My Profile" Icon={User} tab="profile" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SideBtn label="My Gallery" Icon={ImageIcon} tab="gallery" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SideBtn label="Documents" Icon={FileText} tab="documents" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SideBtn label="Settings" Icon={Settings} tab="settings" activeTab={activeTab} setActiveTab={setActiveTab} />

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-800 mt-6 text-red-400"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* ---------------- MAIN ---------------- */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {activeTab === "dashboard" && (
          <DashboardSection
            uploads={uploads}
            fileInputRef={fileInputRef}
            images={images}
            videos={videos}
            documents={documents}
            candidate={candidate}
            openDocument={openDocument}
          />
        )}

        {activeTab === "profile" && (
          <div className="mt-6 max-w-3xl mx-auto">
            <CandidateProfile candidate={candidate} setCandidate={setCandidate} />
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="mt-6">
            <CandidateGallery
              candidate={candidate}
              setCandidate={setCandidate}
              BASE_URL={BASE_URL}
              token={token}
            />
          </div>
        )}

        {activeTab === "documents" && (
          <DocumentsSection documents={documents} openDocument={openDocument} />
        )}

        {activeTab === "settings" && (
          <div className="mt-6 max-w-3xl mx-auto">
            <CandidateProfile candidate={candidate} setCandidate={setCandidate} />
          </div>
        )}
      </main>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => onFilesSelected(e.target.files)}
      />
    </div>
  );
}


/* ---------------- COMPONENTS ---------------- */

function SideBtn({ label, Icon, tab, activeTab, setActiveTab }) {
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition 
      ${activeTab === tab ? "bg-rose-600 text-white" : "hover:bg-gray-800"}`}
    >
      <Icon size={18} /> {label}
    </button>
  );
}

function DashboardSection({
  uploads,
  fileInputRef,
  images,
  videos,
  documents,
  candidate,
  openDocument,
}) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard title="Total Uploads" value={candidate?.gallery?.length || 0} />
        <KpiCard title="Images" value={images.length} />
        <KpiCard title="Videos" value={videos.length} />
        <KpiCard title="Documents" value={documents.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UploadBox fileInputRef={fileInputRef} />
        <PendingUploads uploads={uploads} />
      </div>

      <PreviewGallery title="Image Gallery" items={images} type="image" />
      <PreviewGallery title="Video Gallery" items={videos} type="video" />
      <DocumentList items={documents} openDocument={openDocument} />
    </>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded border border-gray-800 shadow">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function UploadBox({ fileInputRef }) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded border border-gray-800 shadow">
      <h3 className="font-semibold mb-3">Upload Files</h3>
      <div
        onClick={() => fileInputRef.current.click()}
        className="border-2 border-dashed border-gray-700 p-6 rounded text-center cursor-pointer text-gray-400"
      >
        Tap to upload
      </div>
    </div>
  );
}

function PendingUploads({ uploads }) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded border-gray-800 shadow">
      <h3 className="font-semibold mb-3">Pending Uploads</h3>

      {uploads.length === 0 && (
        <p className="text-gray-500">No pending uploads</p>
      )}

      {uploads.map((u) => (
        <div key={u.id} className="mb-3">
          <p className="text-sm">{u.file.name}</p>
          <div className="bg-gray-700 h-2 rounded mt-1">
            <div
              className="h-2 bg-rose-600 rounded"
              style={{ width: `${u.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewGallery({ title, items, type }) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded border-gray-800 shadow mt-6">
      <h3 className="font-semibold mb-3">{title}</h3>

      {items.length === 0 && (
        <p className="text-gray-500">No {type}s uploaded</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.slice(0, 8).map((item, i) =>
          type === "image" ? (
            <img key={i} src={item.url} className="w-full h-28 object-cover rounded" />
          ) : (
            <video key={i} src={item.url} className="w-full h-28 object-cover rounded" />
          )
        )}
      </div>
    </div>
  );
}

function DocumentList({ items, openDocument }) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded border-gray-800 shadow mt-6">
      <h3 className="font-semibold mb-3">Documents</h3>

      {items.length === 0 && <p>No documents found</p>}

      {items.map((doc, i) => (
        <div key={i} className="flex justify-between items-center mb-2 text-gray-300">
          <span>{doc.originalName}</span>
          <button
            onClick={() => openDocument(doc)}
            className="text-rose-500 text-xs"
          >
            Open
          </button>
        </div>
      ))}
    </div>
  );
}

function DocumentsSection({ documents, openDocument }) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded border-gray-800 shadow mt-6">
      <h3 className="font-semibold mb-3">All Documents</h3>

      {documents.length === 0 && <p>No documents found.</p>}

      {documents.map((doc, i) => (
        <div key={i} className="flex justify-between items-center mb-2 text-gray-300">
          <span>{doc.originalName}</span>
          <button
            className="text-rose-500 text-xs"
            onClick={() => openDocument(doc)}
          >
            Open
          </button>
        </div>
      ))}
    </div>
  );
}
