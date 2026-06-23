"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Home, Activity, Globe2, Code2 } from "lucide-react";

const CARDS = [
  {
    id: "patients",
    icon: Heart,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Patients & Caregivers",
    description:
      "Search verified pharmacies, save medicines, get alerts — no clinical profile required.",
    cta: "Search now",
    ctaColor: "text-emerald-600",
    accent: "from-emerald-400 to-blue-500",
    highlighted: true,
  },
  {
    id: "pharmacies",
    icon: Home,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    title: "Pharmacies",
    description:
      "Reduce inbound calls, join the verified network, and turn demand into intelligence.",
    cta: "Join network",
    ctaColor: "text-indigo-600",
    accent: "from-indigo-400 to-blue-500",
  },
  {
    id: "health-systems",
    icon: Activity,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Health Systems & Telehealth",
    description:
      "Embed availability into prescribing workflows and patient routing pathways.",
    cta: "Request integration",
    ctaColor: "text-purple-600",
    accent: "from-purple-400 to-indigo-500",
  },
  {
    id: "governments",
    icon: Globe2,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Governments & Manufacturers",
    description:
      "Detect shortage patterns before national registers via ZoikoSignal™.",
    cta: "Request briefing",
    ctaColor: "text-amber-600",
    accent: "from-amber-400 to-orange-500",
  },
  {
    id: "developers",
    icon: Code2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Developers & Partners",
    description:
      "Build on governed availability, verification, and shortage intelligence APIs.",
    cta: "View API docs",
    ctaColor: "text-blue-600",
    accent: "from-blue-400 to-cyan-500",
  },
];

export default function HomeStakeholdersSection() {
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
    <section ref={sectionRef} className="w-full bg-[#F7F9FC] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            Built for every role
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            One platform.
            <br />
            <span className="text-[#0A9B74]">Every stakeholder.</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-500">
            From patients checking a single pharmacy to governments monitoring
            national supply — ZoikoMeds routes every audience to the right
            tool.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-500 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                } ${
                  card.highlighted
                    ? "border-emerald-200 bg-gradient-to-b from-emerald-50/60 to-white shadow-lg shadow-emerald-100/60"
                    : "border-slate-100 hover:border-emerald-200 hover:bg-gradient-to-b hover:from-emerald-50/60 hover:to-white hover:shadow-lg hover:shadow-emerald-100/60"
                } hover:-translate-y-1`}
                style={{ transitionDelay: isVisible ? `${index * 90}ms` : "0ms" }}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-5 w-5 ${card.iconColor}`} strokeWidth={2} />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500">
  {card.description}
</p>

<a
  href="#"
  className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${card.ctaColor} transition-all duration-300`}
>
  {card.cta}
  <span className="transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</a>

                <span
                  className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${card.accent} transition-opacity duration-300 ${
                    card.highlighted ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}