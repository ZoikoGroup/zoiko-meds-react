"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OverviewPlatformSummarySection
 * "One platform for medicine availability signals, pharmacy network
 *  intelligence, and healthcare access visibility."
 *
 * Layout: light section, left-aligned eyebrow
 *         (02 · PLATFORM SUMMARY)
 *         + 3-line headline (black + teal) + 4-column capability card
 *           grid + a numbered 5-row workflow list inside a white card.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const CAPABILITIES = [
  {
    title: "Medicine availability signals",
    body: "Understand where medicine access may be available, uncertain, strengthening, or weakening.",
    icon: "check",
  },
  {
    title: "Pharmacy network coordination",
    body: "Support verified pharmacy participation and confidence-building confirmation workflows.",
    icon: "pharmacy",
  },
  {
    title: "Healthcare intelligence",
    body: "Convert search, demand, availability, and network signals into actionable insights.",
    icon: "chart",
  },
  {
    title: "Responsible reporting",
    body: "Generate structured reports for operations, leadership, compliance, and public-health review.",
    icon: "document",
  },
] as const;

const WORKFLOW = [
  {
    title: "Data signals",
    body: "Search, availability, demand, network, and partner signals.",
  },
  {
    title: "Verification & confidence layer",
    body: "Organize signals into confidence tiers with authorized confirmation.",
  },
  {
    title: "Analytics & AI insights",
    body: "Identify access gaps, confidence movement, and shortage risk.",
  },
  {
    title: "Reports & briefings",
    body: "Package intelligence into compliance-conscious outputs.",
  },
  {
    title: "Stakeholder workflows",
    body: "Role-based dashboards and actions across the ecosystem.",
  },
] as const;

export default function OverviewPlatformSummarySection() {
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
            Platform Summary
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="max-w-3xl text-[1.85rem] font-extrabold leading-tight sm:text-[2.15rem]" style={{ color: NAVY }}>
            One platform for medicine availability signals, pharmacy network
            intelligence, and <span style={{ color: ACCENT }}>healthcare access visibility.</span>
          </h2>
        </Reveal>

        {/* ── Capability card grid ── */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="h-full rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <CapabilityIcon name={card.icon} />
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
        </div>

        {/* ── Numbered workflow list ── */}
        <Reveal index={6} active={mounted}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
            {WORKFLOW.map((item, i) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-4 px-6 py-5 sm:px-8"
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(15,31,78,0.06)" }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                    style={{ backgroundColor: NAVY }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}80` }}>
                      {item.body}
                    </p>
                  </div>
                </div>

                {i < WORKFLOW.length - 1 && (
                  <ArrowRightIcon />
                )}
              </div>
            ))}
          </div>
        </Reveal>

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
          <path d="M8 21h8" />
          <path d="M12 3v10a4 4 0 0 1-8 0V9h4" />
          <path d="M20 9h-4v4a4 4 0 0 0 4-4Z" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M4 20V10M12 20V4M20 20v-7" />
        </svg>
      );
    case "document":
      return (
        <svg {...props}>
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    default:
      return null;
  }
}

function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0" style={{ color: ACCENT }}>
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewPlatformFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewPlatformFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}