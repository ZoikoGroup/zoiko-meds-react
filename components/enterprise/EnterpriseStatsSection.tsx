"use client";

import { useEffect, useRef, useState } from "react";

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M5.25 6h13.5A1.5 1.5 0 0 1 20.25 7.5v12a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 5.25 6Z" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 15 6 12l3.75-3M14.25 9 18 12l-3.75 3" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z M3.6 9h16.8M3.6 15h16.8M12 3a14.9 14.9 0 0 1 3 9 14.9 14.9 0 0 1-3 9 14.9 14.9 0 0 1-3-9 14.9 14.9 0 0 1 3-9Z" />
    </svg>
  );
}

function IconShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 21c4.5-1.5 7.5-5.25 7.5-10.5V5.25L12 3 4.5 5.25v5.25C4.5 15.75 7.5 19.5 12 21ZM9.75 12l1.5 1.5 3-3" />
    </svg>
  );
}

const CARDS = [
  {
    id: "strategic-briefing",
    icon: <IconCalendar />,
    title: "Strategic Briefing",
    description: "For executive stakeholders evaluating regional resilience infrastructure.",
  },
  {
    id: "api-evaluation",
    icon: <IconCode />,
    title: "API Evaluation",
    description: "Technical sandbox access for health platforms and digital services.",
  },
  {
    id: "public-sector",
    icon: <IconGlobe />,
    title: "Public-Sector",
    description: "Government-specific engagement for sovereign health agencies.",
  },
  {
    id: "procurement-review",
    icon: <IconShieldCheck />,
    title: "Procurement Review",
    description: "Security artifacts, MSA templates, and SOC 2 documentation.",
  },
];

const DURATION = 1400;

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let rafId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target]);

  return value;
}

export default function EnterpriseStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  const jurisdictions = useCountUp(45, isVisible);
  const dataRows = useCountUp(850, isVisible);

  return (
    <section ref={sectionRef} className="w-full bg-[#F9F9FF] px-6 py-16 lg:py-20 lg:px-12">
      <style>{`
        @keyframes entFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes entShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .ent-fade { animation: entFadeUp 0.6s cubic-bezier(.22,.68,0,1.1) both; }
        .ent-skel {
          background: linear-gradient(90deg,#dde5ef 25%,#eaf0f7 50%,#dde5ef 75%);
          background-size: 200% 100%;
          animation: entShimmer 1.4s ease-in-out infinite;
          border-radius: 1rem;
        }
        .ent-badge {
          background-color: #dbe4f3;
          color: #1e293b;
          border: 1px solid #c7d4e9;
        }
        .ent-badge:hover {
          background-color: #0A9B74;
          color: #ffffff;
          border-color: #0A9B74;
        }
        .ent-row-gap {
          margin-top: 96px;
        }
        @media (max-width: 640px) {
          .ent-row-gap { margin-top: 56px; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* TOP STATS ROW */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Global Coverage */}
          <div
            className={`ent-fade ${isVisible ? "" : "opacity-0"}`}
            style={{ animationDelay: "0ms" }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">
              Global Coverage
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#0d2636]">
                {jurisdictions}+
              </span>
              <span className="text-sm text-[#64748b]">Active Jurisdictions</span>
            </div>
            <div className="mt-3 h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-[#d7e0ea]">
              <div
                className="h-full rounded-full bg-[#0A9B74] transition-all duration-[1400ms] ease-out"
                style={{ width: isVisible ? "70%" : "0%" }}
              />
            </div>
          </div>

          {/* Regulatory */}
          <div
            className={`ent-fade ${isVisible ? "" : "opacity-0"}`}
            style={{ animationDelay: "100ms" }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">
              Regulatory
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["HIPAA-aware", "GDPR-compliant", "SOC 2 ready"].map((badge) => (
                <span
                  key={badge}
                  className="ent-badge cursor-default whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition-all duration-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Scale */}
          <div
            className={`ent-fade ${isVisible ? "" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">
              Scale
            </p>
            <p className="mt-3 text-3xl font-extrabold text-[#0d2636]">{dataRows}M+</p>
            <p className="mt-1 text-sm text-[#64748b]">Normalized Data Rows</p>
          </div>

          {/* Advisors */}
          <div
            className={`ent-fade ${isVisible ? "" : "opacity-0"}`}
            style={{ animationDelay: "300ms" }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">
              Advisors
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#0d2636]">
              Guided by leaders from public health, deep-logistics, and medical
              infrastructure.
            </p>
          </div>
        </div>

        {/* BOTTOM ACTION CARDS */}
        <div className="ent-row-gap grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, index) => {
            const delay = `${index * 100}ms`;

            if (!isVisible) {
              return <div key={card.id} className="ent-skel h-[160px]" style={{ animationDelay: delay }} />;
            }

            return (
              <div
                key={card.id}
                className="ent-fade group cursor-default rounded-2xl border border-[#e2e8f0] bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#2DC9A0]/50 hover:shadow-[0_8px_32px_rgba(45,201,160,0.14)]"
                style={{ animationDelay: delay }}
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#0A9B74] transition-transform duration-300 group-hover:scale-110">
                  {card.icon}
                </div>

                <h3 className="mt-3 text-base font-bold text-[#0d2636] transition-colors duration-300 group-hover:text-[#0A9B74]">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                  {card.description}
                </p>

                <div className="mt-3 h-[2px] w-0 rounded-full bg-[#0A9B74] transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}