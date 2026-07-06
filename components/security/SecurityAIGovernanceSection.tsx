"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SecurityAIGovernanceSection
 * "Operational intelligence, not clinical authority."
 *
 * Layout: dark navy section, left-aligned eyebrow
 *         (06 · RESPONSIBLE AI GOVERNANCE)
 *         + 2-line headline (white + teal) + 3x2 dark card grid,
 *           each with an icon badge, small teal eyebrow label,
 *           bold title, and description — all equal height.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0A0E17";
const PANEL = "#111A30";

const CARDS = [
  {
    label: "Operational intelligence only",
    title: "Non-clinical boundary",
    body: "AI outputs must not diagnose, prescribe, substitute, or recommend treatment.",
    icon: "ban",
  },
  {
    label: "Explainability",
    title: "Why a signal changed",
    body: "AI-assisted insights should show why a signal changed where possible.",
    icon: "circle",
  },
  {
    label: "Human review",
    title: "Authorized review",
    body: "Sensitive insights support authorized review before operational action.",
    icon: "user",
  },
  {
    label: "Policy enforcement",
    title: "Bounded outputs",
    body: "Outputs are bounded by platform policies and healthcare safety restrictions.",
    icon: "shield",
  },
  {
    label: "Audit trail",
    title: "Reviewable generation",
    body: "AI insight generation, review, and export should be auditable where appropriate.",
    icon: "lines",
  },
  {
    label: "Escalation path",
    title: "No automatic public claims",
    body: "High-risk insights route to authorized internal review, not automatic public claims.",
    icon: "alert",
  },
] as const;

export default function SecurityAIGovernanceSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60 text-white">06</span>
            <span className="opacity-40 text-white">·</span>
            Responsible AI Governance
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            Operational intelligence, <span style={{ color: ACCENT }}>not clinical</span>
            <br />
            <span style={{ color: ACCENT }}>authority.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 p-6" style={{ backgroundColor: PANEL }}>
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}26` }}
                >
                  <CardIcon name={card.icon} />
                </div>
                <p
                  className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: ACCENT }}
                >
                  {card.label}
                </p>
                <p className="text-[13.5px] font-bold text-white">{card.title}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-white/50">{card.body}</p>
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
    case "ban":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M6 6l12 12" />
        </svg>
      );
    case "circle":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
    case "user":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        </svg>
      );
    case "lines":
      return (
        <svg {...props}>
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      );
    case "alert":
      return (
        <svg {...props}>
          <path d="M12 3l10 18H2L12 3Z" />
          <path d="M12 10v4" />
          <path d="M12 17.5v.01" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityAIGovernanceFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityAIGovernanceFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}