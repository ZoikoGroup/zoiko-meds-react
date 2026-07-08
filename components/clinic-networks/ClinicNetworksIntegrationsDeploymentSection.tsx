"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const INTEGRATIONS = [
  {
    id: "identity-access",
    title: "Identity & access",
    description:
      "SSO, role-based permissions, admin management, and least-privilege access design.",
    icon: (
      <path
        d="M3.5 7.5a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0zM1.5 14c0-2.8 2.2-4.5 6-4.5s6 1.7 6 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: "clinic-operations-systems",
    title: "Clinic operations systems",
    description:
      "Approved workflow integrations with internal operations, case management, or CRM systems.",
    icon: (
      <path
        d="M2.5 5.5h11M2.5 9h11M2.5 12.5h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "analytics-bi",
    title: "Analytics & BI",
    description:
      "Approved exports, dashboards, and data feeds for enterprise reporting environments.",
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
    id: "pharmacy-partner-signals",
    title: "Pharmacy & partner signals",
    description:
      "Connect authorized pharmacy confirmation and partner participation workflows where available.",
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
    id: "reporting-systems",
    title: "Reporting systems",
    description:
      "Scheduled exports and executive briefing outputs for leadership and compliance teams.",
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
    id: "api-access",
    title: "API access",
    description:
      "Controlled API pathways for approved enterprise use cases, integration governance, and monitoring.",
    icon: (
      <>
        <path d="M4 6l2 2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M12 6l-2 2 2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </>
    ),
  },
];

export default function ClinicNetworksIntegrationsDeploymentSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">07</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Integrations &amp; Deployment
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Deploy across clinic networks without </span>
            <span style={{ color: ACCENT }}>creating workflow chaos.</span>
          </h2>
        </Reveal>

        {/* ── Integration cards ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {INTEGRATIONS.map((integration, i) => (
            <Reveal key={integration.id} index={2 + i} active={mounted}>
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
                    {integration.icon}
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{integration.title}</h3>

                {/* Description */}
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {integration.description}
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
        animation: active ? `clinicNetworksIntegrationsDeploymentFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksIntegrationsDeploymentFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}