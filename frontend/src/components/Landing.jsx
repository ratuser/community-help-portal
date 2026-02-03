// src/Landing.jsx
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="text-gray-100 w-full relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="w-full flex flex-col justify-center items-center text-center px-6 relative overflow-hidden min-h-screen">
        {/* subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent"></div>

        <div className="max-w-3xl mx-auto relative z-10 py-20">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="text-yellow-400">Community Help </span>
            <span className="text-white">Portal</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 leading-relaxed">
            Community Help Portal is an online platform designed to connect
            members of a local community, enabling them to request, offer, and
            coordinate assistance efficiently. It aims to empower communities by
            fostering engagement, improving accessibility to support, and
            promoting social responsibility.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Link
              to="/login"
              className="rounded border border-yellow-400 bg-transparent px-6 py-3 text-yellow-400 font-semibold shadow-lg transition-all duration-300 ease-out hover:bg-yellow-400 hover:text-black hover:shadow-2xl hover:shadow-yellow-400/30 active:scale-95"
            >
              Get Started
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 font-semibold text-yellow-400 bg-transparent border border-yellow-400 rounded relative group transition-all duration-300 ease-out hover:bg-yellow-400 hover:text-black hover:scale-105 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-1">
                Learn More
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
              <div className="absolute inset-0 bg-yellow-400 rounded opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
              <div className="absolute bottom-2 left-6 right-6 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
