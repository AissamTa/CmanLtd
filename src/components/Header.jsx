import React, { useState } from "react";
import logo_service from "../assets/logo_service.png";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl  text-blue-950"
            >
              <img
                src={logo_service}
                alt="CMAN Ltd Logo"
                className="w-12 h-12 rounded-full shadow-md"
              />
              <span class="text-2xl font-bold text-[#0d1b3f] tracking-tight">
                CMAN <span class="font-medium">Ltd</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              {["/", "/about", "/services", "/contact"].map((path, index) => {
                const labels = ["Home", "About", "Services", "Contact"];
                return (
                  <li
                    key={path}
                    className={`nav-item ${
                      location.pathname === path ? "active" : ""
                    } list-none`}
                  >
                    <Link
                      to={path}
                      className={`font-medium transition duration-300 ${
                        location.pathname === path
                          ? "text-red-600 font-bold"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {labels[index]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col space-y-4">
              {["/", "/about", "/services", "/contact"].map((path, index) => {
                const labels = ["Home", "About", "Services", "Contact"];
                return (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`block font-medium transition duration-300 ${
                        location.pathname === path
                          ? "text-red-600 font-bold"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {labels[index]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
