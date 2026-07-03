"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

type SeverityRow = {
  label: string;
  description: string;
  badgeClass: string;
};

const SEVERITY_ROWS: SeverityRow[] = [
  {
    label: "LOW",
    description: "Stable signals; monitor.",
    badgeClass: "border-[#0FAA87]/30 bg-[#0FAA87]/10 text-[#0FAA87]",
  },
  {
    label: "MODERATE",
    description: "Some movement; keep under review.",
    badgeClass: "border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6]",
  },
  {
    label: "ELEVATED",
    description: "Notable change; consider a briefing.",
    badgeClass: "border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#B45309]",
  },
  {
    label: "CRITICAL REVIEW NEEDED",
    description: "Route to authorized review promptly.",
    badgeClass: "border-[#E05252]/30 bg-[#E05252]/10 text-[#E05252]",
  },
];

type ChecklistItem = {
  label: string;
  description: string;
};

const CHECKLIST: ChecklistItem[] = [
  {
    label: "Signal severity",
    description:
      "Low, Moderate, Elevated, Critical Review Needed. No alarmist language.",
  },
  {
    label: "Confidence movement",
    description: "strengthening, weakening, uncertain, or needs review.",
  },
  {
    label: "Evidence summary",
    description: "source categories and reason codes, not raw sensitive records.",
  },
  {
    label: "Regional context",
    description: "map and ranked-region view with privacy-aware aggregation.",
  },
  {
    label: "Action options",
    description: "monitor, generate report, brief leadership, review confirmation coverage.",
  },
];

export default function AiInsightsShortageSignalsSection() {
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
        <ShortageFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            04 &nbsp;&middot;&nbsp; PREDICTIVE SHORTAGE SIGNALS
          </span>
        </ShortageFadeUp>

        <ShortageFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            See shortage movement earlier, with{" "}
            <span className="text-[#0FAA87]">responsible AI guardrails.</span>
          </h2>
        </ShortageFadeUp>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div>
            <ShortageFadeUp show={isVisible} delay={140}>
              <p className="max-w-md text-sm leading-relaxed text-[#4B5567]">
                ZoikoMeds AI Insights helps stakeholders detect early signs of
                medicine access pressure by analyzing confidence changes,
                demand movement, pharmacy confirmation gaps, regional
                patterns, and shortage context.
              </p>
            </ShortageFadeUp>

            <div className="mt-6 space-y-3">
              {SEVERITY_ROWS.map((row, i) => (
                <ShortageFadeUp key={row.label} show={isVisible} delay={200 + i * 60}>
                  <div className="flex items-center gap-4 rounded-xl border border-[#E7EAF1] bg-white px-5 py-4 shadow-sm">
                    <span
                      className={`flex-shrink-0 rounded-md border px-2.5 py-1 text-[0.65rem] font-bold tracking-wide ${row.badgeClass}`}
                    >
                      {row.label}
                    </span>
                    <span className="text-sm text-[#4B5567]">
                      {row.description}
                    </span>
                  </div>
                </ShortageFadeUp>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div>
            <div className="divide-y divide-[#E7EAF1]">
              {CHECKLIST.map((item, i) => (
                <ShortageFadeUp key={item.label} show={isVisible} delay={140 + i * 60}>
                  <div className="flex items-start gap-3 py-4 first:pt-0">
                    <Check
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0FAA87]"
                      strokeWidth={2.5}
                    />
                    <p className="text-sm leading-relaxed text-[#4B5567]">
                      <span className="font-bold text-[#0F1F4E]">
                        {item.label}
                      </span>{" "}
                      — {item.description}
                    </p>
                  </div>
                </ShortageFadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function ShortageFadeUp({
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