import { useState, useEffect } from "react";
import CandidateGalleryView from "../../components/CandidateGalleryView"; 

export default function CandidatesPage({ candidates = [], deleteCandidate }) {
  const [selected, setSelected] = useState(null); 
 useEffect(() => {
  if (selected) {
    console.log(" SELECTED FULL DATA =>", selected);
    console.log(" GALLERY =>", selected.gallery);
    console.log(" UPLOADS =>", selected.uploads);
  }
}, [selected]);


  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

function openModal(candidate) {
  console.log(" ROW CLICKED → CANDIDATE =", candidate);
  setSelected(candidate);
  setIsOpen(true);
}


  function closeModal() {
    setIsOpen(false);
    setSelected(null);
  }

  return (
    <div className="bg-white p-4 shadow rounded overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Candidates</h2>

      {candidates.length === 0 ? (
        <p className="text-gray-500">No candidates found</p>
      ) : (
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-3 border-b text-left w-12">#</th>
              <th className="py-2 px-3 border-b text-left">Name</th>
              <th className="py-2 px-3 border-b text-left">Phone</th>
              <th className="py-2 px-3 border-b text-left">Email</th>
              <th className="py-2 px-3 border-b text-left">Location</th>
              <th className="py-2 px-3 border-b text-left">Category</th>
              <th className="py-2 px-3 border-b text-left">Uploads</th>
              <th className="py-2 px-3 border-b text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((c, idx) => (
              <tr
                key={c.id || c._id || idx}
                className="border-b hover:bg-gray-50 transition cursor-pointer"
                onClick={() => openModal(c)}
              >
                <td className="py-3 px-3">{idx + 1}</td>

                <td className="py-3 px-3 font-semibold">
                  {c.firstName} {c.lastName}
                </td>

                <td className="py-3 px-3">
                  <a
                    href={`tel:${c.mobile}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-600 underline text-xs"
                  >
                    {c.mobile || "—"}
                  </a>
                </td>

                <td className="py-3 px-3">
                  {c.email ? (
                    <a
                      href={`mailto:${c.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600 underline text-xs"
                    >
                      {c.email}
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                <td className="py-3 px-3">
                  {c.city || "—"}, {c.state || "—"}
                </td>

                <td className="py-3 px-3 text-gray-700">{c.category || "—"}</td>

                <td className="py-3 px-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs">{c.resume ? "Resume" : "-"}</span>
                    <span className="text-xs">{c.audio ? "Audio" : "-"}</span>
                    <span className="text-xs">{c.video ? "Video" : "-"}</span>
                    <span className="text-xs">
                      {c.uploads && c.uploads.length
                        ? `${c.uploads.length} file(s)`
                        : "-"}
                    </span>
                  </div>
                </td>

                <td className="py-3 px-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCandidate(c.id || c._id || idx);
                    }}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {isOpen && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {selected.firstName} {selected.lastName}
                </h3>
                <p className="text-sm text-gray-600">
                  {selected.mobile || "—"} • {selected.email || "—"}
                </p>
              </div>

             <button
        onClick={closeModal}
        className="text-gray-500 hover:text-gray-800 text-xl font-bold">
           ✕
      </button>


            </div>

            {/*  Candidate Gallery Access Added */}
          <CandidateGalleryView uploads={selected.gallery || selected.uploads || []} />


            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
