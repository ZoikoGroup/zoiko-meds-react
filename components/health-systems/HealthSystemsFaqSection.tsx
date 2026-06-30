"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const FAQS = [
  {
    question: "How can health systems use ZoikoMeds?",
    answer:
      "Health systems can use ZoikoMeds to support medicine availability workflows, discharge planning, care-team guidance, availability signal education, API evaluation, and access-risk intelligence.",
    defaultOpen: true,
  },
  {
    question: "Does ZoikoMeds replace EHR or prescribing systems?",
    answer:
      "No. ZoikoMeds is not an EHR, CPOE, e-prescribing, clinical decision support, medication administration, refill, adherence, or dispensing platform. It is an availability intelligence and workflow layer that sits alongside existing clinical systems.",
    defaultOpen: false,
  },
  {
    question: "Can ZoikoMeds support discharge medication access?",
    answer:
      "Yes. ZoikoMeds helps patients understand availability signals and pharmacy confirmation steps before they leave a hospital, clinic, or outpatient setting — reducing post-discharge access surprises.",
    defaultOpen: false,
  },
  {
    question: "Does ZoikoMeds show exact pharmacy stock?",
    answer:
      "No. ZoikoMeds displays confidence-based availability signals, not exact public pharmacy stock counts. Exact-stock suppression is applied by default across all health-system outputs.",
    defaultOpen: false,
  },
] as const;

export default function HealthSystemsFaqSection() {
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">05</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Answers
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Health-system </span>
            <span style={{ color: ACCENT }}>questions, answered.</span>
          </h2>
        </Reveal>

        {/* ── Accordion ── */}
        <div className="mt-8 flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} index={i + 2} active={mounted}>
              <FaqItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FaqItem                                                              */
/* ------------------------------------------------------------------ */
function FaqItem({
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
    <div
      className="overflow-hidden rounded-2xl border bg-white transition-all duration-200"
      style={{
        borderColor: isOpen ? "#9FE3D3" : "#E7EAF1",
        boxShadow: isOpen ? "0 4px 20px -8px rgba(15,170,135,0.15)" : "none",
      }}
    >
      {/* Question row */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-150 hover:bg-[#F8FAFC]"
      >
        <span className="text-[14.5px] font-bold text-[#0F1F4E] pr-4">
          {question}
        </span>
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full" style={{ color: ACCENT }}>
          {isOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </button>

      {/* Answer */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-[#5B6478]">
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `hsFaqFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes hsFaqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}