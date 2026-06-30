"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Activity, PieChart } from "lucide-react";

const CARDS = [
  {
    id: "medibase",
    label: "Identity layer",
    labelBg: "bg-blue-500/15",
    labelColor: "text-blue-300",
    icon: FileText,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-300",
    title: "MediBase™",
    description:
      "Governed medicine identity mapping brand, generic, INN, strength, dosage form, route, prescription status, and jurisdictional rules across every participating market.",
    cta: "Explore MediBase™",
    ctaColor: "text-blue-300",
    cardBg: "from-blue-900/60 via-blue-950/60 to-slate-950",
    border: "border-blue-500/20 hover:border-blue-400/40",
    glow: "bg-blue-500/30",
  },
  {
    id: "zoikoavail",
    label: "Confidence engine",
    labelBg: "bg-emerald-500/15",
    labelColor: "text-emerald-300",
    icon: Activity,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-300",
    title: "ZoikoAvail™",
    description:
      "Scores availability by freshness, pharmacy reliability, confirmation quality, and signal integrity — delivering confidence tiers that never expose exact inventory counts to the public.",
    cta: "See availability logic",
    ctaColor: "text-emerald-300",
    cardBg: "from-emerald-900/50 via-emerald-950/50 to-slate-950",
    border: "border-emerald-500/20 hover:border-emerald-400/40",
    glow: "bg-emerald-500/30",
  },
  {
    id: "zoikosignal",
    label: "Shortage intelligence",
    labelBg: "bg-purple-500/15",
    labelColor: "text-purple-300",
    icon: PieChart,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-300",
    title: "ZoikoSignal™",
    description:
      "Converts anonymized searches, zero-result events, confirmations, and restock signals into public-health intelligence and commercial shortage data products for governments and enterprise buyers.",
    cta: "Request intelligence briefing",
    ctaColor: "text-purple-300",
    cardBg: "from-purple-900/50 via-purple-950/50 to-slate-950",
    border: "border-purple-500/20 hover:border-purple-400/40",
    glow: "bg-purple-500/30",
  },
];

export default function HomeEnginesSection() {
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
    <section ref={sectionRef} className="w-full bg-[#0A1224] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="inline-flex items-center rounded-full border border-slate-600/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-300">
              Proprietary infrastructure
            </span>

            <h2 className="mt-5 text-[38px] font-extrabold leading-tight text-white sm:text-5xl">
              Three engines.
              <br />
              <span className="text-emerald-400">One availability layer.</span>
            </h2>
          </div>

          <p
            className={`max-w-md text-sm leading-relaxed text-slate-400 transition-all delay-150 duration-700 ease-out lg:pt-2 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Every search, alert, and enterprise signal runs on a purpose-built
            infrastructure stack — not generic database queries. MediBase™,
            ZoikoAvail™, and ZoikoSignal™ are named, governed, and
            commercialised infrastructure assets.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br p-7 transition-all duration-500 ease-out ${card.cardBg} ${card.border} ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                } hover:-translate-y-1.5 hover:shadow-2xl`}
                style={{ transitionDelay: isVisible ? `${index * 120}ms` : "0ms" }}
              >
                <span
                  className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full ${card.glow} blur-3xl transition-opacity duration-500 opacity-60 group-hover:opacity-100`}
                />

                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100" />

                <div className="relative z-10">
                  <span
                    className={`inline-flex items-center rounded-full ${card.labelBg} px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${card.labelColor}`}
                  >
                    {card.label}
                  </span>

                  <div
                    className={`mt-5 flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-5 w-5 ${card.iconColor}`} strokeWidth={2} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {card.description}
                  </p>

                  <a
                    href="#"
                    className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${card.ctaColor}`}
                  >
                    {card.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}