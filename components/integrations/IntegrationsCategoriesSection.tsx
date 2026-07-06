"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntegrationsCategoriesSection
 * "Connect the systems that power medicine access."
 *
 * Layout: light section, left-aligned eyebrow
 *         (03 · INTEGRATION CATEGORIES)
 *         + 2-line headline (black + teal) + 3-column card grid
 *           (7 cards, last row has one), each with an icon badge,
 *           title, description, a divider, a "Value:" line, and a
 *           linked action — all equal height via bottom-pinned footer.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const CARDS = [
  {
    title: "Pharmacy systems",
    body: "Pharmacy participation, verified confirmation workflows, availability confidence updates, and network status.",
    value: "strengthens availability signals without unsafe public inventory exposure.",
    action: "Explore Pharmacy Integration",
    icon: "portal",
  },
  {
    title: "Wholesale & distributor systems",
    body: "Approved partner signals, structured access intelligence, reporting feeds, and commercial coordination workflows.",
    value: "improves market visibility while protecting sensitive supply data.",
    action: "Talk to Sales",
    icon: "hex",
  },
  {
    title: "Healthcare operations & CRM",
    body: "Case handling, outreach, stakeholder workflows, access-support coordination, and internal task routing.",
    value: "turns medicine access intelligence into operational action.",
    action: "Discuss Operations Integration",
    icon: "user",
  },
  {
    title: "Analytics & BI platforms",
    body: "Dashboards, exports, trend analysis, executive reporting, and intelligence feeds.",
    value: "moves ZoikoMeds insights into existing decision environments.",
    action: "Discuss Analytics Integration",
    icon: "chart",
  },
  {
    title: "Identity & access management",
    body: "SSO, role-based access, enterprise authentication, permission groups, and admin controls.",
    value: "supports enterprise security and reduces deployment friction.",
    action: "Discuss Identity Integration",
    icon: "search",
  },
  {
    title: "Compliance, audit & reporting",
    body: "Evidence exports, report archives, governance records, access logs, and briefing outputs.",
    value: "supports regulated stakeholder review and oversight.",
    action: "Discuss Compliance Integration",
    icon: "shield",
  },
  {
    title: "Partner APIs",
    body: "Approved data exchange, custom workflows, sandbox testing, and partner-specific integrations.",
    value: "creates flexible implementation pathways for enterprise and technology partners.",
    action: "Explore Partner APIs",
    icon: "code",
  },
] as const;

export default function IntegrationsCategoriesSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>03</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Integration Categories
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Connect the systems that power
            <br />
            <span style={{ color: ACCENT }}>medicine access.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

                <div className="mt-auto pt-4">
                  <div className="mb-3 border-t" style={{ borderColor: "rgba(15,31,78,0.08)" }} />
                  <p className="text-[12px] leading-relaxed" style={{ color: `${NAVY}80` }}>
                    <span className="font-bold" style={{ color: ACCENT }}>
                      Value:
                    </span>{" "}
                    {card.value}
                  </p>
                  <a
                    href="#"
                    className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-semibold hover:underline"
                    style={{ color: ACCENT }}
                  >
                    {card.action}
                    <ArrowRightIcon />
                  </a>
                </div>
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
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `integrationsCategoriesFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes integrationsCategoriesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}