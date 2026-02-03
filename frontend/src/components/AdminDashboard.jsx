import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("❌ No token found");
          return;
        }

        const res = await fetch(
          "http://localhost:5000/api/requests/admin/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Unauthorized or failed request");
        }

        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("❌ Failed to fetch admin requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case "High":
        return "bg-yellow-500/30 text-yellow-300 border-yellow-500/50";
      case "Medium":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/40";
      case "Low":
        return "bg-yellow-700/20 text-yellow-500 border-yellow-700/40";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500/30 text-green-300 border-green-500/50";
      case "Open":
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
      
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 animate-gradient">
            Admin Dashboard
          </h1>
          <p className="text-yellow-400/70 text-lg">
            All Community Help Requests
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Requests" value={requests.length} />
          <StatCard
            title="Open Requests"
            value={requests.filter((r) => r.status === "Open").length}
          />
          <StatCard
            title="High Urgency"
            value={requests.filter((r) => r.urgency === "High").length}
          />
        </div>

        
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/5 to-transparent backdrop-blur-xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-500/20">
                  {[
                    "Title",
                    "User",
                    "Category",
                    "Location",
                    "Urgency",
                    "Status",
                    "Created At",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left p-5 text-yellow-400 font-semibold text-sm uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {!loading && requests.length > 0 ? (
                  requests.map((r, idx) => (
                    <tr
                      key={r._id}
                      className="border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-all duration-300"
                      style={{ animationDelay: `${idx * 40}ms` }}
                    >
                      <td className="p-5 text-yellow-100 font-medium">
                        {r.title}
                      </td>
                      <td className="p-5 text-yellow-200/80">
                        {r.user?.name || "N/A"}
                      </td>
                      <td className="p-5">
                        <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-medium border border-yellow-500/40">
                          {r.category}
                        </span>
                      </td>
                      <td className="p-5 text-yellow-200/80">
                        {r.location}
                      </td>
                      <td className="p-5">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyStyles(
                            r.urgency
                          )}`}
                        >
                          {r.urgency}
                        </span>
                      </td>
                      <td className="p-5">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
                            r.status
                          )}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="p-5 text-yellow-200/60 text-sm">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-16 text-yellow-400/50 text-lg"
                    >
                      {loading ? "Loading requests..." : "No requests found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent backdrop-blur-xl border border-yellow-500/30 p-6 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
    <p className="text-yellow-400/70 text-sm mb-2">{title}</p>
    <p className="text-4xl font-bold text-yellow-400">{value}</p>
  </div>
);
