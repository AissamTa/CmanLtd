import React, { useState } from "react";
import logo from "../assets/logo_cman.png";
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
          <Link to="/" className="relative z-10 flex items-center gap-2.5">
            <img
              src={logo}
              alt="CMAN Ltd – Fostering Collaboration"
              className="h-14 w-auto"
            />
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
