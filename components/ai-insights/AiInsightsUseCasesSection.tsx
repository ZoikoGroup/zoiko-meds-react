"use client";

import { useEffect, useRef, useState } from "react";

type UseCase = {
  title: string;
  problem: string;
  solution: string;
};

const USE_CASES: UseCase[] = [
  {
    title: "Medicine access monitoring",
    problem:
      "Teams do not see availability pressure until complaints, escalations, or delays appear.",
    solution:
      "Highlights potential risk earlier through confidence and demand movement.",
  },
  {
    title: "Shortage awareness",
    problem:
      "Shortage context is fragmented across signals and stakeholder reports.",
    solution:
      "Combines structured availability signals with explainable risk indicators.",
  },
  {
    title: "Pharmacy network performance",
    problem: "Confirmation coverage and access confidence vary by region.",
    solution: "Shows where network participation may need review.",
  },
  {
    title: "Leadership briefings",
    problem:
      "Executives need concise, defensible insight rather than raw dashboards.",
    solution:
      "Produces briefing-ready summaries with limitations and evidence trail.",
  },
  {
    title: "Compliance oversight",
    problem: "AI outputs must be explainable and auditable.",
    solution:
      "Provides controlled, reviewable outputs with source categories and reviewer actions.",
  },
];

export default function AiInsightsUseCasesSection() {
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
        <UseCaseFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            09 &nbsp;&middot;&nbsp; USE CASES
          </span>
        </UseCaseFadeUp>

        <UseCaseFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Where AI Insights <span className="text-[#0FAA87]">earns its place.</span>
          </h2>
        </UseCaseFadeUp>

        <UseCaseFadeUp show={isVisible} delay={160}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-sm">
            {USE_CASES.map((item, i) => (
              <div
                key={item.title}
                className={`grid grid-cols-1 gap-2 px-6 py-6 sm:grid-cols-3 sm:gap-6 sm:px-8 ${
                  i !== 0 ? "border-t border-[#E7EAF1]" : ""
                }`}
              >
                <h3 className="text-sm font-bold text-[#0F1F4E]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#8A93A6]">
                  {item.problem}
                </p>
                <p className="text-sm leading-relaxed text-[#0F1F4E]">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </UseCaseFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function UseCaseFadeUp({
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