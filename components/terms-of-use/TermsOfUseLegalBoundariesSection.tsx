"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const BOUNDARY_CARDS = [
  {
    title: "Medical boundary",
    description:
      "No medical advice, diagnosis, treatment, prescribing guidance, substitution recommendations, or emergency support.",
    icon: "no-entry",
  },
  {
    title: "Pharmacy boundary",
    description:
      "Not a pharmacy; does not dispense, sell, deliver, reserve, allocate, or guarantee medicines.",
    icon: "home",
  },
  {
    title: "Availability boundary",
    description:
      "Availability is confidence-based and can change at any time; users must confirm directly with pharmacies.",
    icon: "check",
  },
  {
    title: "Account boundary",
    description:
      "Accounts support saved searches, alerts, preferences, and access controls; they do not create prescriptions or clinical records by default.",
    icon: "person",
  },
  {
    title: "Enterprise boundary",
    description:
      "Enterprise outputs are governed by contract, data-use restrictions, privacy thresholds, and jurisdictional controls.",
    icon: "building",
  },
  {
    title: "Emergency boundary",
    description:
      "In a medical emergency, contact local emergency services immediately.",
    icon: "triangle",
  },
] as const;

export default function TermsOfUseLegalBoundariesSection() {
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
                05 · Trust &amp; Legal Boundaries
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-white sm:text-[2.35rem]">
                The boundaries these{" "}
                <span style={{ color: ACCENT }}>Terms enforce.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-52 animate-pulse rounded bg-white/10" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-white/10" />
          </div>
        )}

        {/* ---------------- Boundary cards grid ---------------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? BOUNDARY_CARDS.map((card, i) => (
                <Reveal key={card.title} index={2 + i}>
                  <BoundaryCard {...card} />
                </Reveal>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <BoundaryCardSkeleton key={i} />
              ))}
        </div>

        {/* ---------------- Closing CTA banner ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <Reveal index={8}>
              <ClosingCtaBanner />
            </Reveal>
          ) : (
            <div className="h-56 w-full animate-pulse rounded-3xl bg-white/5" />
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
/*  Boundary card                                                       */
/* ----------------------------------------------------------------- */
function BoundaryCard({
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
        <BoundaryIcon name={icon} />
      </div>
      <h4 className="mt-4 text-[15px] font-bold text-white">{title}</h4>
      <p className="mt-2 text-[13px] leading-relaxed text-[#9AA3B5]">
        {description}
      </p>
    </div>
  );
}

function BoundaryCardSkeleton() {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-white/10" />
      <div className="mt-4 h-4 w-36 animate-pulse rounded bg-white/10" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-white/10" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Closing CTA banner                                                  */
/* ----------------------------------------------------------------- */
function ClosingCtaBanner() {
  const router = useRouter();
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-14 text-center sm:px-16">
      <h3 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold leading-snug text-white sm:text-[1.75rem]">
        Understand the rules before using ZoikoMeds.
      </h3>

      <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#9AA3B5]">
        Review the Terms, manage your privacy, and use ZoikoMeds with
        clear expectations about medicine availability, pharmacy
        confirmation, and platform limits.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
        onClick={()=>router.push("/searchmed")}
          type="button"
          className="group relative cursor-pointer overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 8px 24px -4px rgba(15,170,135,0.45)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
          <span className="relative">Return to Search Medicines</span>
        </button>

        <button
        onClick={()=>router.push("/trust-center")}
          type="button"
          className="rounded-xl cursor-pointer border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 active:translate-y-0 active:scale-[0.98]"
        >
          Visit Privacy Center
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Icons                                                              */
/* ----------------------------------------------------------------- */
function BoundaryIcon({ name }: { name: string }) {
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
    case "no-entry":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M6 12h12" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 13l4 4 10-10" />
        </svg>
      );
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-9" />
        </svg>
      );
    case "triangle":
      return (
        <svg {...common}>
          <path d="M12 4l9 16H3L12 4z" />
          <path d="M12 10v4M12 17h.01" />
        </svg>
      );
    default:
      return null;
  }
}