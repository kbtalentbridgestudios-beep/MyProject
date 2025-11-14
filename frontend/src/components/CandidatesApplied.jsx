import { useState, useEffect } from "react";

export default function CandidatesApplied({ candidatesApplied }) {
  const [loading, setLoading] = useState(true);

  // Set loading to false after receiving data
  useEffect(() => {
    setLoading(false);
  }, [candidatesApplied]);

  if (loading) return <p className="text-gray-500 mt-4">Loading candidates...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Candidates Applied</h2>

      {candidatesApplied.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidatesApplied.map((c) => (
            <div
              key={c._id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 border-l-4 border-purple-500"
            >
              <h3 className="font-bold text-xl mb-2 text-gray-800">
                {c.user?.firstName} {c.user?.lastName}
              </h3>
              <p className="text-gray-700 mb-1">
                Applied For: {c.job?.title}
              </p>
              <p className="text-gray-500 text-sm">Email: {c.user?.email}</p>
              <p className="text-gray-500 text-sm">
                Category: {c.job?.category}
              </p>
              <p className="text-gray-500 text-sm">
                Company: {c.job?.companyName}
              </p>
              <p className="text-gray-500 text-sm">
                Location: {c.job?.location}
              </p>
              <p className="text-gray-500 text-sm">
                Status: {c.status || "Pending"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No candidates have applied yet.</p>
      )}
    </div>
  );
}
