"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OverviewHowItWorksSection
 * "From signal capture to accountable action."
 *
 * Layout: light section, left-aligned eyebrow
 *         (05 · HOW ZOIKOMEDS WORKS)
 *         + 2-line headline (black + teal) + 5-column numbered step
 *           card grid, each with a teal number badge, title, and body.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const STEPS = [
  {
    title: "Capture signals",
    body: "Capture structured search, availability, demand, network, and partner signals.",
  },
  {
    title: "Classify confidence",
    body: "Organize signals into confidence tiers instead of unsafe public inventory claims.",
  },
  {
    title: "Verify where appropriate",
    body: "Use authorized pharmacy and partner workflows to strengthen confidence and reduce uncertainty.",
  },
  {
    title: "Analyze patterns",
    body: "Use analytics and AI-assisted intelligence to identify access gaps, confidence movement, and shortage risk.",
  },
  {
    title: "Report & act",
    body: "Provide dashboards, alerts, reports, and briefings for operational decision-making.",
  },
] as const;

export default function OverviewHowItWorksSection() {
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
            How ZoikoMeds Works
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            From signal capture to <span style={{ color: ACCENT }}>accountable</span>
            <br />
            <span style={{ color: ACCENT }}>action.</span>
          </h2>
        </Reveal>

        {/* ── Step card grid ── */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} index={2 + i} active={mounted}>
              <div className="h-full rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewHowItWorksFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewHowItWorksFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}