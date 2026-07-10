"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const CAPABILITIES = [
  {
    icon: "pulse",
    title: "Availability confidence signals",
    description:
      "Confidence-based availability indicators by medicine, geography, radius, and approved pharmacy-participation context.",
    value: "embed safer availability checks without public stock counts.",
    cta: "Request API Access",
    link:"#request"
  },
  {
    icon: "clock",
    title: "Freshness & signal metadata",
    description:
      "Freshness context and signal-quality info where approved, so platforms can show when direct confirmation is needed.",
    value: "reduce false certainty; improve user guidance.",
    cta: "View API Capabilities",
    link:"#"
  },
  {
    icon: "search",
    title: "Medicine match support",
    description:
      "MediBase™-powered matching for brand, generic, strength, form, and jurisdiction-aware identity logic.",
    value: "improve search precision, reduce name ambiguity.",
    cta: "Explore MediBase™",
    link:"/medibase-data"
  },
  {
    icon: "check",
    title: "Pharmacy confirmation pathways",
    description:
      "Confirmation-aware flows where participating verified pharmacies allow structured confirmation options.",
    value: "guide users to the right next step without reservations.",
    cta: "Discuss Confirmation Workflows",
    link:"#"
  },
  {
    icon: "pin",
    title: "Location-aware workflows",
    description:
      "Radius, service-area, pharmacy-location, and jurisdiction-aware search workflows where approved.",
    value: "embed availability checks into patient, member, or care-team journeys.",
    cta: "Request Technical Briefing",
    link:"#"
  },
  {
    icon: "refresh",
    title: "Event & update patterns",
    description:
      "Scheduled pulls, webhook/event patterns, or streaming-like workflows where product readiness and contracts allow.",
    value: "stay aligned with changing signals while respecting rate limits.",
    cta: "Discuss Integration",
    link:"#"
  },
] as const;

export default function ZoikoAvailApiCapabilityModelSection() {
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
        <div className="max-w-2xl">
          {mounted ? (
            <>
              <Reveal index={0}>
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  01 · API capability model
                </p>
              </Reveal>

              <Reveal index={1}>
                <h2 className="mt-3 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                 A governed API layer for{" "}
                <span style={{ color: ACCENT }}>availability-aware products.</span>
              </h2>
              </Reveal>

              <Reveal index={2}>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#5B6478]">
                  What the API enables for product and engineering teams
                  — without publishing exploitable endpoint detail or
                  public exact-stock access.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Capability cards ---------------- */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? CAPABILITIES.map((c, i) => (
                <CapabilityCard key={c.title} {...c} index={i} />
              ))
            : CAPABILITIES.map((_, i) => <CapabilityCardSkeleton key={i} />)}
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
      className="animate-[zoikoAvailCapabilityFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoAvailCapabilityFadeUp {
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
/*  Capability card                                                     */
/* ----------------------------------------------------------------- */
function CapabilityCard({
  icon,
  title,
  description,
  value,
  cta,
  index,
  link
}: {
  icon: "pulse" | "clock" | "search" | "check" | "pin" | "refresh";
  title: string;
  description: string;
  value: string;
  cta: string;
  index: number;
  link:string;
}) {
  return (
    <div
      className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[zoikoAvailCapabilityFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
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
        <CapabilityIcon name={icon} />
      </div>

      <h3 className="mt-4 text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2 text-[12.5px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
        <span className="font-semibold text-[#0F1F4E]">Value:</span>{" "}
        {value}
      </p>

      <a
        href={link}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </a>
    </div>
  );
}

function CapabilityIcon({
  name,
}: {
  name: "pulse" | "clock" | "search" | "check" | "pin" | "refresh";
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
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15 15l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path
            d="M5 13l4.5 4.5L19 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
    case "refresh":
      return (
        <svg {...common}>
          <path
            d="M19 9a7 7 0 0 0-12.6-3.2M5 15a7 7 0 0 0 12.6 3.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M19 4.5V9h-4.5M5 19.5V15h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Note bar                                                            */
/* ----------------------------------------------------------------- */
function NoteBar() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#0F1F4E] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(15,31,78,0.25)] animate-[zoikoAvailCapabilityFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "950ms" }}
    >
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#EAEDF2] text-[#3A4258]">
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 7v4M8 5.2v.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed text-[#5B6478]">
        ZoikoAvail™ API does not return public exact stock quantities,
        dispensing eligibility, clinical recommendations, prescription
        validation, or guaranteed availability.
      </p>
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
      <div className="h-8 w-2/3 max-w-sm animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-1 space-y-2">
        <div className="h-3.5 w-full max-w-xl animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 max-w-md animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

function CapabilityCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
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