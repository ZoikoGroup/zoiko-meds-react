"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const WHY_CARDS = [
  {
    title: "Mission with consequence",
    description:
      "Work on medicine availability infrastructure that can help patients, caregivers, pharmacies, providers, health systems, and public-health organizations act with better information.",
    link: "Explore Mission",
    icon: "pin",
  },
  {
    title: "Infrastructure-grade technology",
    description:
      "Build search, data, APIs, identity, security, availability confidence, analytics, and enterprise workflows for regulated healthcare contexts.",
    link: "View Teams",
    icon: "code",
  },
  {
    title: "Trust-first product discipline",
    description:
      "Operate with privacy, data minimization, claim control, accessibility, security, and clinical-boundary discipline from day one.",
    link: "View Trust Center",
    icon: "shield",
  },
  {
    title: "Room for serious builders",
    description:
      "Contribute across product, engineering, data, AI, design, compliance, pharmacy operations, partnerships, and enterprise go-to-market.",
    link: "Join Talent Community",
    icon: "person",
  },
] as const;

export default function CareersWhyBuildHereSection() {
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
                01 · Why Build Here
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Serious infrastructure.{" "}
                <span style={{ color: ACCENT }}>Serious standards.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-36 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Why cards grid ---------------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {mounted
            ? WHY_CARDS.map((card, i) => (
                <Reveal key={card.title} index={2 + i}>
                  <WhyCard {...card} />
                </Reveal>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <WhyCardSkeleton key={i} />
              ))}
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
      style={{ opacity: 0, animationDelay: `${index * 80}ms` }}
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
/*  Why card                                                            */
/* ----------------------------------------------------------------- */
function WhyCard({
  title,
  description,
  link,
  icon,
}: {
  title: string;
  description: string;
  link: string;
  icon: string;
}) {
  return (
    <div className="group h-full rounded-2xl border border-[#E7EAF1] bg-white p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D7DCE6] hover:shadow-[0_16px_36px_-12px_rgba(15,31,78,0.12)]">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#DCF5EE", color: "#0C8A6E" }}
      >
        <WhyIcon name={icon} />
      </div>

      <h4 className="mt-4 text-[15.5px] font-bold text-[#0F1F4E]">{title}</h4>

      <p className="mt-2 text-[13px] leading-relaxed text-[#8891A4]">
        {description}
      </p>
    </div>
  );
}

function WhyCardSkeleton() {
  return (
    <div className="h-full rounded-2xl border border-[#E7EAF1] bg-white p-7">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-4 h-4 w-32 animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Icons                                                              */
/* ----------------------------------------------------------------- */
function WhyIcon({ name }: { name: string }) {
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
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.3" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M8 6L3 12l5 6M16 6l5 6-5 6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
        </svg>
      );
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
        </svg>
      );
    default:
      return null;
  }
}
