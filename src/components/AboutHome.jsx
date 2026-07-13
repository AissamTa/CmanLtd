import React from "react";
import { Link } from "react-router-dom";
import AboutImage from "../assets/about.jpeg";

export default function AboutHome() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="orb w-[420px] h-[420px] -bottom-32 -left-24 bg-signal/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass glass-sheen rounded-[2rem] p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="plate mb-4">About CMAN</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Partnerships that move the plant forward.
            </h2>
            <p className="mt-5 text-steel leading-relaxed">
              CMAN Ltd stands for Collaboration in Manufacturing — building
              partnerships within the manufacturing industry that drive
              efficiency, innovation and growth on the factory floor.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white font-semibold hover:bg-ink/90 transition"
            >
              Read more
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="scene">
            <figure className="card-3d tilt-card glass-soft rounded-3xl p-3">
              <img
                src={AboutImage}
                alt="CMAN team collaborating on a production line"
                loading="lazy"
                className="w-full rounded-2xl object-cover aspect-[4/3]"
              />
              <figcaption className="plate px-3 py-3">
                On site · production line commissioning
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
