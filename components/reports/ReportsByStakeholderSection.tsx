"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ReportsByStakeholderSection
 * "The reporting outcome your role needs."
 *
 * Layout: left-aligned eyebrow (03 · REPORTS BY STAKEHOLDER) + 1-line headline (black + teal)
 *         + full-width white card containing 6 rows:
 *           bold stakeholder title | muted concern description | solution text | outline CTA button.
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

const STAKEHOLDERS = [
  {
    title: "Pharmacy networks",
    concern: "Confirmation activity, regional coverage, and network performance.",
    solution: "Shows where participation strengthens confidence and where added confirmation coverage may be needed.",
    cta: "Discuss Pharmacy Network Reports",
    href: "/discuss-pharmacy-network-reports",
  },
  {
    title: "Healthcare organizations",
    concern: "Access concerns across service areas and patient support operations.",
    solution: "Provides regional medicine access patterns and operational review signals.",
    cta: "Request Healthcare Report Sample",
    href: "/request-healthcare-report-sample",
  },
  {
    title: "Wholesalers & distributors",
    concern: "Aggregated demand and access patterns without exposing sensitive inventory.",
    solution: "Supports market intelligence, partner planning, and supply awareness.",
    cta: "Request Wholesale Reporting Brief",
    href: "/request-wholesale-reporting-brief",
  },
  {
    title: "Public-health stakeholders",
    concern: "Shortage risk indicators and regional access concerns.",
    solution: "Provides structured access intelligence and shortage signal summaries for review.",
    cta: "Request Public-Health Briefing",
    href: "/request-public-health-briefing",
  },
  {
    title: "Compliance & governance",
    concern: "Responsible data use, disclaimers, evidence, and report boundaries.",
    solution: "Provides report auditability, source logic, access controls, and governance notes.",
    cta: "Review Compliance Reporting",
    href: "/review-compliance-reporting",
  },
  {
    title: "Executives & boards",
    concern: "Strategic access risk, growth opportunities, and operating priorities.",
    solution: "Condenses complex intelligence into leadership-ready briefing reports.",
    cta: "Request Executive Report Pack",
    href: "/request-executive-report-pack",
  },
] as const;

export default function ReportsByStakeholderSection() {
  const [mounted, setMounted] = useState(false);
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

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">03</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Reports By Stakeholder
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">The reporting outcome </span>
            <span style={{ color: ACCENT }}>your role needs.</span>
          </h2>
        </Reveal>

        {/* ── Stakeholder card ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">
            <div className="divide-y divide-[#F0F2F7]">
              {STAKEHOLDERS.map((stakeholder) => (
                <div
                  key={stakeholder.title}
                  className="grid grid-cols-1 items-start gap-4 px-6 py-6 transition-colors duration-150 hover:bg-[#F8FAFC] sm:grid-cols-[180px_1.6fr_1.8fr_auto] sm:gap-6 sm:px-8"
                >
                  {/* Stakeholder */}
                  <h3 className="text-[13.5px] font-bold text-[#0F1F4E]">{stakeholder.title}</h3>

                  {/* Concern */}
                  <p className="text-[12.5px] leading-relaxed text-[#9AA1B4]">
                    {stakeholder.concern}
                  </p>

                  {/* Solution */}
                  <p className="text-[13px] leading-relaxed text-[#3F4759]">
                    {stakeholder.solution}
                  </p>

                  {/* CTA */}
                  <a
                    href={stakeholder.href}
                    className="inline-flex h-fit w-fit items-center justify-center whitespace-nowrap rounded-lg border border-[#E7EAF1] px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E] sm:justify-self-end"
                  >
                    {stakeholder.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `reportsStakeholderFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes reportsStakeholderFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}