"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";

const ROWS = [
  {
    journey: "Search Medicines",
    requirements: "Visible labels, keyboard submit, screen-reader-friendly result cards, clear error messages, non-color-only signal states, large touch targets.",
    why: "Reduces abandonment in the highest-intent patient journey.",
  },
  {
    journey: "Create Account",
    requirements: "Accessible password fields, passkey/SSO readiness, plain error states, autocomplete support, clear focus states, accessible MFA flows.",
    why: "Improves account conversion and repeat use.",
  },
  {
    journey: "Saved Searches & Alerts",
    requirements: "Accessible list controls, pause/resume/delete states, privacy-safe notifications, screen-reader status announcements.",
    why: "Improves retention and repeat searches.",
  },
  {
    journey: "Caregiver Access",
    requirements: "Clear labels, accessible grouped searches, non-clinical language, understandable deletion and move states.",
    why: "Supports high-value caregiver return usage.",
  },
  {
    journey: "Availability Confidence",
    requirements: "Signal explanations with icon, color, label, meaning, next action, and accessible text equivalents.",
    why: "Builds trust in search results.",
  },
  {
    journey: "Pharmacy Portal",
    requirements: "Accessible data tables, role controls, confirmation queues, profile forms, audit states, and support flows.",
    why: "Supports pharmacy adoption and operational trust.",
  },
  {
    journey: "Provider Workflows",
    requirements: "Readable patient-safe language, accessible workflow diagrams, forms, and signal explanations.",
    why: "Supports provider and enterprise confidence.",
  },
  {
    journey: "Enterprise Dashboards",
    requirements: "Accessible summaries for charts, keyboard navigation, role-based surfaces, and text alternatives for data visuals.",
    why: "Supports procurement and security review.",
  },
] as const;

export default function AccessibilityJourneysSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">02</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Accessible Product Journeys
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Accessibility must work where the user </span>
            <span style={{ color: ACCENT }}>actually needs it.</span>
          </h2>
        </Reveal>

        {/* ── Table card ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">

            {/* Header row */}
            <div
              className="grid px-6 py-4 sm:px-8"
              style={{
                gridTemplateColumns: "1.2fr 2.6fr 1.6fr",
                backgroundColor: NAVY,
              }}
            >
              {["Journey", "Accessibility Requirements", "Why It Matters"].map((col) => (
                <span
                  key={col}
                  className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/60"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Data rows */}
            <div className="divide-y divide-[#F0F2F7]">
              {ROWS.map((row, i) => (
                <div
                  key={row.journey}
                  className="grid items-start gap-4 px-6 py-5 transition-colors duration-150 hover:bg-[#F0F2F7] sm:px-8"
                  style={{
                    gridTemplateColumns: "1.2fr 2.6fr 1.6fr",
                    backgroundColor: i % 2 === 1 ? "#FAFBFD" : "#FFFFFF",
                  }}
                >
                  {/* Journey */}
                  <span className="text-[13.5px] font-bold text-[#0F1F4E]">
                    {row.journey}
                  </span>

                  {/* Accessibility requirements */}
                  <span className="text-[13px] leading-relaxed text-[#3F4759]">
                    {row.requirements}
                  </span>

                  {/* Why it matters */}
                  <span className="text-[12.5px] leading-relaxed text-[#9AA1B4]">
                    {row.why}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `accessibilityJourneysFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes accessibilityJourneysFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}