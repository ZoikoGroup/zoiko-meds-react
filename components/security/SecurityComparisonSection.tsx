"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SecurityComparisonSection
 * "Security built for medicine availability intelligence."
 *
 * Layout: light section, left-aligned eyebrow
 *         (10 · HOW ZOIKOMEDS COMPARES)
 *         + 2-line headline (black + teal) + comparison table card:
 *           dark header row, ZoikoMeds column tinted teal throughout,
 *           alternating row shading, colored status cells with icons.
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
    capability: "Medicine availability intelligence security",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "limited", label: "Limited" },
      { status: "no", label: "No" },
    ],
  },
  {
    capability: "Role-based stakeholder access",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "limited", label: "Limited" },
      { status: "limited", label: "Internal only" },
      { status: "limited", label: "Generic" },
    ],
  },
  {
    capability: "Inventory non-exposure controls",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "limited", label: "Own stock only" },
      { status: "no", label: "No" },
    ],
  },
  {
    capability: "Responsible AI boundaries",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "limited", label: "Limited" },
      { status: "limited", label: "Custom governance" },
    ],
  },
  {
    capability: "Healthcare-sensitive reporting",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "limited", label: "Limited" },
      { status: "limited", label: "Customization" },
    ],
  },
  {
    capability: "Pharmacy confirmation governance",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "limited", label: "Internal only" },
      { status: "no", label: "No" },
    ],
  },
  {
    capability: "Audit-ready intelligence workflows",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "no", label: "No" },
      { status: "limited", label: "Limited" },
      { status: "limited", label: "Generic logs" },
    ],
  },
  {
    capability: "No dispensing / no clinical advice boundary",
    cells: [
      { status: "yes", label: "Yes" },
      { status: "limited", label: "Varies" },
      { status: "no", label: "No" },
      { status: "limited", label: "N/A" },
    ],
  },
];

export default function SecurityComparisonSection() {
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
            How ZoikoMeds Compares
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Security built for medicine <span style={{ color: ACCENT }}>availability</span>
            <br />
            <span style={{ color: ACCENT }}>intelligence.</span>
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
                      Security Capability
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
                          style={{ backgroundColor: ci === 0 ? `${ACCENT}0F` : "transparent" }}
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityComparisonFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityComparisonFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}