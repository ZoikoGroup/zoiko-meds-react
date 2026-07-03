"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OverviewIntegrationsSection
 * "Interoperable and implementation-ready."
 *
 * Layout: light section, left-aligned eyebrow
 *         (08 · INTEGRATIONS)
 *         + 2-line headline (black + teal) + 3-column card grid,
 *           all cards equal height with a hover lift, and a final
 *           teal-tinted "Discuss integrations" CTA card sized the
 *           same as the rest.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const CARDS = [
  {
    title: "Pharmacy systems",
    body: "Pharmacy participation, verification workflows, and availability confidence updates.",
    icon: "portal",
  },
  {
    title: "Distributor & wholesale systems",
    body: "Authorized partner workflows, structured reporting, and supply visibility signals.",
    icon: "hex",
  },
  {
    title: "Healthcare CRM & operations",
    body: "Enterprise stakeholder management, outreach workflows, and case handling.",
    icon: "user",
  },
  {
    title: "Analytics & BI",
    body: "Dashboards, report exports, and structured intelligence feeds.",
    icon: "chart",
  },
  {
    title: "Identity & access management",
    body: "SSO, role-based permissions, and enterprise authentication.",
    icon: "lock",
  },
  {
    title: "Compliance & audit tools",
    body: "Evidence trails, reporting exports, and governance workflows.",
    icon: "shield",
  },
  {
    title: "API layer",
    body: "Secure APIs for approved platform integrations and enterprise use cases.",
    icon: "code",
  },
] as const;

export default function OverviewIntegrationsSection() {
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
            Integrations
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Interoperable and <span style={{ color: ACCENT }}>implementation-</span>
            <br />
            <span style={{ color: ACCENT }}>ready.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/10 hover:shadow-[0_8px_24px_rgba(15,31,78,0.08)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200"
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

          {/* Discuss integrations CTA card — same size as the rest */}
          <Reveal index={2 + CARDS.length} active={mounted}>
            <a
              href="#talk-to-sales"
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
                Discuss integrations
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                Talk to sales about your systems and implementation readiness.
              </p>
              <span
                className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                style={{ color: ACCENT }}
              >
                Talk to Sales
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
    case "portal":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <path d="M9 15V9l6 6V9" />
        </svg>
      );
    case "hex":
      return (
        <svg {...props}>
          <path d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9L12 3Z" />
        </svg>
      );
    case "user":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M4 20V10M12 20V4M20 20v-7" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewIntegrationsFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewIntegrationsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}