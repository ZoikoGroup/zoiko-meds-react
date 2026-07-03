"use client";

import { useEffect, useRef, useState } from "react";

type StakeholderTab = {
  label: string;
  features: string;
  value: string;
  ctaLabel: string;
};

const TABS: StakeholderTab[] = [
  {
    label: "Healthcare Providers",
    features: "Availability intelligence, shortage signals, reports, regional analytics.",
    value: "Medicine access visibility, operational planning, patient support workflows.",
    ctaLabel: "Book a Provider Demo",
  },
  {
    label: "Pharmacies",
    features: "Confirmation coverage, demand signals, network status, restock timing.",
    value: "Fewer stockouts, faster substitution decisions, clearer patient communication.",
    ctaLabel: "Book a Pharmacy Demo",
  },
  {
    label: "Wholesalers & Distributors",
    features: "Aggregated demand curves, regional pressure mapping, partner-level reporting.",
    value: "Sharper allocation decisions without exposing sensitive inventory data.",
    ctaLabel: "Request a Distributor Briefing",
  },
  {
    label: "Manufacturers",
    features: "Regional access trends, shortage movement history, market signal exports.",
    value: "Earlier visibility into access gaps and demand shifts across regions.",
    ctaLabel: "Request a Manufacturer Briefing",
  },
  {
    label: "Government & Public Health",
    features: "Aggregated access signals, shortage monitoring, exportable summary reports.",
    value: "Early warning on potential access concerns across populations and regions.",
    ctaLabel: "Explore Public-Health Reporting",
  },
  {
    label: "Enterprise Buyers",
    features: "Role-based dashboards, saved views, audit-ready exports, API access.",
    value: "Governed analytics that plug directly into existing internal workflows.",
    ctaLabel: "Plan an Enterprise Rollout",
  },
];

export default function FeaturesStakeholderValueMatrixSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const active = TABS[activeIndex];

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <MatrixFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            05 &nbsp;&middot;&nbsp; STAKEHOLDER VALUE MATRIX
          </span>
        </MatrixFadeUp>

        <MatrixFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Map features to <span className="text-[#0FAA87]">your organization.</span>
          </h2>
        </MatrixFadeUp>

        {/* Tabs */}
        <MatrixFadeUp show={isVisible} delay={160}>
          <div
            role="tablist"
            aria-label="Stakeholder type"
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {TABS.map((tab, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={tab.label}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(i)}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2 ${
                    isActive
                      ? "bg-[#0FAA87] text-white shadow-sm"
                      : "border border-[#D8DEE8] bg-white text-[#3A4254] hover:border-[#0FAA87]/40 hover:text-[#0FAA87]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </MatrixFadeUp>

        {/* Content card */}
        <MatrixFadeUp show={isVisible} delay={220}>
          <div
            key={activeIndex}
            className="mt-6 rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm transition-opacity duration-300 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr_auto] lg:items-center">
              <div>
                <span className="text-xs font-bold tracking-[0.1em] text-[#0FAA87]">
                  MOST RELEVANT FEATURES
                </span>
                <p className="mt-2 text-sm leading-relaxed text-[#3A4254]">
                  {active.features}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold tracking-[0.1em] text-[#0FAA87]">
                  VALUE
                </span>
                <p className="mt-2 text-sm leading-relaxed text-[#3A4254]">
                  {active.value}
                </p>
              </div>

              <div className="lg:flex-shrink-0">
                <button
                  type="button"
                  className="w-full whitespace-nowrap rounded-lg bg-[#0FAA87] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#00A99D] hover:shadow-lg hover:shadow-[#0FAA87]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2 lg:w-auto"
                >
                  {active.ctaLabel}
                </button>
              </div>
            </div>
          </div>
        </MatrixFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function MatrixFadeUp({
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