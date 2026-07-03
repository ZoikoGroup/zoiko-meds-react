"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ReportsFAQSection
 * "Reporting questions, answered."
 *
 * Layout: light section, left-aligned eyebrow
 *         (08 · FREQUENTLY ASKED QUESTIONS)
 *         + 1-line headline (black + teal) + white accordion card,
 *           single-open, first item expanded by default.
 *
 * Brand accent: #0FAA87 | Navy: #0F1F4E
 */

const ACCENT = "#0FAA87";
const BG = "#F3F4F8";

const FAQS = [
  {
    q: "What are ZoikoMeds Reports?",
    a: "ZoikoMeds Reports are structured healthcare intelligence outputs that help authorized stakeholders review medicine availability signals, shortage indicators, pharmacy network activity, regional access patterns, and governance evidence.",
  },
  {
    q: "Does ZoikoMeds provide medical advice in its reports?",
    a: "No. Reports surface operational intelligence only — availability signals and network patterns — never clinical recommendations, diagnoses, or treatment guidance. Every report and preview carries a clear no-medical-advice label.",
  },
  {
    q: "Do ZoikoMeds Reports show exact pharmacy inventory?",
    a: "Unauthorized users see confidence tiers and signal strength rather than exact quantities. Precise inventory figures are only ever surfaced to permissioned, role-verified accounts within an organization.",
  },
  {
    q: "Who are ZoikoMeds Reports for?",
    a: "Procurement teams, pharmacy operations, compliance and governance functions, and executives at hospitals, retail pharmacies, distributors, and public health organizations who need availability intelligence rather than clinical data.",
  },
  {
    q: "Can organizations request custom medicine availability reports?",
    a: "Yes. Organizations can request reports scoped to a specific medicine category, region, or timeline through the sample request form, and briefings are routed by report interest and organization type.",
  },
  {
    q: "How do ZoikoMeds Reports support shortage awareness?",
    a: "Reports aggregate availability and network signals into early shortage indicators, giving teams lead time to plan sourcing and communication before a shortage becomes acute — without exposing sensitive inventory data.",
  },
] as const;

export default function ReportsFAQSection() {
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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60 text-[#0F1F4E]">08</span>
            <span className="opacity-40 text-[#0F1F4E]">·</span>
            Frequently Asked Questions
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.3rem]">
            Reporting questions, <span style={{ color: ACCENT }}>answered.</span>
          </h2>
        </Reveal>

        {/* ── Accordion card ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
            {FAQS.map((item, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={item.q}
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgba(15,31,78,0.08)" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                  >
                    <span className="text-[13.5px] font-bold text-[#0F1F4E]">{item.q}</span>
                    <span
                      className="relative flex h-4 w-4 shrink-0 items-center justify-center"
                      style={{ color: ACCENT }}
                    >
                      <PlusMinusIcon open={open} />
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[13px] leading-relaxed text-[#0F1F4E]/60 sm:px-8">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icon                                                               */
/* ------------------------------------------------------------------ */
function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1V13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{
          transition: "transform 0.25s ease",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transformOrigin: "center",
        }}
      />
      <path d="M1 7H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `reportsFaqFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes reportsFaqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}