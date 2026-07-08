"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const FAQS = [
  {
    id: "what-is-zoikomeds",
    question: "What is ZoikoMeds for clinic networks?",
    answer:
      "ZoikoMeds helps clinic networks understand medicine availability signals, pharmacy network activity, shortage risks, and regional access patterns across multiple locations.",
  },
  {
    id: "medical-advice",
    question: "Does ZoikoMeds provide medical advice to clinic patients?",
    answer:
      "No. ZoikoMeds provides operational intelligence and access visibility — not diagnosis, treatment, prescribing, or medical advice.",
  },
  {
    id: "pharmacy-dispensing",
    question: "Is ZoikoMeds a pharmacy or dispensing platform?",
    answer:
      "No. ZoikoMeds does not sell, prescribe, dispense, fulfill, or deliver medicines. The platform supports medicine access visibility and operational intelligence.",
  },
  {
    id: "how-use",
    question: "How can clinic networks use ZoikoMeds?",
    answer:
      "Clinic networks use ZoikoMeds to monitor availability signals, understand pharmacy network participation, identify shortage risks, escalate access concerns to the right teams, and generate compliance-conscious reports for leadership.",
  },
  {
    id: "multi-location",
    question: "Can ZoikoMeds support multi-location clinic management?",
    answer:
      "Yes. ZoikoMeds is built for multi-location clinic networks with location views, regional dashboards, role-based access controls, and location-specific or network-wide reporting.",
  },
  {
    id: "exact-inventory",
    question: "Does ZoikoMeds show exact pharmacy inventory quantities?",
    answer:
      "No. ZoikoMeds uses confidence-based signals and filters to communicate availability without exposing exact stock quantities to unauthorized users.",
  },
  {
    id: "integration",
    question: "Can ZoikoMeds integrate with clinic network systems?",
    answer:
      "Yes. ZoikoMeds supports approved integrations with clinic operations systems, reporting platforms, identity and access systems, pharmacy workflows, and analytics environments.",
  },
] as const;

export default function ClinicNetworksFAQSection() {
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
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">11</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Frequently Asked Questions
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Clinic network questions, </span>
            <span style={{ color: ACCENT }}>answered.</span>
          </h2>
        </Reveal>

        {/* ── Accordion ── */}
        <Reveal index={2} active={mounted}>
          <div
            className="mt-10 overflow-hidden rounded-2xl border bg-white lg:mt-12"
            style={{
              borderColor: "#E7EAF1",
              boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
            }}
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
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 ease-out hover:bg-[#FAFBFD] sm:px-7 sm:py-6"
      >
        <span
          className="text-[14px] font-bold transition-colors duration-200"
          style={{ color: isOpen ? "#13A594" : "#0F1F4E" }}
        >
          {faq.question}
        </span>
        <span
          className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          style={{ color: "#13A594" }}
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

      {/* Grid-based height animation */}
      <div
        className="grid transition-[grid-template-rows] duration-[350ms] ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className="px-6 pb-5 text-[13.5px] leading-relaxed transition-opacity duration-300 ease-out sm:px-7 sm:pb-6"
            style={{
              color: "#5B6478",
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
        animation: active ? `clinicNetworksFaqFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksFaqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}