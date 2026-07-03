"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What features does ZoikoMeds provide?",
    answer:
      "ZoikoMeds provides medicine availability intelligence, pharmacy network workflows, shortage signal awareness, analytics dashboards, compliance-conscious reports, secure integrations, and role-based enterprise controls.",
  },
  {
    question: "Is ZoikoMeds an online pharmacy?",
    answer:
      "No. ZoikoMeds is an operational intelligence platform, not a pharmacy or dispensing service. It doesn't sell, dispense, or fulfill medicines — it helps organizations understand availability and network signals.",
  },
  {
    question: "Does ZoikoMeds show exact medicine stock quantities?",
    answer:
      "No. ZoikoMeds surfaces confidence-based availability signals and tiers rather than exact inventory counts, keeping data useful without exposing sensitive stock-level detail.",
  },
  {
    question: "Who are ZoikoMeds features built for?",
    answer:
      "ZoikoMeds is built for pharmacy networks, hospitals and health systems, payers, distributors, and public health teams that need shared visibility into medicine availability and shortages.",
  },
  {
    question: "Do ZoikoMeds AI features provide medical advice?",
    answer:
      "No. ZoikoMeds AI features are bounded and non-clinical — they support operational decisions like availability and shortage awareness, and are never a source of medical or prescribing advice.",
  },
  {
    question: "Can organizations integrate ZoikoMeds with enterprise systems?",
    answer:
      "Yes. ZoikoMeds supports SSO, role-based access, approved APIs, BI exports, and audit trails so it can be embedded directly into existing enterprise workflows.",
  },
  {
    question: "How do organizations get started?",
    answer:
      "Book a demo or talk to sales. A ZoikoMeds representative will review your use case and route you to onboarding, a pilot, or a full enterprise deployment.",
  },
];

export default function FeaturesFaqSection() {
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

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <FaqFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            11 &nbsp;&middot;&nbsp; FREQUENTLY ASKED QUESTIONS
          </span>
        </FaqFadeUp>

        <FaqFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Feature questions, <span className="text-[#0FAA87]">answered.</span>
          </h2>
        </FaqFadeUp>

        <FaqFadeUp show={isVisible} delay={160}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-sm">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={item.question}
                  className={i !== 0 ? "border-t border-[#E7EAF1]" : ""}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#FAFBFD] sm:px-8"
                  >
                    <span className="text-[0.9rem] font-bold text-[#0F1F4E]">
                      {item.question}
                    </span>
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#0FAA87]">
                      {isOpen ? (
                        <X className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      )}
                    </span>
                  </button>

                  <div
                    className="grid overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="min-h-0 px-6 pb-5 sm:px-8">
                      <p className="text-[0.85rem] leading-relaxed text-[#6B7385]">
                        {item.answer}
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