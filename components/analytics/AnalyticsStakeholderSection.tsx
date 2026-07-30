"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Stakeholder = {
  role: string;
  painPoint: string;
  value: string;
  ctaLabel: string;
  href:string;
};

const STAKEHOLDERS: Stakeholder[] = [
  {
    role: "Pharmacy networks",
    painPoint:
      "Limited visibility into demand patterns and confirmation gaps across service areas.",
    value: "Track confirmation coverage, regional demand, and confidence movement.",
    ctaLabel: "Optimize network visibility",
    href:"/pharmacy-support"
  },
  {
    role: "Healthcare organizations",
    painPoint: "Difficulty identifying access barriers across patient communities.",
    value: "Review regional medicine access patterns and operational attention areas.",
    ctaLabel: "Discuss healthcare access analytics",
    href:"/health-systems"
  },
  {
    role: "Wholesalers & distributors",
    painPoint: "Need better demand and access intelligence without exposing sensitive inventory.",
    value: "Use aggregated signals to understand market pressure and geographic access conditions.",
    ctaLabel: "Request partner briefing",
    href:"/request-a-briefing"
  },
  {
    role: "Public-health stakeholders",
    painPoint: "Need early visibility into potential access concerns.",
    value: "Monitor regional access signals, shortage movement, and summary reports.",
    ctaLabel: "Explore public-health reporting",
    href:"/government-public-health"
  },
  {
    role: "Enterprise partners",
    painPoint: "Need governed, role-based analytics for internal workflows.",
    value: "Use dashboards, saved views, exports, and audit-ready summaries.",
    ctaLabel: "Plan enterprise deployment",
    href:"/enterprise-solutions"
  },
];

export default function AnalyticsStakeholderSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

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
        <StakeholderFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            05 &nbsp;&middot;&nbsp; STAKEHOLDER USE CASES
          </span>
        </StakeholderFadeUp>

        <StakeholderFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Analytics value, <span className="text-[#0FAA87]">mapped to your role.</span>
          </h2>
        </StakeholderFadeUp>

        <StakeholderFadeUp show={isVisible} delay={160}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-sm">
            {STAKEHOLDERS.map((s, i) => (
              <div
                key={s.role}
                className={`group flex flex-col gap-4 px-6 py-6 transition-colors duration-300 hover:bg-[#FAFBFD] sm:px-8 lg:flex-row lg:items-center lg:gap-8 ${
                  i !== STAKEHOLDERS.length - 1 ? "border-b border-[#EDF0F5]" : ""
                }`}
              >
                {/* Role + pain point */}
                <div className="lg:w-[26%] lg:flex-shrink-0">
                  <h3 className="text-[0.95rem] font-bold text-[#0F1F4E]">{s.role}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#9AA2B1]">
                    {s.painPoint}
                  </p>
                </div>

                {/* Value statement */}
                <p className="text-sm leading-relaxed text-[#3A4254] lg:flex-1">
                  {s.value}
                </p>

                {/* CTA */}
                <div className="lg:flex-shrink-0">
                  <button
                    type="button"
                    onClick={()=>router.push(s.href)}
                    className="w-full whitespace-nowrap cursor-pointer rounded-lg border border-[#D8DEE8] bg-white px-5 py-2.5 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 hover:border-[#0FAA87] hover:text-[#0FAA87] hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2 lg:w-auto"
                  >
                    {s.ctaLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </StakeholderFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function StakeholderFadeUp({
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