"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const PATHWAYS = [
  {
    icon: "home",
    title: "Public health briefing",
    description:
      "Government health agencies, public-health departments, medicine access teams, and policy leaders.",
    cta: "Request Public Health Briefing",
  },
  {
    icon: "doc",
    title: "Data governance review",
    description:
      "Privacy, legal, security, data governance, and agency compliance reviewers.",
    cta: "Request Governance Review",
  },
  {
    icon: "pin",
    title: "Pilot jurisdiction discussion",
    description:
      "Teams evaluating a defined jurisdiction, medicine category, or public-health program.",
    cta: "Discuss Public Health Pilot",
  },
  {
    icon: "shield",
    title: "Emergency preparedness workflow",
    description:
      "Preparedness, resilience, emergency planning, and continuity teams.",
    cta: "Discuss Preparedness Workflow",
  },
  {
    icon: "doc",
    title: "Procurement review",
    description:
      "Public-sector procurement, contracts, legal, and commercial teams.",
    cta: "Request Procurement Pack",
  },
] as const;

export default function GovernmentPublicHealthAccessPathwaysSection() {
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
                  Route in by <span style={{ color: ACCENT }}>responsibility.</span>
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
      className="animate-[govPublicHealthAccessFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes govPublicHealthAccessFadeUp {
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
  icon: "home" | "doc" | "pin" | "shield";
  title: string;
  description: string;
  cta: string;
  index: number;
}) {
  return (
    <div
      className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[govPublicHealthAccessFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
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

function PathwayIcon({ name }: { name: "home" | "doc" | "pin" | "shield" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
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
    case "doc":
      return (
        <svg {...common}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path
            d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 3.5l7 2.5v5.4c0 4.6-3 7.7-7 9.1-4-1.4-7-4.5-7-9.1V6l7-2.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
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
      className="relative overflow-hidden rounded-3xl border border-[#1F2E55] px-6 py-14 text-center sm:px-12 sm:py-16 animate-[govPublicHealthAccessFadeUp_0.6s_ease-out_forwards]"
      style={{
        opacity: 0,
        animationDelay: "750ms",
        background:
          "radial-gradient(120% 140% at 50% -10%, #16234A 0%, #0B1226 60%, #0A0F1F 100%)",
      }}
    >
      <h3 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold leading-tight text-white sm:text-[1.85rem]">
        Build public health visibility on{" "}
        <span style={{ color: ACCENT }}>
          governed medicine availability intelligence.
        </span>
      </h3>

      <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#A9B2C8]">
        Understand medicine availability pressure, shortage movement,
        regional access risk, and jurisdictional signal patterns through
        privacy-conscious public-sector workflows.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#"
          className="inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:w-auto"
          style={{ backgroundColor: ACCENT }}
        >
          Request Public Health Briefing
        </a>
        <a
          href="#"
          className="inline-flex w-full items-center justify-center rounded-xl border border-[#3A4668] bg-transparent px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-white/5 active:translate-y-0 active:scale-[0.98] sm:w-auto"
        >
          Explore ZoikoSignal™
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
      <div className="h-7 w-full max-w-lg animate-pulse rounded-lg bg-white/10" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white/10" />
      <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-white/10" />
      <div className="mt-3 flex gap-3">
        <div className="h-11 w-60 animate-pulse rounded-xl bg-white/10" />
        <div className="h-11 w-48 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}