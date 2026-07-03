"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OverviewComparisonSection
 * "Not a directory, a pharmacy, a marketplace, or a generic analytics tool."
 *
 * Layout: light section, left-aligned eyebrow
 *         (11 · HOW ZOIKOMEDS COMPARES)
 *         + 2-line headline (black + teal) + comparison table card:
 *           dark header row, ZoikoMeds column tinted teal throughout,
 *           alternating row shading, colored status cells.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";
const HEADER = "#0A0E17";

type Cell = { status: "yes" | "no" | "limited"; label: string };

const COLUMNS = ["ZoikoMeds", "Pharmacy Directory", "Online Pharmacy", "Generic Analytics Tool"] as const;

const ROWS: { capability: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  {
    capability: "Medicine availability signals",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "limited", label: "Limited" },
      { status: "limited", label: "Own inventory" },
      { status: "no", label: "No" },
    ],
  },
  {
    capability: "Pharmacy network intelligence",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "limited", label: "Listings only" },
      { status: "limited", label: "Internal only" },
      { status: "no", label: "No" },
    ],
  },
  {
    capability: "Shortage signal awareness",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "limited", label: "Limited" },
      { status: "limited", label: "Not healthcare-specific" },
    ],
  },
  {
    capability: "Compliance-conscious reporting",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "limited", label: "Limited" },
      { status: "limited", label: "Requires customization" },
    ],
  },
  {
    capability: "Does not dispense medicine",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "yes", label: "Yes" },
    ],
  },
  {
    capability: "Healthcare-specific intelligence",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "limited", label: "Low" },
      { status: "limited", label: "Medium" },
      { status: "limited", label: "Low" },
    ],
  },
  {
    capability: "Enterprise workflows",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "limited", label: "Limited" },
      { status: "limited", label: "Requires configuration" },
    ],
  },
  {
    capability: "Confidence-based availability",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "no", label: "No" },
      { status: "no", label: "No" },
    ],
  },
];

export default function OverviewComparisonSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>11</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            How ZoikoMeds Compares
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="max-w-2xl text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Not a directory, a pharmacy, a marketplace, or a{" "}
            <span style={{ color: ACCENT }}>generic analytics tool.</span>
          </h2>
        </Reveal>

        {/* ── Table card ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse">
                <thead>
                  <tr style={{ backgroundColor: HEADER }}>
                    <th className="px-6 py-4 text-left text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50 sm:px-8">
                      Capability
                    </th>
                    {COLUMNS.map((col, i) => (
                      <th
                        key={col}
                        className="px-5 py-4 text-left text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: i === 0 ? ACCENT : "rgba(255,255,255,0.5)" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, ri) => (
                    <tr
                      key={row.capability}
                      style={{
                        backgroundColor: ri % 2 === 1 ? "#F7F8FB" : "#fff",
                        borderTop: "1px solid rgba(15,31,78,0.06)",
                      }}
                    >
                      <td className="px-6 py-4 text-[13px] font-bold sm:px-8" style={{ color: NAVY }}>
                        {row.capability}
                      </td>
                      {row.cells.map((cell, ci) => (
                        <td
                          key={ci}
                          className="px-5 py-4 text-[12.5px] font-medium"
                          style={{
                            backgroundColor: ci === 0 ? `${ACCENT}0F` : "transparent",
                          }}
                        >
                          <StatusCell cell={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Status cell                                                        */
/* ------------------------------------------------------------------ */
function StatusCell({ cell }: { cell: Cell }) {
  const color = cell.status === "yes" ? ACCENT : cell.status === "limited" ? "#B45309" : "#94A3B8";
  return (
    <span className="inline-flex items-center gap-1.5" style={{ color }}>
      {cell.status === "yes" && <CheckIcon />}
      {cell.status === "limited" && <DashIcon />}
      {cell.status === "no" && <XIcon />}
      {cell.label}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewComparisonFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewComparisonFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}