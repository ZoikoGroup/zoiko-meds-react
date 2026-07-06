"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const SECURITY_POINTS = [
  {
    id: "authentication",
    title: "Authentication",
    description:
      "SSO, API credentials, scoped tokens, and enterprise access pathways as supported or planned capabilities.",
    icon: (
      <path
        d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "authorization",
    title: "Authorization",
    description: "Permissions by role, organization type, workflow, and data category.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "encryption",
    title: "Encryption",
    description: "Data exchange should use secure transmission and appropriate storage protections.",
    icon: (
      <>
        <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "audit-logs",
    title: "Audit logs",
    description: "Event logs for all integration actions, access, exports, and configuration changes.",
    icon: (
      <path
        d="M3 4.5h10M3 8h10M3 11.5h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "data-retention",
    title: "Data retention",
    description: "Configurable retention and report-history controls for enterprise workflows.",
    icon: (
      <path
        d="M3 4.5h10M3 8h10M3 11.5h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    description:
      "Data minimization, authorized access, consent-aware workflows where applicable, and privacy review.",
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
    id: "compliance-boundaries",
    title: "Compliance boundaries",
    description: "No dispensing, no prescribing, no delivery, no diagnosis, and no medical advice.",
    icon: (
      <path
        d="M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM4.2 4.2l7.6 7.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "operational-resilience",
    title: "Operational resilience",
    description:
      "Monitoring, error handling, retry logic, support escalation, and rollback readiness.",
    icon: (
      <path
        d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 4.5v4l3 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
] as const;

export default function IntegrationsSecurityPrivacyComplianceSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: "#0B1530" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-white">07</span>
            <span className="opacity-30 text-white">·</span>
            Security, Privacy &amp; Compliance
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            Built for secure healthcare-adjacent <span style={{ color: ACCENT }}>interoperability.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY_POINTS.map((point, i) => (
            <Reveal key={point.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border p-5"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(19,165,148,0.15)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {point.icon}
                  </svg>
                </div>
                <p className="text-[13.5px] font-bold text-white">{point.title}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#AEB6C9]">
                  {point.description}
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
        animation: active ? `integrationsSecurityPrivacyComplianceFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes integrationsSecurityPrivacyComplianceFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}