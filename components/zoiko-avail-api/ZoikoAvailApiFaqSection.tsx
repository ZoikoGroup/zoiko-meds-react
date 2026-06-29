"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const FAQ_ITEMS = [
  {
    question: "What is ZoikoAvail™ API?",
    answer:
      "ZoikoAvail™ API is ZoikoMeds' governed API layer for confidence-based medicine availability signals, freshness metadata, and confirmation-aware workflows.",
  },
  {
    question: "Does ZoikoAvail™ API show exact pharmacy stock?",
    answer:
      "No. ZoikoAvail™ API does not expose exact pharmacy stock quantities unless a separately governed, non-public, contract-specific workflow has been approved.",
  },
  {
    question: "Can digital health platforms integrate ZoikoAvail™ API?",
    answer:
      "Yes. Approved digital health, patient support, and chronic-care apps can integrate ZoikoAvail™ API to embed saved search, alert, and availability signal experiences.",
  },
  {
    question: "Does ZoikoAvail™ API provide medical advice?",
    answer:
      "No. ZoikoAvail™ API does not recommend medicines, substitutes, doses, treatments, clinical actions, or prescribing decisions.",
  },
] as const;

export default function ZoikoAvailApiFaqSection() {
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                05 · Answers
              </span>
            </Reveal>

            <Reveal index={1}>
                 <h2 className="mt-3 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                  API{" "}
                <span style={{ color: ACCENT }}>questions, answered.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-24 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Accordion ---------------- */}
        <div className="mt-10 flex flex-col gap-3">
          {mounted
            ? FAQ_ITEMS.map((item, i) => (
                <Reveal key={item.question} index={2 + i}>
                  <FaqRow
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === i}
                    onToggle={() =>
                      setOpenIndex((prev) => (prev === i ? null : i))
                    }
                  />
                </Reveal>
              ))
            : Array.from({ length: 4 }).map((_, i) => <FaqRowSkeleton key={i} />)}
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
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 80}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoSignalFadeUp {
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
/*  FAQ row                                                            */
/* ----------------------------------------------------------------- */
function FaqRow({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_8px_24px_-14px_rgba(15,31,78,0.10)] transition-shadow duration-300 hover:shadow-[0_12px_28px_-12px_rgba(15,31,78,0.14)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#F7F9FC]"
      >
        <span className="text-[14.5px] font-bold text-[#0F1F4E]">
          {question}
        </span>
        <span
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-out"
          style={{
            color: isOpen ? "#D64545" : ACCENT,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2.5V13.5M2.5 8H13.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? "200px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-[#8891A4]">
          {answer}
        </p>
      </div>
    </div>
  );
}

function FaqRowSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#E7EAF1] bg-white px-6 py-5">
      <div className="h-4 w-64 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-6 w-6 animate-pulse rounded-full bg-[#E4E8F0]" />
    </div>
  );
}