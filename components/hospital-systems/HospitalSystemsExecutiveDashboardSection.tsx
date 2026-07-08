"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const TOP_ACCESS_GAPS = [
  { id: "east-cat-a", label: "East region · Cat A", status: "Elevated", tone: "red" },
  { id: "south-cat-c", label: "South region · Cat C", status: "Watch", tone: "amber" },
  { id: "north-cat-b", label: "North region · Cat B", status: "Stable", tone: "green" },
] as const;

const REPORT_READINESS = [
  { id: "monthly-briefing", label: "Monthly briefing", status: "Ready", tone: "green" },
  { id: "compliance-export", label: "Compliance export", status: "Scheduled", tone: "blue" },
  { id: "audit-trail", label: "Audit trail", status: "Complete", tone: "green" },
] as const;

const TREND_BARS = [38, 58, 30, 66, 46, 74];

const TONE_STYLES: Record<string, { bg: string; text: string }> = {
  red: { bg: "rgba(208,69,90,0.1)", text: "#C0384F" },
  amber: { bg: "rgba(212,150,20,0.12)", text: "#B27E12" },
  green: { bg: "rgba(19,165,148,0.12)", text: "#13A594" },
  blue: { bg: "rgba(45,110,220,0.1)", text: "#2D6EDC" },
};

function StatusPill({ status, tone }: { status: string; tone: string }) {
  const styles = TONE_STYLES[tone];
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ backgroundColor: styles.bg, color: styles.text }}
    >
      {status}
    </span>
  );
}

export default function HospitalSystemsExecutiveDashboardSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">06</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Executive Dashboard &amp; Stakeholder Workspaces
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Decision-support views, </span>
            <span style={{ color: ACCENT }}>mapped to each role.</span>
          </h2>
        </Reveal>

        {/* ── Dashboard mock card ── */}
        <Reveal index={2} active={mounted}>
          <div
            className="mt-10 overflow-hidden rounded-2xl border bg-white lg:mt-12"
            style={{
              borderColor: "#E7EAF1",
              boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b px-6 py-4"
              style={{ borderColor: "#ECEFF5" }}
            >
              <h3 className="text-[14px] font-bold text-[#0F1F4E]">Executive command view</h3>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
                style={{ backgroundColor: "rgba(19,165,148,0.12)", color: ACCENT }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                  <path
                    d="M3.2 8.4l3 3 6.6-6.8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Demo
              </span>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0" style={{ borderColor: "#ECEFF5" }}>

              {/* Top access gaps */}
              <div className="p-6">
                <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#A6AEC0]">
                  Top access gaps
                </p>
                <div className="flex flex-col gap-3.5">
                  {TOP_ACCESS_GAPS.map((row) => (
                    <div key={row.id} className="flex items-center justify-between gap-3">
                      <span className="text-[13px] text-[#0F1F4E]">{row.label}</span>
                      <StatusPill status={row.status} tone={row.tone} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Shortage watch trend */}
              <div className="p-6">
                <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#A6AEC0]">
                  Shortage watch trend
                </p>
                <div className="flex h-20 items-end gap-2">
                  {TREND_BARS.map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md"
                      style={{
                        height: `${height}%`,
                        backgroundColor: "rgba(19,165,148,0.16)",
                      }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-[11.5px] leading-relaxed text-[#A6AEC0]">
                  Confidence movement over time — no exact inventory numbers.
                </p>
              </div>

              {/* Report readiness */}
              <div className="p-6">
                <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#A6AEC0]">
                  Report readiness
                </p>
                <div className="flex flex-col gap-3.5">
                  {REPORT_READINESS.map((row) => (
                    <div key={row.id} className="flex items-center justify-between gap-3">
                      <span className="text-[13px] text-[#0F1F4E]">{row.label}</span>
                      <StatusPill status={row.status} tone={row.tone} />
                    </div>
                  ))}
                </div>
              </div>

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
        animation: active ? `hospitalSystemsExecutiveDashboardFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsExecutiveDashboardFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}