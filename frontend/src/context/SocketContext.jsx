import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  // 1. Update the URL to your Render Backend
  const [socket] = useState(() => 
    io("https://community-help-portal.onrender.com", {
      transports: ["websocket", "polling"],
      withCredentials: true
    })
  );

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Log connection for debugging
    socket.on("connect", () => {
      console.log("✅ Socket connected to Render:", socket.id);
    });

    socket.on("newNotification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("newNotification");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};