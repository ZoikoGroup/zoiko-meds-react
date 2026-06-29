"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const PATHWAY_CARDS = [
  {
    title: "API evaluation",
    description:
      "CTOs, product, engineering, digital health platforms, and integration buyers.",
    cta: "Request API Access",
    icon: "code",
  },
  {
    title: "Technical briefing",
    description:
      "Enterprise architects, data teams, engineering leads, and platform teams.",
    cta: "Request Technical Briefing",
    icon: "monitor",
  },
  {
    title: "Security & procurement",
    description:
      "InfoSec, privacy, legal, procurement, and compliance reviewers.",
    cta: "Request Security Pack",
    icon: "lock",
  },
  {
    title: "Medicine data review",
    description:
      "Teams needing medicine identity normalization before availability integration.",
    cta: "Explore MediBase™",
    icon: "search",
  },
] as const;

export default function ZoikoAvailApiAccessPathwaysSection() {
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
                06 · Access Pathways
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Start with{" "}
                <span style={{ color: ACCENT }}>the right API route.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-40 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Pathway cards grid ---------------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mounted
            ? PATHWAY_CARDS.map((card, i) => (
                <Reveal key={card.title} index={2 + i}>
                  <PathwayCard {...card} />
                </Reveal>
              ))
            : Array.from({ length: 4 }).map((_, i) => <PathwayCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Closing CTA banner ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <Reveal index={6}>
              <ClosingCtaBanner />
            </Reveal>
          ) : (
            <div className="h-56 w-full animate-pulse rounded-3xl bg-[#E4E8F0]" />
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
/*  Pathway card                                                       */
/* ----------------------------------------------------------------- */
function PathwayCard({
  title,
  description,
  cta,
  icon,
}: {
  title: string;
  description: string;
  cta: string;
  icon: string;
}) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(15,31,78,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D7DCE6] hover:shadow-[0_16px_36px_-12px_rgba(15,31,78,0.14)]">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#0F1F4E", color: ACCENT }}
      >
        <PathwayIcon name={icon} />
      </div>

      <h4 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h4>

      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#8891A4]">
        {description}
      </p>

      <button
        type="button"
        className="mt-5 w-full rounded-xl border border-[#D7DCE6] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </button>
    </div>
  );
}

function PathwayCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-32 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Closing CTA banner                                                  */
/* ----------------------------------------------------------------- */
function ClosingCtaBanner() {
  return (
    <div className="rounded-3xl bg-[#0B1530] px-8 py-14 text-center sm:px-16">
      <h3 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold leading-snug text-white sm:text-3xl">
        Build availability-aware products on{" "}
        <span style={{ color: ACCENT }}>governed infrastructure.</span>
      </h3>

      <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-[#9AA3B5]">
        Integrate confidence-based medicine availability signals,
        freshness metadata, confirmation-aware workflows, and
        jurisdiction-aware controls into regulated healthcare products.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          className="group relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 8px 24px -4px rgba(15,170,135,0.45)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
          <span className="relative">Request API Access</span>
        </button>

        <button
          type="button"
          className="rounded-xl border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 active:translate-y-0 active:scale-[0.98]"
        >
          Request Technical Briefing
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Icons                                                              */
/* ----------------------------------------------------------------- */
function PathwayIcon({ name }: { name: string }) {
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
    case "code":
      return (
        <svg {...common}>
          <path d="M8 6L3 12l5 6M16 6l5 6-5 6" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="13" rx="1.5" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.5" />
          <path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    default:
      return null;
  }
}