"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntegrationsHowItWorksSection
 * "From integration discovery to production-ready data workflows."
 *
 * Layout: light section, left-aligned eyebrow
 *         (04 · HOW INTEGRATIONS WORK)
 *         + 2-line headline (black + teal) + subtext + 7-column
 *           numbered step card row, each with a teal number badge,
 *           title, description, a divider, and an exit-gate label
 *           pinned to the bottom — all equal height.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const STEPS = [
  {
    title: "Discovery",
    body: "Define stakeholder type, systems, data needs, access boundaries, compliance posture, and objective.",
    gate: "Approved scope",
  },
  {
    title: "Security & data review",
    body: "Review authentication, authorization, minimization, retention, logging, privacy, and permitted use.",
    gate: "Data-use approval",
  },
  {
    title: "Sandbox access",
    body: "Provide sandbox credentials, mock data, sample APIs, test reports, and documentation.",
    gate: "Sandbox connected",
  },
  {
    title: "Mapping & config",
    body: "Map systems, medicine identifiers, roles, events, reports, and workflow triggers.",
    gate: "Validated mappings",
  },
  {
    title: "Pilot deployment",
    body: "Launch a limited production pilot with monitoring, error handling, rollback, and success criteria.",
    gate: "Pilot acceptance",
  },
  {
    title: "Production go-live",
    body: "Activate production credentials, monitoring dashboards, support channels, and reporting cadence.",
    gate: "Go-live approval",
  },
  {
    title: "Optimization",
    body: "Review adoption, sync health, report usage, stakeholder value, and expansion opportunities.",
    gate: "Quarterly plan",
  },
] as const;

export default function IntegrationsHowItWorksSection() {
  const [mounted, setMounted] = useState(false);
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>04</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            How Integrations Work
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            From integration discovery to
            <br />
            <span style={{ color: ACCENT }}>production-ready data workflows.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>
            Each stage has a clear exit gate before the next begins.
          </p>
        </Reveal>

        {/* ── Step card row ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} index={3 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <span
                  className="mb-3 flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  {i + 1}
                </span>
                <p className="text-[13px] font-bold leading-snug" style={{ color: NAVY }}>
                  {step.title}
                </p>
                <p className="mt-2 text-[11.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                  {step.body}
                </p>

                <div className="mt-auto pt-4">
                  <div className="mb-2.5 border-t" style={{ borderColor: "rgba(15,31,78,0.08)" }} />
                  <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.06em]" style={{ color: ACCENT }}>
                    <CheckIcon />
                    {step.gate}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `integrationsHowItWorksFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes integrationsHowItWorksFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}