"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OverviewSecurityComplianceSection
 * "Designed for healthcare sensitivity, enterprise trust, and
 *  responsible intelligence."
 *
 * Layout: dark navy section, left-aligned eyebrow
 *         (07 · SECURITY, PRIVACY & COMPLIANCE)
 *         + 3-line headline (white + teal) + 4x2 dark card grid,
 *           all cards equal height regardless of content length.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0A0E17";
const PANEL = "#111A30";

const CARDS = [
  {
    title: "No medical advice",
    body: "No diagnosis, treatment, prescribing, substitution, or patient-specific clinical guidance.",
    icon: "ban",
  },
  {
    title: "No dispensing",
    body: "No selling, dispensing, delivering, or fulfilling medicine orders.",
    icon: "bag",
  },
  {
    title: "No unsafe inventory exposure",
    body: "Exact stock quantities must not be publicly exposed to unauthorized users.",
    icon: "monitor",
  },
  {
    title: "Role-based access",
    body: "Enterprise, pharmacy, wholesale, and reporting features are permission-controlled.",
    icon: "lock",
  },
  {
    title: "Responsible AI",
    body: "AI-assisted outputs are bounded, explainable, reviewable, and non-clinical.",
    icon: "spark",
  },
  {
    title: "Auditability",
    body: "Relevant enterprise reports and workflows support evidence trails.",
    icon: "list",
  },
  {
    title: "Privacy controls",
    body: "Data workflows are privacy-aware and appropriate for healthcare-adjacent use.",
    icon: "shield",
  },
  {
    title: "Accessibility",
    body: "The experience is built to meet WCAG 2.2 AA expectations.",
    icon: "info",
  },
] as const;

export default function OverviewSecurityComplianceSection() {
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
            <span className="opacity-60 text-white">07</span>
            <span className="opacity-40 text-white">·</span>
            Security, Privacy &amp; Compliance
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="max-w-2xl text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            Designed for healthcare sensitivity, enterprise trust, and{" "}
            <span style={{ color: ACCENT }}>responsible intelligence.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 p-6" style={{ backgroundColor: PANEL }}>
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}26` }}
                >
                  <CardIcon name={card.icon} />
                </div>
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
    case "bag":
      return (
        <svg {...props}>
          <path d="M6 8h12l-1 12H7L6 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        </svg>
      );
    case "list":
      return (
        <svg {...props}>
          <path d="M8 6h13M8 12h13M8 18h13" />
          <path d="M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        </svg>
      );
    case "info":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8v.01" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewSecurityFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewSecurityFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}