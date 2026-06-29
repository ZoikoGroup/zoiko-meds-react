"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const CONTROL_CARDS = [
  {
    title: "Exact-stock suppression",
    description:
      "No exact pharmacy stock quantities unless a separately governed, non-public, contract-specific workflow is approved.",
    icon: "monitor",
  },
  {
    title: "No clinical advice",
    description:
      "No recommending medicines, substitutes, doses, treatments, clinical actions, or prescribing decisions.",
    icon: "shield",
  },
  {
    title: "No dispensing approval",
    description:
      "No confirming prescription validity, patient eligibility, pharmacist approval, or fulfillment.",
    icon: "doc",
  },
  {
    title: "Privacy protection",
    description:
      "No identifiable patient-level intelligence, PHI leakage, or user-level health inference.",
    icon: "person",
  },
  {
    title: "Pharmacy confidentiality",
    description:
      "Protects inventory, workflow, pricing, operational notes, and participation-sensitive data.",
    icon: "lock",
  },
  {
    title: "Jurisdiction-aware controls",
    description:
      "Data access, medicine categories, controlled logic, and output fields respect local rules and contract scope.",
    icon: "globe",
  },
  {
    title: "Controlled medicine safeguards",
    description:
      "Sensitive medicines may be suppressed, limited, masked, or routed through additional controls.",
    icon: "sparkle",
  },
  {
    title: "Audit & observability",
    description:
      "API access, credentials, permissions, key events, and sensitive calls are logged for governance and support.",
    icon: "list",
  },
] as const;

export default function ZoikoAvailApiGovernanceSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0B1530] py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                03 · API Governance &amp; Data Controls
              </span>
            </Reveal>

            <Reveal index={1}>
                 <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-white sm:text-[2.35rem]">
                 Availability signals governed before they{" "}
                <span style={{ color: ACCENT }}> reach your
                product.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-56 animate-pulse rounded bg-white/10" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-white/10" />
          </div>
        )}

        {/* ---------------- Control cards grid ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mounted
            ? CONTROL_CARDS.map((card, i) => (
                <Reveal key={card.title} index={2 + i}>
                  <ControlCard {...card} />
                </Reveal>
              ))
            : Array.from({ length: 8 }).map((_, i) => <ControlCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Notice banner ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <Reveal index={10}>
              <NoticeBanner />
            </Reveal>
          ) : (
            <div className="h-16 w-full animate-pulse rounded-2xl bg-white/5" />
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
      style={{ opacity: 0, animationDelay: `${index * 60}ms` }}
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
/*  Control card                                                       */
/* ----------------------------------------------------------------- */
function ControlCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
      >
        <ControlIcon name={icon} />
      </div>
      <h4 className="mt-4 text-[14.5px] font-bold text-white">{title}</h4>
      <p className="mt-2 text-[12.5px] leading-relaxed text-[#9AA3B5]">
        {description}
      </p>
    </div>
  );
}

function ControlCardSkeleton() {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-white/10" />
      <div className="mt-4 h-4 w-28 animate-pulse rounded bg-white/10" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-white/10" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Notice banner                                                      */
/* ----------------------------------------------------------------- */
function NoticeBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        style={{ color: "#E8A23B" }}
      >
        <path
          d="M8 1.5l6.5 11.5a1 1 0 01-.87 1.5H2.37a1 1 0 01-.87-1.5L8 1.5z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M8 6.5v3M8 11.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      <p className="text-[13px] leading-relaxed text-[#9AA3B5]">
        <span className="font-semibold text-white">
          Public claim-control rule:
        </span>{" "}
        no endpoint fields, data categories, availability levels,
        response examples, or coverage claims are published unless
        product, legal, privacy, security, and pharmacy operations have
        approved them.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Icons                                                              */
/* ----------------------------------------------------------------- */
function ControlIcon({ name }: { name: string }) {
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
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 12l2 2 5-5" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h7l3 3v15a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
          <path d="M14 3v3h3M9 12h6M9 15h6" />
        </svg>
      );
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.5" />
          <path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M17.5 17.5L15 15M6 18l2.5-2.5M17.5 6.5L15 9" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <path d="M8 6h12M8 12h12M8 18h12" />
          <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}