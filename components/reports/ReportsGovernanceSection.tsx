"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ReportsGovernanceSection
 * "Institutional-grade discipline."
 *
 * Layout: dark navy section, left-aligned eyebrow
 *         (05 · GOVERNANCE, PRIVACY & REPORT CONTROLS)
 *         + 1-line headline (white + teal) + full-width 3-column table card:
 *           CONTROL | REQUIREMENT | RISK PREVENTED, with alternating row shading.
 *
 * Brand accent: #0FAA87 | Navy: #0F1F4E
 */

const ACCENT = "#0FAA87";
const NAVY = "#0A0E17";
const PANEL = "#0F1730";

const ROWS = [
  {
    control: "No medical advice",
    requirement: "Displayed in hero, sample footer, FAQ, and report templates.",
    risk: "Clinical misinterpretation.",
  },
  {
    control: "No dispensing",
    requirement: "ZoikoMeds does not sell, prescribe, dispense, or deliver medicine.",
    risk: "Marketplace / pharmacy confusion.",
  },
  {
    control: "No exact inventory exposure",
    requirement: "Confidence tiers and signal strength instead of exact quantities for unauthorized users.",
    risk: "Sensitive inventory leakage.",
  },
  {
    control: "Role-based report access",
    requirement: "Access-controlled by user type, organization, and permission.",
    risk: "Unauthorized disclosure.",
  },
  {
    control: "Evidence & timestamping",
    requirement: "Reports show generated date, source logic, scope, exclusions, and owner.",
    risk: "Weak auditability.",
  },
  {
    control: "AI boundary label",
    requirement: "AI-assisted sections labeled operational intelligence, not clinical recommendations.",
    risk: "Unsafe automation claims.",
  },
  {
    control: "Synthetic sample data",
    requirement: "Public previews use safe sample data only.",
    risk: "Confidential data exposure.",
  },
  {
    control: "Export governance",
    requirement: "PDF/CSV/API exports respect permissions and watermarking where applicable.",
    risk: "Uncontrolled sharing.",
  },
] as const;

export default function ReportsGovernanceSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-60 text-white">05</span>
            <span className="opacity-40 text-white">·</span>
            Governance, Privacy &amp; Report Controls
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            Institutional-<span style={{ color: ACCENT }}>grade discipline.</span>
          </h2>
        </Reveal>

        {/* ── Table card ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">

            {/* Header row */}
            <div
              className="grid px-6 py-4 sm:px-8"
              style={{ gridTemplateColumns: "1.3fr 2.6fr 1.6fr", backgroundColor: PANEL }}
            >
              {["Control", "Requirement", "Risk Prevented"].map((col) => (
                <span
                  key={col}
                  className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Data rows */}
            <div>
              {ROWS.map((row, i) => (
                <div
                  key={row.control}
                  className="grid items-start gap-4 px-6 py-5 transition-colors duration-150 hover:brightness-125 sm:px-8"
                  style={{
                    gridTemplateColumns: "1.3fr 2.6fr 1.6fr",
                    backgroundColor: i % 2 === 1 ? PANEL : NAVY,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Control */}
                  <span className="text-[13.5px] font-bold text-white">
                    {row.control}
                  </span>

                  {/* Requirement */}
                  <span className="text-[13px] leading-relaxed text-white/60">
                    {row.requirement}
                  </span>

                  {/* Risk prevented */}
                  <span className="text-[12.5px] leading-relaxed text-white/40">
                    {row.risk}
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `reportsGovernanceFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes reportsGovernanceFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}