import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PANELS = [
  { code: "CM-01", label: "Installation", metric: "Line efficiency", value: "98.2%" },
  { code: "CM-02", label: "Training", metric: "Operators certified", value: "Level 3" },
  { code: "CM-03", label: "Process", metric: "Takt time", value: "-18%" },
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
            Collaboration in Manufacturing · Tangier, MA
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            Production lines,
            <br />
            engineered to{" "}
            <span className="text-signal">flow.</span>
          </h1>
          <p className="mt-6 text-lg text-steel max-w-md leading-relaxed">
            CMAN Ltd installs, optimizes and staffs manufacturing lines —
            partnering with plants to turn capacity into output.
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
          </div>
        </div>

        {/* 3D glass panel stack */}
        <div className="scene hidden sm:block" aria-hidden="true">
          <div
            className="scene-group relative h-[420px]"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {PANELS.map((p, i) => (
              <div
                key={p.code}
                className={`card-3d absolute ${
                  i === 0
                    ? "top-10 left-1/2 -ml-32 z-30 float-slow"
                    : i === 1
                    ? "top-40 left-6 z-20 float-slower"
                    : "top-56 right-2 z-10 float-slow"
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
                    <p className="font-mono text-2xl font-semibold text-ink mt-1">
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
          {["01 Installation", "02 Training", "03 Process", "04 Recruitment"].map(
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
