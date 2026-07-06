"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const INTEGRATION_STATUS = [
  {
    id: "pharmacy-system",
    name: "Pharmacy system",
    status: "healthy",
    lastSync: "Last sync 2m ago",
    action: "View",
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
    id: "analytics-bi",
    name: "Analytics / BI",
    status: "healthy",
    lastSync: "Last sync 5m ago",
    action: "View",
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
    id: "wholesale-feed",
    name: "Wholesale feed",
    status: "delayed",
    lastSync: "Last sync 48m ago",
    action: "Review",
    icon: (
      <path
        d="M8 1.5l6 3.5v6L8 14.5 2 11v-6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "identity-sso",
    name: "Identity / SSO",
    status: "healthy",
    lastSync: "Last sync 1m ago",
    action: "View",
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
    id: "partner-api",
    name: "Partner API",
    status: "error",
    lastSync: "3 events pending",
    action: "Support",
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
] as const;

const MONITORING_FEATURES = [
  {
    id: "integration-health-dashboard",
    title: "Integration health dashboard",
    description: "Connected systems, uptime, sync status, last successful exchange, and current issues.",
    icon: (
      <rect x="3" y="5" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
    ),
  },
  {
    id: "alert-thresholds",
    title: "Alert thresholds",
    description: "Notify authorized users when sync failures, confidence shifts, reporting gaps, or errors occur.",
    icon: (
      <path
        d="M12 2l2 4h4l-3.2 2.4 1 4L12 10l-3.8 2.4 1-4L6 6h4l2-4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "saved-data-mappings",
    title: "Saved data mappings",
    description: "Reduce friction when onboarding to additional regions, systems, medicines, or partner groups.",
    icon: (
      <path
        d="M3 5h10M3 9h10M3 13h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "recurring-reports",
    title: "Recurring reports",
    description:
      "Keep leadership, operations, and compliance teams aligned on a consistent cadence.",
    icon: (
      <path
        d="M4.5 2.5h7v10h-7v-10zM7 5h1M7 7.5h1M7 10h1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "usage-analytics",
    title: "Usage analytics",
    description: "Adoption, report downloads, API usage, workflow completion, and stakeholder engagement.",
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
    id: "quarterly-review-briefings",
    title: "Quarterly review briefings",
    description: "Create an enterprise retention motion around value realization and expansion.",
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

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "healthy":
      return { backgroundColor: "#D1F4E8", color: "#13A594", label: "Healthy" };
    case "delayed":
      return { backgroundColor: "#FEE9D3", color: "#D97706", label: "Delayed" };
    case "error":
      return { backgroundColor: "#FED3D3", color: "#DC2626", label: "Error queue" };
    default:
      return { backgroundColor: "#F0F0F0", color: NAVY, label: status };
  }
};

export default function IntegrationsMonitoringRetentionSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>09</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Integration Monitoring &amp; Retention
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Keep critical medicine access workflows{" "}
            <span style={{ color: ACCENT }}>running with confidence.</span>
          </h2>
        </Reveal>

        {/* ── Integration health table ── */}
        <Reveal index={2} active={mounted}>
          <div
            className="mt-9 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(15,31,78,0.04)]"
          >
            <div className="px-6 py-4 sm:px-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                  Integration health
                </p>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold"
                  style={{ backgroundColor: "#D1F4E8", color: ACCENT }}
                >
                  ✓ Synthetic data
                </span>
              </div>
            </div>

            <div className="border-t" style={{ borderColor: "rgba(15,31,78,0.08)" }} />

            <div className="divide-y" style={{ borderColor: "rgba(15,31,78,0.08)" }}>
              {INTEGRATION_STATUS.map((item) => {
                const badge = getStatusBadgeStyle(item.status);
                return (
                  <div key={item.id} className="flex items-center justify-between gap-4 px-6 py-4 sm:px-7 sm:py-5">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                        style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                      >
                        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                          {item.icon}
                        </svg>
                      </div>
                      <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                        {item.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap"
                        style={badge}
                      >
                        {badge.label === "Healthy" || badge.label === "Delayed" || badge.label === "Error queue"
                          ? badge.label
                          : "✓ " + badge.label}
                      </span>
                      <p className="text-[12px]" style={{ color: `${NAVY}80` }}>
                        {item.lastSync}
                      </p>
                      <a
                        href="#"
                        className="text-[12.5px] font-semibold hover:underline whitespace-nowrap"
                        style={{ color: ACCENT }}
                      >
                        {item.action}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ── Monitoring features grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {MONITORING_FEATURES.map((feature, i) => (
            <Reveal key={feature.id} index={3 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {feature.icon}
                  </svg>
                </div>
                <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                  {feature.title}
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                  {feature.description}
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
        animation: active ? `integrationsMonitoringRetentionFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes integrationsMonitoringRetentionFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}