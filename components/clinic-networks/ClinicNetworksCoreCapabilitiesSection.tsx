"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const CORE_CAPABILITIES = [
  {
    id: "multi-location-access-visibility",
    title: "Multi-location access visibility",
    description: "Monitor medicine access signals by clinic, region, service line, and operating territory.",
    linkLabel: "See Network View",
    href: "/clinic-networks/network-view",
    icon: (
      <>
        <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <rect x="9" y="9" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none" />
      </>
    ),
  },
  {
    id: "priority-medicine-watchlists",
    title: "Priority medicine watchlists",
    description: "Track medicines or categories that matter most to the clinic network and its patient populations.",
    linkLabel: "Create Watchlist Briefing",
    href: "/clinic-networks/watchlist-briefing",
    icon: (
      <path
        d="M4.5 3h7a1 1 0 011 1v9.2l-4.5-2.6-4.5 2.6V4a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "shortage-signal-awareness",
    title: "Shortage signal awareness",
    description: "Identify patterns that may indicate access pressure, weakening confidence, or emerging shortage movement.",
    linkLabel: "Explore Shortage Intelligence",
    href: "/clinic-networks/shortage-intelligence",
    icon: (
      <path
        d="M8 1.6L14.9 13.4a1 1 0 01-.86 1.5H2a1 1 0 01-.87-1.5L8 1.6z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "pharmacy-network-coordination",
    title: "Pharmacy network coordination",
    description: "Understand where pharmacy participation and confirmation activity are strengthening access confidence.",
    linkLabel: "View Pharmacy Network Signals",
    href: "/clinic-networks/pharmacy-network-signals",
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
    id: "operational-escalation-workflows",
    title: "Operational escalation workflows",
    description: "Route access concerns to assigned teams with status, notes, priority, and review ownership.",
    linkLabel: "Discuss Workflow Design",
    href: "/clinic-networks/workflow-design",
    icon: (
      <path
        d="M4.6 3.4c.4-.3 1-.2 1.3.2l1 1.5c.3.4.2 1-.2 1.3l-.7.5c.5 1.2 1.5 2.2 2.7 2.7l.5-.7c.3-.4.9-.5 1.3-.2l1.5 1c.4.3.5.9.2 1.3l-.6.9c-.3.4-.8.6-1.3.5-2.7-.5-5.4-3.2-5.9-5.9-.1-.5.1-1 .5-1.3l.7-.8z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "compliance-ready-reporting",
    title: "Compliance-ready reporting",
    description: "Produce structured reports for leadership, operations, compliance, and stakeholder briefings.",
    linkLabel: "Request Sample Reports",
    href: "/clinic-networks/sample-reports",
    icon: (
      <path
        d="M4.2 2.5h6l2.6 2.6v8.4a.6.6 0 01-.6.6H4.2a.6.6 0 01-.6-.6V3.1a.6.6 0 01.6-.6zM9.8 2.5v2.6h2.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
] as const;

export default function ClinicNetworksCoreCapabilitiesSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">04</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Core Clinic Network Capabilities
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Six capabilities built for </span>
            <span style={{ color: ACCENT }}>clinic operators.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {CORE_CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.id} index={2 + i} active={mounted}>
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
                    {cap.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{cap.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {cap.description}
                </p>

                <div className="mt-auto pt-4">
                  <Link
                    href={cap.href}
                    className="inline-flex items-center gap-1 text-[13px] font-semibold transition-colors duration-200"
                    style={{ color: ACCENT }}
                  >
                    {cap.linkLabel}
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
        animation: active ? `clinicNetworksCoreCapabilitiesFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksCoreCapabilitiesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}