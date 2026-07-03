"use client";

import { useEffect, useRef, useState } from "react";
import {
  TriangleAlert,
  ShieldAlert,
  RefreshCw,
  Globe,
  Activity,
  FileText,
  ArrowRight,
} from "lucide-react";

type Module = {
  icon: React.ElementType;
  title: string;
  description: string;
  linkLabel: string;
};

const MODULES: Module[] = [
  {
    icon: TriangleAlert,
    title: "Predictive shortage signals",
    description:
      "Identify potential shortage movement based on demand acceleration, confidence weakening, network signal changes, and external context.",
    linkLabel: "Explore shortage signals",
  },
  {
    icon: ShieldAlert,
    title: "Access risk scoring",
    description:
      "Rank regions, medicine categories, or pharmacy network areas by potential access concern.",
    linkLabel: "View risk framework",
  },
  {
    icon: RefreshCw,
    title: "Confidence movement detection",
    description:
      "Detect changes in availability confidence by medicine, geography, signal source, and time window.",
    linkLabel: "See confidence logic",
  },
  {
    icon: Globe,
    title: "Network signal intelligence",
    description:
      "Interpret how pharmacy confirmation coverage, verified participation, and partner activity affect confidence.",
    linkLabel: "Review network signals",
  },
  {
    icon: Activity,
    title: "Anomaly detection",
    description:
      "Highlight unusual search demand, regional spikes, or sudden confidence declines for authorized review.",
    linkLabel: "Analyze anomalies",
  },
  {
    icon: FileText,
    title: "Briefing recommendations",
    description:
      "Convert complex signals into leadership-ready briefings with limitations and next-step options.",
    linkLabel: "Request briefing",
  },
];

export default function AiInsightsModulesSection() {
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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <ModulesFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            03 &nbsp;&middot;&nbsp; CORE AI INSIGHT MODULES
          </span>
        </ModulesFadeUp>

        <ModulesFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Six governed <span className="text-[#0FAA87]">intelligence modules.</span>
          </h2>
        </ModulesFadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <ModulesFadeUp key={mod.title} show={isVisible} delay={140 + i * 60}>
                <div className="group h-full rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0FAA87]/30 hover:shadow-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0FAA87]/10">
                    <Icon className="h-5 w-5 text-[#0FAA87]" strokeWidth={2} />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-[#0F1F4E]">
                    {mod.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#4B5567]">
                    {mod.description}
                  </p>

                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0FAA87] transition-all duration-300 hover:gap-2.5 focus:outline-none"
                  >
                    {mod.linkLabel}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </button>
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