// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function CandidatesApplied({ jobId }) {
//   const [candidatesApplied, setCandidatesApplied] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchPaidCandidates() {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `/api/paid/candidates?jobId=${jobId}`
//         );
//         setCandidatesApplied(res.data);
//       } catch (err) {
//         console.error("Failed to fetch paid candidates", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (jobId) fetchPaidCandidates();
//   }, [jobId]);

//   if (loading)
//     return (
//       <p className="text-gray-600 mt-4 text-lg font-medium">
//         Loading paid candidates...
//       </p>
//     );

//   if (!candidatesApplied || candidatesApplied.length === 0)
//     return (
//       <p className="text-gray-600 text-lg">
//         No paid candidates yet.
//       </p>
//     );

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">
//         Paid Candidates
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {candidatesApplied.map((c) => (
//           <div
//             key={c._id}
//             className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200"
//           >
//             {/* Header */}
//             <h3 className="text-xl font-bold text-gray-900">
//               {c.user?.firstName} {c.user?.lastName}
//             </h3>
//             <p className="text-gray-600 text-sm mb-3">
//               {c.user?.email}
//             </p>

//             {/* Order details */}
//             <div className="mb-3">
//               <p className="text-gray-700 font-semibold">
//                 Order ID:{" "}
//                 <span className="text-purple-600 font-bold">
//                   {c.orderId}
//                 </span>
//               </p>
//               <p className="text-gray-700 font-semibold">
//                 Amount:{" "}
//                 <span className="text-green-600 font-bold">
//                   ₹{c.amount}
//                 </span>
//               </p>
//             </div>

//             {/* Job details */}
//             <div className="mt-2">
//               <p className="text-gray-600 text-sm">
//                 Category: {c.job?.category || "N/A"}
//               </p>
//               <p className="text-gray-600 text-sm">
//                 Location: {c.job?.location || "N/A"}
//               </p>
//             </div>

//             {/* Status */}
//             <div className="mt-4">
//               <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
//                 {c.status}
//               </span>
//             </div>

//             {/* Date */}
//             <p className="text-gray-500 mt-3 text-sm">
//               Paid On:{" "}
//               {new Date(c.createdAt).toLocaleDateString("en-IN", {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//               })}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";

export default function CandidatesApplied() {
  const [candidatesApplied, setCandidatesApplied] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchPaidCandidates() {
    try {
      setLoading(true);
      const res = await axios.get("/api/paid/candidates");
      console.log("API response:", res.data);

      setCandidatesApplied(
        Array.isArray(res.data) ? res.data : []
      );
    } catch (err) {
      console.error("Failed to fetch paid candidates", err);
      setCandidatesApplied([]);
    } finally {
      setLoading(false);
    }
  }

  fetchPaidCandidates();
}, []);

  if (loading)
    return (
      <p className="text-gray-600 mt-4 text-lg font-medium">
        Loading paid candidates...
      </p>
    );

  if (candidatesApplied.length === 0)
    return (
      <p className="text-gray-600 text-lg">
        No paid candidates yet.
      </p>
    );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Paid Candidates
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidatesApplied.map((c) => (
          <div
            key={c._id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900">
              {c.user?.firstName} {c.user?.lastName}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              {c.user?.email}
            </p>

            <div className="mb-3">
              <p className="text-gray-700 font-semibold">
                Order ID:{" "}
                <span className="text-purple-600 font-bold">
                  {c.orderId}
                </span>
              </p>
              <p className="text-gray-700 font-semibold">
                Amount:{" "}
                <span className="text-green-600 font-bold">
                  ₹{c.amount}
                </span>
              </p>
            </div>

            <div className="mt-2">
              <p className="text-gray-600 text-sm">
                Category: {c.job?.category || "N/A"}
              </p>
              <p className="text-gray-600 text-sm">
                Location: {c.job?.location || "N/A"}
              </p>
            </div>

            <div className="mt-4">
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
                {c.status}
              </span>
            </div>

            <p className="text-gray-500 mt-3 text-sm">
              Paid On:{" "}
              {new Date(c.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
