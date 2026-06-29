"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const USE_CASES = [
  {
    title: "Telehealth & virtual care",
    description:
      "Add availability-aware next steps after a clinical encounter, keeping clinical decisions outside ZoikoAvail™.",
    bestFit: "Telehealth platforms, virtual clinics, async care.",
    cta: "Discuss Telehealth Integration",
    icon: "monitor",
  },
  {
    title: "Payer & member support",
    description:
      "Help members understand availability friction and pharmacy confirmation steps in access-support workflows.",
    bestFit: "Payers, PBMs, member-support platforms.",
    cta: "Request Payer Briefing",
    icon: "shield",
  },
  {
    title: "Provider & care navigation",
    description:
      "Support discharge, care coordination, and patient access workflows with confidence-based availability guidance.",
    bestFit: "Health systems, care teams, navigation platforms.",
    cta: "Request Provider Workflow Briefing",
    icon: "home",
  },
  {
    title: "Digital health & patient apps",
    description:
      "Embed saved search, alert, and availability signal experiences into approved digital health journeys.",
    bestFit: "Digital health, patient support, chronic-care apps.",
    cta: "Request API Access",
    icon: "phone",
  },
  {
    title: "Enterprise pharmacy platforms",
    description:
      "Support pharmacy-group, verified network, confirmation, or signal workflows where contract and permissions allow.",
    bestFit: "Pharmacy operators, systems, integration partners.",
    cta: "Discuss Pharmacy Integration",
    icon: "house",
  },
  {
    title: "Public-sector & access programs",
    description:
      "Support approved population access workflows with governed signal outputs and jurisdiction-aware controls.",
    bestFit: "Government, public health, preparedness, NGOs.",
    cta: "Request Public Health API Briefing",
    icon: "building",
  },
] as const;

export default function ZoikoAvailApiUseCasesSection() {
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
                02 · Integration Use Cases
              </span>
            </Reveal>

            <Reveal index={1}>
                <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Built for platforms where medicine{" "}
                <span style={{ color: ACCENT }}> access affects the
                user journey.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-48 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Use case cards grid ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? USE_CASES.map((item, i) => (
                <Reveal key={item.title} index={2 + i}>
                  <UseCaseCard {...item} />
                </Reveal>
              ))
            : Array.from({ length: 6 }).map((_, i) => <UseCaseCardSkeleton key={i} />)}
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
  bestFit,
  cta,
  icon,
}: {
  title: string;
  description: string;
  bestFit: string;
  cta: string;
  icon: string;
}) {
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

      <p className="mt-2 text-[13px] leading-relaxed text-[#8891A4]">
        {description}
      </p>

      <p className="mt-3 text-[12.5px] leading-relaxed text-[#5B6478]">
        <span className="font-bold text-[#0F1F4E]">Best fit:</span>{" "}
        {bestFit}
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

function UseCaseCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-40 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-3 h-3 w-4/5 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
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
    case "monitor":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="13" rx="1.5" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    case "house":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-9" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
        </svg>
      );
    default:
      return null;
  }
}