import { Routes, Route, Navigate } from "react-router-dom";
import { StarsBackground } from "./components/StarBackground";
import { SocketProvider } from "./context/SocketContext";

import Landing from "./components/Landing";
import About from "./components/About";
import FaqBot from "./components/FaqBot";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import HelpRequestForm from "./components/HelpRequestForm";
import MyRequests from "./components/MyRequests";
import AllRequests from "./components/AllRequests";
import ChatPage from "./components/ChatPage";
import ProfileSettings from "./components/ProfileSettings";
import AdminDashboard from "./components/AdminDashboard";
import EditRequest from "./components/EditRequest";
import Contact from "./components/Contact";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<StarsBackground starColor="#fff" speed={50}><Landing /></StarsBackground>} />
        <Route path="/about" element={<StarsBackground starColor="#fff" speed={50}><About /></StarsBackground>} />
        {/* <Route path="/faq" element={<StarsBackground starColor="#fff" speed={50}><FaqBot /></StarsBackground>} /> */}
        <Route path="/dashboard" element={ <Dashboard />} />
        <Route path="/faq" element={ <FaqBot />} />
        <Route path="/login" element={<StarsBackground starColor="#fff" speed={50}><Login /></StarsBackground>} />
        <Route path="/register" element={<StarsBackground starColor="#fff" speed={50}><Register /></StarsBackground>} />
        {/* Functional pages */}
        <Route path="/helprequest" element={<HelpRequestForm />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/all-requests" element={<AllRequests />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/edit-request/:id" element={<EditRequest />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
      </Routes>
    </SocketProvider>
  );
}

export default App;
