"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const INTEGRATION_CARDS = [
  {
    id: "api-layer",
    title: "API layer",
    description: "Secure endpoints for approved enterprise, partner, reporting, and platform workflows.",
    icon: (
      <path
        d="M5.5 4L2.5 8l3 4M10.5 4l3 4-3 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "identity-sso",
    title: "Identity & SSO",
    description: "Role-based access, SSO readiness, MFA support, and admin controls.",
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
    id: "pharmacy-systems",
    title: "Pharmacy systems",
    description: "Authorized participation and confidence update workflows where appropriate.",
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
    id: "bi-analytics",
    title: "BI & analytics",
    description: "Governed exports and dashboard connections for approved internal reporting.",
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
    id: "crm-sales-ops",
    title: "CRM & sales ops",
    description: "Lead routing, account management, stakeholder workflows, and briefing history.",
    icon: (
      <>
        <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M3 14c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "audit-compliance",
    title: "Audit & compliance",
    description: "Event logs, export logs, access logs, and report generation history.",
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
] as const;

export default function FeaturesSecureIntegrationsSection() {
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
        {/* ── Top: visual + copy split ── */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <Reveal index={0} active={mounted}>
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border sm:aspect-[16/12]"
              style={{ borderColor: "#E7EAF1", boxShadow: "0 20px 48px -20px rgba(15,31,78,0.16)" }}
            >
              {/* Replace src with the real asset, e.g. /images/features-secure-integrations.png */}
              <img
                src="/images/features-secure-integrations.webp"
                alt="Secure Integrations for Enterprise Healthcare Workflows, showing a shield icon connected to EHR/EMR, pharmacy systems, data platforms, cloud services, analytics platforms, and third-party applications"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal index={1} active={mounted}>
              <p
                className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                Secure Integrations
              </p>
            </Reveal>

            <Reveal index={2} active={mounted}>
              <h2 className="text-[1.9rem] font-extrabold leading-[1.2] sm:text-[2.2rem]">
                <span className="text-[#0F1F4E]">Secure Integrations for Enterprise </span>
                <span style={{ color: ACCENT }}>Healthcare Workflows</span>
              </h2>
            </Reveal>

            <Reveal index={3} active={mounted}>
              <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
                ZoikoMeds should support approved integrations with healthcare, pharmacy,
                distribution, analytics, identity, reporting, and enterprise systems through
                secure, controlled, and auditable workflows.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Card grid ── */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {INTEGRATION_CARDS.map((card, i) => (
            <Reveal key={card.id} index={4 + i} active={mounted}>
              <div
                className="group flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out group-hover:scale-110"
                  style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {card.description}
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
        animation: active ? `featuresSecureIntegrationsFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes featuresSecureIntegrationsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}