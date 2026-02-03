import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "FAQ", to: "/faq" },
  { name: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur border-b border-gray-800">
      <nav className="flex items-center justify-between px-6 py-4">
        
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-yellow-400">
            Community_HP
          </span>
        </div>

        
        <div className="hidden md:flex gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="text-sm font-medium text-gray-200 hover:text-yellow-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        
        <div className="hidden md:block">
          <Link
            to="/login"
            className="text-sm font-semibold text-yellow-400 hover:text-yellow-300"
          >
            Log in →
          </Link>
        </div>

        
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 rounded bg-gray-800 hover:bg-gray-700"
        >
          <Bars3Icon className="h-6 w-6 text-gray-200" />
        </button>
      </nav>

      
      <Dialog
        open={menuOpen}
        onClose={setMenuOpen}
        className="md:hidden fixed inset-0 z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <DialogPanel className="fixed top-0 right-0 w-64 h-full bg-black border-l border-gray-800 p-6">
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-yellow-400">Menu</span>
            <button onClick={() => setMenuOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-200" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-gray-200 hover:text-yellow-400 transition"
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-semibold text-yellow-400"
            >
              Log in →
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
