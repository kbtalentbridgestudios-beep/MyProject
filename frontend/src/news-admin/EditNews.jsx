import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    category: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOld = async () => {
      try {
        const url = apiUrl(`/news/${id}`); // direct fetch route
        console.log("Fetching for edit:", url);

        const res = await axios.get(url);
        console.log("Edit fetch:", res.data);

        setForm({
          title: res.data.title || "",
          content: res.data.content || "",
          image: res.data.image || "",
          category: res.data.category || ""
        });

      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load old news data.");
      }

      setLoading(false);
    };

    fetchOld();
  }, [id]);

  const update = async (e) => {
    e.preventDefault();

    try {
      const url = apiUrl(`/news/update/${id}`);
      console.log("Updating:", url);

      await axios.put(url, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("newsAdminToken")}` }
      });

      navigate("/news-admin/dashboard");
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update news.");
    }
  };

  if (loading)
    return <div className="p-6 text-white">Loading news...</div>;

  if (error)
    return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Edit News</h1>

      <form className="space-y-4" onSubmit={update}>
        <input
          type="text"
          className="w-full p-3 rounded bg-gray-800"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="text"
          className="w-full p-3 rounded bg-gray-800"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          type="text"
          className="w-full p-3 rounded bg-gray-800"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <textarea
          className="w-full p-3 rounded bg-gray-800 h-40"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button className="bg-blue-500 px-4 py-2 rounded">
          Update News
        </button>
      </form>
    </div>
  );
}
