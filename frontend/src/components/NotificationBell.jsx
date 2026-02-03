import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export default function NotificationBell() {
  const { notifications } = useContext(SocketContext);

  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative cursor-pointer">
      <span className="text-2xl">🔔</span>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  );
}
