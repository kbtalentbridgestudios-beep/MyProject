import { useEffect, useState } from "react";

export default function Query() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token"); // Admin JWT token
      if (!token) {
        setError("Admin token not found.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://my-backend-knk9.onrender.com/api/contact", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setContacts(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch contact messages:", err);
        setError("Failed to fetch contact messages.");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
      {contacts.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="border rounded-lg p-4 bg-gray-800 text-white"
            >
              <p>
                <span className="font-semibold">Name:</span> {c.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {c.email}
              </p>
              <p>
                <span className="font-semibold">Message:</span> {c.message}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
