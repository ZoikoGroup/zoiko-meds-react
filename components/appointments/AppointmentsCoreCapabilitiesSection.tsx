"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AppointmentsCoreCapabilitiesSection
 * "Everything you need around a visit."
 *
 * Layout: light section, left-aligned eyebrow
 *         (03 · CORE CAPABILITIES)
 *         + 1-line headline (black + teal) + 3x2 card grid, each
 *           with an icon badge, title, description, and a linked
 *           action pinned to the bottom — all equal height.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const CARDS = [
  {
    title: "Appointment scheduling",
    body: "Start or request appointment scheduling where supported by provider or platform configuration.",
    action: "Schedule an Appointment",
    icon: "clipboard-check",
  },
  {
    title: "Upcoming visit tracking",
    body: "Clear visibility into upcoming, completed, canceled, and rescheduled appointments.",
    action: "Track Upcoming Visits",
    icon: "calendar",
  },
  {
    title: "Smart reminders",
    body: "Configurable reminders by email, SMS, push notification, or calendar event.",
    action: "Set Reminders",
    icon: "bell",
  },
  {
    title: "Visit preparation",
    body: "Checklist-driven preparation for forms, medications, questions, insurance, and location details.",
    action: "Prepare for Visit",
    icon: "clipboard",
  },
  {
    title: "Calendar sync",
    body: "Connect appointment dates to personal calendar tools where supported.",
    action: "Sync Calendar",
    icon: "refresh",
  },
  {
    title: "Follow-up management",
    body: "Organize post-visit tasks, referrals, follow-up appointments, and next steps.",
    action: "View Follow-Ups",
    icon: "check-square",
  },
] as const;

export default function AppointmentsCoreCapabilitiesSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>03</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Core Capabilities
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Everything you need <span style={{ color: ACCENT }}>around a visit.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <CardIcon name={card.icon} />
                </div>
                <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                  {card.title}
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                  {card.body}
                </p>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[12.5px] font-semibold hover:underline"
                  style={{ color: ACCENT }}
                >
                  {card.action}
                  <ArrowRightIcon />
                </a>
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
function CardIcon({ name }: { name: (typeof CARDS)[number]["icon"] }) {
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
    case "clipboard-check":
      return (
        <svg {...props}>
          <rect x="6" y="4" width="12" height="17" rx="2" />
          <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
          <path d="M9 13l2 2 4-4" />
        </svg>
      );
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
    case "clipboard":
      return (
        <svg {...props}>
          <rect x="6" y="4" width="12" height="17" rx="2" />
          <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
          <path d="M9 12h6M9 16h6" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...props}>
          <path d="M4 12a8 8 0 0 1 14-5.3M4 6v5h5" />
          <path d="M20 12a8 8 0 0 1-14 5.3M20 18v-5h-5" />
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
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `appointmentsCapabilitiesFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes appointmentsCapabilitiesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}