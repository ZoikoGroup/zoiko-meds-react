"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AppointmentsOverviewSection
 * "Scheduling, visit tracking, and reminders in one account."
 *
 * Layout: light section, left-aligned eyebrow
 *         (02 · APPOINTMENT OVERVIEW)
 *         + 2-line headline (black + teal) + 3-column stat card row
 *           + a single full-width card with a horizontal 4-step
 *           flow (Schedule → Prepare → Attend → Follow up).
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const STATS = [
  { value: "3", label: "Upcoming visits", icon: "calendar" },
  { value: "5", label: "Reminders set", icon: "bell" },
  { value: "2", label: "Follow-ups due", icon: "check-square" },
] as const;

const FLOW = ["Schedule", "Prepare", "Attend", "Follow up"] as const;

export default function AppointmentsOverviewSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>02</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Appointment Overview
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Scheduling, visit tracking, and reminders
            <br />
            in <span style={{ color: ACCENT }}>one account.</span>
          </h2>
        </Reveal>

        {/* ── Stat card row ── */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} index={2 + i} active={mounted}>
              <div className="flex h-full items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <StatIcon name={stat.icon} />
                </div>
                <div>
                  <p className="text-[1.7rem] font-extrabold leading-none" style={{ color: NAVY }}>
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[12.5px]" style={{ color: `${NAVY}99` }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Flow card ── */}
        <Reveal index={5} active={mounted}>
          <div className="mt-4 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
              {FLOW.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {i + 1}
                    </span>
                    <p className="whitespace-nowrap text-[13.5px] font-bold" style={{ color: NAVY }}>
                      {step}
                    </p>
                  </div>
                  {i < FLOW.length - 1 && <ArrowRightIcon />}
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
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function StatIcon({ name }: { name: (typeof STATS)[number]["icon"] }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ACCENT,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props}>
          <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    case "check-square":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 12.5l2.5 2.5L16 9" />
        </svg>
      );
    default:
      return null;
  }
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0" style={{ color: `${NAVY}40` }}>
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `appointmentsOverviewFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes appointmentsOverviewFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}