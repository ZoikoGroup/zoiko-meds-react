"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PrescriptionsCaregiverSection
 * "Coordinate care, with privacy respected."
 *
 * Layout: light section, left-aligned eyebrow
 *         (07 · CAREGIVER & FAMILY COORDINATION)
 *         + 1-line headline (black + teal) + 2-column grid: left a
 *           divided checklist of 4 items, right a dark "Shared
 *           access" card with 3 access rows and role badges.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";
const PANEL = "#0B1226";

const ITEMS = [
  {
    lead: "Shared visibility",
    body: "give a caregiver or family coordinator a consolidated view of medication schedules and statuses.",
  },
  {
    lead: "Permission controls",
    body: "you decide who can view or help manage prescriptions, and you can change access any time.",
  },
  {
    lead: "Reminder coordination",
    body: "caregivers can help keep dose and refill reminders on track.",
  },
  {
    lead: "Privacy-respecting",
    body: "shared access is consent-based and scoped, never automatic.",
  },
] as const;

const ACCESS_ROWS = [
  {
    initials: "AM",
    title: "Account holder",
    subtitle: "You · full access",
    badge: "Owner",
  },
  {
    initials: "JR",
    title: "Family coordinator",
    subtitle: "View schedules & reminders",
    badge: "Viewer",
  },
] as const;

export default function PrescriptionsCaregiverSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>07</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Caregiver &amp; Family Coordination
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Coordinate care, with <span style={{ color: ACCENT }}>privacy respected.</span>
          </h2>
        </Reveal>

        {/* ── Grid: checklist + shared access card ── */}
        <div className="mt-9 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">

          {/* Checklist */}
          <Reveal index={2} active={mounted}>
            <div className="flex flex-col">
              {ITEMS.map((item, i) => (
                <div
                  key={item.lead}
                  className="flex gap-3 py-4"
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgba(15,31,78,0.08)" }}
                >
                  <CheckIcon />
                  <p className="text-[13.5px] leading-relaxed" style={{ color: `${NAVY}CC` }}>
                    <span className="font-bold" style={{ color: NAVY }}>
                      {item.lead}
                    </span>{" "}
                    — {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Shared access card */}
          <Reveal index={3} active={mounted}>
            <div className="rounded-2xl p-6 sm:p-7" style={{ backgroundColor: PANEL }}>
              <p className="mb-5 flex items-center gap-2 text-[13.5px] font-semibold text-white">
                <UserIcon />
                Shared access
              </p>

              <div className="flex flex-col divide-y divide-white/10">
                {ACCESS_ROWS.map((row) => (
                  <div key={row.title} className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{ backgroundColor: `${ACCENT}40` }}
                      >
                        {row.initials}
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold text-white">{row.title}</p>
                        <p className="text-[11.5px] text-white/45">{row.subtitle}</p>
                      </div>
                    </div>
                    <span
                      className="shrink-0 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold"
                      style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)" }}
                    >
                      {row.badge}
                    </span>
                  </div>
                ))}

                {/* Invite row */}
                <div className="flex items-center justify-between gap-3 py-3.5 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed text-white/60"
                      style={{ borderColor: "rgba(255,255,255,0.25)" }}
                    >
                      <PlusIcon />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-white">Invite a caregiver</p>
                      <p className="text-[11.5px] text-white/45">Consent-based, scoped access</p>
                    </div>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                    style={{ backgroundColor: ACCENT, color: "#fff" }}
                  >
                    Invite
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

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
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
      <path d="M4 10.2l3.2 3.2L16 5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M17 4.5c1.4.4 2.5 1.7 2.5 3.2S18.4 10.5 17 10.9" />
      <path d="M19 14.2c1.7.7 3 2.3 3 4.3" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `prescriptionsCaregiverFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes prescriptionsCaregiverFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}