import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
 <div
  className={`flex flex-col h-full p-3 text-yellow-400 transition-all duration-300 
    ${isOpen ? "w-60" : "w-16"} bg-gradient-to-b from-black to-yellow-200`}
>
  
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      {isOpen && <h2 className="text-lg font-bold text-yellow-400">Dashboard</h2>}
      <button
        className="p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-5 h-5 fill-current text-yellow-400"
        >
          <rect width="352" height="32" x="80" y="96"></rect>
          <rect width="352" height="32" x="80" y="240"></rect>
          <rect width="352" height="32" x="80" y="384"></rect>
        </svg>
      </button>
    </div>

    
    {isOpen && (
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center py-4">
          <button
            type="submit"
            className="p-2 focus:outline-none focus:ring"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 512 512"
              className="w-5 h-5 text-yellow-400"
            >
              <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195Z"></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          placeholder="Search..."
          className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none bg-transparent text-yellow-400 placeholder-yellow-300"
        />
      </div>
    )}

    
    <div className="flex-1">
      <ul className="pt-2 pb-4 space-y-1 text-sm">
        {[
          { label: "Help Requests", icon: "📝" },
          { label: "Resource Sharing", icon: "📦" },
          { label: "All Request", icon: "📦" },
          { label: "Community Chat", icon: "💬" },
          { label: "Notifications", icon: "🔔" },
          { label: "Profile Settings", icon: "⚙️" },
        ].map((item) => (
          <li key={item.label} className="rounded-sm">
            <a
              href="#"
              className="flex items-center p-2 space-x-3 rounded-md hover:bg-yellow-600 hover:text-black transition-colors"
            >
              <span className="text-lg text-yellow-400">{item.icon}</span>
              {isOpen && <span className="text-yellow-200 text-xl font-semibold">{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>

  
  <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
    <img
      src="https://source.unsplash.com/100x100/?portrait"
      alt="profile"
      className="w-12 h-12 rounded-lg border-2 border-yellow-400"
    />
    {isOpen && (
      <div>
        <h2 className="text-lg font-semibold text-black">Leroy Jenkins</h2>
        <a
          href="#"
          className="text-xs hover:underline text-yellow-300"
        >
          View profile
        </a>
      </div>
    )}
  </div>
</div>


  );
}
