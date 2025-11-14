// src/pages/admin/EmployersPage.jsx
export default function EmployersPage({ employers, deleteEmployer }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Employers</h2>

      {employers.length === 0 ? (
        <p className="text-gray-500">No employers found</p>
      ) : (
        <ul>
          {employers.map((e) => (
            <li
              key={e._id}
              className="flex justify-between mb-4 items-center border-b pb-3"
            >
              <div className="flex items-center gap-4">
                {/* Employer Logo */}
                {e.logo ? (
                  <img
                    src={`http://localhost:5000/uploads/${e.logo}`}
                    alt={`${e.companyName} Logo`}
                    className="w-14 h-14 rounded object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs">
                    No Logo
                  </div>
                )}

                {/* Employer Info */}
                <div>
                  <p className="font-semibold text-lg">{e.companyName}</p>
                  <p className="text-sm text-gray-600">
                    {e.mobile} | {e.gstNumber} | {e.email}
                  </p>

                  {/* Document (View via Google Docs if not PDF) */}
                  {e.document ? (
                    <a
                      href={`https://docs.google.com/gview?url=http://localhost:5000/uploads/${e.document}&embedded=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-sm"
                    >
                      View Document
                    </a>
                  ) : (
                    <span className="text-gray-500 text-sm">No Document</span>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteEmployer(e._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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
