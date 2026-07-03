"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "What are ZoikoMeds AI Insights?",
    answer:
      "ZoikoMeds AI Insights are governed operational intelligence signals that help authorized stakeholders identify medicine availability changes, access risk, shortage movement, demand anomalies, and confidence shifts.",
  },
  {
    question: "Does ZoikoMeds AI provide medical advice?",
    answer:
      "No. AI Insights is an operational intelligence tool. It does not diagnose, treat, prescribe, or offer patient-specific medical guidance, and should never replace advice from a licensed healthcare professional.",
  },
  {
    question: "Can ZoikoMeds predict medicine shortages?",
    answer:
      "AI Insights surfaces early confidence and demand movement that may indicate rising shortage risk. It provides directional, explainable signals rather than guaranteed predictions of future shortages.",
  },
  {
    question: "Does ZoikoMeds show exact pharmacy inventory?",
    answer:
      "No. Insights are structured around confidence tiers, patterns, and risk indicators rather than exact, unit-level inventory counts at any pharmacy or facility.",
  },
  {
    question: "Who can use ZoikoMeds AI Insights?",
    answer:
      "Access is limited to authorized stakeholders — such as health systems, pharmacy networks, compliance teams, and approved operational partners — under our governance and data-sharing agreements.",
  },
  {
    question: "How does ZoikoMeds make AI insights trustworthy?",
    answer:
      "Every insight includes reason codes, confidence levels, source categories, and limitations, with human review routing for sensitive signals and a full auditable evidence trail.",
  },
];

export default function AiInsightsFaqSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <FaqFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            12 &nbsp;&middot;&nbsp; FREQUENTLY ASKED QUESTIONS
          </span>
        </FaqFadeUp>

        <FaqFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            AI Insights <span className="text-[#0FAA87]">questions, answered.</span>
          </h2>
        </FaqFadeUp>

        <FaqFadeUp show={isVisible} delay={140}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-sm">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.question}
                  className={i !== 0 ? "border-t border-[#E7EAF1]" : ""}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#0FAA87]/[0.03] focus:outline-none sm:px-7"
                  >
                    <span className="text-[0.95rem] font-semibold text-[#0F1F4E]">
                      {faq.question}
                    </span>
                    <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#0FAA87]">
                      <Plus
                        className="absolute h-4 w-4 transition-all duration-300"
                        strokeWidth={2.5}
                        style={{
                          opacity: isOpen ? 0 : 1,
                          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        }}
                      />
                      <X
                        className="absolute h-4 w-4 transition-all duration-300"
                        strokeWidth={2.5}
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                        }}
                      />
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="px-6 pb-5 text-sm leading-relaxed text-[#4B5567] transition-opacity duration-300 sm:px-7"
                        style={{ opacity: isOpen ? 1 : 0 }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FaqFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function FaqFadeUp({
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