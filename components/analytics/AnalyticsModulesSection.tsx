"use client";

import { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  MapPin,
  Activity,
  Building2,
  TriangleAlert,
  FileText,
  ArrowRight,
} from "lucide-react";

type Module = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  linkLabel: string;
};

const MODULES: Module[] = [
  {
    icon: TrendingUp,
    title: "Medicine availability trends",
    subtitle: "Identify how availability confidence changes over time.",
    description:
      "Trend charts, confidence tiers, last updated, source category, and geography filter.",
    linkLabel: "Request trend briefing",
  },
  {
    icon: MapPin,
    title: "Regional access gaps",
    subtitle: "Understand where access may be difficult.",
    description:
      "Map, risk bands, confidence movement, affected categories, and suggested operational review.",
    linkLabel: "Discuss regional visibility",
  },
  {
    icon: Activity,
    title: "Demand signal mapping",
    subtitle: "Detect rising interest or pressure.",
    description:
      "Aggregated demand curves, top categories, region comparisons, and anomaly markers.",
    linkLabel: "Review demand intelligence",
  },
  {
    icon: Building2,
    title: "Pharmacy network coverage",
    subtitle: "Evaluate confirmation strength and participation.",
    description:
      "Coverage ratio, confirmation freshness, response latency, and participation gaps.",
    linkLabel: "Strengthen network coverage",
  },
  {
    icon: TriangleAlert,
    title: "Shortage analytics",
    subtitle: "Monitor potential shortage movement and access risk.",
    description:
      "Risk indicators, confidence movement, historical comparison, and responsible disclaimers.",
    linkLabel: "Request shortage briefing",
  },
  {
    icon: FileText,
    title: "Executive analytics summary",
    subtitle: "Convert data into leadership-ready interpretation.",
    description:
      "Top findings, risk movement, next actions, and export controls.",
    linkLabel: "Request executive report",
  },
];

export default function AnalyticsModulesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
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
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <ModulesFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            04 &nbsp;&middot;&nbsp; CORE ANALYTICS MODULES
          </span>
        </ModulesFadeUp>

        <ModulesFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Six modules,{" "}
            <span className="text-[#0FAA87]">one operating picture.</span>
          </h2>
        </ModulesFadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <ModulesFadeUp
                key={mod.title}
                show={isVisible}
                delay={140 + i * 60}
              >
                <div className="group h-full rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0FAA87]/30 hover:shadow-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0FAA87]/10">
                    <Icon className="h-5 w-5 text-[#0FAA87]" strokeWidth={2} />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-[#0F1F4E]">
                    {mod.title}
                  </h3>

                  <p className="mt-1.5 text-sm italic leading-relaxed text-[#8A93A6]">
                    {mod.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[#4B5567]">
                    {mod.description}
                  </p>
                </div>
              </ModulesFadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function ModulesFadeUp({
  show,
  delay = 0,
  children,
}: {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
