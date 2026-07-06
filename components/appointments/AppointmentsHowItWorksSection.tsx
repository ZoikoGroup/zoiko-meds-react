"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AppointmentsHowItWorksSection
 * "From schedule to follow-up."
 *
 * Layout: light section, left-aligned eyebrow
 *         (04 · HOW IT WORKS)
 *         + 1-line headline (black + teal) + 5-column numbered
 *           step card row, each with a teal number badge, title,
 *           and description — all equal height.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const STEPS = [
  {
    title: "Create or sign in",
    body: "Create a patient account or sign in to view appointment tools.",
  },
  {
    title: "Schedule or add visit",
    body: "Schedule where enabled or add a healthcare appointment manually.",
  },
  {
    title: "Prepare and sync",
    body: "Set reminders, review the checklist, add documents, and sync your calendar.",
  },
  {
    title: "Attend and track",
    body: "Mark visit status and keep your appointment history organized.",
  },
  {
    title: "Follow up",
    body: "Track next steps, follow-up tasks, prescriptions, or future appointments.",
  },
] as const;

export default function AppointmentsHowItWorksSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>04</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            How It Works
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            From schedule to <span style={{ color: ACCENT }}>follow-up.</span>
          </h2>
        </Reveal>

        {/* ── Step card row ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <span
                  className="mb-4 flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  {i + 1}
                </span>
                <p className="text-[13.5px] font-bold leading-snug" style={{ color: NAVY }}>
                  {step.title}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                  {step.body}
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
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `appointmentsHowItWorksFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes appointmentsHowItWorksFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}