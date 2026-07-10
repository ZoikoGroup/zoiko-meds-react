"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const PATHWAYS = [
  {
    icon: "pulse",
    title: "ZoikoSignal™ briefing",
    description:
      "C-suite, public-health, manufacturer, payer, and strategy teams evaluating intelligence capability.",
    cta: "Request ZoikoSignal™ Briefing",
    variant: "outline",
  },
  {
    icon: "dashboard",
    title: "Dashboard review",
    description:
      "Teams that need to see sample modules, outputs, and reporting formats.",
    cta: "View Sample Intelligence Dashboard",
    variant: "outline",
  },
  {
    icon: "home",
    title: "Public health route",
    description:
      "Government, public-health, emergency preparedness, and jurisdictional access teams.",
    cta: "Request Public Health Briefing",
    variant: "outline",
  },
  {
    icon: "chart",
    title: "Manufacturer / life sciences review",
    description:
      "Market access, supply strategy, brand, launch, and shortage teams.",
    cta: "Request Manufacturer Intelligence Review",
    variant: "outline",
  },
  {
    icon: "lock",
    title: "Security & procurement review",
    description: "InfoSec, legal, procurement, privacy, and compliance teams.",
    cta: "Request Security Pack",
    variant: "outline",
  },
] as const;

export default function ZoikoSignalIntelligenceAccessPathwaysSection() {
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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header (left-aligned) ---------------- */}
        <div>
          {mounted ? (
            <>
              <Reveal index={0}>
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  06 · Access pathways
                </p>
              </Reveal>

              <Reveal index={1}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] mt-2 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
                  Convert into the right evaluation path.
                </h2>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Pathway cards ---------------- */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? PATHWAYS.map((p, i) => (
                <PathwayCard key={p.title} {...p} index={i} />
              ))
            : PATHWAYS.map((_, i) => <PathwayCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Closing CTA banner ---------------- */}
        <div className="mt-6">
          {mounted ? <ClosingCta /> : <ClosingCtaSkeleton />}
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
      className="animate-[zoikoSignalAccessFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoSignalAccessFadeUp {
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
/*  Pathway card                                                        */
/* ----------------------------------------------------------------- */
function PathwayCard({
  icon,
  title,
  description,
  cta,
  index,
}: {
  icon: "pulse" | "dashboard" | "home" | "chart" | "lock";
  title: string;
  description: string;
  cta: string;
  variant?: "outline";
  index: number;
}) {
  return (
    <div
      className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[zoikoSignalAccessFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${250 + index * 90}ms`,
      }}
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
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#0F1F4E", color: "#FFFFFF" }}
      >
        <PathwayIcon name={icon} />
      </div>

      <h3 className="mt-4 text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      <a
        href="#"
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </a>
    </div>
  );
}

function PathwayIcon({
  name,
}: {
  name: "pulse" | "dashboard" | "home" | "chart" | "lock";
}) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "pulse":
      return (
        <svg {...common}>
          <path
            d="M3 12h3l2.5-6 4 12 2-6H21"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="4.5" y="4.5" width="15" height="15" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 9.5h15" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 9.5v9.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "home":
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
    case "chart":
      return (
        <svg {...common}>
          <path d="M5 19V10M11 19V5M17 19v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Closing CTA banner                                                  */
/* ----------------------------------------------------------------- */
function ClosingCta() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-[#1F2E55] px-6 py-14 text-center sm:px-12 sm:py-16 animate-[zoikoSignalAccessFadeUp_0.6s_ease-out_forwards]"
      style={{
        opacity: 0,
        animationDelay: "750ms",
        background:
          "radial-gradient(120% 140% at 50% -10%, #16234A 0%, #0B1226 60%, #0A0F1F 100%)",
      }}
    >
      <h3 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold leading-tight text-white sm:text-[1.85rem]">
        See medicine access pressure before it becomes institutional
        friction.
      </h3>

      <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#A9B2C8]">
        Use ZoikoSignal™ to understand medicine availability pressure,
        shortage movement, demand signals, and regional access risk
        through governed enterprise intelligence.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#request"
          className="inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:w-auto"
          style={{ backgroundColor: ACCENT }}
        >
          Request ZoikoSignal™ Briefing
        </a>
        <a
          href="#"
          className="inline-flex w-full items-center justify-center rounded-xl border border-[#3A4668] bg-transparent px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-white/5 active:translate-y-0 active:scale-[0.98] sm:w-auto"
        >
          View Sample Intelligence Dashboard
        </a>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-3 w-44 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
    </div>
  );
}

function PathwayCardSkeleton() {
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

function ClosingCtaSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#1F2E55] bg-[#0B1226] px-6 py-14 sm:px-12 sm:py-16">
      <div className="h-7 w-full max-w-md animate-pulse rounded-lg bg-white/10" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white/10" />
      <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-white/10" />
      <div className="mt-3 flex gap-3">
        <div className="h-11 w-60 animate-pulse rounded-xl bg-white/10" />
        <div className="h-11 w-60 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}