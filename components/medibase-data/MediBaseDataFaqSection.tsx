"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const FAQS = [
  {
    question: "What is MediBase™?",
    answer:
      "MediBase™ is ZoikoMeds' governed medicine identity and normalization data layer for enterprise search, API, availability, and intelligence workflows.",
    defaultOpen: true,
  },
  {
    question: "Does MediBase™ provide clinical advice?",
    answer:
      "No. MediBase™ is a medicine identity and normalization layer. It does not provide clinical advice, prescribing recommendations, dosing guidance, substitution suggestions, or treatment decisions.",
    defaultOpen: false,
  },
  {
    question: "Can enterprises license MediBase™ data?",
    answer:
      "Yes. MediBase™ data is available through licensed data products, reference APIs, and enterprise integration agreements. Licensing is subject to contract scope, jurisdiction, and approved use-case review.",
    defaultOpen: false,
  },
  {
    question: "Does MediBase™ contain patient data?",
    answer:
      "No. MediBase™ contains medicine identity, classification, and normalization data only. It does not contain patient records, prescriptions, identifiable health information, or patient-level data of any kind.",
    defaultOpen: false,
  },
  {
    question: "How does MediBase™ connect to ZoikoAvail™ and ZoikoSignal™?",
    answer:
      "MediBase™ provides the medicine identity foundation that ZoikoAvail™ uses for availability signal matching and that ZoikoSignal™ uses for intelligence aggregation. All three layers share a common governed identity reference across the ZoikoMeds platform.",
    defaultOpen: false,
  },
] as const;

export default function MediBaseDataFaqSection() {
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
          <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.3rem]">
            Data questions, answered.
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `mediBaseFaqFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes mediBaseFaqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}