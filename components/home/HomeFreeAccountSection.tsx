"use client";

import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    id: "recent-searches",
    title: "Recent searches",
    description:
      "return to medicines you checked without retyping, with full history control and easy deletion.",
  },
  {
    id: "saved-medicines",
    title: "Saved medicines",
    description:
      'follow recurring medicines with custom labels like "Dad\'s medication."',
  },
  {
    id: "availability-alerts",
    title: "Availability alerts",
    description:
      "get notified when confidence improves or a pharmacy confirms availability.",
  },
  {
    id: "privacy-dashboard",
    title: "Privacy dashboard",
    description: "view, delete, export, and pause history — always under your control.",
  },
  {
    id: "caregiver-mode",
    title: "Caregiver mode",
    description: "organize saved medicines for family members using nickname labels.",
  },
];

export default function HomeFreeAccountSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 px-6 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT: single complete image (photo + floating cards baked in) */}
        <div
          className={`relative transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="relative aspect-[4/5] w-full max-w-xl overflow-hidden rounded-3xl">
            <img
              src="/home/second.webp"
              alt="Pharmacist using ZoikoMeds medicine search"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT: content */}
        <div
          className={`transition-all delay-150 duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="inline-flex items-center rounded-full border border-[#0A9B74]/20 bg-[#0A9B74]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0A9B74]">
            Free account features
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
            Search now.
            <br />
            <span className="text-[#0A9B74]">Save what matters.</span>
          </h2>

          <p className="mt-5  text-base leading-relaxed text-slate-500">
            A free account turns one-off searches into a personal availability
            workspace — with full control over your history, saved medicines,
            and privacy preferences.
          </p>

          <ul className="mt-8 space-y-5">
            {FEATURES.map((feature, index) => (
              <li
                key={feature.id}
                className={`group flex items-start gap-3 transition-all duration-500 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? `${200 + index * 80}ms` : "0ms" }}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0A9B74] transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-white">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0A9B74]">
                    {feature.title}
                  </span>{" "}
                  — {feature.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#0A9B74] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#08825F] hover:shadow-lg hover:shadow-[#0A9B74]/25 active:scale-[0.98]"
            >
              <span className="relative z-10">Create free account</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </button>

            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200 px-7 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-[#0A9B74] hover:text-[#0A9B74]"
            >
              Learn about privacy
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            No diagnosis data collected. No advertising use of search history.
          </p>
        </div>
      </div>
    </section>
  );
}