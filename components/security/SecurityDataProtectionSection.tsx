"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SecurityDataProtectionSection
 * "Privacy-aware by architecture."
 *
 * Layout: light section, left-aligned eyebrow
 *         (04 · DATA PROTECTION & PRIVACY)
 *         + 1-line headline (black + teal) + 3x2 card grid, all
 *           equal height with a hover lift, and a final teal-tinted
 *           "Privacy Center" CTA card sized the same as the rest.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const CARDS = [
  {
    title: "Data minimization",
    body: "Collect and process only the data needed for medicine availability intelligence, stakeholder workflows, and reporting.",
    icon: "lines",
  },
  {
    title: "Encryption",
    body: "Protect data in transit and at rest using enterprise-grade encryption practices.",
    icon: "lock",
  },
  {
    title: "Controlled retention",
    body: "Retain records according to defined business, governance, and legal requirements.",
    icon: "clock",
  },
  {
    title: "Privacy-aware workflows",
    body: "Designed to avoid unnecessary exposure of sensitive user, pharmacy, or commercial information.",
    icon: "shield",
  },
  {
    title: "Responsible reporting",
    body: "Reports are structured, role-based, and appropriate for the receiving stakeholder.",
    icon: "list",
  },
] as const;

export default function SecurityDataProtectionSection() {
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
            Data Protection &amp; Privacy
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Privacy-aware by <span style={{ color: ACCENT }}>architecture.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/10 hover:shadow-[0_8px_24px_rgba(15,31,78,0.08)]">
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

          {/* Privacy Center CTA card — same size as the rest */}
          <Reveal index={2 + CARDS.length} active={mounted}>
            <a
              href="#privacy-center"
              className="group flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(19,165,148,0.15)]"
              style={{ backgroundColor: `${ACCENT}14`, borderColor: `${ACCENT}40` }}
            >
              <div
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ backgroundColor: "#fff" }}
              >
                <ArrowIcon />
              </div>
              <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                Privacy Center
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                Reach privacy details, notices, and controls.
              </p>
              <span
                className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                style={{ color: ACCENT }}
              >
                Visit Privacy Center
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
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        </svg>
      );
    case "list":
      return (
        <svg {...props}>
          <path d="M8 6h13M8 12h13M8 18h13" />
          <path d="M3 6h.01M3 12h.01M3 18h.01" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityDataProtectionFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityDataProtectionFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}