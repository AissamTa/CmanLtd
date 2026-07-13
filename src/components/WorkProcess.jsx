import React from "react";

const STEPS = [
  {
    n: "01",
    title: "Audit",
    text: "We walk your lines, measure the current state and identify the constraints holding output back.",
  },
  {
    n: "02",
    title: "Design",
    text: "Together we define the target: layout, staffing, standards and a realistic deployment plan.",
  },
  {
    n: "03",
    title: "Deploy",
    text: "Installation, training and ramp-up — executed on site, with your teams, until the line runs stable.",
  },
  {
    n: "04",
    title: "Support",
    text: "We stay close after handover: performance follow-up, coaching and continuous improvement.",
  },
];

export default function WorkProcess() {
  return (
    <section className="relative py-20 lg:py-24 blueprint-grid overflow-hidden">
      <div className="orb w-[420px] h-[420px] -bottom-24 -right-24 bg-signal/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="plate mb-3">How we work</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            One method, from audit to stable output.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scene">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="tilt-card card-3d glass glass-sheen rounded-3xl p-7"
            >
              <span className="font-mono text-3xl font-semibold text-signal">
                {s.n}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-steel leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
