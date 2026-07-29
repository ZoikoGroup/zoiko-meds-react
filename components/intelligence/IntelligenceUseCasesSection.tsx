"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const USE_CASES = [
  {
    stakeholder: "Pharmacy networks",
    problem: "Limited visibility into regional demand, confirmation activity, and coverage gaps.",
    solution: "Understand network participation, confidence levels, and where confirmation activity should improve.",
    cta: "Discuss Network Intelligence",
    href: "/pharmacy-networks",
  },
  {
    stakeholder: "Healthcare organizations",
    problem: "Difficulty identifying medicine access issues across patient populations or regions.",
    solution: "Detect access patterns and prioritize operational review.",
    cta: "Discuss Healthcare Use Case",
    href: "/health-systems",
  },
  {
    stakeholder: "Wholesalers & distributors",
    problem: "Need better market signal awareness without exposing sensitive inventory data.",
    solution: "Use aggregated intelligence to understand demand, access trends, and potential risk zones.",
    cta: "Discuss Supply Intelligence",
    href: "/enterprise",
  },
  {
    stakeholder: "Public-health stakeholders",
    problem: "Need early visibility into shortage and access concerns.",
    solution: "Review structured intelligence reports and regional access indicators.",
    cta: "Request Public-Health Briefing",
    href: "/government-public-health",
  },
  {
    stakeholder: "Enterprise partners",
    problem: "Need reliable, compliant medicine availability insights for broader systems.",
    solution: "Integrate intelligence outputs into governance, planning, and partner workflows.",
    cta: "Request Enterprise Briefing",
    href: "/enterprise-solutions",
  },
] as const;

export default function IntelligenceUseCasesSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">06</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Use Cases By Stakeholder
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Intelligence mapped to </span>
            <span style={{ color: ACCENT }}>your role.</span>
          </h2>
        </Reveal>

        {/* ── Use case card ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">
            <div className="divide-y divide-[#F0F2F7]">
              {USE_CASES.map((useCase) => (
                <div
                  key={useCase.stakeholder}
                  className="grid grid-cols-1 items-start gap-4 px-6 py-6 transition-colors duration-150 hover:bg-[#F8FAFC] sm:grid-cols-[220px_1fr_auto] sm:gap-6 sm:px-8"
                >
                  {/* Stakeholder + problem */}
                  <div>
                    <h3 className="text-[13.5px] font-bold text-[#0F1F4E]">{useCase.stakeholder}</h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-[#9AA1B4]">
                      {useCase.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <p className="text-[13px] leading-relaxed text-[#3F4759]">
                    {useCase.solution}
                  </p>

                  {/* CTA */}
                  <a
                    href={useCase.href}
                    className="inline-flex h-fit w-fit items-center justify-center whitespace-nowrap rounded-lg border border-[#E7EAF1] px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E] sm:justify-self-end"
                  >
                    {useCase.cta}
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `intelligenceUseCasesFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes intelligenceUseCasesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}