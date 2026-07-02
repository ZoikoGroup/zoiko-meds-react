"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const ROWS = [
  {
    useCase: "Shortage pressure visibility",
    outcome: "Earlier awareness of access friction.",
    layerPill: "ZoikoSignal™",
    action: "Explore Shortage Intelligence",
    href: "#",
  },
  {
    useCase: "Discharge & care navigation support",
    outcome: "Clearer patient access next steps.",
    layerPill: "Health Systems + ZoikoAvail™",
    action: "Request Health System Briefing",
    href: "#",
  },
  {
    useCase: "Digital health availability integration",
    outcome: "Availability-aware user journeys.",
    layerPill: "ZoikoAvail™ API",
    action: "Discuss API Access",
    href: "#",
  },
  {
    useCase: "Medicine data normalization",
    outcome: "Cleaner search, matching, and integration logic.",
    layerPill: "MediBase™",
    action: "Explore MediBase™",
    href: "#",
  },
  {
    useCase: "Public health access monitoring",
    outcome: "Better policy and preparedness visibility.",
    layerPill: "ZoikoSignal™ + Gov",
    action: "Request Public Health Briefing",
    href: "#",
  },
  {
    useCase: "Payer & member access intelligence",
    outcome: "Better member support and access-risk visibility.",
    layerPill: "ZoikoSignal™ + ZoikoAvail™",
    action: "Request Enterprise Briefing",
    href: "#",
  },
] as const;

export default function EnterpriseSolutionsOutcomesSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">03</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Use Cases &amp; Outcomes
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.3rem]">
            Institutional outcomes, by layer.
          </h2>
        </Reveal>

        {/* ── Table card ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">

            {/* Header row (Desktop only) */}
            <div className="hidden md:grid md:grid-cols-[1.8fr_2fr_1.8fr_2fr] bg-[#0F1F4E] px-6 py-3.5">
              {["Use Case", "Institutional Outcome", "Layer", "Action"].map((col) => (
                <span
                  key={col}
                  className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/60"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Data rows */}
            <div className="divide-y divide-[#F0F2F7]">
              {ROWS.map((row) => (
                <div
                  key={row.useCase}
                  className="transition-colors duration-150 hover:bg-[#F8FAFC]
                     px-5 py-5
                     md:grid md:grid-cols-[1.8fr_2fr_1.8fr_2fr] md:items-center md:gap-2 md:px-6 md:py-4"
                >
                  {/* Mobile Layout */}
                  <div className="space-y-4 md:hidden">
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9AA3B5]">
                        Use Case
                      </p>
                      <p className="text-[14px] font-semibold text-[#0F1F4E]">
                        {row.useCase}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9AA3B5]">
                        Institutional Outcome
                      </p>
                      <p className="text-[13px] leading-relaxed text-[#5B6478]">
                        {row.outcome}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span
                        className="inline-flex w-fit text-center items-center rounded-lg border px-2.5 py-1 text-[11px] font-medium"
                        style={{
                          borderColor: "#C8D8F0",
                          color: "#2A4A8A",
                          backgroundColor: "#EEF3FB",
                        }}
                      >
                        {row.layerPill}
                      </span>

                      <Link
                        href={row.href}
                        className="text-[13px] text-center font-semibold"
                        style={{ color: ACCENT }}
                      >
                        {row.action}
                      </Link>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <>
                    <span className="hidden md:block text-[13px] font-medium leading-snug text-[#0F1F4E]">
                      {row.useCase}
                    </span>

                    <span className="hidden md:block text-[13px] leading-snug text-[#5B6478]">
                      {row.outcome}
                    </span>

                    <span
                      className="hidden md:inline-flex w-fit items-center rounded-lg border px-2.5 py-1 text-[11.5px] font-medium leading-none"
                      style={{
                        borderColor: "#C8D8F0",
                        color: "#2A4A8A",
                        backgroundColor: "#EEF3FB",
                      }}
                    >
                      {row.layerPill}
                    </span>

                    <Link
                      href={row.href}
                      className="hidden md:block text-[13px] font-semibold transition-opacity hover:opacity-75"
                      style={{ color: ACCENT }}
                    >
                      {row.action}
                    </Link>
                  </>
                </div>
              ))}
            </div>

          </div>
        </Reveal>

        {/* ── Disclaimer bar ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#FEF3E2] text-[#D97706]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L1.5 13h13L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M8 6.5v3M8 11v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              Claim-control rule: no performance metrics, customer names,
              jurisdiction counts, verified pharmacy counts, signal volume, or
              outcome percentages are published unless verified and approved.
            </p>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `entOutcomesFadeUp 0.6s ease-out ${index * 100}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes entOutcomesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}