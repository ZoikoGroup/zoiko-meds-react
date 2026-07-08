"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const ROLE_VIEWS = [
  {
    id: "network-executive",
    label: "Network Executive",
    primaryView:
      "Executive health summary, access-risk trends, report readiness, and regional overview.",
    keyActions: ["Request briefing", "Review trends", "Approve reporting cadence"],
  },
  {
    id: "operations-manager",
    label: "Operations Manager",
    primaryView:
      "Location performance, escalation queue, and pharmacy network signal status across sites.",
    keyActions: ["Assign reviews", "Monitor escalation queue", "Coordinate location leads"],
  },
  {
    id: "clinical-administrator",
    label: "Clinical Administrator",
    primaryView:
      "Medicine watchlists, confidence trends, and access-risk alerts relevant to clinical operations.",
    keyActions: ["Review watchlist alerts", "Flag access concerns", "Coordinate with pharmacy network"],
  },
  {
    id: "procurement-supply",
    label: "Procurement / Supply",
    primaryView:
      "Regional access-risk signals and shortage movement to inform procurement planning.",
    keyActions: ["Monitor shortage signals", "Review regional trends", "Share intelligence with suppliers"],
  },
  {
    id: "compliance-officer",
    label: "Compliance Officer",
    primaryView:
      "Audit trails, access logs, and compliance-ready reports across the network.",
    keyActions: ["Review audit trails", "Approve compliance reports", "Monitor access controls"],
  },
  {
    id: "patient-access-team",
    label: "Patient Access Team",
    primaryView:
      "Location-level access signals, escalation status, and patient-facing communication guidance.",
    keyActions: ["Track escalation status", "Coordinate patient communication", "Log recurring access issues"],
  },
] as const;

export default function ClinicNetworksRoleBasedViewsSection() {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string>(ROLE_VIEWS[0].id);
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

  const activeRole = ROLE_VIEWS.find((role) => role.id === activeId) ?? ROLE_VIEWS[0];

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">06</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Role-Based Views
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">The right view for </span>
            <span style={{ color: ACCENT }}>every team.</span>
          </h2>
        </Reveal>

        {/* ── Role tabs ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 flex flex-wrap gap-2.5 lg:mt-10">
            {ROLE_VIEWS.map((role) => {
              const isActive = role.id === activeId;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setActiveId(role.id)}
                  className="rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors duration-200"
                  style={{
                    backgroundColor: isActive ? ACCENT : "white",
                    borderColor: isActive ? ACCENT : "#D8DDE8",
                    color: isActive ? "white" : "#0F1F4E",
                  }}
                >
                  {role.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Role detail card ── */}
        <Reveal index={3} active={mounted}>
          <div
            className="mt-6 rounded-2xl border bg-white p-6 sm:p-8"
            style={{
              borderColor: "#E7EAF1",
              boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
            }}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p
                  className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  Primary view
                </p>
                <p className="text-[14px] leading-relaxed text-[#0F1F4E]">
                  {activeRole.primaryView}
                </p>
              </div>

              <div>
                <p
                  className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  Key actions
                </p>
                <div className="flex flex-col gap-2">
                  {activeRole.keyActions.map((action) => (
                    <div key={action} className="flex items-center gap-2">
                      <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 flex-shrink-0" style={{ color: ACCENT }}>
                        <path
                          d="M3.2 8.4l3 3 6.6-6.8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[14px] text-[#0F1F4E]">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

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
        animation: active ? `clinicNetworksRoleBasedViewsFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksRoleBasedViewsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}