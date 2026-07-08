"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const INTEGRATION_POINTS = [
  {
    id: "identity-sso",
    title: "Identity & SSO",
    description: "Support enterprise authentication, permission control, and role-based access.",
    linkLabel: "Discuss SSO Requirements",
    href: "/hospital-systems/sso",
    icon: (
      <>
        <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "hospital-operations-bi",
    title: "Hospital operations & BI",
    description: "Export structured intelligence into approved analytics and reporting workflows.",
    linkLabel: "Request Integration Review",
    href: "/hospital-systems/bi-integration",
    icon: (
      <path
        d="M3.5 12.5V9M7 12.5V6M10.5 12.5V3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
  },
  {
    id: "pharmacy-network-systems",
    title: "Pharmacy & network systems",
    description: "Support authorized confirmation workflows and pharmacy participation signals.",
    linkLabel: "Review Pharmacy Workflows",
    href: "/hospital-systems/pharmacy-workflows",
    icon: (
      <path
        d="M3 6.2L8 3l5 3.2v6.6a.7.7 0 01-.7.7H3.7a.7.7 0 01-.7-.7V6.2z M6.3 12.5V9.2h3.4v3.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "procurement-supply-chain",
    title: "Procurement & supply chain",
    description: "Provide access-risk and availability intelligence to procurement stakeholders.",
    linkLabel: "Talk to Solutions Team",
    href: "/hospital-systems/procurement",
    icon: (
      <path
        d="M8 2.4l4.8 2.8v5.6L8 13.6l-4.8-2.8V5.2L8 2.4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "compliance-audit",
    title: "Compliance & audit",
    description: "Support evidence-ready reports, export controls, and audit histories.",
    linkLabel: "View Governance Controls",
    href: "/hospital-systems/governance",
    icon: (
      <path d="M3.5 4.8h9M3.5 8h9M3.5 11.2h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    ),
  },
  {
    id: "api-access",
    title: "API access",
    description: "Enable approved API pathways for enterprise integration and secure data exchange.",
    linkLabel: "Request API Briefing",
    href: "/hospital-systems/api-access",
    icon: (
      <path
        d="M6 4.5L2.5 8 6 11.5M10 4.5L13.5 8 10 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
] as const;

export default function HospitalSystemsIntegrationsDeploymentSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">08</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Integrations &amp; Deployment
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Evaluated, integrated, governed, and rolled out through a </span>
            <span style={{ color: ACCENT }}>controlled process.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {INTEGRATION_POINTS.map((point, i) => (
            <Reveal key={point.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out group-hover:scale-110"
                  style={{ backgroundColor: "rgba(19,165,148,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {point.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{point.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {point.description}
                </p>

                <div className="mt-auto pt-4">
                  <Link
                    href={point.href}
                    className="inline-flex items-center gap-1 text-[13px] font-semibold transition-colors duration-200"
                    style={{ color: ACCENT }}
                  >
                    {point.linkLabel}
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                      <path
                        d="M3.5 8h9M8.5 4.5L12 8l-3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
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
      className="h-full"
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `hospitalSystemsIntegrationsDeploymentFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsIntegrationsDeploymentFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}