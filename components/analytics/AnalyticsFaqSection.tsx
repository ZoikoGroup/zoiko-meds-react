"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "What is ZoikoMeds Analytics?",
    answer:
      "ZoikoMeds Analytics is a medicine availability analytics layer that helps authorized stakeholders understand availability confidence, regional access gaps, pharmacy confirmation coverage, demand signals, and shortage movement.",
  },
  {
    question: "Does ZoikoMeds Analytics show exact pharmacy inventory?",
    answer:
      "No. Analytics surfaces confidence bands and directional signals derived from confirmations and reports, not live stock counts. It is designed to indicate likelihood and movement, not exact unit-level inventory.",
  },
  {
    question: "Who can use ZoikoMeds Analytics?",
    answer:
      "Access is limited to authorized stakeholders such as health system partners, pharmacy networks, and approved operational teams who have been granted permission under our governance and data-sharing agreements.",
  },
  {
    question: "Does ZoikoMeds provide medical advice?",
    answer:
      "No. Analytics is an operational and availability intelligence tool. It does not diagnose, treat, or offer medical guidance, and should never be used as a substitute for advice from a licensed healthcare professional.",
  },
  {
    question: "How does Analytics support shortage awareness?",
    answer:
      "By tracking confidence movement, historical comparisons, and risk indicators over time, Analytics helps teams notice early signs of potential shortages and prioritize where to focus operational attention.",
  },
  {
    question: "Can reports be exported from Analytics?",
    answer:
      "Yes. Authorized users can request exportable summaries, including executive-ready reports, subject to the export controls and permissions configured for their account.",
  },
];

export default function AnalyticsFaqSection() {
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
      <div className="mx-auto max-w-6xl">
        <FaqFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            08 &nbsp;&middot;&nbsp; FREQUENTLY ASKED QUESTIONS
          </span>
        </FaqFadeUp>

        <FaqFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Analytics questions, <span className="text-[#0FAA87]">answered.</span>
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
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#0FAA87]">
                      {isOpen ? (
                        <X className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      )}
                    </span>
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[#4B5567] sm:px-7">
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