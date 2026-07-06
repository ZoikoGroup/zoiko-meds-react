"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SecurityMonitoringSection
 * "Security is continuous, not one-time."
 *
 * Layout: light section, left-aligned eyebrow
 *         (08 · SECURITY MONITORING & INCIDENT RESPONSE)
 *         + 1-line headline (black + teal) + a 6-step numbered row
 *           (Detect → Review) followed by a 3-column card grid.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const STEPS = ["Detect", "Triage", "Contain", "Communicate", "Resolve", "Review"] as const;

const CARDS = [
  {
    title: "Monitoring posture",
    body: "Active monitoring, anomaly review, and alert routing as high-level controls.",
    icon: "monitor",
  },
  {
    title: "Operational resilience",
    body: "Continuity planning, backup principles, and service reliability cues without unsupported uptime claims.",
    icon: "loop",
  },
  {
    title: "Security contact path",
    body: "A clear route for security questions, responsible disclosure, or enterprise review.",
    icon: "phone",
  },
] as const;

export default function SecurityMonitoringSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>08</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Security Monitoring &amp; Incident Response
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Security is continuous, <span style={{ color: ACCENT }}>not one-time.</span>
          </h2>
        </Reveal>

        {/* ── Step row ── */}
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((step, i) => (
            <Reveal key={step} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col items-center justify-center gap-2.5 rounded-2xl border border-black/5 bg-white px-4 py-6 text-center shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  {i + 1}
                </span>
                <p className="text-[13px] font-semibold" style={{ color: NAVY }}>
                  {step}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Card grid ── */}
        <div className="mt-5 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={8 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <CardIcon name={card.icon} />
                </div>
                <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                  {card.title}
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                  {card.body}
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
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function CardIcon({ name }: { name: (typeof CARDS)[number]["icon"] }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ACCENT,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "monitor":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "loop":
      return (
        <svg {...props}>
          <path d="M4 12a8 8 0 0 1 14-5.3M4 6v5h5" />
          <path d="M20 12a8 8 0 0 1-14 5.3M20 18v-5h-5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <path d="M5 4h4l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2L20 15v4a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityMonitoringFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityMonitoringFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}