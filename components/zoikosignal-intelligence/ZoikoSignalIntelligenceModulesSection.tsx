"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const MODULES = [
  {
    icon: "pulse",
    title: "Shortage pressure monitor",
    description:
      "Emerging availability pressure by market, region, category, or therapeutic grouping where approved.",
    cta: "Explore Shortage Intelligence",
  },
  {
    icon: "pin",
    title: "Regional access-risk map",
    description:
      "Where users, pharmacies, or care teams may be experiencing availability friction across geography and jurisdiction.",
    cta: "Request Regional Risk Review",
  },
  {
    icon: "trend",
    title: "Demand movement signals",
    description:
      "Aggregated movement in search demand, zero-result pressure, alert creation, confirmation attempts, and repeat checks.",
    cta: "Request Intelligence Briefing",
  },
  {
    icon: "refresh",
    title: "Restock & recovery dynamics",
    description:
      "Where signal strength may be improving, degrading, or recovering over time based on approved patterns.",
    cta: "View Sample Dashboard",
  },
  {
    icon: "monitor",
    title: "Pharmacy signal coverage",
    description:
      "Verified participation, signal freshness, and coverage quality at aggregate level — no sensitive stock or partner detail.",
    cta: "Discuss Coverage Review",
  },
  {
    icon: "doc",
    title: "Executive intelligence reports",
    description:
      "Scheduled briefings, summary reports, and board-ready intelligence for strategy, public health, access, or supply teams.",
    cta: "Request Report Sample",
  },
] as const;

export default function ZoikoSignalIntelligenceModulesSection() {
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
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: ACCENT }}
              >
                02 · Intelligence Modules
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-2 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
                What institutions can evaluate.
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                Institutional outputs — each showing data freshness,
                jurisdiction scope, confidence, and governance status where
                relevant.
              </p>
            </Reveal>
          </>
        ) : (
          <HeaderSkeleton />
        )}

        {/* ---------------- Module cards ---------------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? MODULES.map((m, i) => (
                <ModuleCard key={m.title} {...m} index={i} />
              ))
            : MODULES.map((_, i) => <CardSkeleton key={i} />)}
        </div>

        {/* ---------------- Disclaimer bar ---------------- */}
        <div className="mt-6">
          {mounted ? <NoteBar /> : <NoteBarSkeleton />}
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
      className="animate-[modulesFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes modulesFadeUp {
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
/*  Module card                                                          */
/* ----------------------------------------------------------------- */
function ModuleCard({
  icon,
  title,
  description,
  cta,
  index,
}: {
  icon: "pulse" | "pin" | "trend" | "refresh" | "monitor" | "doc";
  title: string;
  description: string;
  cta: string;
  index: number;
}) {
  return (
    <div
      className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[modulesFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{ opacity: 0, animationDelay: `${300 + index * 100}ms` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9FE3D3";
        e.currentTarget.style.boxShadow =
          "0 14px 32px -16px rgba(15,170,135,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F1F4E] text-white transition-transform duration-300 group-hover:scale-110">
        <ModuleIcon name={icon} />
      </div>

      <h3 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h3>

      {/* flex-1 keeps buttons aligned on the same baseline per row */}
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
        {description}
      </p>
    </div>
  );
}

function ModuleIcon({
  name,
}: {
  name: "pulse" | "pin" | "trend" | "refresh" | "monitor" | "doc";
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    className: "h-5 w-5",
  };

  switch (name) {
    case "pulse":
      return (
        <svg {...common}>
          <path
            d="M3 12h3.5l2-5 4 9 2.5-6.5h6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path
            d="M12 21s7-7.5 7-12.5a7 7 0 1 0-14 0C5 13.5 12 21 12 21z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="8.5"
            r="2.2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "trend":
      return (
        <svg {...common}>
          <path
            d="M3 16l5-5 4 4 8-9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 6h5v5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common}>
          <path
            d="M4 12a8 8 0 0 1 13.5-5.7M20 12a8 8 0 0 1-13.5 5.7M17 3v4.5h-4.5M7 21v-4.5h4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "monitor":
      return (
        <svg {...common}>
          <rect
            x="3.5"
            y="5"
            width="17"
            height="11"
            rx="1.4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8.5 20h7M12 16v4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <rect
            x="5.5"
            y="3.5"
            width="13"
            height="17"
            rx="1.4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Disclaimer bar                                                       */
/* ----------------------------------------------------------------- */
function NoteBar() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(59,91,219,0.3)] animate-[modulesFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "950ms" }}
    >
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M8 5.5v.01M8 7.5v3.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed text-[#5B6478]">
        Dashboard numbers are illustrative until verified for production. No
        customer, pharmacy, patient, exact-stock, or partner-sensitive
        information appears in public mockups; charts include plain-language
        summaries.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                            */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-3.5 w-44 animate-pulse rounded bg-white" />
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-5 h-9 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

function NoteBarSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] bg-white p-5">
      <div className="h-7 w-7 flex-shrink-0 animate-pulse rounded-full bg-[#E4E8F0]" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}
