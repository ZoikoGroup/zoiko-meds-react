"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SecurityFAQSection
 * "Security questions, answered."
 *
 * Layout: light section, left-aligned eyebrow
 *         (12 · FREQUENTLY ASKED QUESTIONS)
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
    q: "How does ZoikoMeds protect medicine availability intelligence?",
    a: "ZoikoMeds protects medicine availability intelligence through role-based access, privacy-aware workflows, auditability, responsible AI boundaries, security monitoring, and governance controls designed for healthcare-sensitive enterprise use.",
  },
  {
    q: "Is ZoikoMeds a pharmacy or online medicine seller?",
    a: "No. ZoikoMeds does not sell, prescribe, dispense, fulfill, or deliver medicine. It is a medicine availability intelligence platform, not a transactional pharmacy or marketplace.",
  },
  {
    q: "Does ZoikoMeds expose exact pharmacy inventory quantities?",
    a: "No. Unauthorized users see confidence tiers and signal strength instead of exact stock counts. Precise quantities are only ever surfaced to permissioned, role-verified accounts.",
  },
  {
    q: "Does ZoikoMeds provide medical advice?",
    a: "No. ZoikoMeds never provides diagnosis, treatment, prescribing, substitution, or patient-specific clinical guidance. All outputs are labeled as operational intelligence, not clinical recommendations.",
  },
  {
    q: "What security controls are important for ZoikoMeds enterprise users?",
    a: "Role-based access control, SSO and identity management, encryption in transit and at rest, audit trails, data minimization, and responsible AI boundaries are core controls for enterprise use.",
  },
  {
    q: "Can enterprise teams review ZoikoMeds security before deployment?",
    a: "Yes. Enterprise teams can request a security review pack covering platform boundaries, the access model, integration security, data governance, and deployment readiness.",
  },
  {
    q: "How does ZoikoMeds govern AI-assisted insights?",
    a: "AI-assisted insights are bounded, explainable where possible, subject to human review for sensitive cases, and restricted from clinical recommendations or automatic public claims.",
  },
  {
    q: "Who should request a ZoikoMeds security briefing?",
    a: "Security, compliance, IT, and procurement stakeholders evaluating ZoikoMeds for enterprise deployment, vendor risk review, or integration with existing healthcare systems.",
  },
] as const;

export default function SecurityFAQSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>12</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Frequently Asked Questions
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Security questions, <span style={{ color: ACCENT }}>answered.</span>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityFaqFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityFaqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}