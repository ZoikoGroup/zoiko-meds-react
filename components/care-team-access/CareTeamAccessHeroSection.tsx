"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const ACCENT = "#0FAA87";

const WORKSPACE_ROWS = [
  { label: "Organization", value: "Riverside Health", tone: "blue" },
  { label: "Care-team role", value: "Care Coordinator", tone: "blue" },
  { label: "Availability signal guide", value: "Available", tone: "green" },
  { label: "Patient-safe search guidance", value: "Enabled", tone: "green" },
  { label: "Shareable next steps", value: "Enabled", tone: "green" },
  { label: "Role permissions", value: "Scoped", tone: "blue" },
  { label: "Audit", value: "On", tone: "green" },
] as const;

export default function CareTeamAccessHeroSection() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-20 sm:py-24">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ---------------- Left column ---------------- */}
        <div>
          {mounted ? (
            <div className="flex flex-col gap-5">
              <Reveal index={0}>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: ACCENT }}
                >
                  Care Team Access
                </span>
              </Reveal>

              <Reveal index={1}>
                <h1 className="font-[var(--font-plus-jakarta-sans)] text-4xl font-bold leading-[1.15] text-[#0F1F4E] sm:text-[2.6rem]">
                  Give care teams a safer way to
                  <br />
                  <span style={{ color: ACCENT }}>
                    support medicine availability
                  </span>
                  <br />
                  <span style={{ color: ACCENT }}>questions.</span>
                </h1>
              </Reveal>

              <Reveal index={2}>
                <p className="max-w-lg text-[15px] leading-relaxed text-[#5B6478]">
                  ZoikoMeds helps authorized care teams guide patients
                  through availability signals, pharmacy confirmation
                  steps, saved searches, and alerts — with role-based
                  access, privacy controls, and clear clinical boundaries.
                </p>
              </Reveal>

              <Reveal index={3}>
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
                    <span className="relative">Request Care Team Access Briefing</span>
                  </button>

                  <button
                  onClick={()=>router.push("/patient-support")}
                    type="button"
                    className="rounded-xl cursor-pointer border border-[#D7DCE6] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                  >
                    Explore Patient Support Workflows
                  </button>
                </div>
              </Reveal>

              <Reveal index={4}>
                <a
                  href="#"
                  className="inline-flex items-center text-[13.5px] font-semibold transition-colors duration-200"
                  style={{ color: ACCENT }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0C8A6E")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = ACCENT)}
                >
                  View Availability Signal Guide
                </a>
              </Reveal>

              <Reveal index={5}>
                <p className="mt-1 flex max-w-lg items-start gap-2.5 text-[12.5px] leading-relaxed text-[#8891A4]">
                  <svg
                    className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                  Care team access supports availability guidance. It does
                  not prescribe, dispense, recommend substitutions,
                  validate prescriptions, store medical records by
                  default, or guarantee stock.
                </p>
              </Reveal>
            </div>
          ) : (
            <LeftSkeleton />
          )}
        </div>

        {/* ---------------- Right column: care-team workspace card ---------------- */}
        <div>
          {mounted ? <WorkspaceCard /> : <CardSkeleton />}
          {mounted && (
            <p
              className="mt-3 animate-[careTeamFadeUp_0.5s_ease-out_forwards] text-center text-[11.5px] leading-relaxed text-[#9AA3B5]"
              style={{ opacity: 0, animationDelay: "1000ms" }}
            >
              Illustrative example. Care team workflows are governed by
              role permissions, organization controls, data minimization,
              and applicable law.
            </p>
          )}
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
      className="animate-[careTeamFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes careTeamFadeUp {
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
/*  Workspace card                                                      */
/* ----------------------------------------------------------------- */
function WorkspaceCard() {
  return (
    <div
      className="animate-[careTeamFadeUp_0.65s_ease-out_forwards] overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_16px_40px_-16px_rgba(15,31,78,0.18)] transition-shadow duration-300 hover:shadow-[0_20px_48px_-16px_rgba(15,31,78,0.24)]"
      style={{ opacity: 0, animationDelay: "150ms" }}
    >
      <div className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-4">
        <h3 className="text-[15px] font-bold text-[#0F1F4E]">
          Care-team workspace
        </h3>
        <Pill tone="blue">Availability support only</Pill>
      </div>

      {WORKSPACE_ROWS.map((row, i) => (
        <div
          key={row.label}
          className="group flex items-center justify-between border-b border-[#EEF1F6] px-6 py-3.5 transition-colors duration-200 last:border-b-0 hover:bg-[#F7F9FC]"
          style={{
            animation: "careTeamFadeUp 0.5s ease-out forwards",
            opacity: 0,
            animationDelay: `${250 + i * 70}ms`,
          }}
        >
          <span className="text-[13.5px] text-[#5B6478]">{row.label}</span>
          <Pill tone={row.tone}>{row.value}</Pill>
        </div>
      ))}
    </div>
  );
}

function Pill({
  tone,
  children,
}: {
  tone: "green" | "blue";
  children: React.ReactNode;
}) {
  const toneClasses =
    tone === "green"
      ? "bg-[#DCF5EE] text-[#0C8A6E]"
      : "bg-[#E3E8FB] text-[#3B5BDB]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-transform duration-200 group-hover:scale-105 ${toneClasses}`}
    >
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
      <div className="h-4 w-36 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="space-y-3">
        <div className="h-9 w-full max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-9 w-5/6 max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-9 w-2/3 max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-5/6 max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-3/4 max-w-md animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 flex gap-3">
        <div className="h-11 w-64 animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-11 w-56 animate-pulse rounded-xl bg-[#E4E8F0]" />
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
        <div className="h-6 w-32 animate-pulse rounded-full bg-[#E4E8F0]" />
      </div>
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-3.5 last:border-b-0"
        >
          <div className="h-3.5 w-36 animate-pulse rounded bg-[#E4E8F0]" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-[#E4E8F0]" />
        </div>
      ))}
    </div>
  );
}