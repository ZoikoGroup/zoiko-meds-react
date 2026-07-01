"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const ROWS = [
  {
    capability: "Medicine availability search",
    meaning: "Search participating verified pharmacy availability signals by medicine and location.",
    action: "Review the signal and confirm directly with the pharmacy before traveling.",
  },
  {
    capability: "Availability confidence",
    meaning: "Results may show confidence-based signals, freshness labels, and confirmation guidance.",
    action: "Use the signal to decide what to check next, not as proof of stock.",
  },
  {
    capability: "Saved searches",
    meaning: "Account users can save medicine and location searches for repeat use.",
    action: "Run saved searches again, because availability can change.",
  },
  {
    capability: "Availability alerts",
    meaning: "Users may receive notifications when saved availability signals change.",
    action: "Review the updated signal and confirm with the pharmacy.",
  },
  {
    capability: "Caregiver organization",
    meaning: "Caregivers may organize saved searches and alerts for someone they support.",
    action: "Use labels for organization, not as medical authority or clinical records.",
  },
  {
    capability: "Provider & enterprise workflows",
    meaning: "Approved organizations may use governed workflows, APIs, and intelligence products.",
    action: "Use outputs according to contract, access controls, and legal review.",
  },
] as const;

export default function MedicalDisclaimerCapabilitiesSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">01</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            What ZoikoMeds Provides
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Useful availability information — with a</span>
          </h2>
        </Reveal>
        <Reveal index={2} active={mounted}>
          <p className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: ACCENT }}>
            clear boundary.
          </p>
        </Reveal>

        {/* ── Table card ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">

            {/* Header row */}
            <div
              className="grid px-6 py-4"
              style={{
                gridTemplateColumns: "1.4fr 2.2fr 2fr",
                backgroundColor: "#0F1F4E",
              }}
            >
              {["Capability", "What It Means", "Safe User Action"].map((col) => (
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
                  key={i}
                  className="grid items-start gap-4 px-6 py-5 transition-colors duration-150 hover:bg-[#F8FAFC]"
                  style={{ gridTemplateColumns: "1.4fr 2.2fr 2fr" }}
                >
                  {/* Capability */}
                  <span className="text-[13.5px] font-bold text-[#0F1F4E]">
                    {row.capability}
                  </span>

                  {/* What it means */}
                  <span className="text-[13px] leading-relaxed text-[#5B6478]">
                    {row.meaning}
                  </span>

                  {/* Safe user action */}
                  <span className="flex items-start gap-2 text-[13px] leading-relaxed text-[#5B6478]">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: ACCENT }}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8.5l3.5 3.5 6.5-7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {row.action}
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `medDiscCapFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes medDiscCapFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}