"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PrescriptionsSummarySection
 * "One patient view for everything about your medications."
 *
 * Layout: light section, left-aligned eyebrow
 *         (02 · PRESCRIPTION SUMMARY)
 *         + 2-line headline (black + teal) + subtext + 3-column
 *           stat card row, each with an icon badge and a large
 *           stat value with label.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const STATS = [
  { value: "4", suffix: "", label: "Active prescriptions", icon: "pill" },
  { value: "2", suffix: "", label: "Upcoming refills", icon: "refresh" },
  { value: "8:00", suffix: "AM", label: "Next reminder", icon: "bell" },
] as const;

export default function PrescriptionsSummarySection() {
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
            Prescription Summary
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            One patient view for everything about
            <br />
            <span style={{ color: ACCENT }}>your medications.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>
            Centralize medication names, dosage details, prescriber information, refill
            dates, reminders, and active or inactive status — all in one secure place.
          </p>
        </Reveal>

        {/* ── Stat card row ── */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} index={3 + i} active={mounted}>
              <div className="flex h-full items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <StatIcon name={stat.icon} />
                </div>
                <div>
                  <p className="flex items-baseline gap-1 text-[1.7rem] font-extrabold leading-none" style={{ color: NAVY }}>
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-[13px] font-bold" style={{ color: NAVY }}>
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                  <p className="mt-1.5 text-[12.5px]" style={{ color: `${NAVY}99` }}>
                    {stat.label}
                  </p>
                </div>
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
    case "pill":
      return (
        <svg {...props}>
          <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)" />
          <path d="M9.5 9.5l5 5" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...props}>
          <path d="M4 12a8 8 0 0 1 14-5.3M4 6v5h5" />
          <path d="M20 12a8 8 0 0 1-14 5.3M20 18v-5h-5" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `prescriptionsSummaryFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes prescriptionsSummaryFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}