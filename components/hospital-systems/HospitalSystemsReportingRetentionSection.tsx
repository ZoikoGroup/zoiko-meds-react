"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const REPORTING_POINTS = [
  {
    id: "saved-medicine-watchlists",
    title: "Saved medicine watchlists",
    description: "Keep teams focused on priority medicines and categories by user, role, facility, and region.",
    icon: (
      <path
        d="M4.5 3h7a1 1 0 011 1v9.2l-4.5-2.6-4.5 2.6V4a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "recurring-executive-briefings",
    title: "Recurring executive briefings",
    description: "Monthly, quarterly, and incident-triggered briefing schedules.",
    icon: (
      <path
        d="M4.2 2.5h6l2.6 2.6v8.4a.6.6 0 01-.6.6H4.2a.6.6 0 01-.6-.6V3.1a.6.6 0 01.6-.6zM9.8 2.5v2.6h2.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "alert-thresholds",
    title: "Alert thresholds",
    description: "Configurable thresholds with escalation rules for confidence, access risk, and shortage signals.",
    icon: (
      <path
        d="M8 2.5a3.2 3.2 0 013.2 3.2v1.9c0 .9.35 1.76.98 2.4l.42.42H3.4l.42-.42c.63-.64.98-1.5.98-2.4V5.7A3.2 3.2 0 018 2.5zM6.6 12.3a1.4 1.4 0 002.8 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "facility-region-views",
    title: "Facility & region views",
    description: "Filter by facility group, region, market, and medicine category.",
    icon: (
      <>
        <path
          d="M8 13.5S3.2 9.4 3.2 6.1a4.8 4.8 0 019.6 0c0 3.3-4.8 7.4-4.8 7.4z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="8" cy="6.1" r="1.6" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "briefing-history",
    title: "Briefing history",
    description: "Preserve institutional memory across leadership reviews with a timeline of reports, decisions, and exports.",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 5.2V8l2 1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    id: "customer-success-reviews",
    title: "Customer success reviews",
    description: "Health-score panel and success milestone tracking to support adoption and renewal value.",
    icon: (
      <path
        d="M3.2 8.4l3 3 6.6-6.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
] as const;

export default function HospitalSystemsReportingRetentionSection() {
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
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">09</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Reporting, Retention &amp; Customer Success
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Continuous infrastructure, </span>
            <span style={{ color: ACCENT }}>not a one-time report.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {REPORTING_POINTS.map((point, i) => (
            <Reveal key={point.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out group-hover:scale-110"
                  style={{ backgroundColor: "rgba(19,165,148,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {point.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{point.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {point.description}
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
      className="h-full"
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `hospitalSystemsReportingRetentionFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsReportingRetentionFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}