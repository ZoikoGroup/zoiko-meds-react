"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X, Minus } from "lucide-react";

type Status = "yes" | "no" | "partial";

type CellValue = {
  status: Status;
  label: string;
};

type ComparisonRow = {
  capability: string;
  zoikoMeds: CellValue;
  pharmacyDirectory: CellValue;
  onlinePharmacy: CellValue;
  genericAnalytics: CellValue;
};

const yes = (label = "Yes"): CellValue => ({ status: "yes", label });
const no = (label = "No"): CellValue => ({ status: "no", label });
const partial = (label: string): CellValue => ({ status: "partial", label });

const ROWS: ComparisonRow[] = [
  {
    capability: "Medicine availability intelligence",
    zoikoMeds: yes(),
    pharmacyDirectory: partial("Limited"),
    onlinePharmacy: partial("Own inventory"),
    genericAnalytics: no(),
  },
  {
    capability: "Pharmacy network signals",
    zoikoMeds: yes(),
    pharmacyDirectory: partial("Listing only"),
    onlinePharmacy: partial("Internal only"),
    genericAnalytics: no(),
  },
  {
    capability: "Shortage signal awareness",
    zoikoMeds: yes(),
    pharmacyDirectory: no(),
    onlinePharmacy: partial("Limited"),
    genericAnalytics: partial("Custom build"),
  },
  {
    capability: "Confidence-based availability",
    zoikoMeds: yes(),
    pharmacyDirectory: no(),
    onlinePharmacy: no(),
    genericAnalytics: no(),
  },
  {
    capability: "Compliance-conscious reporting",
    zoikoMeds: yes(),
    pharmacyDirectory: no(),
    onlinePharmacy: partial("Limited"),
    genericAnalytics: partial("Custom build"),
  },
  {
    capability: "Does not dispense medicine",
    zoikoMeds: yes(),
    pharmacyDirectory: yes(),
    onlinePharmacy: no(),
    genericAnalytics: yes(),
  },
  {
    capability: "Healthcare-specific dashboards",
    zoikoMeds: yes(),
    pharmacyDirectory: no(),
    onlinePharmacy: partial("Limited"),
    genericAnalytics: no(),
  },
  {
    capability: "Enterprise integrations",
    zoikoMeds: yes(),
    pharmacyDirectory: no(),
    onlinePharmacy: partial("Limited"),
    genericAnalytics: partial("Generic"),
  },
  {
    capability: "Responsible AI guardrails",
    zoikoMeds: yes(),
    pharmacyDirectory: no(),
    onlinePharmacy: partial("Limited"),
    genericAnalytics: partial("Not healthcare-specific"),
  },
];

const COMPETITOR_COLUMNS: { key: keyof ComparisonRow; label: string }[] = [
  { key: "pharmacyDirectory", label: "PHARMACY DIRECTORY" },
  { key: "onlinePharmacy", label: "ONLINE PHARMACY" },
  { key: "genericAnalytics", label: "GENERIC ANALYTICS TOOL" },
];

function StatusCell({ value, emphasized = false }: { value: CellValue; emphasized?: boolean }) {
  const config = {
    yes: { Icon: Check, color: emphasized ? "text-[#0FAA87]" : "text-[#2E9E6F]" },
    no: { Icon: X, color: "text-[#9AA2B1]" },
    partial: { Icon: Minus, color: "text-[#C58A2E]" },
  }[value.status];

  const { Icon, color } = config;

  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${color}`}>
      <Icon className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2.5} />
      {value.label}
    </span>
  );
}

export default function FeaturesComparisonTableSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <ComparisonFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            09 &nbsp;&middot;&nbsp; HOW ZOIKOMEDS COMPARES
          </span>
        </ComparisonFadeUp>

        <ComparisonFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-3xl text-[1.9rem] font-bold leading-[1.25] text-[#0F1F4E] sm:text-[2.1rem] lg:text-[2.3rem]">
            More than a directory, more responsible than a marketplace, more{" "}
            <span className="text-[#0FAA87]">healthcare-specific than generic analytics.</span>
          </h2>
        </ComparisonFadeUp>

        <ComparisonFadeUp show={isVisible} delay={160}>
          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#0F1F4E]">
                    <th className="px-6 py-3.5 text-xs font-bold tracking-[0.08em] text-white sm:px-8">
                      CAPABILITY
                    </th>
                    <th className="bg-[#0FAA87] px-6 py-3.5 text-xs font-bold tracking-[0.08em] text-white">
                      ZOIKOMEDS
                    </th>
                    {COMPETITOR_COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        className="px-6 py-3.5 text-xs font-bold tracking-[0.08em] text-white"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, i) => (
                    <tr
                      key={row.capability}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#F7F9FC]"}
                    >
                      <td className="px-6 py-4 align-middle text-sm font-bold text-[#0F1F4E] sm:px-8">
                        {row.capability}
                      </td>
                      <td className="bg-[#E7F8F1] px-6 py-4 align-middle">
                        <StatusCell value={row.zoikoMeds} emphasized />
                      </td>
                      {COMPETITOR_COLUMNS.map((col) => (
                        <td key={col.key} className="px-6 py-4 align-middle">
                          <StatusCell value={row[col.key] as CellValue} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ComparisonFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function ComparisonFadeUp({
  show,
  delay = 0,
  children,
}: {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}