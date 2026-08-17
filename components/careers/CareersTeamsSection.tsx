"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const TEAM_CARDS = [
  {
    title: "Engineering",
    description:
      "Search, APIs, identity, pharmacy portal, provider workflows, enterprise dashboards, reliability, integrations.",
    idealSignal: "backend, frontend, full-stack, DevOps, platform, API, security engineering.",
    icon: "code",
  },
  {
    title: "Data, AI & Intelligence",
    description:
      "MediBase™, ZoikoAvail™, ZoikoSignal™, data quality, signal freshness, aggregation, intelligence products.",
    idealSignal: "data engineering, ML, analytics, knowledge graph, healthcare data systems.",
    icon: "chart",
  },
  {
    title: "Product & Design",
    description:
      "Patient search, caregiver tools, pharmacy workflows, provider pages, enterprise UX, accessibility, design systems.",
    idealSignal: "PMs, UX designers, researchers, content designers, design systems leads.",
    icon: "layers",
  },
  {
    title: "Pharmacy Operations",
    description:
      "Pharmacy verification, confirmation workflows, data controls, support processes, network quality.",
    idealSignal: "pharmacists, pharmacy operations, network operations, clinical-operations-adjacent talent.",
    icon: "pharmacy",
  },
  {
    title: "Trust, Legal, Privacy & Security",
    description:
      "Claim control, privacy, compliance, accessibility, data governance, policy, security review.",
    idealSignal: "privacy, legal ops, GRC, compliance, security, regulated-market operations.",
    icon: "shield",
  },
  {
    title: "Enterprise & Public Sector",
    description:
      "Health systems, governments, life sciences, payers, public health, strategic partnerships.",
    idealSignal: "enterprise sales, partnerships, procurement, public-sector engagement, healthcare strategy.",
    icon: "building",
  },
  {
    title: "Support & Customer Success",
    description:
      "Pharmacy support, provider support, enterprise onboarding, issue routing, knowledge base.",
    idealSignal: "support operations, customer success, healthcare support, implementation specialists.",
    icon: "headset",
  },
  {
    title: "Business Operations",
    description:
      "People, finance, recruiting, operations, program management, executive support.",
    idealSignal: "operators who can support disciplined growth and delivery.",
    icon: "briefcase",
  },
] as const;

export default function CareersTeamsSection() {
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
                02 · Teams &amp; Role Families
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.1rem]">
                Find your role <span style={{ color: ACCENT }}>family.</span>
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#8891A4]">
                Browse by function. Live openings are confirmed against
                our recruiting system — where a role isn&apos;t open,
                you can set an alert or join the talent community.
              </p>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-48 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-8 w-64 animate-pulse rounded-lg bg-[#E4E8F0]" />
            <div className="h-4 w-full max-w-xl animate-pulse rounded bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Team cards grid ---------------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {mounted
            ? TEAM_CARDS.map((card, i) => (
                <Reveal key={card.title} index={3 + i}>
                  <TeamCard {...card} />
                </Reveal>
              ))
            : Array.from({ length: 8 }).map((_, i) => <TeamCardSkeleton key={i} />)}
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
/*  Team card                                                          */
/* ----------------------------------------------------------------- */
function TeamCard({
  title,
  description,
  idealSignal,
  icon,
}: {
  title: string;
  description: string;
  idealSignal: string;
  icon: string;
}) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D7DCE6] hover:shadow-[0_16px_36px_-12px_rgba(15,31,78,0.12)]">
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: "#DCF5EE", color: "#0C8A6E" }}
        >
          <TeamIcon name={icon} />
        </span>
        <h4 className="text-[15px] font-bold text-[#0F1F4E]">{title}</h4>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-[#8891A4]">
        {description}
      </p>

      <p className="mt-3 flex-1 rounded-lg bg-[#F7F9FC] px-3 py-2.5 text-[12px] leading-relaxed text-[#5B6478]">
        <span className="font-bold text-[#0F1F4E]">Ideal signal:</span>{" "}
        {idealSignal}
      </p>
    </div>
  );
}

function TeamCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-4 w-36 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-3 h-12 w-full animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-4 h-9 w-28 animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Icons                                                              */
/* ----------------------------------------------------------------- */
function TeamIcon({ name }: { name: string }) {
  const common = {
    className: "h-4.5 w-4.5",
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
    case "chart":
      return (
        <svg {...common}>
          <rect x="4" y="13" width="3.5" height="7" />
          <rect x="10.25" y="9" width="3.5" height="11" />
          <rect x="16.5" y="5" width="3.5" height="15" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
          <path d="M4 12.5L12 17l8-4.5M4 17l8 4.5L20 17" />
        </svg>
      );
    case "pharmacy":
      return (
        <svg {...common}>
          <path d="M7 3h7l3 3v15a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
          <path d="M14 3v3h3M12 11v6M9 14h6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-9" />
        </svg>
      );
    case "headset":
      return (
        <svg {...common}>
          <path d="M4 13v-1a8 8 0 0116 0v1" />
          <rect x="3" y="13" width="4" height="6" rx="1.5" />
          <rect x="17" y="13" width="4" height="6" rx="1.5" />
          <path d="M19 19v1a2 2 0 01-2 2h-3" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="12" rx="1.5" />
          <path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      );
    default:
      return null;
  }
}