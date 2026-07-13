import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";
import { Link } from "react-router-dom";

/* Shown when Supabase is unreachable (e.g. project paused) or returns nothing,
   so the page never renders empty. */
const FALLBACK_SERVICES = [
  {
    id: "installation",
    title: "Installation",
    description:
      "Commissioning and installation of production lines, from layout to first output.",
  },
  {
    id: "training",
    title: "Training",
    description:
      "Operator and team-leader training programs built around your real processes.",
  },
  {
    id: "process",
    title: "Process",
    description:
      "Process optimization — takt time, flow and quality on the factory floor.",
  },
  {
    id: "recruitment",
    title: "Recruitment",
    description:
      "Industrial recruitment: the right profiles for your lines, when you need them.",
  },
];

const ServiceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    className="w-7 h-7 text-signal"
    aria-hidden="true"
  >
    <path d="M12 6V3M12 21v-3M6 12H3m18 0h-3M7.8 7.8 5.6 5.6m12.8 12.8-2.2-2.2m0-8.4 2.2-2.2M5.6 18.4l2.2-2.2" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
);

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("id, title, image, description");
        if (error || !data || data.length === 0) {
          setServices(FALLBACK_SERVICES);
        } else {
          setServices(data);
        }
      } catch {
        setServices(FALLBACK_SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="relative py-20 lg:py-24 blueprint-grid overflow-hidden">
      <div className="orb w-[480px] h-[480px] -top-32 -right-32 bg-ink/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="plate text-center mb-3">What we do</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
          Services
        </h2>

        {loading ? (
          <div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            aria-label="Loading services"
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="glass-soft rounded-3xl h-56 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scene">
            {services.map((service, i) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="tilt-card card-3d glass glass-sheen rounded-3xl p-7 flex flex-col group"
              >
                {service.image ? (
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-white/70 border border-white flex items-center justify-center">
                    <ServiceIcon />
                  </div>
                )}
                <p className="plate mt-6">{`CM-0${i + 1}`}</p>
                <h3 className="mt-1 text-xl font-semibold group-hover:text-signal transition">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-steel leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
