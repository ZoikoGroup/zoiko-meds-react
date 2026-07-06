"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SecurityTrustBoundariesSection
 * "What ZoikoMeds does — and does not do."
 *
 * Layout: light section, left-aligned eyebrow
 *         (01 · TRUST BOUNDARIES)
 *         + 1-line headline (black + teal) + 4-column card grid,
 *           each with a tinted icon badge, bold title, and description.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const CARDS = [
  {
    title: "Intelligence, not dispensing",
    body: "ZoikoMeds does not sell, prescribe, dispense, fulfill, or deliver medicine.",
    icon: "lines",
  },
  {
    title: "Controlled visibility",
    body: "Availability information is designed around confidence signals and authorized access, not unsafe public exposure of exact inventory quantities.",
    icon: "lock",
  },
  {
    title: "Role-based enterprise access",
    body: "Sensitive workflows are permission-controlled across organization, pharmacy, wholesale, reporting, and compliance users.",
    icon: "search",
  },
  {
    title: "Responsible AI boundaries",
    body: "AI-assisted insights support operational intelligence only and must not provide medical advice, diagnosis, treatment, prescribing, or substitution guidance.",
    icon: "spark",
  },
] as const;

export default function SecurityTrustBoundariesSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>01</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Trust Boundaries
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            What ZoikoMeds does — and <span style={{ color: ACCENT }}>does not do.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
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
    case "lines":
      return (
        <svg {...props}>
          <path d="M4 6h16M4 12h10M4 18h13" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityTrustFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityTrustFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}