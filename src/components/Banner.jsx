import React from "react";
import { Link } from "react-router-dom";


export default function Banner() {
  return (
    <section className="relative overflow-hidden blueprint-grid">
      {/* Ambient orbs */}
      <div className="orb w-[520px] h-[520px] -top-40 -left-32 bg-signal/15" />
      <div className="orb w-[620px] h-[620px] top-40 -right-48 bg-ink/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
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
          <p className="mt-6 text-lg text-steel max-w-xl leading-relaxed">
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
