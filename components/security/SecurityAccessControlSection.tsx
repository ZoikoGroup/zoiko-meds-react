"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SecurityAccessControlSection
 * "Controlled participation across complex healthcare networks."
 *
 * Layout: light section, left-aligned eyebrow
 *         (03 · ACCESS CONTROL & IDENTITY)
 *         + 2-line headline (black + teal) + permission matrix table
 *           (dark header, colored status text) + 3x2 card grid below,
 *           with a final teal-tinted "Review the access model" CTA
 *           card sized the same as the rest.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";
const HEADER = "#0A0E17";
const WARN = "#B45309";

const COLUMNS = ["Enterprise Admin", "Pharmacy Admin", "Reporting Viewer", "Compliance Reviewer", "API Operator"] as const;

type Level = "full" | "scoped" | "view" | "review" | "org" | "none";

const ROWS: { area: string; cells: [Level, Level, Level, Level, Level] }[] = [
  { area: "Availability intelligence", cells: ["full", "scoped", "view", "view", "scoped"] },
  { area: "Pharmacy workflows", cells: ["full", "full", "none", "review", "none"] },
  { area: "Reports & exports", cells: ["full", "scoped", "view", "full", "scoped"] },
  { area: "Admin & settings", cells: ["full", "org", "none", "none", "none"] },
  { area: "Audit logs", cells: ["full", "org", "none", "full", "none"] },
  { area: "API & integrations", cells: ["full", "none", "none", "review", "full"] },
];

const LABELS: Record<Level, string> = {
  full: "Full",
  scoped: "Scoped",
  view: "View",
  review: "Review",
  org: "Org",
  none: "None",
};

const CARDS = [
  {
    title: "Role-based access control",
    body: "Assign users to roles aligned with organization, pharmacy, wholesale, compliance, reporting, and administration responsibilities.",
    icon: "search",
  },
  {
    title: "Least-privilege defaults",
    body: "Users should only see the data, reports, workflows, and controls required for their role.",
    icon: "shield",
  },
  {
    title: "Organization & partner boundaries",
    body: "Separate enterprise, pharmacy, wholesale, partner, and internal access contexts.",
    icon: "branch",
  },
  {
    title: "Secure authentication",
    body: "Support secure login flows, session controls, and enterprise identity requirements.",
    icon: "lock",
  },
  {
    title: "Permission review",
    body: "Provide review-ready permission summaries for administrators and compliance teams.",
    icon: "lines",
  },
] as const;

export default function SecurityAccessControlSection() {
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
            Access Control &amp; Identity
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Controlled participation across complex
            <br />
            <span style={{ color: ACCENT }}>healthcare networks.</span>
          </h2>
        </Reveal>

        {/* ── Permission matrix table ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr style={{ backgroundColor: HEADER }}>
                    <th className="px-6 py-4 text-left text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50 sm:px-8">
                      Permission Area
                    </th>
                    {COLUMNS.map((col) => (
                      <th
                        key={col}
                        className="px-5 py-4 text-left text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, ri) => (
                    <tr
                      key={row.area}
                      style={{
                        backgroundColor: ri % 2 === 1 ? "#F7F8FB" : "#fff",
                        borderTop: "1px solid rgba(15,31,78,0.06)",
                      }}
                    >
                      <td className="px-6 py-4 text-[13px] font-bold sm:px-8" style={{ color: NAVY }}>
                        {row.area}
                      </td>
                      {row.cells.map((level, ci) => (
                        <td key={ci} className="px-5 py-4 text-[12.5px] font-semibold">
                          <LevelLabel level={level} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* ── Practice card grid ── */}
        <div className="mt-6 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={3 + i} active={mounted}>
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

          {/* Review the access model CTA card — same size as the rest */}
          <Reveal index={3 + CARDS.length} active={mounted}>
            <a
              href="#review-access-model"
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
                Review the access model
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                Walk through roles and permissions with our team.
              </p>
              <span
                className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                style={{ color: ACCENT }}
              >
                Review Enterprise Access Model
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
/*  Level label                                                        */
/* ------------------------------------------------------------------ */
function LevelLabel({ level }: { level: Level }) {
  const color = level === "full" ? ACCENT : level === "none" ? "#94A3B8" : WARN;
  return <span style={{ color }}>{LABELS[level]}</span>;
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
    case "branch":
      return (
        <svg {...props}>
          <path d="M6 4v6c0 3 3 4 6 4s6-1 6-4V4" />
          <path d="M12 14v6" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "lines":
      return (
        <svg {...props}>
          <path d="M4 7h16M4 12h16M4 17h10" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityAccessFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityAccessFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}