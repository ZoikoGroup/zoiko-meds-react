"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  number: number;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: 1,
    title: "Signal ingestion",
    description:
      "Inputs from search activity, availability confidence, pharmacy confirmations, region, category, and external shortage context.",
  },
  {
    number: 2,
    title: "Pattern detection",
    description:
      "AI identifies confidence movement, demand anomalies, network gaps, and potential access risk.",
  },
  {
    number: 3,
    title: "Explanation layer",
    description:
      "Each insight includes reason codes, data-source categories, confidence level, and limitations.",
  },
  {
    number: 4,
    title: "Human review",
    description:
      "Sensitive signals route to authorized review paths before escalation or external action.",
  },
  {
    number: 5,
    title: "Action output",
    description:
      "Save a view, generate a report, brief leadership, contact partners, or monitor the trend.",
  },
];

export default function AiInsightsHowItWorksSection() {
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
        <StepFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            02 &nbsp;&middot;&nbsp; HOW AI INSIGHTS WORKS
          </span>
        </StepFadeUp>

        <StepFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            From signal to <span className="text-[#0FAA87]">accountable action.</span>
          </h2>
        </StepFadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <StepFadeUp key={step.number} show={isVisible} delay={140 + i * 60}>
              <div className="h-full rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0FAA87]/30 hover:shadow-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0FAA87] text-sm font-bold text-white">
                  {step.number}
                </div>

                <h3 className="mt-4 text-base font-bold text-[#0F1F4E]">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#4B5567]">
                  {step.description}
                </p>
              </div>
            </StepFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function StepFadeUp({
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