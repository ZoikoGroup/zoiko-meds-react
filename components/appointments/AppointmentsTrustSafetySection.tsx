"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AppointmentsTrustSafetySection
 * "Secure coordination, with clear boundaries."
 *
 * Layout: light section, left-aligned eyebrow
 *         (01 · TRUST & SAFETY)
 *         + 2-line headline (black + teal) + 4-column card grid,
 *           each with a tinted icon badge, bold title, and description.
 *           The "Not for emergencies" card uses an amber warning
 *           badge instead of teal to stand out.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const WARN = "#DC6803";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const CARDS = [
  {
    title: "Secure patient access",
    body: "Appointment information is protected through secure account access and privacy-aware controls.",
    icon: "lock",
    tone: "accent",
  },
  {
    title: "Not for emergencies",
    body: "ZoikoMeds is not an emergency service. Patients should contact emergency services for urgent or life-threatening situations.",
    icon: "alert",
    tone: "warn",
  },
  {
    title: "No medical advice",
    body: "ZoikoMeds helps organize appointment information. It does not diagnose, treat, prescribe, or replace clinical judgment.",
    icon: "ban",
    tone: "accent",
  },
  {
    title: "Reminder-driven utility",
    body: "Use reminders, calendar sync, and preparation tasks to stay organized before and after visits.",
    icon: "bell",
    tone: "accent",
  },
] as const;

export default function AppointmentsTrustSafetySection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>01</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Trust &amp; Safety
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Secure coordination, with <span style={{ color: ACCENT }}>clear</span>
            <br />
            <span style={{ color: ACCENT }}>boundaries.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => {
            const color = card.tone === "warn" ? WARN : ACCENT;
            return (
              <Reveal key={card.title} index={2 + i} active={mounted}>
                <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${color}1A` }}
                  >
                    <CardIcon name={card.icon} color={color} />
                  </div>
                  <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                    {card.title}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                    {card.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function CardIcon({ name, color }: { name: (typeof CARDS)[number]["icon"]; color: string }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "lock":
      return (
        <svg {...props}>
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "alert":
      return (
        <svg {...props}>
          <path d="M12 3l10 18H2L12 3Z" />
          <path d="M12 10v4" />
          <path d="M12 17.5v.01" />
        </svg>
      );
    case "ban":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M6 6l12 12" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props}>
          <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `appointmentsTrustFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes appointmentsTrustFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}