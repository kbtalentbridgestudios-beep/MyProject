// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { Link } from "react-router-dom";

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

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl("/news"));
      setAllNews(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
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
      setMsg("Upload image or video first.");
      return;
    }

    try {
      const res = await axios.post(apiUrl("/news/create"), form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllNews((prev) => [res.data, ...prev]);

      setForm({
        title: "",
        content: "",
        mediaUrl: "",
        mediaType: "",
        category: "",
      });

      setShowCreate(false);
      setMsg("News posted ✓");
    } catch (err) {
      console.log("Create error:", err);
      setMsg("Failed to post.");
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
    <div className="bg-neutral-900 border border-red-600/20 p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-sm text-red-300 mb-2">
        {(item.createdAt || "").split("T")[0]}
        {item.category && ` • ${item.category}`}
      </p>

      <p className="mb-3 text-gray-300">{item.content}</p>

      {item.mediaType === "image" && (
        <img src={item.mediaUrl} className="w-full rounded mb-2" />
      )}

      {item.mediaType === "video" && (
        <video src={item.mediaUrl} controls className="w-full rounded mb-2" />
      )}

      <div className="flex gap-2">
        <Link
          to={`/news-admin/edit/${item._id}`}
          className="px-3 py-1 bg-red-600 rounded"
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
    <div className="min-h-screen flex bg-black text-white">

      <main className="flex-1 p-6">
        <div className="flex justify-between mb-6">
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

      {showCreate && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-neutral-900 border border-red-600/40 rounded-xl p-6">

            <h3 className="text-xl font-bold text-red-600 mb-4">Create News</h3>

            <form className="space-y-3" onSubmit={createNews}>
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 rounded bg-neutral-800 border border-red-600/20"
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
                    console.log("UPLOAD ERROR:", err);
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
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-3 rounded bg-neutral-800 border border-red-600/20"
              />

              <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full p-3 rounded bg-neutral-800 border border-red-600/20 h-40"
              />

              <button className="w-full bg-red-600 rounded py-2">
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
