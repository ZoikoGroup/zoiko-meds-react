"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PharmacyInventorySyncSection
 * "Connect your inventory" section — three integration tiers.
 *
 * Key behavior requested: Tier 1 (PMS / API Integration) is permanently
 * styled as the highlighted/recommended card. Tiers 2 and 3 are plain by
 * default, but on hover they pick up that SAME highlighted look (green
 * border, tinted background, glow) — so hovering any card previews the
 * "recommended" treatment, not a generic lift.
 */

const TIERS = [
  {
    tier: "Tier 1",
    title: "PMS / API Integration",
    description:
      "Direct API connection to your pharmacy management system. Real-time or near-real-time inventory sync. Highest availability confidence.",
    confidenceLabel: "High",
    confidenceLevel: 100,
    confidenceColor: "#00A99D",
    icon: "code",
    cta: "Connect via API/PMS",
    ctaStyle: "filled",
    recommended: true,
  },
  {
    tier: "Tier 2",
    title: "SFTP / CSV Secure Feed",
    description:
      "Scheduled automated file upload for pharmacies without direct API readiness. Strong confidence when uploaded on schedule.",
    confidenceLabel: "Good",
    confidenceLevel: 62,
    confidenceColor: "#3B5BDB",
    icon: "upload",
    cta: "Configure Secure Feed",
    ctaStyle: "outline",
    recommended: false,
  },
  {
    tier: "Tier 3",
    title: "Manual Dashboard",
    description:
      "Controlled fallback for small pharmacies or early onboarding. Manual entries expire and downgrade automatically when not refreshed.",
    confidenceLabel: "Variable",
    confidenceLevel: 22,
    confidenceColor: "#A7AEBD",
    icon: "grid",
    cta: "Start Manual Setup",
    ctaStyle: "outline",
    recommended: false,
  },
] as const;

export default function PharmacyInventorySyncSection() {
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-4xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <span className="inline-flex items-center rounded-full border border-[#2563EB2E] bg-[#EFF4FF] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2563EB] transition-colors duration-300 hover:bg-[#EEF1FD]">
                  Inventory Sync
                </span>
              </Reveal>

              <Reveal index={1}>
                <h2 className="mt-5 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[38px]">
                  Connect your inventory.{" "}
                  <span className="text-[#00A99D]">Automate freshness.</span>
                </h2>
              </Reveal>

              <Reveal index={2}>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#5B6478]">
                  Automated feeds first. Manual dashboard as a controlled
                  fallback — never visually equal to API/PMS integration.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Tier cards ---------------- */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {mounted
            ? TIERS.map((t, i) => <TierCard key={t.title} {...t} index={i} />)
            : TIERS.map((_, i) => <CardSkeleton key={i} />)}
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
      className="animate-[pharmacyTierFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacyTierFadeUp {
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
/*  Tier card                                                          */
/* ----------------------------------------------------------------- */
function TierCard({
  tier,
  title,
  description,
  confidenceLabel,
  confidenceLevel,
  confidenceColor,
  icon,
  cta,
  ctaStyle,
  recommended,
  index,
}: {
  tier: string;
  title: string;
  description: string;
  confidenceLabel: string;
  confidenceLevel: number;
  confidenceColor: string;
  icon: "code" | "upload" | "grid";
  cta: string;
  ctaStyle: "filled" | "outline";
  recommended: boolean;
  index: number;
}) {
  // The highlighted ("recommended") treatment — applied permanently to
  // tier 1, and applied to tiers 2/3 ONLY on hover via group-hover.
  const highlightWrapperClasses = recommended
    ? "border-[#9FE3D3] bg-[#EAFAF4] shadow-[0_8px_28px_-12px_rgba(0,169,157,0.35)]"
    : "border-[#E7EAF1] bg-white group-hover:border-[#9FE3D3] group-hover:bg-[#EAFAF4] group-hover:shadow-[0_8px_28px_-12px_rgba(0,169,157,0.35)]";

  const highlightIconClasses = recommended
    ? "bg-[#BEEFE0] text-[#00A99D]"
    : "bg-[#EEF1F6] text-[#5B6478] group-hover:bg-[#BEEFE0] group-hover:text-[#00A99D]";

  const highlightTierBadgeClasses = recommended
    ? "border-[#9FE3D3] bg-white text-[#00A99D]"
    : "border-[#E7EAF1] bg-[#F4F6FA] text-[#5B6478] group-hover:border-[#9FE3D3] group-hover:bg-white group-hover:text-[#00A99D]";

  return (
    <div
      className={`group relative rounded-2xl border p-7 transition-all duration-300 ease-out animate-[pharmacyTierFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1 ${highlightWrapperClasses}`}
      style={{ opacity: 0, animationDelay: `${300 + index * 130}ms` }}
    >
      {recommended && (
        <span className="absolute right-7 top-7 inline-flex items-center rounded-full bg-[#00A99D] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          Recommended
        </span>
      )}

      <span
        className={`inline-flex items-center rounded-full border px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wide transition-colors duration-300 ${highlightTierBadgeClasses}`}
      >
        {tier}
      </span>

      <div
        className={`mt-5 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${highlightIconClasses}`}
      >
        <TierIcon name={icon} />
      </div>

      <h3 className="mt-5 text-[17px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2.5 min-h-[78px] text-[14px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      {/* confidence bar */}
      <div className="mt-3 flex items-center gap-3">
        <span className="whitespace-nowrap text-[11.5px] text-[#8891A4]">
          ZoikoAvail™ confidence
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E7EAF1]">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${confidenceLevel}%`,
              backgroundColor: confidenceColor,
            }}
          />
        </div>
        <span
          className="whitespace-nowrap text-[11.5px] font-semibold"
          style={{ color: confidenceColor }}
        >
          {confidenceLabel}
        </span>
      </div>

      {/* CTA */}
      <button
        type="button"
        className={
          ctaStyle === "filled"
            ? "group relative mt-6 flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#00A99D] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,169,157,0.45)] active:translate-y-0 active:scale-[0.98]"
            : "mt-6 flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
        }
      >
        {ctaStyle === "filled" && (
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
        )}
        <span className="relative">{cta}</span>
      </button>
    </div>
  );
}

function TierIcon({ name }: { name: "code" | "upload" | "grid" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "code":
      return (
        <svg {...common}>
          <path
            d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path
            d="M12 15V4M12 4l-3.5 3.5M12 4l3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13" y="4" width="7" height="16" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
          <rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                          */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-6 w-32 animate-pulse rounded-full bg-white" />
      <div className="h-9 w-[28rem] max-w-full animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-xl animate-pulse rounded bg-white" />
      <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-white" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-7">
      <div className="h-6 w-16 animate-pulse rounded-full bg-[#EEF1F6]" />
      <div className="mt-5 h-11 w-11 animate-pulse rounded-xl bg-[#EEF1F6]" />
      <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-[#EEF1F6]" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#EEF1F6]" />
        <div className="h-3.5 w-full animate-pulse rounded bg-[#EEF1F6]" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-[#EEF1F6]" />
      </div>
      <div className="mt-4 h-1.5 w-full animate-pulse rounded-full bg-[#EEF1F6]" />
      <div className="mt-6 h-10 w-full animate-pulse rounded-xl bg-[#EEF1F6]" />
    </div>
  );
}