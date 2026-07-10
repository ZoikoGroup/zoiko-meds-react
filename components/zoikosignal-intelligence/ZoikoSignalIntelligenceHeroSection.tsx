"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const ACCENT = "#0FAA87";

const DASHBOARD_ROWS = [
  { label: "Regional access-risk index", value: "Elevated", tone: "blue" },
  { label: "Restock velocity", value: "Recovering", tone: "green", icon: "check" },
  { label: "Therapeutic category", value: "Cardiovascular", tone: "muted" },
  { label: "Confidence · freshness", value: "High · 6h", tone: "green", icon: "check" },
  { label: "Jurisdiction", value: "Region: EU", tone: "muted" },
] as const;

const DEMAND_BARS = [40, 55, 48, 65, 72, 80, 90];

export default function ZoikoSignalIntelligenceHeroSection() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------- Breadcrumb ---------------- */}
        {mounted ? (
          <Reveal index={0}>
            <nav className="mb-6 flex items-center gap-2 text-[12.5px] text-[#8891A4]">
              <a href="#" className="transition-colors duration-200 hover:text-[#0F1F4E]">
                Home
              </a>
              <span>/</span>
              <a href="#" className="transition-colors duration-200 hover:text-[#0F1F4E]">
                Enterprise &amp; Intelligence
              </a>
              <span>/</span>
              <span className="text-[#0F1F4E]">ZoikoSignal™ intelligence</span>
            </nav>
          </Reveal>
        ) : (
          <div className="mb-6 h-4 w-72 animate-pulse rounded bg-[#E4E8F0]" />
        )}

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Left column ---------------- */}
          <div>
            {mounted ? (
              <div className="flex flex-col gap-5">
                <Reveal index={1}>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: ACCENT }}
                  >
                    ZoikoSignal™ Intelligence
                  </span>
                </Reveal>

                <Reveal index={2}>
                  <h1 className="font-[var(--font-plus-jakarta-sans)] text-4xl font-bold leading-[1.15] text-[#0F1F4E] sm:text-[2.65rem]">
                    Medicine availability
                    <br />
                    intelligence for institutions.
                  </h1>
                </Reveal>

                <Reveal index={3}>
                  <p className="max-w-lg text-[15px] leading-relaxed text-[#5B6478]">
                    ZoikoSignal™ turns aggregated medicine availability
                    signals, shortage pressure, demand movement, restock
                    patterns, and regional access risk into governed
                    intelligence for health systems, governments,
                    manufacturers, payers, and public-health
                    organizations.
                  </p>
                </Reveal>

                <Reveal index={4}>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <button
                    onClick={()=>router.push("#request")}
                      type="button"
                      className="group cursor-pointer relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                      style={{ backgroundColor: ACCENT }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 8px 24px -4px rgba(15,170,135,0.45)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow = "none")
                      }
                    >
                      <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
                      <span className="relative">Request ZoikoSignal™ Briefing</span>
                    </button>

                    <button
                      type="button"
                      className="rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                    >
                      View Sample Intelligence Dashboard
                    </button>
                  </div>
                </Reveal>

                <Reveal index={5}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors duration-200"
                    style={{ color: ACCENT }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0C8A6E")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = ACCENT)}
                  >
                    View Governance Standards
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </Reveal>

                <Reveal index={6}>
                  <p className="mt-1 flex max-w-lg items-start gap-2.5 text-[12.5px] leading-relaxed text-[#8891A4]">
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 1.5l5 1.8v4c0 3.4-2.2 5.7-5 6.7-2.8-1-5-3.3-5-6.7v-4l5-1.8z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Aggregated intelligence. Privacy thresholds.
                    Contract-scoped outputs. No identifiable patient-data
                    sales. No exact public pharmacy stock exposure.
                  </p>
                </Reveal>
              </div>
            ) : (
              <LeftSkeleton />
            )}
          </div>

          {/* ---------------- Right column: dashboard preview card ---------------- */}
          <div>
            {mounted ? <DashboardCard /> : <CardSkeleton />}
            {mounted && (
              <p
                className="mt-3 animate-[zoikoSignalFadeUp_0.5s_ease-out_forwards] text-center text-[11.5px] leading-relaxed text-[#9AA3B5]"
                style={{ opacity: 0, animationDelay: "1050ms" }}
              >
                Illustrative example. Production outputs are governed by
                contract, thresholds, jurisdiction, and approved data
                scope.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/*  Reveal: bottom -> top staggered fade-up wrapper                   */
/* ----------------------------------------------------------------- */
function Reveal({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoSignalFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Dashboard card                                                      */
/* ----------------------------------------------------------------- */
function DashboardCard() {
  return (
    <div
      className="animate-[zoikoSignalFadeUp_0.65s_ease-out_forwards] overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_16px_40px_-16px_rgba(15,31,78,0.18)] transition-shadow duration-300 hover:shadow-[0_20px_48px_-16px_rgba(15,31,78,0.24)]"
      style={{ opacity: 0, animationDelay: "150ms" }}
    >
      <div className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-4">
        <h3 className="text-[15px] font-bold text-[#0F1F4E]">
          Intelligence dashboard
        </h3>
        <Pill tone="green" icon="check">
          Governed
        </Pill>
      </div>

      {/* shortage pressure + demand movement */}
      <div
        className="grid grid-cols-2 gap-5 border-b border-[#EEF1F6] px-6 py-5"
        style={{
          animation: "zoikoSignalFadeUp 0.5s ease-out forwards",
          opacity: 0,
          animationDelay: "250ms",
        }}
      >
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#9AA3B5]">
            Shortage pressure
          </span>
          <div
            className="mt-2.5 h-9 w-full rounded-lg"
            style={{
              background:
                "linear-gradient(90deg, #F0A8A0 0%, #F4D9A8 35%, #DCEFC8 60%, #A9E0CF 80%, #8FD7C8 100%)",
            }}
          />
        </div>
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#9AA3B5]">
            Demand movement
          </span>
          <p className="mt-1.5 flex items-center gap-1 text-[15px] font-bold" style={{ color: ACCENT }}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M3 11l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Rising
          </p>
          <div className="mt-2 flex h-7 items-end gap-1">
            {DEMAND_BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  backgroundColor: i === DEMAND_BARS.length - 1 ? ACCENT : "#DCF5EE",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {DASHBOARD_ROWS.map((row, i) => (
        <div
          key={row.label}
          className="group flex items-center justify-between border-b border-[#EEF1F6] px-6 py-3.5 transition-colors duration-200 last:border-b-0 hover:bg-[#F7F9FC]"
          style={{
            animation: "zoikoSignalFadeUp 0.5s ease-out forwards",
            opacity: 0,
            animationDelay: `${350 + i * 70}ms`,
          }}
        >
          <span className="text-[13.5px] text-[#5B6478]">{row.label}</span>
          <Pill tone={row.tone} icon={"icon" in row ? row.icon : undefined}>
            {row.value}
          </Pill>
        </div>
      ))}
    </div>
  );
}

function Pill({
  tone,
  icon,
  children,
}: {
  tone: "green" | "blue" | "muted";
  icon?: "check";
  children: React.ReactNode;
}) {
  const toneClasses =
    tone === "green"
      ? "bg-[#DCF5EE] text-[#0C8A6E]"
      : tone === "blue"
      ? "bg-[#E3E8FB] text-[#3B5BDB]"
      : "bg-[#EEF1F6] text-[#5B6478]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-transform duration-200 group-hover:scale-105 ${toneClasses}`}
    >
      {icon === "check" && (
        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.5 8.5l3 3 6-6.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                          */
/* ----------------------------------------------------------------- */
function LeftSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="space-y-3">
        <div className="h-9 w-full max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-9 w-5/6 max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-5/6 max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-3/4 max-w-md animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 flex gap-3">
        <div className="h-11 w-60 animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-11 w-64 animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-48 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-10 w-full max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white">
      <div className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-4">
        <div className="h-4 w-36 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-6 w-24 animate-pulse rounded-full bg-[#E4E8F0]" />
      </div>
      <div className="grid grid-cols-2 gap-5 border-b border-[#EEF1F6] px-6 py-5">
        <div className="h-9 w-full animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-9 w-full animate-pulse rounded-lg bg-[#E4E8F0]" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-3.5 last:border-b-0"
        >
          <div className="h-3.5 w-36 animate-pulse rounded bg-[#E4E8F0]" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-[#E4E8F0]" />
        </div>
      ))}
    </div>
  );
}