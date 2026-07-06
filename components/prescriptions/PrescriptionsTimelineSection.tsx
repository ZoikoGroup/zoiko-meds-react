"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PrescriptionsTimelineSection
 * "See your medication journey over time."
 *
 * Layout: light section, left-aligned eyebrow
 *         (05 · MEDICATION TIMELINE)
 *         + 1-line headline (black + teal) + subtext + a vertical
 *           timeline: a connecting line that animates growing
 *           downward as the section enters view, with status-colored
 *           icon nodes and staggered fade-up entries.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

type Status = "active" | "updated" | "paused" | "completed";

const STATUS_STYLES: Record<Status, { bg: string; text: string; label: string }> = {
  active: { bg: "rgba(19,165,148,0.14)", text: ACCENT, label: "Active" },
  updated: { bg: "rgba(59,130,246,0.14)", text: "#2563EB", label: "Updated" },
  paused: { bg: "rgba(245,158,11,0.16)", text: "#B45309", label: "Paused" },
  completed: { bg: "rgba(19,165,148,0.14)", text: ACCENT, label: "Completed" },
};

const EVENTS = [
  {
    title: "Medication A started",
    status: "active" as Status,
    meta: "Jan 4 · 10 mg daily",
    body: "Prescribed by Dr. Rivera. Reminder set for 8:00 AM daily.",
    icon: "calendar",
  },
  {
    title: "Medication B dosage updated",
    status: "updated" as Status,
    meta: "Feb 12 · 25 mg twice daily",
    body: "Dosage change recorded. Next refill window approaching in 3 days.",
    icon: "refresh",
  },
  {
    title: "Medication C paused",
    status: "paused" as Status,
    meta: "Mar 2 · 5 mg as needed",
    body: "Marked as paused. You can reactivate this medication any time.",
    icon: "pause",
  },
  {
    title: "Medication D course completed",
    status: "completed" as Status,
    meta: "Mar 20 · 7-day course",
    body: "Course finished and archived in your prescription history.",
    icon: "check",
  },
];

export default function PrescriptionsTimelineSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>05</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Medication Timeline
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            See your medication <span style={{ color: ACCENT }}>journey over time.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>
            A chronological view of starts, dosage updates, refill windows, paused
            medications, and completed courses.
          </p>
        </Reveal>

        {/* ── Timeline ── */}
        <div className="relative mt-10 max-w-2xl">
          {/* Animated connecting line */}
          <div
            className="absolute left-[13px] top-2 w-px"
            style={{
              bottom: "1.75rem",
              backgroundColor: "rgba(15,31,78,0.12)",
            }}
          >
            <div
              className="w-full"
              style={{
                backgroundColor: ACCENT,
                height: mounted ? "100%" : "0%",
                transition: "height 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s",
              }}
            />
          </div>

          <div className="flex flex-col gap-9">
            {EVENTS.map((event, i) => {
              const style = STATUS_STYLES[event.status];
              return (
                <Reveal key={event.title} index={3 + i} active={mounted}>
                  <div className="relative flex gap-4 pl-0">
                    {/* Node */}
                    <div
                      className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 bg-white"
                      style={{
                        borderColor: style.text,
                        transform: mounted ? "scale(1)" : "scale(0.5)",
                        opacity: mounted ? 1 : 0,
                        transition: `transform 0.4s ease ${0.3 + i * 0.18}s, opacity 0.4s ease ${0.3 + i * 0.18}s`,
                      }}
                    >
                      <EventIcon name={event.icon} color={style.text} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                          {event.title}
                        </p>
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                          style={{ backgroundColor: style.bg, color: style.text }}
                        >
                          {style.label}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px]" style={{ color: `${NAVY}66` }}>
                        {event.meta}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                        {event.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function EventIcon({ name, color }: { name: string; color: string }) {
  const props = {
    width: 12,
    height: 12,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
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
    case "refresh":
      return (
        <svg {...props}>
          <path d="M4 12a8 8 0 0 1 14-5.3M4 6v5h5" />
          <path d="M20 12a8 8 0 0 1-14 5.3M20 18v-5h-5" />
        </svg>
      );
    case "pause":
      return (
        <svg {...props}>
          <rect x="7" y="5" width="3.5" height="14" rx="1" />
          <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
        </svg>
      );
    case "check":
      return (
        <svg {...props} fill={color} stroke="none">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12.5l2.5 2.5L16 9" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `prescriptionsTimelineFadeUp 0.6s ease-out ${index * 150}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes prescriptionsTimelineFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}