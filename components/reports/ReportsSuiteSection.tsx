"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ReportsSuiteSection
 * "Six report types, mapped to real decisions."
 *
 * Layout: left-aligned eyebrow (01 · REPORT SUITE) + 2-line headline (black + teal)
 *         + subtext + interactive audience filter pill row + 3-column x 2-row report card grid:
 *           icon | category tag chips | bold title | description | "Sample sections"
 *           (label + status badge pairs) | outline CTA button.
 *
 * Interaction: filter pills narrow the visible report cards by audience category.
 * "All" shows every report.
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

const FILTERS = ["All", "Executive", "Operations", "Pharmacy Network", "Compliance", "Public Health", "Wholesale"] as const;
type Filter = (typeof FILTERS)[number];

type BadgeTone = "green" | "blue" | "amber";

const BADGE_STYLES: Record<BadgeTone, { bg: string; text: string }> = {
  green: { bg: "rgba(15,170,135,0.1)", text: "#0FAA87" },
  blue: { bg: "rgba(59,130,246,0.1)", text: "#3B82F6" },
  amber: { bg: "rgba(217,119,6,0.1)", text: "#D97706" },
};

const REPORTS: {
  title: string;
  tags: string[];
  categories: Filter[];
  description: string;
  sections: { label: string; badge: string; tone: BadgeTone }[];
  cta: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Medicine Availability Report",
    tags: ["OPS", "PHARMACY", "PUBLIC HEALTH"],
    categories: ["Operations", "Pharmacy Network", "Public Health"],
    description: "Summarizes availability confidence, medicine access patterns, geographic signal strength, and notable changes over time.",
    sections: [
      { label: "Confidence movement", badge: "Tier A", tone: "green" },
      { label: "Regional signal", badge: "Mapped", tone: "blue" },
    ],
    cta: "Request Sample",
    href: "/request-sample-reports",
    icon: (
      <>
        <path d="M4.5 1.5h5l2 2V14a.5.5 0 01-.5.5h-6a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M6 7h4M6 9.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Shortage Intelligence Report",
    tags: ["PUBLIC HEALTH", "LEADERSHIP"],
    categories: ["Public Health", "Executive"],
    description: "Highlights emerging shortage indicators, demand movement, confidence weakening, and regions requiring review.",
    sections: [
      { label: "Signal severity", badge: "Elevated", tone: "amber" },
      { label: "Demand movement", badge: "Rising", tone: "blue" },
    ],
    cta: "Request Briefing",
    href: "/request-a-briefing",
    icon: (
      <path d="M8 2l6.5 11.5H1.5L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Pharmacy Network Report",
    tags: ["PHARMACY NETWORK", "PARTNERSHIPS"],
    categories: ["Pharmacy Network"],
    description: "Reviews participating network coverage, confirmation activity, verification quality, and regional pharmacy engagement.",
    sections: [
      { label: "Coverage ratio", badge: "Verified", tone: "green" },
      { label: "Confirmation cadence", badge: "Fresh", tone: "blue" },
    ],
    cta: "Discuss Network Reporting",
    href: "/discuss-network-reporting",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Regional Access Report",
    tags: ["HEALTHCARE ORGS", "PUBLIC HEALTH"],
    categories: ["Operations", "Public Health"],
    description: "Shows medicine access patterns by city, state, region, territory, or operating market.",
    sections: [
      { label: "Access clusters", badge: "3 flagged", tone: "amber" },
      { label: "Heat zones", badge: "Aggregated", tone: "blue" },
    ],
    cta: "View Regional Model",
    href: "/view-regional-model",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M1.75 8h12.5M8 1.75c1.7 1.8 2.6 4 2.6 6.25S9.7 12.45 8 14.25c-1.7-1.8-2.6-4-2.6-6.25S6.3 3.55 8 1.75z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </>
    ),
  },
  {
    title: "Compliance Evidence Report",
    tags: ["COMPLIANCE", "LEGAL", "PROCUREMENT"],
    categories: ["Compliance"],
    description: "Packages governance, source controls, data-use notes, disclaimers, and report auditability for internal review.",
    sections: [
      { label: "Audit trail", badge: "Logged", tone: "green" },
      { label: "Source logic", badge: "Noted", tone: "blue" },
    ],
    cta: "Review Governance",
    href: "/review-governance",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Executive Briefing Report",
    tags: ["EXECUTIVES", "BOARDS"],
    categories: ["Executive"],
    description: "Condenses intelligence into leadership-ready conclusions, risk movement, recommended operational review points, and next-step priorities.",
    sections: [
      { label: "Risk movement", badge: "Tracked", tone: "amber" },
      { label: "Next steps", badge: "Prioritized", tone: "green" },
    ],
    cta: "Request Executive Briefing",
    href: "/request-executive-briefing",
    icon: (
      <path d="M2.5 13.5V8.5M6.5 13.5V5M10.5 13.5V9.5M14 13.5V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    ),
  },
];

export default function ReportsSuiteSection() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibleReports = activeFilter === "All"
    ? REPORTS
    : REPORTS.filter((r) => r.categories.includes(activeFilter));

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">01</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Report Suite
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Six report types, mapped to </span>
            <span style={{ color: ACCENT }}>real</span>
            <br />
            <span style={{ color: ACCENT }}>decisions.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 text-[14px] leading-relaxed text-[#5B6478]">
            Filter by audience to see the reports built for your team.
          </p>
        </Reveal>

        {/* ── Filter pills ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className="rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200"
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
          {visibleReports.map((report, i) => (
            <Reveal key={report.title} index={4 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)] transition-all duration-300">
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {report.icon}
                  </svg>
                </div>

                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ color: ACCENT }}>
                  {report.tags.join(" · ")}
                </p>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{report.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {report.description}
                </p>

                <div className="mt-4 rounded-xl border border-[#F0F2F7] bg-[#F8FAFC] p-3.5">
                  <p className="mb-2 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#9AA1B4]">
                    Sample Sections
                  </p>
                  <div className="space-y-2">
                    {report.sections.map((section) => (
                      <div key={section.label} className="flex items-center justify-between gap-3">
                        <span className="text-[12.5px] text-[#3F4759]">{section.label}</span>
                        <span
                          className="rounded-md px-2 py-0.5 text-[11px] font-semibold"
                          style={{
                            backgroundColor: BADGE_STYLES[section.tone].bg,
                            color: BADGE_STYLES[section.tone].text,
                          }}
                        >
                          {section.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={report.href}
                  className="mt-5 inline-flex w-fit items-center justify-center rounded-lg border border-[#E7EAF1] px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E]"
                >
                  {report.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {visibleReports.length === 0 && (
          <p className="mt-10 text-center text-[13.5px] text-[#9AA1B4]">
            No reports match this filter yet — try another audience.
          </p>
        )}

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `reportsSuiteFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes reportsSuiteFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}