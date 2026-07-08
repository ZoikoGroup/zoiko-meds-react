"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#2FD4B0";

const GOVERNANCE_POINTS = [
  {
    id: "role-based-access-control",
    title: "Role-based access control",
    description: "Users see only the modules and reports appropriate to their role.",
    icon: (
      <>
        <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "sso-enterprise-identity",
    title: "SSO & enterprise identity",
    description: "Support enterprise authentication and centralized access management.",
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
    id: "audit-trails",
    title: "Audit trails",
    description: "Report generation, exports, workflow changes, and access events require traceability.",
    icon: (
      <path d="M3.5 4.5h9M3.5 8h9M3.5 11.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    ),
  },
  {
    id: "responsible-ai-boundaries",
    title: "Responsible AI boundaries",
    description: "AI outputs remain operational, explainable, bounded, reviewable — and non-clinical.",
    icon: (
      <path
        d="M8 2.4c.35 1.9 1.1 3.05 2.9 3.6-1.8.55-2.55 1.7-2.9 3.6-.35-1.9-1.1-3.05-2.9-3.6 1.8-.55 2.55-1.7 2.9-3.6zM12.4 9.6c.2 1.05.6 1.7 1.6 2-1 .3-1.4.95-1.6 2-.2-1.05-.6-1.7-1.6-2 1-.3 1.4-.95 1.6-2z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "privacy-aware-design",
    title: "Privacy-aware design",
    description: "Avoid patient-identifiable exposure in marketing and default dashboards.",
    icon: (
      <>
        <path
          d="M1.8 8S4 3.6 8 3.6 14.2 8 14.2 8 12 12.4 8 12.4 1.8 8 1.8 8z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="8" cy="8" r="1.9" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "no-unsafe-inventory-exposure",
    title: "No unsafe inventory exposure",
    description:
      "No exact stock quantities in unauthorized or public-facing contexts; confidence tiers and restricted views.",
    icon: (
      <>
        <rect x="2.5" y="4.2" width="11" height="7.6" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5.5 13.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description: "WCAG 2.2 AA across navigation, forms, dashboards, charts, and tables.",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 5.4h.01M8 7.5v3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
] as const;

export default function HospitalSystemsSecurityPrivacyGovernanceSection() {
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
    <section ref={ref} className="relative w-full overflow-hidden bg-[#0F1F4E] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60">07</span>
            <span className="opacity-40">·</span>
            Security, Privacy &amp; Governance
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-white">Enterprise-ready, </span>
            <span style={{ color: ACCENT }}>healthcare-sensitive.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {GOVERNANCE_POINTS.map((point, i) => (
            <Reveal key={point.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border p-6 transition-all duration-250 ease-out hover:-translate-y-1"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.035)",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out group-hover:scale-110"
                  style={{ backgroundColor: "rgba(47,212,176,0.14)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {point.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-white">{point.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "#9AA3C0" }}>
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}

          {/* ── Review the controls (highlighted CTA card) ── */}
          <Reveal index={2 + GOVERNANCE_POINTS.length} active={mounted}>
            <Link
              href="/trust-center"
              className="flex h-full flex-col rounded-2xl border p-6 transition-all duration-250 ease-out hover:-translate-y-1"
              style={{
                borderColor: "rgba(47,212,176,0.35)",
                backgroundColor: "rgba(47,212,176,0.08)",
              }}
            >
              <div
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white transition-transform duration-250 ease-out group-hover:scale-110"
                style={{ color: "#0F1F4E" }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M3 8h10M9 4.5L12.5 8 9 11.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="text-[14.5px] font-bold text-white">Review the controls</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "#9AA3C0" }}>
                Walk through governance with our team.
              </p>

              <span
                className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-semibold"
                style={{ color: ACCENT }}
              >
                Visit Trust Center
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                  <path
                    d="M3.5 8h9M8.5 4.5L12 8l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </Reveal>
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
        animation: active ? `hospitalSystemsSecurityPrivacyGovernanceFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsSecurityPrivacyGovernanceFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}