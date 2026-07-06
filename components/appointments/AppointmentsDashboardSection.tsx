"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AppointmentsDashboardSection
 * "All your visits, organized and sortable."
 *
 * Layout: light section, left-aligned eyebrow
 *         (05 · UPCOMING VISIT DASHBOARD)
 *         + 1-line headline (black + teal) + a dashboard card:
 *           "Your appointments" header with a filter pill row
 *           (Upcoming / Completed / Rescheduled / Canceled), and a
 *           2x2 grid of appointment rows with status badges and
 *           action buttons.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const FILTERS = ["Upcoming", "Completed", "Rescheduled", "Canceled"] as const;

const APPOINTMENTS = [
  {
    name: "Dr. Rivera",
    subtitle: "Follow-up · General consultation",
    status: "Confirmed",
    statusTone: "confirmed",
    dateLine: "Apr 18, 10:30 AM",
    locationLine: "Midtown Clinic",
    dateIcon: "calendar",
    locationIcon: "pin",
    actions: ["View details", "Reschedule"],
  },
  {
    name: "Dr. Okafor",
    subtitle: "Specialist · Telehealth",
    status: "Pending",
    statusTone: "pending",
    dateLine: "Apr 24, 2:00 PM",
    locationLine: "Telehealth link",
    dateIcon: "calendar",
    locationIcon: "video",
    actions: ["Confirm", "Add to calendar"],
  },
  {
    name: "City Lab",
    subtitle: "Lab · In-person",
    status: "Reschedule",
    statusTone: "reschedule",
    dateLine: "Apr 30, 8:15 AM",
    locationLine: "Downtown Lab",
    dateIcon: "calendar",
    locationIcon: "pin",
    actions: ["Pick new time", "View details"],
  },
  {
    name: "Dr. Nguyen",
    subtitle: "Annual · In-person",
    status: "Follow-up due",
    statusTone: "followup",
    dateLine: "Completed Mar 12",
    locationLine: "1 follow-up task",
    dateIcon: "calendar",
    locationIcon: "check",
    actions: ["View follow-up", "Book next"],
  },
] as const;

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: "rgba(19,165,148,0.14)", text: ACCENT },
  pending: { bg: "rgba(59,130,246,0.14)", text: "#2563EB" },
  reschedule: { bg: "rgba(245,158,11,0.16)", text: "#B45309" },
  followup: { bg: "rgba(15,31,78,0.08)", text: `${NAVY}99` },
};

export default function AppointmentsDashboardSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("Upcoming");

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
            Upcoming Visit Dashboard
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            All your visits, <span style={{ color: ACCENT }}>organized and sortable.</span>
          </h2>
        </Reveal>

        {/* ── Dashboard card ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] sm:p-7">

            {/* Header row */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                Your appointments
              </p>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((filter) => {
                  const isActive = filter === activeFilter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors"
                      style={
                        isActive
                          ? { backgroundColor: ACCENT, color: "#fff" }
                          : { backgroundColor: "#F7F8FB", color: `${NAVY}99`, border: "1px solid rgba(15,31,78,0.08)" }
                      }
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Appointment grid */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2">
              {APPOINTMENTS.map((appt, i) => {
                const statusStyle = STATUS_STYLES[appt.statusTone];
                const needsTopBorder = i >= 2;
                return (
                  <div
                    key={appt.name}
                    className={needsTopBorder ? "border-t pt-6" : ""}
                    style={{ borderColor: "rgba(15,31,78,0.08)" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                          {appt.name}
                        </p>
                        <p className="mt-0.5 text-[12px]" style={{ color: `${NAVY}80` }}>
                          {appt.subtitle}
                        </p>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                      >
                        {appt.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-col gap-1.5">
                      <p className="flex items-center gap-1.5 text-[12.5px]" style={{ color: `${NAVY}99` }}>
                        <MetaIcon name={appt.dateIcon} />
                        {appt.dateLine}
                      </p>
                      <p className="flex items-center gap-1.5 text-[12.5px]" style={{ color: `${NAVY}99` }}>
                        <MetaIcon name={appt.locationIcon} />
                        {appt.locationLine}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {appt.actions.map((action) => (
                        <button
                          key={action}
                          type="button"
                          className="rounded-lg border px-3.5 py-1.5 text-[12px] font-semibold transition-colors hover:bg-black/[0.02]"
                          style={{ borderColor: `${ACCENT}40`, color: ACCENT, backgroundColor: `${ACCENT}0D` }}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
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
function MetaIcon({ name }: { name: string }) {
  const props = {
    width: 13,
    height: 13,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "shrink-0",
  };

  switch (name) {
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
          <circle cx="12" cy="9.5" r="2.4" />
        </svg>
      );
    case "video":
      return (
        <svg {...props}>
          <rect x="2" y="6" width="14" height="12" rx="2" />
          <path d="M16 10l6-3v10l-6-3" />
        </svg>
      );
    case "check":
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

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `appointmentsDashboardFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes appointmentsDashboardFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}