"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * OverviewStakeholderUseCasesSection
 * "Built for the stakeholders behind medicine access."
 *
 * Layout: light section, left-aligned eyebrow
 *         (06 · STAKEHOLDER USE CASES)
 *         + 2-line headline (black + teal) + pill tab bar + a white
 *           card showing Problem / Platform Value for the active
 *           stakeholder, plus a CTA button.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const STAKEHOLDERS = [
  {
    label: "Healthcare Providers",
    problem: "Limited visibility into medicine access patterns and patient availability friction.",
    value: "Identify access trends, shortage signals, and regional confidence movement.",
    cta: "Book a Provider Briefing",
    link:"/request-a-briefing"
  },
  {
    label: "Pharmacies",
    problem: "Manual, inconsistent ways to signal availability and confirm stock confidence to partners.",
    value: "Participate in verification workflows that strengthen network-wide availability confidence.",
    cta: "Join the Pharmacy Network",
    link:"/join-the-network"
  },
  {
    label: "Wholesalers & Distributors",
    problem: "Fragmented demand and network signals make allocation and planning reactive.",
    value: "Access structured demand, network, and confidence intelligence across regions.",
    cta: "Talk to Distribution Team",
    link:"#"
  },
  {
    label: "Manufacturers",
    problem: "Little downstream signal on where access is weakening before shortages become visible.",
    value: "Monitor shortage risk and regional access movement tied to specific product lines.",
    cta: "Request a Manufacturer Demo",
    link:"#"
  },
  {
    label: "Public Health & Government",
    problem: "Delayed, fragmented data on medicine access makes population-level response slower.",
    value: "Review compliance-ready regional access and shortage-awareness reporting.",
    cta: "Request a Public Health Briefing",
    link:"#"
  },
  {
    label: "Enterprise Partners",
    problem: "Difficulty integrating availability intelligence into existing enterprise workflows.",
    value: "Connect ZoikoMeds intelligence into dashboards, reporting, and partner systems.",
    cta: "Talk to Partnerships",
    link:"#"
  },
] as const;

export default function OverviewStakeholderUseCasesSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const router = useRouter();

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

  const current = STAKEHOLDERS[active];

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>06</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Stakeholder Use Cases
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Built for the stakeholders behind
            <br />
            <span style={{ color: ACCENT }}>medicine access.</span>
          </h2>
        </Reveal>

        {/* ── Tab bar ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {STAKEHOLDERS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className="rounded-full px-4 py-2 text-[13px] font-semibold transition-colors"
                  style={
                    isActive
                      ? { backgroundColor: ACCENT, color: "#fff" }
                      : { backgroundColor: "#fff", color: NAVY, border: "1px solid rgba(15,31,78,0.1)" }
                  }
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Detail card ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-5 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] sm:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
              <div>
                <p
                  className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  Problem
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: `${NAVY}CC` }}>
                  {current.problem}
                </p>
              </div>

              <div>
                <p
                  className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  Platform Value
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: `${NAVY}CC` }}>
                  {current.value}
                </p>
              </div>

              <a
                href={current.link}
                className="whitespace-nowrap rounded-xl px-6 py-3 text-center text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                {current.cta}
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewStakeholderFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewStakeholderFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}