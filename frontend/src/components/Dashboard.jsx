import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import { SocketContext } from "../context/SocketContext";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState(null);
  const [user, setUser] = useState({ name: "User", profilePic: "" });
  const { notifications } = useContext(SocketContext); // get live notifications
  const simpleLogout = () => {
  localStorage.clear();      
  window.location.href = "/login";
};
  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchDashboard();
  }, []);

  // Fetch User Profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.log("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen text-yellow-400">
        Loading dashboard...
      </div>
    );

  const helpRequestsData = {
    labels: data.chartData.labels,
    datasets: [
      { label: "Requests per Week", data: data.chartData.weeks, backgroundColor: "rgba(255, 204, 0, 0.7)", borderRadius: 6 },
    ],
  };

  const volunteerData = {
    labels: data.chartData.labels,
    datasets: [
      {
        label: "Active Volunteers",
        data: data.chartData.weeks.map((n) => Math.floor(n / 2) + 1),
        borderColor: "rgba(255, 204, 0, 0.9)",
        backgroundColor: "rgba(255, 204, 0, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const resourceData = {
    labels: data.chartData.resources.labels,
    datasets: [
      {
        label: "Resources",
        data: data.chartData.resources.data,
        backgroundColor: ["rgba(255, 204, 0, 0.7)", "rgba(255, 230, 100, 0.7)", "rgba(255, 255, 150, 0.7)", "rgba(255, 220, 80, 0.7)"],
      },
    ],
  };


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`flex flex-col h-full p-3 transition-all duration-300 ${isOpen ? "w-60" : "w-16"} bg-gradient-to-b from-black/80 to-yellow-200/30 backdrop-blur-md border border-yellow-200/30 text-yellow-400`}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {isOpen && <h2 className="text-lg font-bold">Dashboard</h2>}

            {/* Notification Bell */}
            {isOpen && <NotificationBell />}

            <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                <rect width="352" height="32" x="80" y="96"></rect>
                <rect width="352" height="32" x="80" y="240"></rect>
                <rect width="352" height="32" x="80" y="384"></rect>
              </svg>
            </button>
          </div>

          {/* Sidebar Menu */}
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {[
                { label: "Home", icon: "🏠", path: "/dashboard" },
                { label: "Help Requests", icon: "📝", path: "/helprequest" },
                { label: "My Requests", icon: "📋", path: "/my-requests" },
                { label: "All Requests", icon: "📋", path: "/all-requests" },
                { label: "Profile Settings", icon: "⚙️", path: "/profile" },
                { label: "Logout", icon: "🚪", path: "/" },
              ].map((item) => (
                <li key={item.label} className="rounded-sm">
                  {item.label === "Logout" ? (
  <button
    onClick={simpleLogout}
    className="w-full flex items-center p-2 space-x-3 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300"
  >
    <span className="text-lg">{item.icon}</span>
    {isOpen && <span>Logout</span>}
  </button>
) : (
  <Link
    to={item.path}
    className="flex items-center p-2 space-x-3 rounded-md hover:bg-yellow-400 hover:text-black transition-all duration-300"
  >
    <span className="text-lg">{item.icon}</span>
    {isOpen && <span className="text-yellow-200">{item.label}</span>}
  </Link>
)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center p-2 mt-40 space-x-4 justify-self-end">
          <img src={user.profilePic || "https://www.freepik.com/free-photos-vectors/avatar-profile"} alt="profile" className="w-12 h-12 rounded-lg border-2 border-yellow-400" />
          {isOpen && (
            <div>
              <h2 className="text-lg font-semibold text-black">{user.name || "User"}</h2>
              <Link to="/profile" className="text-xs hover:underline text-yellow-300">View profile</Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
     <main className="flex-1 p-6 bg-gradient-to-b from-black to-yellow-100 text-yellow-400 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome back, {user.name || "User"} 👋</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          {[
            { label: "Total Requests", value: data.totalRequests },
            // { label: "Active", value: data.activeRequests },
            // { label: "Completed", value: data.completedRequests },
            { label: "Recent", value: data.recentRequests.length },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white/10 backdrop-blur-md border border-yellow-200/40 p-4 rounded-lg shadow-lg transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
            >
              <h2 className="text-lg font-semibold">{card.label}</h2>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Charts */}
          <div className="space-y-6">
            <div className="bg-white/10 p-4 rounded-lg border border-yellow-200/40 shadow-md">
              <h2 className="text-lg font-semibold mb-4">Requests Overview</h2>
              <Bar data={helpRequestsData} />
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-yellow-200/40 shadow-md">
              <h2 className="text-lg font-semibold mb-4">Volunteer Activity</h2>
              <Line data={volunteerData} />
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-yellow-200/40 shadow-md">
              <h2 className="text-lg font-semibold mb-4">Resources Breakdown</h2>
              <Pie data={resourceData} />
            </div>
          </div>

          {/* Recent Requests Table */}
          <div className="bg-white/10 p-4 rounded-lg border border-yellow-200/40 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Recent Help Requests</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-2 border-b border-yellow-300">Title</th>
                  <th className="pb-2 border-b border-yellow-300">Location</th>
                  <th className="pb-2 border-b border-yellow-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentRequests.length > 0 ? (
                  data.recentRequests.map((req, i) => (
                    <tr
                      key={i}
                      className="hover:bg-yellow-400 hover:text-black transition-all duration-300"
                    >
                      <td className="py-2">{req.title}</td>
                      <td className="py-2">{req.location}</td>
                      <td className="py-2">{req.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-3 text-yellow-200">
                      No recent requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
