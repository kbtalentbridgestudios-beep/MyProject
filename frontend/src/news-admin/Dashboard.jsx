// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { Link, useLocation } from "react-router-dom";

export default function Dashboard() {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    mediaUrl: "",
    mediaType: "",
    category: "",
  });

  const token = localStorage.getItem("newsAdminToken");
  const location = useLocation();

  // Fetch all news
  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl("/news"), {
        headers: { "Cache-Control": "no-cache" },
      });
      setAllNews(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
      setAllNews([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const createNews = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      setMsg("Title & Content required.");
      return;
    }
    if (!form.mediaUrl) {
      setMsg("Upload image or video.");
      return;
    }

    try {
      const res = await axios.post(apiUrl("/news/create"), form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllNews((prev) => [res.data, ...prev]);
      setShowCreate(false);
      setForm({
        title: "",
        content: "",
        mediaUrl: "",
        mediaType: "",
        category: "",
      });
      setMsg("News posted ✓");
    } catch (err) {
      console.log("Create error:", err);
      setMsg("Failed to post news.");
    }
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Delete this?")) return;

    try {
      await axios.delete(apiUrl(`/news/delete/${id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllNews((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const Card = ({ item }) => (
    <div className="bg-neutral-900 p-4 rounded-xl shadow-md border border-red-600/20">
      <h3 className="text-lg font-semibold">{item.title}</h3>

      <p className="text-sm text-red-300 mb-2">
        {(item.createdAt || "").split("T")[0]} {item.category && `• ${item.category}`}
      </p>

      <p className="text-gray-300 mb-3">{item.content}</p>

      {item.mediaType === "image" && (
        <img src={item.mediaUrl} className="w-full rounded mb-2" />
      )}

      {item.mediaType === "video" && (
        <video src={item.mediaUrl} controls className="w-full rounded mb-2" />
      )}

      <div className="flex gap-2">
        <Link
          to={`/news-admin/edit/${item._id}`}
          className="px-3 py-1 bg-red-600 rounded text-white"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteNews(item._id)}
          className="px-3 py-1 bg-white/10 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 border-r border-red-600/20 hidden md:block">
        <div className="p-6">
          <h2 className="text-4xl font-bold text-red-600">
            <span className="text-orange-400">KBTS</span> News
          </h2>

          <nav className="mt-6 space-y-3">
            <button className="w-full px-3 py-2 bg-red-600 rounded">News Posted</button>
            <button
              className="w-full px-3 py-2 hover:bg-red-700/20 rounded"
              onClick={() => setShowCreate(true)}
            >
              + Create News
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">News Posted</h1>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-red-600 rounded"
          >
            + Create News
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {allNews.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="w-full max-w-2xl bg-neutral-900 rounded-xl p-6 border border-red-600/40">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-red-600">Create News</h3>
              <button onClick={() => setShowCreate(false)}>Close</button>
            </div>

            <form className="space-y-3" onSubmit={createNews}>
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 rounded bg-neutral-800 border border-red-600/30"
              />

              <input
                type="file"
                accept="image/*,video/*"
                className="w-full p-3 rounded bg-neutral-800 border border-red-600/20"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setMsg("Uploading...");

                  const data = new FormData();
                  data.append("file", file);

                  const isVideo = file.type.startsWith("video/");
                  const fileType = isVideo ? "video" : "photo";

                  try {
                    const upload = await axios.post(
                      apiUrl(`/api/v1/upload/Newsadmin/${fileType}`),
                      data,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );

                    const url = upload?.data?.cloudinary?.secure_url;

                    setForm((prev) => ({
                      ...prev,
                      mediaUrl: url,
                      mediaType: isVideo ? "video" : "image",
                    }));

                    setMsg(isVideo ? "Video uploaded ✓" : "Image uploaded ✓");
                  } catch (err) {
                    setMsg("Upload failed.");
                  }
                }}
              />

              {form.mediaUrl && form.mediaType === "image" && (
                <img src={form.mediaUrl} className="h-40 rounded" />
              )}

              {form.mediaUrl && form.mediaType === "video" && (
                <video src={form.mediaUrl} controls className="h-40 rounded" />
              )}

              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full p-3 rounded bg-neutral-800 border border-red-600/30"
              />

              <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full p-3 h-40 rounded bg-neutral-800 border border-red-600/30"
              />

              <button className="px-4 py-2 bg-red-600 rounded w-full">
                Post News
              </button>

              {msg && <p className="text-sm mt-2">{msg}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
