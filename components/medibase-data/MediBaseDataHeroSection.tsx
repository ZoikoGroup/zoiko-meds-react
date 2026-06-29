"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const IDENTIFIER_TAGS = ["NDC", "RxCUI", "GTIN", "ATC", "dm+d", "DIN"] as const;

export default function MediBaseDataHeroSection() {
  const [mounted, setMounted] = useState(false);

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
              <span className="text-[#0F1F4E]">MediBase™ data</span>
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
                    MediBase™ Data
                  </span>
                </Reveal>

                <Reveal index={2}>
                  <h1 className="font-[var(--font-plus-jakarta-sans)] text-4xl font-bold leading-[1.15] text-[#0F1F4E] sm:text-[2.65rem]">
                    The medicine identity layer behind{" "}
                    <span style={{ color: ACCENT }}>
                      availability intelligence.
                    </span>
                  </h1>
                </Reveal>

                <Reveal index={3}>
                  <p className="max-w-lg text-[15px] leading-relaxed text-[#5B6478]">
                    MediBase™ normalizes medicine names, brands,
                    generics, strengths, dosage forms, identifiers, and
                    jurisdictional context so enterprises can build
                    cleaner search, API, availability, and intelligence
                    workflows on governed medicine data.
                  </p>
                </Reveal>

                <Reveal index={4}>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      className="group relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
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
                      <span className="relative">
                        Request MediBase™ Data Briefing
                      </span>
                    </button>

                    <button
                      type="button"
                      className="rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                    >
                      Discuss Data/API Access
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
                    View Data Governance
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
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                    MediBase™ supports medicine identity matching and
                    availability workflows. It does not provide clinical
                    advice, recommend substitutes, validate
                    prescriptions, or confirm dispensing eligibility.
                  </p>
                </Reveal>
              </div>
            ) : (
              <LeftSkeleton />
            )}
          </div>

          {/* ---------------- Right column: medicine identity card ---------------- */}
          <div>
            {mounted ? <MedicineIdentityCard /> : <CardSkeleton />}
            {mounted && (
              <p
                className="mt-3 animate-[zoikoSignalFadeUp_0.5s_ease-out_forwards] text-center text-[11.5px] leading-relaxed text-[#9AA3B5]"
                style={{ opacity: 0, animationDelay: "1100ms" }}
              >
                Illustrative example. Data availability, identifier
                coverage, regulatory context, and jurisdictional
                mappings depend on licensed sources, approved use, data
                quality, and contract scope.
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
/*  Medicine identity card                                             */
/* ----------------------------------------------------------------- */
function MedicineIdentityCard() {
  return (
    <div
      className="animate-[zoikoSignalFadeUp_0.65s_ease-out_forwards] overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_16px_40px_-16px_rgba(15,31,78,0.18)] transition-shadow duration-300 hover:shadow-[0_20px_48px_-16px_rgba(15,31,78,0.24)]"
      style={{ opacity: 0, animationDelay: "150ms" }}
    >
      <div className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-4">
        <h3 className="text-[15px] font-bold text-[#0F1F4E]">
          Medicine identity
        </h3>
        <Pill tone="green" icon="check">
          Resolved
        </Pill>
      </div>

      {/* canonical entity */}
      <div
        className="border-b border-[#EEF1F6] px-6 py-5"
        style={{
          animation: "zoikoSignalFadeUp 0.5s ease-out forwards",
          opacity: 0,
          animationDelay: "250ms",
        }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#9AA3B5]">
          Canonical entity
        </span>
        <p className="mt-1.5 text-[18px] font-bold text-[#0F1F4E]">
          Atorvastatin
        </p>
        <p className="mt-1 text-[12.5px] font-semibold" style={{ color: ACCENT }}>
          Brand: Lipitor® · generic, synonyms aligned
        </p>
      </div>

      {/* active ingredient / strength / route */}
      <DetailRow label="Active ingredient" value="Atorvastatin calcium" delay={320} />
      <DetailRow label="Strength · form" value="10 mg · tablet" delay={390} />
      <DetailRow label="Route" value="Oral" delay={460} last />

      {/* identifier tags */}
      <div
        className="flex flex-wrap gap-2 border-b border-[#EEF1F6] px-6 py-4"
        style={{
          animation: "zoikoSignalFadeUp 0.5s ease-out forwards",
          opacity: 0,
          animationDelay: "530ms",
        }}
      >
        {IDENTIFIER_TAGS.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: "#DCF5EE", color: "#0C8A6E" }}
          >
            {tag}
          </span>
        ))}
      </div>

      <DetailRow label="Jurisdiction" valueNode={<Pill tone="blue">Region: US / EU</Pill>} delay={600} />
      <DetailRow label="ZoikoAvail™ linkage" valueNode={<Pill tone="green" icon="check">Linked</Pill>} delay={670} />
      <DetailRow
        label="Governance"
        valueNode={
          <Pill tone="green" icon="check">
            Verified mapping
          </Pill>
        }
        delay={740}
        last
      />
    </div>
  );
}

function DetailRow({
  label,
  value,
  valueNode,
  delay,
  last,
}: {
  label: string;
  value?: string;
  valueNode?: React.ReactNode;
  delay: number;
  last?: boolean;
}) {
  return (
    <div
      className={`group flex items-center justify-between px-6 py-3.5 transition-colors duration-200 hover:bg-[#F7F9FC] ${
        last ? "" : "border-b border-[#EEF1F6]"
      }`}
      style={{
        animation: "zoikoSignalFadeUp 0.5s ease-out forwards",
        opacity: 0,
        animationDelay: `${delay}ms`,
      }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#9AA3B5]">
        {label}
      </span>
      {valueNode ?? (
        <span className="text-[13.5px] font-semibold text-[#0F1F4E]">
          {value}
        </span>
      )}
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
      <div className="border-b border-[#EEF1F6] px-6 py-5">
        <div className="h-3 w-32 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="mt-2 h-6 w-44 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="mt-2 h-3 w-56 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-3.5 last:border-b-0"
        >
          <div className="h-3.5 w-32 animate-pulse rounded bg-[#E4E8F0]" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-[#E4E8F0]" />
        </div>
      ))}
    </div>
  );
}