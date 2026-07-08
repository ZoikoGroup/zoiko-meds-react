"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const LAYERS = [
  {
    id: "organization-layer",
    title: "Organization layer",
    scope: "Health system, IDN, region, market, facility group, individual facility.",
    details: "Hierarchical organization model with role inheritance.",
    icon: (
      <path
        d="M4.5 5.5h7M4.5 8.5h7M4.5 11.5h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "user-role-layer",
    title: "User role layer",
    scope:
      "Executive, pharmacy leader, supply chain, access team, compliance, IT, analyst, partner.",
    details: "Permissions control dashboards, reports, exports, and sensitive modules.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "medicine-watch-layer",
    title: "Medicine watch layer",
    scope: "Priority medicines, therapeutic categories, shortage watchlists, regional watchlists.",
    details: "Saved views and alerts configurable by role.",
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
    id: "signal-layer",
    title: "Signal layer",
    scope: "Search demand, availability confidence, pharmacy confirmation, partner signals, regional access.",
    details: "No exact inventory exposure in unauthorized views.",
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
    id: "reporting-layer",
    title: "Reporting layer",
    scope: "Facility report, region report, executive briefing, compliance evidence report.",
    details: "Export controls, timestamps, and evidence references.",
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
];

export default function HospitalSystemsMultiSiteOperatingModelSection() {
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
            Multi-Site Operating Model
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Built for facilities, </span>
            <span style={{ color: ACCENT }}>regions, teams, and roles.</span>
          </h2>
        </Reveal>

        {/* ── Layers list ── */}
        <div className="mt-10 space-y-4 lg:mt-12">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.id} index={2 + i} active={mounted}>
              <div
                className="flex gap-4 rounded-2xl border bg-white p-5 sm:gap-5 sm:p-6 transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                {/* Icon */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(19,165,148,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5">
                    {layer.icon}
                  </svg>
                </div>

                {/* Content grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Title */}
                  <div>
                    <p className="text-[14px] font-bold text-[#0F1F4E]">{layer.title}</p>
                  </div>

                  {/* Scope */}
                  <div>
                    <p className="text-[13px] leading-relaxed text-[#5B6478]">
                      {layer.scope}
                    </p>
                  </div>

                  {/* Details */}
                  <div>
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: "rgba(19,165,148,0.8)" }}
                    >
                      {layer.details}
                    </p>
                  </div>
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
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `hospitalSystemsMultiSiteOperatingModelFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsMultiSiteOperatingModelFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}