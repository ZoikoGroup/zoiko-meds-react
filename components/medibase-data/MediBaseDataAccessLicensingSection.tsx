"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const ACCESS_CARDS = [
  {
    title: "Data briefing",
    description:
      "Commercial, procurement, strategy, and executive teams evaluating MediBase™.",
    delivery:
      "guided briefing, data-scope review, commercial qualification.",
    cta: "Request MediBase™ Data Briefing",
    icon: "home",
  },
  {
    title: "Data dictionary review",
    description:
      "Data architects, informatics teams, and compliance reviewers.",
    delivery:
      "field definitions, entity model, quality states, source & scope notes.",
    cta: "Request Data Dictionary",
    icon: "doc",
  },
  {
    title: "Reference API evaluation",
    description:
      "Product and engineering teams integrating medicine identity lookup or matching.",
    delivery: "REST API, sandbox, test keys where approved, example payloads.",
    cta: "Discuss API Access",
    icon: "code",
  },
  {
    title: "Bulk or licensed data product",
    description:
      "Enterprise data platforms, analytics teams, public-sector programs, and partner systems.",
    delivery: "contract-scoped files, update cadence, schema docs, licensing terms.",
    cta: "Request Data Licensing Review",
    icon: "database",
  },
  {
    title: "Mapping & implementation workshop",
    description:
      "Organizations with legacy medicine lists, local identifiers, or jurisdiction-specific datasets.",
    delivery: "mapping review, normalization plan, integration backlog.",
    cta: "Request Implementation Workshop",
    icon: "layers",
  },
] as const;

const COMMERCIAL_SIGNALS_LEFT = [
  "Annual data licensing by jurisdiction, scope, and usage rights.",
  "Implementation and mapping services for enterprise data onboarding.",
] as const;

const COMMERCIAL_SIGNALS_RIGHT = [
  "API access tiers by use case, rate limits, endpoints, and contract scope.",
  "Data dictionary and standards review available during procurement.",
] as const;

export default function MediBaseDataAccessLicensingSection() {
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
                04 · Access, Licensing &amp; Implementation
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Evaluate, license, and integrate through{" "}
                <span style={{ color: ACCENT }}>governed access.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-64 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Access cards grid ---------------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? ACCESS_CARDS.map((card, i) => (
                <Reveal key={card.title} index={2 + i}>
                  <AccessCard {...card} />
                </Reveal>
              ))
            : Array.from({ length: 5 }).map((_, i) => <AccessCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Commercial model signals ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <Reveal index={7}>
              <CommercialSignalsCard />
            </Reveal>
          ) : (
            <div className="h-44 w-full animate-pulse rounded-2xl bg-white" />
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
      style={{ opacity: 0, animationDelay: `${index * 65}ms` }}
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
/*  Access card                                                        */
/* ----------------------------------------------------------------- */
function AccessCard({
  title,
  description,
  delivery,
  cta,
  icon,
}: {
  title: string;
  description: string;
  delivery: string;
  cta: string;
  icon: string;
}) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(15,31,78,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D7DCE6] hover:shadow-[0_16px_36px_-12px_rgba(15,31,78,0.14)]">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#0F1F4E", color: ACCENT }}
      >
        <AccessIcon name={icon} />
      </div>

      <h4 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h4>

      <p className="mt-2 text-[13px] leading-relaxed text-[#8891A4]">
        {description}
      </p>

      <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
        <span className="font-bold text-[#0F1F4E]">Delivery:</span>{" "}
        {delivery}
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

function AccessCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-36 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Commercial model signals card                                      */
/* ----------------------------------------------------------------- */
function CommercialSignalsCard() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-7 shadow-[0_16px_40px_-16px_rgba(15,31,78,0.10)]">
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: ACCENT }}
      >
        Commercial model signals
      </span>

      <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
        {COMMERCIAL_SIGNALS_LEFT.map((item) => (
          <SignalItem key={item} text={item} />
        ))}
        {COMMERCIAL_SIGNALS_RIGHT.map((item) => (
          <SignalItem key={item} text={item} />
        ))}
      </div>

      <div className="mt-5 border-t border-[#EEF1F6] pt-4">
        <p className="text-[12px] leading-relaxed text-[#9AA3B5]">
          All enterprise data use is governed by a Master Services
          Agreement, data-use restrictions, source licensing, and
          jurisdiction-specific terms. Pricing is shown only after
          approval.
        </p>
      </div>
    </div>
  );
}

function SignalItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
        style={{ backgroundColor: ACCENT }}
      />
      <p className="text-[13.5px] leading-relaxed text-[#5B6478]">{text}</p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Icons                                                              */
/* ----------------------------------------------------------------- */
function AccessIcon({ name }: { name: string }) {
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
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h7l3 3v15a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
          <path d="M14 3v3h3M9 12h6M9 15h6" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M8 6L3 12l5 6M16 6l5 6-5 6" />
        </svg>
      );
    case "database":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
          <path d="M4 12.5L12 17l8-4.5M4 17l8 4.5L20 17" />
        </svg>
      );
    default:
      return null;
  }
}