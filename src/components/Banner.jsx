import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Wording taken from the CMAN Ltd company presentation.
const PANELS = [
  { code: "CM-01", label: "Industrial Solutions", metric: "We deliver", value: "Design · Manufacture" },
  { code: "CM-02", label: "Technical Services", metric: "On site", value: "Installation · Maintenance" },
  { code: "CM-03", label: "Value Added", metric: "For your plant", value: "Sustainable results" },
];

export default function Banner() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const motionOK = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)"
    );
    motionOK.current = mq.matches;
  }, []);

  const handleMove = (e) => {
    if (!motionOK.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -9, y: px * 13 });
  };

  return (
    <section
      className="relative overflow-hidden blueprint-grid"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {/* Ambient orbs */}
      <div className="orb w-[520px] h-[520px] -top-40 -left-32 bg-signal/15" />
      <div className="orb w-[620px] h-[620px] top-40 -right-48 bg-ink/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28 grid lg:grid-cols-2 gap-16 items-center">
        {/* Copy */}
        <div>
          <p className="plate mb-5">
            Industrial Solutions &amp; Technical Services · Tangier, MA
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            Fostering
            <br />
            <span className="text-signal">collaboration.</span>
          </h1>
          <p className="mt-6 text-lg text-steel max-w-md leading-relaxed">
            Your partner for a more efficient and competitive industry —
            from design and manufacture to installation and maintenance.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-full bg-signal text-white font-semibold shadow-lg shadow-signal/30 hover:brightness-110 transition"
            >
              Start a project
            </Link>
            <Link
              to="/services"
              className="glass glass-sheen px-7 py-3.5 rounded-full font-semibold text-ink hover:bg-white/70 transition"
            >
              Explore services
            </Link>
            <a
              href="/CMAN_Ltd_presentation.pdf"
              download="CMAN_Ltd_presentation.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-ink/20 font-semibold text-ink hover:bg-white/70 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12m0 0l-5-5m5 5l5-5M4 21h16" />
              </svg>
              Download our presentation (PDF)
            </a>
          </div>
        </div>

        {/* 3D glass panel stack */}
        <div className="scene hidden sm:block" aria-hidden="true">
          <div
            className="scene-group relative h-[440px]"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {PANELS.map((p, i) => (
              <div
                key={p.code}
                className={`card-3d absolute ${
                  i === 0
                    ? "top-0 left-1/2 -ml-32 z-30 float-slow"
                    : i === 1
                    ? "top-48 left-6 z-20 float-slower"
                    : "top-60 right-2 z-10 float-slow"
                }`}
              >
                <div
                  className="glass glass-sheen rounded-3xl p-6 w-64"
                  style={{ transform: `translateZ(${90 - i * 60}px)` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="plate">{p.code}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-signal" />
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">{p.label}</h3>
                  <div className="mt-5 pt-4 border-t border-ink/10">
                    <p className="plate">{p.metric}</p>
                    <p className="text-lg font-semibold text-ink mt-1">
                      {p.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service index strip */}
      <div className="relative border-t border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap gap-x-10 gap-y-2">
          {["01 Design", "02 Manufacture", "03 Installation", "04 Maintenance"].map(
            (s) => (
              <span key={s} className="plate">
                {s}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
