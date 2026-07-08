"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const DASHBOARD_MODULES = [
  {
    id: "executive-summary-panel",
    title: "Executive summary panel",
    need: "Leaders need a fast health view.",
    detail: "Network access score, at-risk locations, watchlist medicines, and upcoming report date.",
    icon: (
      <path d="M3.5 12.5V9M7 12.5V6M10.5 12.5V3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    ),
  },
  {
    id: "clinic-location-grid",
    title: "Clinic location grid",
    need: "Operations teams need location comparison.",
    detail: "Location, region, signal status, priority medicines, pharmacy confidence, and latest review.",
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
    id: "priority-medicine-watchlist",
    title: "Priority medicine watchlist",
    need: "Teams need to monitor specific categories.",
    detail: "Confidence tier, trend direction, risk reason, and owner.",
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
    id: "regional-heat-map",
    title: "Regional heat map",
    need: "Network teams need geographic visibility.",
    detail: "Regions mapped by confidence and access risk without showing exact inventory.",
    icon: (
      <>
        <path
          d="M8 13.5S3.2 9.4 3.2 6.1a4.8 4.8 0 019.6 0c0 3.3-4.8 7.4-4.8 7.4z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="8" cy="6.1" r="1.6" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "escalation-queue",
    title: "Escalation queue",
    need: "Teams need work prioritization.",
    detail: "Unresolved access signals, required review, assigned team, and SLA status.",
    icon: (
      <>
        <circle cx="4" cy="4" r="1.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <circle cx="12" cy="12" r="1.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M5.2 5.2c1.5 1.5 3 2 5.6 2.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M10.8 10.8c-1.5-1.5-3-2-5.6-2.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
      </>
    ),
  },
  {
    id: "report-center",
    title: "Report center",
    need: "Governance teams need repeatable outputs.",
    detail: "Executive briefing, compliance notes, access report, and export status.",
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

export default function ClinicNetworksOperatingDashboardSection() {
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
            Network Operating Dashboard
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">A central operating view for medicine access </span>
            <span style={{ color: ACCENT }}>across every clinic location.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-[#5B6478]">
            The dashboard experience clinic network leaders should imagine using weekly,
            monthly, and during access disruption events.
          </p>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {DASHBOARD_MODULES.map((module, i) => (
            <Reveal key={module.id} index={3 + i} active={mounted}>
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
                    {module.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{module.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#A6AEC0]">
                  {module.need}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {module.detail}
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
      className="h-full"
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `clinicNetworksOperatingDashboardFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksOperatingDashboardFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}