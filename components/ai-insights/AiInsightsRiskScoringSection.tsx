"use client";

import { useEffect, useRef, useState } from "react";
import { TriangleAlert } from "lucide-react";

const RISK_FACTORS: string[] = [
  "Demand increase",
  "Confirmation decline",
  "Low network density",
  "Regional search concentration",
  "External shortage context",
];

const INPUT_TAGS: string[] = [
  "Medicine / category",
  "Region",
  "Time window",
  "Stakeholder lens",
];

export default function AiInsightsRiskScoringSection() {
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
        <RiskFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            05 &nbsp;&middot;&nbsp; ACCESS RISK SCORING
          </span>
        </RiskFadeUp>

        <RiskFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Prioritize review with a governed{" "}
            <span className="text-[#0FAA87]">risk score.</span>
          </h2>
        </RiskFadeUp>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left column — score card */}
          <RiskFadeUp show={isVisible} delay={160}>
            <div className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-sm">
              <div className="flex items-center justify-between px-6 py-5">
                <span className="text-sm font-bold text-[#0F1F4E]">
                  Access risk score
                </span>
                <span className="rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
                  Operational review
                </span>
              </div>

              <div className="border-t border-[#E7EAF1] px-6 py-8 text-center">
                <p className="font-mono text-3xl font-bold text-[#C2410C] sm:text-4xl">
                  Elevated
                </p>
                <p className="mt-2 font-mono text-xs tracking-wide text-[#8A93A6]">
                  CONFIDENCE TIER 3 OF 5 &nbsp;&middot;&nbsp; REVIEW STATUS: OPEN
                </p>
              </div>

              <div className="space-y-3 border-t border-[#E7EAF1] px-6 py-6">
                {RISK_FACTORS.map((factor) => (
                  <div key={factor} className="flex items-center gap-2.5">
                    <TriangleAlert
                      className="h-4 w-4 flex-shrink-0 text-[#C2410C]"
                      strokeWidth={2}
                    />
                    <span className="text-sm text-[#0F1F4E]">{factor}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 border-t border-[#E7EAF1] px-6 py-5">
                {INPUT_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[#E7EAF1] bg-[#F4F6FA] px-2.5 py-1 font-mono text-xs text-[#4B5567]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </RiskFadeUp>

          {/* Right column — description + CTA */}
          <div>
            <RiskFadeUp show={isVisible} delay={220}>
              <p className="max-w-md text-sm leading-relaxed text-[#4B5567]">
                Authorized users select medicine name, therapeutic category,
                region, time window, and stakeholder lens. The output is a
                prioritized list of regions or medicines requiring review —
                not public claims.
              </p>
            </RiskFadeUp>

            <RiskFadeUp show={isVisible} delay={280}>
              <button
                type="button"
                className="mt-6 rounded-xl bg-[#0FAA87] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0FAA87]/90 focus:outline-none"
              >
                Request an AI Intelligence Briefing
              </button>
            </RiskFadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function RiskFadeUp({
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