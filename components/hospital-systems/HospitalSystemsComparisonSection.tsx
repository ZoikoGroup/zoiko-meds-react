"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

type Tone = "yes" | "no" | "partial";

interface Cell {
  label: string;
  tone: Tone;
}

interface Row {
  id: string;
  capability: string;
  zoikoMeds: Cell;
  pharmacyDirectory: Cell;
  inventoryTool: Cell;
  genericAnalytics: Cell;
}

const COMPARISON_ROWS: Row[] = [
  {
    id: "system-wide-availability-intelligence",
    capability: "System-wide availability intelligence",
    zoikoMeds: { label: "Yes", tone: "yes" },
    pharmacyDirectory: { label: "No", tone: "no" },
    inventoryTool: { label: "Single-site", tone: "partial" },
    genericAnalytics: { label: "No", tone: "no" },
  },
  {
    id: "shortage-signal-awareness",
    capability: "Shortage signal awareness",
    zoikoMeds: { label: "Yes", tone: "yes" },
    pharmacyDirectory: { label: "No", tone: "no" },
    inventoryTool: { label: "Limited", tone: "partial" },
    genericAnalytics: { label: "Custom build", tone: "partial" },
  },
  {
    id: "pharmacy-network-confirmation",
    capability: "Pharmacy network confirmation",
    zoikoMeds: { label: "Yes", tone: "yes" },
    pharmacyDirectory: { label: "Listing only", tone: "partial" },
    inventoryTool: { label: "No", tone: "no" },
    genericAnalytics: { label: "No", tone: "no" },
  },
  {
    id: "confidence-based-visibility",
    capability: "Confidence-based visibility",
    zoikoMeds: { label: "Yes", tone: "yes" },
    pharmacyDirectory: { label: "No", tone: "no" },
    inventoryTool: { label: "Exact counts", tone: "partial" },
    genericAnalytics: { label: "No", tone: "no" },
  },
  {
    id: "compliance-conscious-reporting",
    capability: "Compliance-conscious reporting",
    zoikoMeds: { label: "Yes", tone: "yes" },
    pharmacyDirectory: { label: "No", tone: "no" },
    inventoryTool: { label: "Limited", tone: "partial" },
    genericAnalytics: { label: "Custom build", tone: "partial" },
  },
  {
    id: "multi-site-role-based-deployment",
    capability: "Multi-site role-based deployment",
    zoikoMeds: { label: "Yes", tone: "yes" },
    pharmacyDirectory: { label: "No", tone: "no" },
    inventoryTool: { label: "Varies", tone: "partial" },
    genericAnalytics: { label: "Generic", tone: "partial" },
  },
  {
    id: "no-dispensing-no-clinical-advice",
    capability: "No dispensing / no clinical advice",
    zoikoMeds: { label: "Yes", tone: "yes" },
    pharmacyDirectory: { label: "Varies", tone: "partial" },
    inventoryTool: { label: "Yes", tone: "yes" },
    genericAnalytics: { label: "Yes", tone: "yes" },
  },
  {
    id: "responsible-ai-guardrails",
    capability: "Responsible AI guardrails",
    zoikoMeds: { label: "Yes", tone: "yes" },
    pharmacyDirectory: { label: "No", tone: "no" },
    inventoryTool: { label: "No", tone: "no" },
    genericAnalytics: { label: "Not healthcare-specific", tone: "partial" },
  },
];

const TONE_COLOR: Record<Tone, string> = {
  yes: "#159A6B",
  no: "#9AA3B8",
  partial: "#C97A1E",
};

function StatusCell({ cell }: { cell: Cell }) {
  const color = TONE_COLOR[cell.tone];
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium" style={{ color }}>
      {cell.tone === "yes" && (
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 flex-shrink-0">
          <path d="M3.2 8.4l3 3 6.6-6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {cell.tone === "no" && (
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 flex-shrink-0">
          <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {cell.tone === "partial" && (
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 flex-shrink-0">
          <path d="M4 8h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
      {cell.label}
    </span>
  );
}

export default function HospitalSystemsComparisonSection() {
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
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">10</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            How ZoikoMeds Compares
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Not a directory, inventory tool, marketplace, or </span>
            <span style={{ color: ACCENT }}>generic analytics.</span>
          </h2>
        </Reveal>

        {/* ── Comparison table ── */}
        <Reveal index={2} active={mounted}>
          <div
            className="mt-10 overflow-x-auto rounded-2xl border bg-white lg:mt-12"
            style={{
              borderColor: "#E7EAF1",
              boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
            }}
          >
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr style={{ backgroundColor: "#0F1F4E" }}>
                  <th className="px-6 py-3.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#9AA3C0]">
                    Capability
                  </th>
                  <th
                    className="px-6 py-3.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    ZoikoMeds
                  </th>
                  <th className="px-6 py-3.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#9AA3C0]">
                    Pharmacy Directory
                  </th>
                  <th className="px-6 py-3.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#9AA3C0]">
                    Inventory Tool
                  </th>
                  <th className="px-6 py-3.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#9AA3C0]">
                    Generic Analytics
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.id}
                    className="border-t"
                    style={{
                      borderColor: "#ECEFF5",
                      backgroundColor: i % 2 === 1 ? "#FAFBFD" : "white",
                    }}
                  >
                    <td className="px-6 py-3.5 text-[13px] font-semibold text-[#0F1F4E]">
                      {row.capability}
                    </td>
                    <td
                      className="px-6 py-3.5"
                      style={{ backgroundColor: "rgba(19,165,148,0.08)" }}
                    >
                      <StatusCell cell={row.zoikoMeds} />
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusCell cell={row.pharmacyDirectory} />
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusCell cell={row.inventoryTool} />
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusCell cell={row.genericAnalytics} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  index,
  active,
}: {
  children: React.ReactNode;
  index: number;
  active: boolean;
}) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `hospitalSystemsComparisonFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsComparisonFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}