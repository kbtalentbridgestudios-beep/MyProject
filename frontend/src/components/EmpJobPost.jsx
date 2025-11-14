export default function EmpJobPost({ jobData, setJobData, handleJobSubmit }) {
  const handleJobChange = (e) =>
    setJobData({ ...jobData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // extra validation: check if any field empty
    if (
      !jobData.company ||
      !jobData.title ||
      !jobData.description ||
      !jobData.location ||
      !jobData.category
    ) {
      alert("⚠️ Please fill in all required fields before submitting.");
      return;
    }

    handleJobSubmit(e);
  };

  return (
    <div className="max-w-lg mx-auto w-full px-4">
      <h2 className="text-3xl font-bold mb-6 text-black text-center">
        Post a Job
      </h2>
      <form
        onSubmit={onSubmit}
        className="space-y-4 bg-white p-8 rounded-2xl shadow-lg"
      >
        {/* Company Name */}
        <input
          type="text"
          name="company"
          value={jobData.company}
          onChange={handleJobChange}
          placeholder="Company Name"
          required
          className="w-full p-4 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-red-500 focus:border-red-500 
                     outline-none placeholder-gray-400 text-black
                     invalid:border-red-500"
        />

        {/* Job Title */}
        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={handleJobChange}
          placeholder="Job Title"
          required
          className="w-full p-4 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-red-500 focus:border-red-500 
                     outline-none placeholder-gray-400 text-black
                     invalid:border-red-500"
        />

        {/* Job Description */}
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleJobChange}
          placeholder="Job Description"
          required
          className="w-full p-4 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-red-500 focus:border-red-500 
                     outline-none placeholder-gray-400 text-black
                     invalid:border-red-500"
        />

        {/* Job Location */}
        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleJobChange}
          placeholder="Job Location"
          required
          className="w-full p-4 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-red-500 focus:border-red-500 
                     outline-none placeholder-gray-400 text-black
                     invalid:border-red-500"
        />

        {/* Category */}
        <select
          name="category"
          value={jobData.category}
          onChange={handleJobChange}
          required
          className="w-full p-4 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-red-500 focus:border-red-500 
                     outline-none text-black invalid:border-red-500"
        >
          <option value="">Select Category</option>
          <option value="acting">Acting</option>
          <option value="singing">Singing</option>
          <option value="dancing">Dancing</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-black 
                     text-white py-3 rounded-xl font-semibold 
                     shadow-md transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
