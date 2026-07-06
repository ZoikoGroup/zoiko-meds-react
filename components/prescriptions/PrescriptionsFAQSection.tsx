"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PrescriptionsFAQSection
 * "Prescription questions, answered."
 *
 * Layout: light section, left-aligned eyebrow
 *         (09 · FREQUENTLY ASKED QUESTIONS)
 *         + 1-line headline (black + teal) + white accordion card,
 *           single-open, first item expanded by default.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const FAQS = [
  {
    q: "How can I manage my prescriptions online?",
    a: "ZoikoMeds helps you organize medications, view prescription details, track refill timing, and set reminders in one secure place.",
  },
  {
    q: "Can ZoikoMeds remind me when it is time to take or refill my medication?",
    a: "Yes. You can configure dose, refill, and medication-review reminders that fit your routine, with alerts delivered ahead of upcoming refill windows.",
  },
  {
    q: "Does ZoikoMeds prescribe or dispense medications?",
    a: "No. ZoikoMeds does not prescribe, dispense, fulfill, or deliver medications. It supports organization and visibility of your prescription information, not clinical or pharmacy services.",
  },
  {
    q: "Can I view past prescriptions?",
    a: "Yes. A structured archive of historical prescriptions and changes over time is available, so you can review completed courses and past dosage updates.",
  },
] as const;

export default function PrescriptionsFAQSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>09</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Frequently Asked Questions
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Prescription questions, <span style={{ color: ACCENT }}>answered.</span>
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
                    <span className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                      {item.q}
                    </span>
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
                      <p className="px-6 pb-5 text-[13px] leading-relaxed sm:px-8" style={{ color: `${NAVY}99` }}>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `prescriptionsFaqFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes prescriptionsFaqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}