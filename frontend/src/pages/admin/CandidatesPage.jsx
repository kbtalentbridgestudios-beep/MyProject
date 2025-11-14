export default function CandidatesPage({ candidates, deleteCandidate }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Candidates</h2>

      {candidates.length === 0 ? (
        <p className="text-gray-500">No candidates found</p>
      ) : (
        <ul>
          {candidates.map((c) => (
            <li
              key={c.id}
              className="flex flex-col md:flex-row justify-between mb-6 items-start md:items-center border-b pb-4"
            >
              {/* Left: Photo + Info */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Candidate Profile Photo */}
                {c.photo ? (
                  <img
                    src={c.photo} // Cloudinary URL
                    alt={`${c.firstName} ${c.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">
                    No Photo
                  </div>
                )}

                {/* Candidate Info */}
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">
                    {c.firstName} {c.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {c.mobile} | {c.city} | {c.state} | {c.category}
                  </p>
                  <p className="text-sm text-gray-600">{c.email}</p>

                  {/* Resume Link */}
                  {c.resume ? (
                    <a
                      href={c.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-sm"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-500 text-sm">No Resume</span>
                  )}

                  {/* Audio Link */}
                  {c.audio && (
                    <a
                      href={c.audio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-sm"
                    >
                      View Audio
                    </a>
                  )}

                  {/* Video Link */}
                  {c.video && (
                    <a
                      href={c.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-sm"
                    >
                      View Video
                    </a>
                  )}

                  {/* Other Uploads */}
                  {c.uploads && c.uploads.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1">
                      {c.uploads.map((file, index) => (
                        <a
                          key={index}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline text-sm"
                        >
                          {file.type || "File"}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Delete Button */}
              <button
                onClick={() => deleteCandidate(c.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition mt-4 md:mt-0"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

