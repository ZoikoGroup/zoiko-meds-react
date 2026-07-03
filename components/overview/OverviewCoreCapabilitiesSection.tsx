"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OverviewCoreCapabilitiesSection
 * "Core capabilities built for medicine access intelligence."
 *
 * Layout: light section, left-aligned eyebrow
 *         (03 · CORE CAPABILITIES)
 *         + 2-line headline (black + teal) + 3x2 capability card grid,
 *           each with icon badge, title, description, and a linked action.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const CAPABILITIES = [
  {
    title: "Medicine availability intelligence",
    body: "Track structured signals indicating where medicines may be available, limited, uncertain, or at risk.",
    action: "Explore Intelligence",
    icon: "check",
  },
  {
    title: "Pharmacy verification workflows",
    body: "Enable authorized pharmacy confirmation pathways that strengthen availability confidence.",
    action: "View Pharmacy Network",
    icon: "pharmacy",
  },
  {
    title: "Shortage signal awareness",
    body: "Identify emerging shortage movement and access-risk patterns before they become operational blind spots.",
    action: "View AI Insights",
    icon: "alert",
  },
  {
    title: "Regional access analytics",
    body: "Understand medicine access patterns by city, state, region, territory, or operating market.",
    action: "View Analytics",
    icon: "pin",
  },
  {
    title: "Compliance-ready reporting",
    body: "Produce structured reports for leadership, operations, governance, and stakeholder communication.",
    action: "View Reports",
    icon: "document",
  },
  {
    title: "Enterprise collaboration",
    body: "Support role-based workflows across healthcare, pharmacy, wholesale, distribution, and public-health teams.",
    action: "Talk to Sales",
    icon: "people",
  },
] as const;

export default function OverviewCoreCapabilitiesSection() {
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
            Core Capabilities
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Core capabilities built for medicine
            <br />
            <span style={{ color: ACCENT }}>access intelligence.</span>
          </h2>
        </Reveal>

        {/* ── Capability card grid ── */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="h-full rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <CapabilityIcon name={card.icon} />
                </div>
                <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                  {card.title}
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                  {card.body}
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold hover:underline"
                  style={{ color: ACCENT }}
                >
                  {card.action}
                  <ArrowRightIcon />
                </a>
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
function CapabilityIcon({ name }: { name: (typeof CAPABILITIES)[number]["icon"] }) {
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
    case "check":
      return (
        <svg {...props}>
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
    case "pharmacy":
      return (
        <svg {...props}>
          <path d="M4 21V9l8-5 8 5v12" />
          <path d="M9 21v-6h6v6" />
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
    case "pin":
      return (
        <svg {...props}>
          <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
          <circle cx="12" cy="9.5" r="2.4" />
        </svg>
      );
    case "document":
      return (
        <svg {...props}>
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case "people":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M17 4.5c1.4.4 2.5 1.7 2.5 3.2S18.4 10.5 17 10.9" />
          <path d="M19 14.2c1.7.7 3 2.3 3 4.3" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewCapabilitiesFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewCapabilitiesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}