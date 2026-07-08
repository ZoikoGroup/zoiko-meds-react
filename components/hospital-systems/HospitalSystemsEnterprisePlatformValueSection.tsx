"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const CAPABILITIES = [
  {
    id: "medicine-availability-intelligence",
    title: "Medicine availability intelligence",
    description:
      "Monitor availability, confidence, access risk, and geographic patterns across facilities and markets.",
    cta: "Explore Intelligence",
    icon: (
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "shortage-signal-awareness",
    title: "Shortage signal awareness",
    description:
      "Identify emerging pressure signals and confidence movement before they become operational blind spots.",
    cta: "Request Shortage Briefing",
    icon: (
      <path
        d="M8 2.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "pharmacy-network-visibility",
    title: "Pharmacy network visibility",
    description:
      "Understand confirmation coverage, pharmacy participation, and network signal strength.",
    cta: "View Pharmacy Workflows",
    icon: (
      <path
        d="M8 2l5 2.2v3.3c0 3.3-2.1 5.7-5 6.5-2.9-.8-5-3.2-5-6.5V4.2L8 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "regional-access-analytics",
    title: "Regional access analytics",
    description:
      "Compare access patterns by market, region, facility group, and medicine category.",
    cta: "See Analytics",
    icon: (
      <path
        d="M2.5 13.5V8.5M6.5 13.5V5M10.5 13.5V9.5M14 13.5V3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "compliance-ready-reporting",
    title: "Compliance-ready reporting",
    description:
      "Prepare leadership, governance, and stakeholder-ready reports with appropriate evidence trails.",
    cta: "Request Sample Report",
    icon: (
      <path
        d="M4.5 2.5h7v11h-7v-11zM6 5h4M6 7.2h4M6 9.4h2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "enterprise-deployment-controls",
    title: "Enterprise deployment controls",
    description:
      "Use role-based access, SSO, APIs, audit logs, and governance workflows for large-scale deployment.",
    cta: "Talk to Solutions Team",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
];

export default function HospitalSystemsEnterprisePlatformValueSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">03</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Enterprise Platform Value
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Six capabilities built for </span>
            <span style={{ color: ACCENT }}>hospital systems.</span>
          </h2>
        </Reveal>

        {/* ── Capability cards ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {CAPABILITIES.map((capability, i) => (
            <Reveal key={capability.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                {/* Icon */}
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out hover:scale-110"
                  style={{ backgroundColor: "rgba(19,165,148,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {capability.icon}
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-[14px] font-bold text-[#0F1F4E]">{capability.title}</h3>

                {/* Description */}
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
                  {capability.description}
                </p>

                {/* CTA link */}
                <a
                  href="#"
                  className="mt-4 inline-flex text-[13px] font-semibold hover:underline"
                  style={{ color: ACCENT }}
                >
                  {capability.cta} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>

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
        animation: active ? `hospitalSystemsEnterprisePlatformValueFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsEnterprisePlatformValueFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}