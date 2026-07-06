"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PrescriptionsRefillTrackingSection
 * "Never lose track of a dose or a refill."
 *
 * Layout: light section, left-aligned eyebrow
 *         (06 · REMINDERS & REFILL TRACKING)
 *         + 1-line headline (black + teal) + 2-column grid: left a
 *           "Refill countdown" card with a demo badge and 3 progress
 *           rows, right a stacked set of 3 action cards.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const REFILLS = [
  { name: "Medication B · 25 mg", days: 3, progress: 15, badgeBg: "rgba(245,158,11,0.16)", badgeText: "#B45309" },
  { name: "Medication A · 10 mg", days: 11, progress: 55, badgeBg: "rgba(59,130,246,0.14)", badgeText: "#2563EB" },
  { name: "Medication E · 50 mg", days: 24, progress: 75, badgeBg: "rgba(19,165,148,0.14)", badgeText: ACCENT },
] as const;

const ACTIONS = [
  {
    title: "Set reminder",
    body: "Configure dose, refill, and medication-review reminders that fit your routine.",
    action: "Set reminder",
    icon: "bell",
  },
  {
    title: "Review details",
    body: "Check dosage, prescriber, and status before your refill window.",
    action: "Review details",
    icon: "eye",
  },
  {
    title: "Contact support",
    body: "Get help with your account, reminders, or medication organization — not clinical advice.",
    action: "Contact support",
    icon: "phone",
  },
] as const;

export default function PrescriptionsRefillTrackingSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>06</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Reminders &amp; Refill Tracking
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Never lose track of <span style={{ color: ACCENT }}>a dose or a refill.</span>
          </h2>
        </Reveal>

        {/* ── Grid: refill card + action cards ── */}
        <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">

          {/* Refill countdown card */}
          <Reveal index={2} active={mounted}>
            <div className="h-full rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                  Refill countdown
                </p>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  <CheckIcon />
                  Demo
                </span>
              </div>

              <div className="flex flex-col divide-y" style={{ borderColor: "rgba(15,31,78,0.06)" }}>
                {REFILLS.map((med) => (
                  <div key={med.name} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${ACCENT}1A` }}
                    >
                      <PillIcon />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                          {med.name}
                        </p>
                        <span
                          className="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold"
                          style={{ backgroundColor: med.badgeBg, color: med.badgeText }}
                        >
                          {med.days}d
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11.5px]" style={{ color: `${NAVY}66` }}>
                        Refill in {med.days} days
                      </p>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(15,31,78,0.08)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: ACCENT,
                            width: mounted ? `${med.progress}%` : "0%",
                            transition: "width 1s cubic-bezier(0.22,1,0.36,1) 0.3s",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Action cards */}
          <div className="flex flex-col gap-4">
            {ACTIONS.map((action, i) => (
              <Reveal key={action.title} index={3 + i} active={mounted}>
                <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                  <div className="flex items-start gap-3.5">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${ACCENT}1A` }}
                    >
                      <ActionIcon name={action.icon} />
                    </div>
                    <div>
                      <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                        {action.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                        {action.body}
                      </p>
                      <a
                        href="#"
                        className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold hover:underline"
                        style={{ color: ACCENT }}
                      >
                        {action.action}
                        <ArrowRightIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function PillIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)" />
      <path d="M9.5 9.5l5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ActionIcon({ name }: { name: (typeof ACTIONS)[number]["icon"] }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ACCENT,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "bell":
      return (
        <svg {...props}>
          <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    case "eye":
      return (
        <svg {...props}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <path d="M5 4h4l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2L20 15v4a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z" />
        </svg>
      );
    default:
      return null;
  }
}

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `prescriptionsRefillFadeUp 0.6s ease-out ${index * 100}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes prescriptionsRefillFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}