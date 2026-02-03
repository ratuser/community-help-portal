import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket] = useState(() => io("http://localhost:5000"));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("newNotification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};
