export default function Candidates({ candidates, filterCategory, setFilterCategory }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Candidates</h2>
      <input
        type="text"
        placeholder="Filter by category"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="mb-6 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {candidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((c) => (
            <div
              key={c._id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 border-l-4 border-green-500"
            >
              <h3 className="font-bold text-xl mb-2 text-gray-800">
                {c.firstName} {c.lastName}
              </h3>
              <p className="text-gray-700 mb-1">Email: {c.email}</p>
              <p className="text-gray-700 mb-1">Mobile: {c.mobile}</p>
              <p className="text-gray-500 text-sm">Category: {c.category}</p>
              <p className="text-gray-500 text-sm">
                City: {c.city}, State: {c.state}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No candidates found.</p>
      )}
    </div>
  );
}
