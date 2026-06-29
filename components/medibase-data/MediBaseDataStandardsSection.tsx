"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const STANDARDS_CARDS = [
  {
    title: "Identifier coverage",
    description: "Approved identifiers where licensed, available, and approved.",
    icon: "list",
    tags: ["NDC", "RxNorm/RxCUI", "GTIN/GS1", "DIN", "dm+d", "ATC", "EAN/UPC", "local codes"],
  },
  {
    title: "Interoperability awareness",
    description:
      "FHIR Medication/MedicationKnowledge alignment, ISO IDMP awareness, GS1 Healthcare alignment, structured API outputs, and data-dictionary review where applicable.",
    icon: "target",
  },
  {
    title: "Data quality tiers",
    description:
      "Verified / reference-sourced, partner-supplied, mapped, inferred, deprecated, suppressed, and review-required states.",
    icon: "chart",
  },
  {
    title: "Provenance & licensing",
    description:
      "Source attribution, license scope, version history, update cadence, jurisdiction restrictions, and downstream-use rules.",
    icon: "doc",
  },
  {
    title: "Safety & suppression",
    description:
      "Controlled, restricted, high-risk, discontinued, recalled, ambiguous, or jurisdiction-sensitive medicines may require suppression, limited visibility, or review.",
    icon: "shield",
  },
  {
    title: "Versioning & auditability",
    description:
      "Schema versions, mapping versions, field-definition history, change logs, and review-state tracking.",
    icon: "list",
  },
] as const;

const QUALITY_STATES = [
  {
    label: "Verified mapping",
    dotColor: "#0C8A6E",
    description: "Supported by approved reference data or reviewed source logic.",
    action: "use in approved workflows.",
  },
  {
    label: "Partner-supplied",
    dotColor: "#3B5BDB",
    description: "Supplied by an approved partner or integration source.",
    action: "review source and contract scope.",
  },
  {
    label: "Needs review",
    dotColor: "#E8A23B",
    description:
      "Ambiguous, incomplete, stale, or jurisdiction-sensitive.",
    action: "route to data governance review.",
  },
  {
    label: "Deprecated",
    dotColor: "#5B6478",
    description: "Entity, identifier, or mapping no longer current in context.",
    action: "prevent stale use; show replacement where approved.",
  },
  {
    label: "Suppressed",
    dotColor: "#D64545",
    description:
      "Restricted from outputs due to governance, safety, or jurisdiction rules.",
    action: "do not expose unless separately approved.",
  },
] as const;

export default function MediBaseDataStandardsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                03 · Standards, Quality &amp; Governance
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Standards-aware. Quality-controlled.
                <br />
                <span style={{ color: ACCENT }}>Claim-governed.</span>
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#5B6478]">
                Every identifier, terminology, and standard is framed as
                supported where licensed, available, approved, or
                contract-scoped.
              </p>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-64 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
            <div className="h-4 w-96 animate-pulse rounded bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Standards cards grid ---------------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? STANDARDS_CARDS.map((card, i) => (
                <Reveal key={card.title} index={3 + i}>
                  <StandardsCard {...card} />
                </Reveal>
              ))
            : Array.from({ length: 6 }).map((_, i) => <StandardsCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Quality states ---------------- */}
        <div className="mt-14">
          {mounted ? (
            <>
              <Reveal index={9}>
                <h3 className="text-[17px] font-bold text-[#0F1F4E]">
                  Quality states
                </h3>
              </Reveal>
              <Reveal index={10}>
                <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-[#8891A4]">
                  Every mapping carries an explicit state — shown with
                  icon, text, and color, never color alone.
                </p>
              </Reveal>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="h-5 w-32 animate-pulse rounded bg-[#E4E8F0]" />
              <div className="h-4 w-96 animate-pulse rounded bg-[#E4E8F0]" />
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {mounted
              ? QUALITY_STATES.map((state, i) => (
                  <Reveal key={state.label} index={11 + i}>
                    <QualityStateCard {...state} />
                  </Reveal>
                ))
              : Array.from({ length: 5 }).map((_, i) => (
                  <QualityStateCardSkeleton key={i} />
                ))}
          </div>
        </div>

        {/* ---------------- Claim-control banner ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <Reveal index={16}>
              <ClaimControlBanner />
            </Reveal>
          ) : (
            <div className="h-16 w-full animate-pulse rounded-2xl bg-white" />
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
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 55}ms` }}
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
/*  Standards card                                                     */
/* ----------------------------------------------------------------- */
function StandardsCard({
  title,
  description,
  icon,
  tags,
}: {
  title: string;
  description: string;
  icon: string;
  tags?: readonly string[];
}) {
  return (
    <div className="group h-full rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D7DCE6] hover:shadow-[0_16px_36px_-12px_rgba(15,31,78,0.12)]">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#DCF5EE", color: "#0C8A6E" }}
      >
        <StandardsIcon name={icon} />
      </div>

      <h4 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h4>

      <p className="mt-2 text-[13px] leading-relaxed text-[#8891A4]">
        {description}
      </p>

      {tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md border border-[#E0E4EC] px-2 py-1 text-[11px] font-semibold text-[#5B6478]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function StandardsCardSkeleton() {
  return (
    <div className="h-full rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-36 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Quality state card                                                  */
/* ----------------------------------------------------------------- */
function QualityStateCard({
  label,
  dotColor,
  description,
  action,
}: {
  label: string;
  dotColor: string;
  description: string;
  action: string;
}) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D7DCE6] hover:shadow-[0_14px_32px_-12px_rgba(15,31,78,0.12)]">
      <span
        className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
        style={{ backgroundColor: `${dotColor}1A`, color: dotColor }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        {label}
      </span>

      <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-[#8891A4]">
        {description}
      </p>

      <p className="mt-3 text-[12px] leading-relaxed text-[#5B6478]">
        <span className="font-bold text-[#0F1F4E]">Action:</span>{" "}
        {action}
      </p>
    </div>
  );
}

function QualityStateCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5">
      <div className="h-5 w-24 animate-pulse rounded-full bg-[#E4E8F0]" />
      <div className="mt-3 flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Claim-control banner                                               */
/* ----------------------------------------------------------------- */
function ClaimControlBanner() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border bg-[#EAF1FF] px-6 py-5"
      style={{ borderLeft: "3px solid #3B5BDB", borderTop: "1px solid #DCE6FB", borderRight: "1px solid #DCE6FB", borderBottom: "1px solid #DCE6FB" }}
    >
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        style={{ color: "#3B5BDB" }}
      >
        <path
          d="M8 1.5l6.5 11.5a1 1 0 01-.87 1.5H2.37a1 1 0 01-.87-1.5L8 1.5z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M8 6.5v3M8 11.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      <p className="text-[13px] leading-relaxed text-[#3B4A6B]">
        <span className="font-bold">Claim-control requirement:</span> no
        certification, completeness, regulatory equivalence, global
        coverage, or official authority is claimed unless status,
        evidence, license rights, and jurisdiction scope are verified
        and approved.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Icons                                                              */
/* ----------------------------------------------------------------- */
function StandardsIcon({ name }: { name: string }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "list":
      return (
        <svg {...common}>
          <path d="M8 6h12M8 12h12M8 18h12" />
          <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <rect x="4" y="13" width="3.5" height="7" />
          <rect x="10.25" y="9" width="3.5" height="11" />
          <rect x="16.5" y="5" width="3.5" height="15" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h7l3 3v15a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
          <path d="M14 3v3h3M9 12h6M9 15h6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
        </svg>
      );
    default:
      return null;
  }
}