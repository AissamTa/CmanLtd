import React from "react";
import { Link } from "react-router-dom";

const PILLARS = [
  {
    title: "Safety first",
    text: "Every intervention starts and ends with the safety of the people on the line.",
    icon: (
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
    ),
  },
  {
    title: "Quality built-in",
    text: "Standards, checks and training designed so quality happens in the process, not after it.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8.5 12.5l2.4 2.4 4.6-5.3" />
      </>
    ),
  },
  {
    title: "On-time delivery",
    text: "Clear milestones and honest planning — your ramp-up date is a commitment, not a hope.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
  },
];

export default function Commitments() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="plate mb-3">Our commitments</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What every partner can count on.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div key={p.title} className="glass-soft rounded-3xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-white/70 border border-white flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7 text-signal"
                  aria-hidden="true"
                >
                  {p.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm text-steel leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-16 relative rounded-[2rem] overflow-hidden bg-ink">
          <div className="orb w-[380px] h-[380px] -top-24 -right-16 bg-signal/30" />
          <div className="orb w-[320px] h-[320px] -bottom-24 -left-10 bg-white/10" />
          <div className="relative px-8 py-14 md:px-14 md:py-16 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p className="plate !text-white/60 mb-3">Next project</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Let's build your next production line.
              </h2>
              <p className="mt-4 text-white/70 max-w-xl leading-relaxed">
                Tell us about your plant, your product and your target output —
                we'll come back with a clear plan to get there.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-col gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-signal text-white font-semibold text-center shadow-lg shadow-signal/40 hover:brightness-110 transition"
              >
                Contact us
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 rounded-full border border-white/25 text-white font-semibold text-center hover:bg-white/10 transition"
              >
                Our services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
