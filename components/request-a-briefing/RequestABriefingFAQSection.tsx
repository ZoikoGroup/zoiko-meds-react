"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const FAQS = [
  {
    id: "who-can-request",
    question: "Who can request a ZoikoMeds briefing?",
    answer:
      "Briefings are intended for organizations, pharmacy networks, healthcare stakeholders, wholesalers, distributors, public-health teams, government bodies, and qualified enterprise partners.",
  },
  {
    id: "is-zoikomeds-a-pharmacy",
    question: "Is ZoikoMeds a pharmacy?",
    answer:
      "No. ZoikoMeds is medicine availability infrastructure — it does not sell, prescribe, dispense, or deliver medicine.",
  },
  {
    id: "what-can-be-covered",
    question: "What can be covered in a briefing?",
    answer:
      "Depending on your stakeholder type, briefings can cover platform overviews, availability intelligence, pharmacy network workflows, reporting and compliance, or integration and commercial pathways.",
  },
  {
    id: "medical-advice",
    question: "Does ZoikoMeds provide medical advice during a briefing?",
    answer:
      "No. Briefings are operational and informational in nature and never include diagnosis, treatment, prescribing, or patient-specific medical guidance.",
  },
  {
    id: "consumers-find-medicine",
    question: "Can consumers use this page to find medicine?",
    answer:
      "No. This page is for institutional and stakeholder briefings only. Consumers should use the primary medicine-finder experience, not this form.",
  },
  {
    id: "response-time",
    question: "How quickly will ZoikoMeds respond?",
    answer:
      "Qualified requests are typically reviewed and routed within a few business days. Response time may vary based on briefing type and verification needs.",
  },
] as const;

export default function RequestABriefingFAQSection() {
  const [mounted, setMounted] = useState(false);
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">07</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Frequently Asked Questions
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Briefing questions, </span>
            <span style={{ color: ACCENT }}>answered.</span>
          </h2>
        </Reveal>

        {/* ── Accordion ── */}
        <Reveal index={2} active={mounted}>
          <div
            className="mt-10 overflow-hidden rounded-2xl border bg-white"
            style={{ borderColor: "#E7EAF1", boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)" }}
          >
            {FAQS.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                isFirst={i === 0}
                onToggle={() => setOpenId((prev) => (prev === faq.id ? null : faq.id))}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQItem                                                            */
/* ------------------------------------------------------------------ */
function FAQItem({
  faq,
  isOpen,
  isFirst,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  isOpen: boolean;
  isFirst: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderTop: isFirst ? "none" : "1px solid #E7EAF1" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 ease-out hover:bg-[#FAFBFD] sm:px-8"
      >
        <span
          className="text-[14px] font-bold transition-colors duration-200"
          style={{ color: isOpen ? ACCENT : "#0F1F4E" }}
        >
          {faq.question}
        </span>
        <span
          className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          style={{ color: ACCENT }}
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
            <path
              d="M8 3v10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{
                transformOrigin: "8px 8px",
                transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
            <path d="M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Grid-based height animation: 0fr -> 1fr avoids janky max-height guessing */}
      <div
        className="grid transition-[grid-template-rows] duration-[350ms] ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className="px-6 pb-5 text-[13.5px] leading-relaxed text-[#5B6478] transition-opacity duration-300 ease-out sm:px-8"
            style={{
              opacity: isOpen ? 1 : 0,
              transitionDelay: isOpen ? "100ms" : "0ms",
            }}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  index,
  active,
}: {
  children: React.ReactNode;
  index: number;
  active: boolean;
}) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `requestBriefingFaqFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes requestBriefingFaqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}