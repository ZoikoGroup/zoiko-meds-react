"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OverviewCustomerSuccessSection
 * "Ongoing value after adoption."
 *
 * Layout: light section, left-aligned eyebrow
 *         (10 · CUSTOMER SUCCESS & RETENTION)
 *         + 1-line headline (black + teal) + 4-column card grid,
 *           all cards equal height with a hover lift, and a final
 *           teal-tinted "See it in a demo" CTA card sized the same
 *           as the rest.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const CARDS = [
  {
    title: "Saved medicine watchlists",
    body: "Keep teams focused on priority medicines and categories.",
    icon: "bookmark",
  },
  {
    title: "Regional monitoring views",
    body: "Monitor access conditions by geography.",
    icon: "pin",
  },
  {
    title: "Recurring reports",
    body: "Scheduled visibility for leadership and operations.",
    icon: "device",
  },
  {
    title: "Alert thresholds",
    body: "Flag confidence shifts, access risks, and shortage movement.",
    icon: "bell",
  },
  {
    title: "Briefing history",
    body: "Preserve institutional memory across reviews.",
    icon: "clock",
  },
  {
    title: "Partner participation signals",
    body: "Strengthen network value as more verified stakeholders participate.",
    icon: "portal",
  },
  {
    title: "Role-based dashboards",
    body: "Align leadership, operations, compliance, pharmacy, and partner teams.",
    icon: "card",
  },
] as const;

export default function OverviewCustomerSuccessSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>10</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Customer Success &amp; Retention
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Ongoing value <span style={{ color: ACCENT }}>after adoption.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/10 hover:shadow-[0_8px_24px_rgba(15,31,78,0.08)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <CardIcon name={card.icon} />
                </div>
                <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                  {card.title}
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}

          {/* See it in a demo CTA card — same size as the rest */}
          <Reveal index={2 + CARDS.length} active={mounted}>
            <a
              href="#book-a-demo"
              className="group flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(19,165,148,0.15)]"
              style={{ backgroundColor: `${ACCENT}14`, borderColor: `${ACCENT}40` }}
            >
              <div
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ backgroundColor: "#fff" }}
              >
                <ArrowIcon />
              </div>
              <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                See it in a demo
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                Book a demo to explore recurring value.
              </p>
              <span
                className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                style={{ color: ACCENT }}
              >
                Book a Demo
                <ArrowRightIcon />
              </span>
            </a>
          </Reveal>
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
    case "bookmark":
      return (
        <svg {...props}>
          <path d="M6 3h12v18l-6-4-6 4V3Z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
          <circle cx="12" cy="9.5" r="2.4" />
        </svg>
      );
    case "device":
      return (
        <svg {...props}>
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props}>
          <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "portal":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <path d="M9 15V9l6 6V9" />
        </svg>
      );
    case "card":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    default:
      return null;
  }
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewCustomerSuccessFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewCustomerSuccessFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}