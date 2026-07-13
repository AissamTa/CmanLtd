import React, { useState } from "react";
import logo_service from "../assets/logo_service.png";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact" },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="glass glass-sheen max-w-7xl mx-auto rounded-full px-5 sm:px-7">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={logo_service}
              alt=""
              className="w-10 h-10 rounded-full shadow-md"
            />
            <span className="font-display text-xl font-bold text-ink tracking-tight">
              CMAN <span className="font-medium text-steel">Ltd</span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span className="block w-6 h-0.5 bg-ink mb-1.5" />
            <span className="block w-6 h-0.5 bg-ink mb-1.5" />
            <span className="block w-6 h-0.5 bg-ink" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-2">
              {LINKS.map(({ path, label }) => {
                const active = location.pathname === path;
                return (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                        active
                          ? "bg-ink text-white shadow"
                          : "text-steel hover:text-ink hover:bg-white/60"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden glass mt-2 max-w-7xl mx-auto rounded-3xl p-3">
          <ul className="flex flex-col">
            {LINKS.map(({ path, label }) => {
              const active = location.pathname === path;
              return (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl font-semibold ${
                      active
                        ? "bg-ink text-white"
                        : "text-steel hover:bg-white/60 hover:text-ink"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
