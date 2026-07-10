"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const USE_CASES = [
  {
    title: "Search normalization",
    description:
      "Normalize brands, generics, misspellings, strengths, and local names into safer search candidates and approved entities.",
    cta: "Request Data Briefing",
    icon: "search",
    link:"#request"
  },
  {
    title: "API medicine matching",
    description:
      "Reliable medicine matching before availability signals can be embedded in digital health and payer workflows.",
    cta: "Discuss API Access",
    icon: "code",
    link:"#"
  },
  {
    title: "Cross-market data alignment",
    description:
      "Market-aware mappings across identifiers and jurisdictions for manufacturers, public health, and global platforms.",
    cta: "Request Standards Review",
    icon: "globe",
    link:"#"
  },
  {
    title: "Availability signal accuracy",
    description:
      "Clean identity keeps ZoikoAvail™ from producing misleading signals caused by ambiguous names or presentations.",
    cta: "Explore ZoikoAvail™ API",
    icon: "pulse",
    link:"/zoiko-avail-api"
  },
  {
    title: "Shortage & demand intelligence",
    description:
      "Consistent identity lets ZoikoSignal™ aggregate access pressure, shortage movement, and demand responsibly.",
    cta: "Explore ZoikoSignal™",
    icon: "chart",
    link:"/zoikosignal-intelligence"
  },
  {
    title: "Data governance & auditability",
    description:
      "Versioned, governed data definitions instead of ad hoc medicine lists.",
    cta: "View Data Governance",
    icon: "doc",
    link:"#"
  },
] as const;

export default function MediBaseDataUseCasesSection() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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
                02 · Enterprise Use Cases
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Built for medicine data problems that{" "}
                <span style={{ color: ACCENT }}>
                  break enterprise workflows.
                </span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-44 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Use case cards grid ---------------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? USE_CASES.map((item, i) => (
                <Reveal key={item.title} index={2 + i}>
                  <UseCaseCard {...item} />
                </Reveal>
              ))
            : Array.from({ length: 6 }).map((_, i) => <UseCaseCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Sales logic banner ---------------- */}
        <div className="mt-6">
          {mounted ? (
            <Reveal index={8}>
              <SalesLogicBanner />
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
      style={{ opacity: 0, animationDelay: `${index * 70}ms` }}
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
/*  Use case card                                                      */
/* ----------------------------------------------------------------- */
function UseCaseCard({
  title,
  description,
  cta,
  icon,
  link
}: {
  title: string;
  description: string;
  cta: string;
  icon: string;
  link:string;
}) {
  const router = useRouter();
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(15,31,78,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D7DCE6] hover:shadow-[0_16px_36px_-12px_rgba(15,31,78,0.14)]">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#0F1F4E", color: ACCENT }}
      >
        <UseCaseIcon name={icon} />
      </div>

      <h4 className="mt-4 text-[15.5px] font-bold text-[#0F1F4E]">
        {title}
      </h4>

      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#8891A4]">
        {description}
      </p>

      <button
      onClick={()=>router.push(link)}
        type="button"
        className="mt-5 w-full cursor-pointer rounded-xl border border-[#D7DCE6] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </button>
    </div>
  );
}

function UseCaseCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-40 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Sales logic banner                                                  */
/* ----------------------------------------------------------------- */
function SalesLogicBanner() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-l-[3px] bg-[#EAF1FF] px-6 py-5"
      style={{ borderColor: "#3B5BDB", borderLeftColor: "#3B5BDB" }}
    >
      <span
        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
        style={{ color: "#3B5BDB" }}
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed text-[#3B4A6B]">
        <span className="font-bold">Sales logic:</span> the page sells
        outcomes — cleaner matching, safer search, better API
        integration, comparable intelligence, and governed data reuse.
        It does not oversell clinical certainty.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Icons                                                              */
/* ----------------------------------------------------------------- */
function UseCaseIcon({ name }: { name: string }) {
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
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M8 6L3 12l5 6M16 6l5 6-5 6" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path d="M3 12h4l2-7 4 14 2-7h6" />
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
    default:
      return null;
  }
}