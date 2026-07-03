"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ReportsRelationshipSection
 * "Reports as an ongoing intelligence relationship." + "Implementation path"
 *
 * Layout: left-aligned eyebrow (06 · DELIVERY & RETENTION MODEL) + 2-line headline (black + teal)
 *         + 3-column x 2-row card grid (icon, title, description)
 *         + "Implementation path" sub-heading + 3-column x 2-row numbered step grid.
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

const RETENTION_CARDS = [
  {
    title: "Recurring report packs",
    description: "Weekly, monthly, quarterly, or event-triggered reports by medicine category, region, and stakeholder group.",
    icon: (
      <>
        <path d="M4.5 1.5h5l2 2V14a.5.5 0 01-.5.5h-6a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M6 7h4M6 9.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Saved report views",
    description: "Save report configurations for priority medicines, geographies, and network segments.",
    icon: (
      <path d="M4 2h8v12l-4-2.5L4 14V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Alert-triggered reports",
    description: "Generated when confidence, access risk, demand, or shortage signal thresholds change.",
    icon: (
      <path d="M8 1.5c-2 0-3.5 1.6-3.5 3.6v2.7c0 .6-.2 1.2-.6 1.7L3 10.5h10l-.9-1c-.4-.5-.6-1.1-.6-1.7V5.1c0-2-1.5-3.6-3.5-3.6zM6.5 12.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Briefing history",
    description: "Stores prior briefing summaries, report packs, assumptions, and follow-up actions.",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 4.75V8l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Role-based distribution",
    description: "Different reports for executives, operations, compliance, and partnership teams.",
    icon: (
      <>
        <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    title: "Governance archive",
    description: "Maintains report evidence, dates, disclaimers, scope, and source notes.",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
] as const;

const IMPLEMENTATION_STEPS = [
  {
    title: "Request sample",
    description: "Tell us which report type and region matters to your team.",
  },
  {
    title: "Scope alignment",
    description: "We confirm reporting needs, stakeholders, regions, and governance requirements.",
  },
  {
    title: "Sample review",
    description: "Your team reviews a safe sample report structure and reporting model.",
  },
  {
    title: "Briefing",
    description: "We walk through report use cases, operating model, and next steps.",
  },
  {
    title: "Report pack configuration",
    description: "ZoikoMeds configures recurring report packs and access roles where applicable.",
  },
  {
    title: "Ongoing review",
    description: "Reports support continued monitoring, governance, and stakeholder updates.",
  },
] as const;

export default function ReportsRelationshipSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">06</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Delivery &amp; Retention Model
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Reports as an ongoing </span>
            <span style={{ color: ACCENT }}>intelligence</span>
            <br />
            <span style={{ color: ACCENT }}>relationship.</span>
          </h2>
        </Reveal>

        {/* ── Retention card grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RETENTION_CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Implementation path ── */}
        <Reveal index={8} active={mounted}>
          <h3 className="mt-14 text-[1.4rem] font-extrabold text-[#0F1F4E]">
            Implementation path
          </h3>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {IMPLEMENTATION_STEPS.map((step, i) => (
            <Reveal key={step.title} index={9 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <span
                  className="mb-4 flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  {i + 1}
                </span>

                <h4 className="text-[14.5px] font-bold text-[#0F1F4E]">{step.title}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `reportsRelationshipFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes reportsRelationshipFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}