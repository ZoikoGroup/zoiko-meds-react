"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const RULES = [
  {
    title: "Prescription rules",
    description: "Prescription laws, provider instructions, pharmacy verification, and pharmacist judgment always apply.",
  },
  {
    title: "Pharmacy confirmation",
    description: "Confirm directly with the pharmacy before traveling, relying on availability signals, or making plans.",
  },
  {
    title: "Controlled medicines",
    description: "Controlled, restricted, high-risk, or jurisdiction-sensitive medicines may be limited, suppressed, or routed through additional safeguards.",
    linkLabel: "Read the Controlled Medicine Policy →",
    linkHref: "/controlled-medicine-policy",
  },
  {
    title: "Jurisdiction variation",
    description: "Medicine access, prescription requirements, pharmacist authority, privacy rules, and pharmacy regulations vary by location.",
  },
  {
    title: "Product information",
    description: "Medicine names, strengths, forms, and availability signals may require pharmacy or healthcare professional confirmation.",
  },
  {
    title: "Provider workflows",
    description: "Provider-facing outputs support access conversations only and do not replace clinical workflows, EHRs, prescribing systems, or pharmacist review.",
  },
  {
    title: "Enterprise outputs",
    description: "Enterprise intelligence is aggregated, governed, contract-scoped, and not patient-level clinical guidance.",
  },
] as const;

export default function MedicalDisclaimerRulesSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
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
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">04</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Prescription, Pharmacy, Emergency &amp; Jurisdiction Rules
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">The rules that </span>
            <span style={{ color: ACCENT }}>always apply.</span>
          </h2>
        </Reveal>

        {/* ── Rules card ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">
            <div className="divide-y divide-[#F0F2F7]">
              {RULES.map((rule, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1.6fr_3.4fr] items-start gap-6 px-6 py-5 transition-colors duration-150 hover:bg-[#F8FAFC] sm:px-8"
                >
                  {/* Title with checkmark */}
                  <span className="flex items-start gap-2.5 text-[13.5px] font-bold text-[#0F1F4E]">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: ACCENT }}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8.5l3.5 3.5 6.5-7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {rule.title}
                  </span>

                  {/* Description (+ optional link) */}
                  <span className="text-[13px] leading-relaxed text-[#5B6478]">
                    {rule.description}{" "}
                    {"linkLabel" in rule && rule.linkLabel && (
                      <a
                        href={rule.linkHref}
                        className="font-semibold underline-offset-2 hover:underline"
                        style={{ color: ACCENT }}
                      >
                        {rule.linkLabel}
                      </a>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `medDiscRulesFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes medDiscRulesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}