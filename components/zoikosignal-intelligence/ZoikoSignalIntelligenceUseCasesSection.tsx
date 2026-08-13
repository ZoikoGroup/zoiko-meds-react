"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const USE_CASES = [
  {
    icon: "home",
    title: "Health system access-risk visibility",
    description:
      "Understand where patients may face medicine access friction after care encounters.",
    buyer:
      "Hospitals, IDNs, outpatient networks, discharge & care-navigation leaders.",
    cta: "Request Health System Briefing",
  },
  {
    icon: "home2",
    title: "Public-health shortage monitoring",
    description:
      "Monitor aggregate availability pressure, shortage movement, and vulnerable-population access risk.",
    buyer: "Government agencies, public-health orgs, preparedness teams.",
    cta: "Request Public Health Briefing",
  },
  {
    icon: "bars",
    title: "Manufacturer & life-sciences intelligence",
    description:
      "Anonymized demand movement, restock dynamics, launch availability pressure, and regional friction.",
    buyer: "Manufacturers, market access, supply strategy, brand teams.",
    cta: "Request Manufacturer Intelligence Review",
  },
  {
    icon: "shield",
    title: "Payer & PBM member access insight",
    description:
      "Identify access barriers that may affect continuity, support needs, and regional member experience.",
    buyer: "Payers, insurers, PBMs, population health teams.",
    cta: "Request Payer Briefing",
  },
  {
    icon: "home3",
    title: "Enterprise pharmacy & supply planning",
    description:
      "Understand aggregate coverage, restock movement, and regional pressure without public exact-stock exposure.",
    buyer:
      "Enterprise pharmacy groups, wholesale strategy, distribution partners.",
    cta: "Request Enterprise Review",
  },
] as const;

export default function ZoikoSignalIntelligenceUseCasesSection() {
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
      { threshold: 0.08 },
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
                03 · Institutional Use Cases
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-2 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
                Routed by institutional outcome.
              </h2>
            </Reveal>
          </>
        ) : (
          <HeaderSkeleton />
        )}

        {/* ---------------- Use case cards ---------------- */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? USE_CASES.map((u, i) => (
                <UseCaseCard key={u.title} {...u} index={i} />
              ))
            : USE_CASES.map((_, i) => <CardSkeleton key={i} />)}
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
      className="animate-[useCasesFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes useCasesFadeUp {
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
/*  Use case card                                                        */
/* ----------------------------------------------------------------- */
function UseCaseCard({
  icon,
  title,
  description,
  buyer,
  cta,
  index,
}: {
  icon: "home" | "home2" | "home3" | "bars" | "shield";
  title: string;
  description: string;
  buyer: string;
  cta: string;
  index: number;
}) {
  return (
    <div
      className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[useCasesFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{ opacity: 0, animationDelay: `${250 + index * 100}ms` }}
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
        <UseCaseIcon name={icon} />
      </div>

      <h3 className="mt-4 text-[15px] font-bold leading-snug text-[#0F1F4E]">
        {title}
      </h3>

      {/* flex-1 keeps buttons aligned on the same baseline per row */}
      <div className="mt-2 flex-1">
        <p className="text-[13px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
        <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#5B6478]">
          <span className="font-bold text-[#0F1F4E]">Buyer:</span> {buyer}
        </p>
      </div>
    </div>
  );
}

function UseCaseIcon({
  name,
}: {
  name: "home" | "home2" | "home3" | "bars" | "shield";
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    className: "h-5 w-5",
  };

  switch (name) {
    case "home":
    case "home2":
    case "home3":
      return (
        <svg {...common}>
          <path
            d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bars":
      return (
        <svg {...common}>
          <path
            d="M5 19V11M10.5 19V7M16 19V13M21 19H3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 3l7 2.6v5.4c0 4.7-3 7.8-7 9.3-4-1.5-7-4.6-7-9.3V5.6L12 3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Disclaimer bar                                                        */
/* ----------------------------------------------------------------- */
function NoteBar() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#0F1F4E] bg-[#EEF1F6] p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(15,31,78,0.25)] animate-[useCasesFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "850ms" }}
    >
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#5B6478]">
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
        CTA discipline: the primary page action remains Request ZoikoSignal™
        Briefing. Segment actions are contextual routes for CRM qualification,
        not competing hero actions.
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
      <div className="h-3.5 w-48 animate-pulse rounded bg-white" />
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="mt-2 h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
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
