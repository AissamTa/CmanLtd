import React from "react";
import plantImage from "../assets/bg3.jpeg";

const CHIPS = [
  { code: "LIVE", label: "Line monitoring", pos: "top-6 left-6" },
  { code: "DWI", label: "Digital work instructions", pos: "bottom-20 left-10" },
  { code: "KPI", label: "Performance reviews on the floor", pos: "top-16 right-8" },
];

export default function Showcase() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      <div className="orb w-[460px] h-[460px] -top-24 -left-24 bg-ink/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="plate mb-3">Inside the plant</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Where decisions meet the factory floor.
          </h2>
          <p className="mt-4 text-steel leading-relaxed">
            We work shoulder to shoulder with your teams — reviewing line data,
            work instructions and performance where production actually
            happens, not in a distant office.
          </p>
        </div>

        {/* Framed plant image with floating glass chips */}
        <div className="scene mt-12">
          <div className="card-3d glass-soft rounded-[2rem] p-3 md:p-4">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={plantImage}
                alt="CMAN consultants reviewing live production data on a digital board inside a manufacturing plant"
                loading="lazy"
                className="w-full object-cover aspect-[16/8] md:aspect-[16/7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />

              {CHIPS.map((c) => (
                <div
                  key={c.code}
                  className={`glass hidden md:flex items-center gap-3 absolute ${c.pos} rounded-full pl-3 pr-5 py-2.5`}
                >
                  <span className="font-mono text-[10px] font-semibold tracking-widest text-white bg-signal rounded-full px-2.5 py-1">
                    {c.code}
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {c.label}
                  </span>
                </div>
              ))}

              <p className="absolute bottom-5 left-6 right-6 md:left-10 plate !text-white/90">
                Production review · digital performance board
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
