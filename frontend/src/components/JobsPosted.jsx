import { useState } from "react";

export default function JobsPosted({ jobsPosted = [], onDelete, onEdit, loading = false, error = null }) {
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", location: "", category: "" });

  const startEdit = (job) => {
    setEditingJob(job._id);
    setFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      category: job.category,
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (onEdit && editingJob) {
      onEdit(editingJob, formData);
      setEditingJob(null);
    }
  };

  const handleCancel = () => {
    setEditingJob(null);
  };

  // ----- Render -----
  if (loading) return <p className="text-gray-500">Loading jobs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Jobs Posted</h2>

      {jobsPosted.length === 0 ? (
        <p className="text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobsPosted.map((job) => (
            <div
              key={job._id}
              className="bg-black p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 border-l-4 border-blue-500"
            >
              {editingJob === job._id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition">Save</button>
                    <button onClick={handleCancel} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-600 transition">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{job.title}</h3>
                  <p className="text-gray-700 mb-1">{job.description}</p>
                  <p className="text-gray-500 text-sm">Location: {job.location}</p>
                  <p className="text-gray-500 text-sm">Category: {job.category}</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => onDelete(job._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-black transition">Delete</button>
                    <button onClick={() => startEdit(job)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-black transition">Edit</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
