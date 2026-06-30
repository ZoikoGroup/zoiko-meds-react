"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const FAQS = [
  {
    question: "How can governments use ZoikoMeds?",
    answer:
      "Government and public-health teams can use ZoikoMeds to review aggregated, governed medicine availability signals, shortage pressure, and regional access-risk intelligence.",
  },
  {
    question: "Does ZoikoMeds provide official shortage declarations?",
    answer:
      "No. ZoikoMeds surfaces governed availability and demand signals to support situational awareness, but it does not issue official shortage declarations — those remain the responsibility of the relevant regulatory or public-health authority.",
  },
  {
    question: "Does ZoikoMeds expose exact pharmacy stock?",
    answer:
      "No. ZoikoMeds does not publicly expose exact pharmacy stock quantities. Outputs use confidence-based signals and aggregated patterns rather than raw inventory counts.",
  },
  {
    question: "Does ZoikoMeds sell patient-level data?",
    answer:
      "No. ZoikoMeds does not sell identifiable patient-level data. Public-sector outputs are built from aggregated and privacy-safe signals under approved governance and data-use controls.",
  },
] as const;

export default function GovernmentPublicHealthFaqSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header (left-aligned) ---------------- */}
        <div className="max-w-2xl">
          {mounted ? (
            <>
              <Reveal index={0}>
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  05 · Answers
                </p>
              </Reveal>

              <Reveal index={1}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] mt-2 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
                  Public-sector <span style={{ color: ACCENT }}>questions, answered.</span>
                </h2>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- FAQ accordion ---------------- */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white">
          {mounted
            ? FAQS.map((faq, i) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                  isLast={i === FAQS.length - 1}
                  index={i}
                />
              ))
            : FAQS.map((_, i) => (
                <FaqItemSkeleton key={i} isLast={i === FAQS.length - 1} />
              ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/*  Reveal: bottom -> top staggered fade-up wrapper                   */
/* ----------------------------------------------------------------- */
function Reveal({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className="animate-[govPublicHealthFaqFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes govPublicHealthFaqFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  FAQ item                                                            */
/* ----------------------------------------------------------------- */
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  isLast,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
  index: number;
}) {
  return (
    <div
      className="animate-[govPublicHealthFaqFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${250 + index * 90}ms` }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#FAFBFD]"
      >
        <span className="text-[14.5px] font-bold text-[#0F1F4E]">
          {question}
        </span>
        <span
          className="flex h-5 w-5 flex-shrink-0 items-center justify-center transition-transform duration-300"
          style={{ color: ACCENT, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
            <path
              d="M8 2.5v11M2.5 8h11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        className="grid overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="min-h-0">
          <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-[#5B6478]">
            {answer}
          </p>
        </div>
      </div>

      {!isLast && <div className="h-px w-full bg-[#EEF0F5]" />}
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-3 w-24 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
    </div>
  );
}

function FaqItemSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between px-6 py-5">
        <div className="h-4 w-64 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-5 w-5 animate-pulse rounded-full bg-[#E4E8F0]" />
      </div>
      {!isLast && <div className="h-px w-full bg-[#EEF0F5]" />}
    </div>
  );
}