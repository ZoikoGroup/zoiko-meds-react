"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PrescriptionsHowItWorksSection
 * "Three steps to organized medications."
 *
 * Layout: light section, left-aligned eyebrow
 *         (04 · HOW IT WORKS)
 *         + 1-line headline (black + teal) + 3-column numbered
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
    title: "Add or sync prescriptions",
    body: "Enter your medications or sync prescription information into your secure ZoikoMeds account.",
  },
  {
    title: "Organize and monitor",
    body: "See dosages, prescribers, refill windows, and status across all your medications in one place.",
  },
  {
    title: "Receive reminders and take action",
    body: "Get reminders for doses and refills, review details, and coordinate next steps with your care team or pharmacy.",
  },
] as const;

export default function PrescriptionsHowItWorksSection() {
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
            Three steps to <span style={{ color: ACCENT }}>organized medications.</span>
          </h2>
        </Reveal>

        {/* ── Step card row ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <span
                  className="mb-4 flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  {i + 1}
                </span>
                <p className="text-[14px] font-bold leading-snug" style={{ color: NAVY }}>
                  {step.title}
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `prescriptionsHowItWorksFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes prescriptionsHowItWorksFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}