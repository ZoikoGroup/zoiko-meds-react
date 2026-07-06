"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntegrationsOverviewSection
 * "Integration-ready for healthcare, pharmacy, and enterprise workflows."
 *
 * Layout: light section, left-aligned eyebrow
 *         (02 · INTEGRATION OVERVIEW)
 *         + 2-line headline (black + teal) + subtext + 4-column
 *           card grid, all cards equal height.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const CARDS = [
  {
    title: "Connect existing systems",
    body: "Link approved systems to ZoikoMeds workflows instead of forcing teams to operate in isolated dashboards.",
    icon: "code",
  },
  {
    title: "Strengthen availability confidence",
    body: "Use verified pharmacy and partner participation to improve the quality of medicine availability signals.",
    icon: "check",
  },
  {
    title: "Improve operational visibility",
    body: "Route intelligence to teams, dashboards, reports, and workflows where decisions are made.",
    icon: "chart",
  },
  {
    title: "Support governance",
    body: "Maintain permission controls, evidence trails, and safe boundaries around sensitive healthcare-adjacent data.",
    icon: "shield",
  },
] as const;

export default function IntegrationsOverviewSection() {
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
            Integration Overview
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="max-w-2xl text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Integration-ready for healthcare, pharmacy, and{" "}
            <span style={{ color: ACCENT }}>enterprise workflows.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>
            Integrations are not merely technical connectors; they are controlled pathways
            that help stakeholders act on access signals, strengthen verification confidence,
            monitor shortage movement, and generate operational reports.
          </p>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={3 + i} active={mounted}>
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
    case "code":
      return (
        <svg {...props}>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M4 20V10M12 20V4M20 20v-7" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `integrationsOverviewFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes integrationsOverviewFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}