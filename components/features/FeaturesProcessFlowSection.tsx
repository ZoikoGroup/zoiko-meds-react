"use client";

import { useEffect, useRef, useState } from "react";

type ProcessStep = {
  number: number;
  title: string;
  description: string;
  layerLabel: string;
};

const STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Signal capture",
    description:
      "Collect structured search, availability, network, partner, demand, and report signals.",
    layerLabel: "DATA SIGNALS LAYER",
  },
  {
    number: 2,
    title: "Classification",
    description:
      "Organize signals into confidence, geography, medicine category, and source type.",
    layerLabel: "CONFIDENCE ENGINE",
  },
  {
    number: 3,
    title: "Verification",
    description: "Route eligible signals to authorized pharmacy or partner confirmation workflows.",
    layerLabel: "PHARMACY NETWORK LAYER",
  },
  {
    number: 4,
    title: "Intelligence",
    description:
      "Identify patterns, confidence movement, access risk, and potential shortage signals.",
    layerLabel: "ANALYTICS & AI INSIGHTS",
  },
  {
    number: 5,
    title: "Reporting",
    description: "Convert intelligence into reports, briefings, alerts, and dashboards.",
    layerLabel: "REPORTING LAYER",
  },
  {
    number: 6,
    title: "Action",
    description:
      "Prioritize review, outreach, partnership, participation, or operational response.",
    layerLabel: "STAKEHOLDER WORKFLOW",
  },
];

export default function FeaturesProcessFlowSection() {
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
      <div className="mx-auto max-w-7xl">
        <ProcessFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            06 &nbsp;&middot;&nbsp; HOW FEATURES WORK TOGETHER
          </span>
        </ProcessFadeUp>

        <ProcessFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-2xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            From signal capture to <span className="text-[#0FAA87]">accountable action.</span>
          </h2>
        </ProcessFadeUp>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {STEPS.map((step, i) => (
            <ProcessFadeUp key={step.number} show={isVisible} delay={160 + i * 70}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0FAA87] text-xs font-bold text-white">
                  {step.number}
                </span>

                <h3 className="mt-3 text-[0.95rem] font-bold text-[#0F1F4E]">{step.title}</h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7385]">
                  {step.description}
                </p>

                <div className="mt-4 border-t border-[#EDF0F5] pt-3">
                  <span className="text-[0.65rem] font-bold tracking-[0.08em] text-[#0FAA87]">
                    {step.layerLabel}
                  </span>
                </div>
              </div>
            </ProcessFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function ProcessFadeUp({
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