"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const FILTERS = [
  "Executive summary",
  "Availability confidence",
  "Shortage signals",
  "Pharmacy network",
  "Compliance notes",
  "All",
] as const;

type FilterType = (typeof FILTERS)[number];

interface Report {
  title: string;
  description: string;
  bestFor: string;
  category: FilterType;
  icon: React.ReactNode;
}

const REPORTS: Report[] = [
  {
    title: "Medicine availability report",
    description: "Summarizes availability confidence, geographic signal strength, and medicine access patterns.",
    bestFor: "operations, pharmacy networks",
    category: "Availability confidence",
    icon: (
      <path d="M8 1.5l6 4v3c0 4-2.6 6.5-6 7.5-3.4-1-6-3.5-6-7.5v-3l6-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Shortage intelligence report",
    description: "Highlights emerging shortage risks, confidence movement, and demand signal changes.",
    bestFor: "public health, leadership",
    category: "Shortage signals",
    icon: (
      <path d="M2 11l3.5-4 3 2.5L14 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Pharmacy network report",
    description: "Reviews participation, verification activity, and confirmation coverage.",
    bestFor: "network & partner teams",
    category: "Pharmacy network",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Regional access report",
    description: "Shows access patterns by city, state, region, or operating territory.",
    bestFor: "regional & public-health teams",
    category: "Availability confidence",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M1.75 8h12.5M8 1.75c1.7 1.8 2.6 4 2.6 6.25S9.7 12.45 8 14.25c-1.7-1.8-2.6-4-2.6-6.25S6.3 3.55 8 1.75z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </>
    ),
  },
  {
    title: "Compliance evidence report",
    description: "Supports governance, oversight, auditability, and internal review.",
    bestFor: "compliance, legal, executive",
    category: "Compliance notes",
    icon: (
      <>
        <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M5.8 8l1.5 1.5 3-3.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Executive briefing report",
    description: "Converts detailed intelligence into leadership-ready summaries.",
    bestFor: "executives, boards, partners",
    category: "Executive summary",
    icon: (
      <path d="M2.5 13.5V8.5M6.5 13.5V5M10.5 13.5V9.5M14 13.5V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    ),
  },
];

export default function IntelligenceReportsSection() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>(FILTERS[0]);
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

  // Show all reports if "All" is selected, otherwise filter by category
  const filteredReports = activeFilter === "All"
    ? REPORTS
    : REPORTS.filter((report) => report.category === activeFilter);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">05</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Reports
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Compliance-ready reporting for</span>
            <br />
            <span style={{ color: ACCENT }}>healthcare operations.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[#5B6478]">
            ZoikoMeds Reports help organizations translate medicine availability intelligence
            into structured outputs for leadership, compliance, operations, pharmacy-network
            management, and stakeholder communication.
          </p>
        </Reveal>

        {/* ── Filter pills ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className="rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 cursor-pointer"
                  style={
                    isActive
                      ? { backgroundColor: ACCENT, color: "#FFFFFF" }
                      : { backgroundColor: "#FFFFFF", color: "#0F1F4E", border: "1px solid #E7EAF1" }
                  }
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Report card grid ── */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report, i) => (
            <Reveal key={report.title} index={i} active={true}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)] transition-all duration-300">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {report.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{report.title}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
                  {report.description}
                </p>

                <p className="mt-4 text-[12px] text-[#9AA1B4]">
                  Best for: {report.bestFor}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                            */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `intelligenceReportsFadeUp 0.4s ease-out ${index * 60}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes intelligenceReportsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}