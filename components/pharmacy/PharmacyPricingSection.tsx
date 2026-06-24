"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PharmacyPricingSection
 * "Commercial Tiers" section — Network Core (free, light card),
 * Intelligence Pro (dark teal-tinted card), Enterprise / API (dark
 * navy card). Each card has a checklist and its own CTA style.
 */

const TIERS = [
  {
    badge: "Free",
    badgeColor: "#00A99D",
    title: "Network Core",
    description:
      "Free during supply-density build phase · network participation",
    price: null,
    features: [
      "Claimed & verified pharmacy profile",
      "Availability confidence signals",
      "Manual or automated inventory feed",
      "Confirmation request routing",
      "Pharmacist visibility controls",
    ],
    cta: "Claim Pharmacy",
    style: "light",
  },
  {
    badge: "Pro",
    badgeColor: "#3FD9CC",
    title: "Intelligence Pro",
    description: null,
    price: "$99–$299 / location / month · pricing by market",
    features: [
      "Everything in Network Core",
      "Local demand dashboards",
      "Unfulfilled search insights",
      "Restock signal analytics",
      "Advanced request routing",
    ],
    cta: "Explore Pro",
    style: "pro",
  },
  {
    badge: "Enterprise",
    badgeColor: "#6E8CF2",
    title: "Enterprise / API",
    description:
      "Custom contract · chains, hospitals, health systems, PMS partners",
    price: null,
    features: [
      "Multi-branch governance",
      "Headless APIs + SLAs",
      "Dedicated integration support",
      "Custom data controls",
      "Data residency options",
    ],
    cta: "Contact Enterprise Sales",
    style: "enterprise",
  },
] as const;

export default function PharmacyPricingSection() {
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
    <section ref={ref} className="relative w-full bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <span className="inline-flex items-center rounded-full border border-[#F3D9A8] bg-[#FDF4E3] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C8821E] transition-colors duration-300 hover:bg-[#FBEAC9]">
                  Commercial Tiers
                </span>
              </Reveal>

              <Reveal index={1}>
                <h2 className="mt-5 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.5rem]">
                  Start free.{" "}
                  <span className="text-[#00A99D]">
                    Grow into intelligence.
                  </span>
                </h2>
              </Reveal>

              <Reveal index={2}>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#5B6478]">
                  Join the network at no cost. Upgrade into demand
                  intelligence and enterprise integration as your needs
                  evolve.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Cards ---------------- */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {mounted
            ? TIERS.map((t, i) => <PricingCard key={t.title} {...t} index={i} />)
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
      className="animate-[pharmacyPricingFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacyPricingFadeUp {
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
/*  Pricing card                                                       */
/* ----------------------------------------------------------------- */
function PricingCard({
  badge,
  badgeColor,
  title,
  description,
  price,
  features,
  cta,
  style,
  index,
}: {
  badge: string;
  badgeColor: string;
  title: string;
  description: string | null;
  price: string | null;
  features: readonly string[];
  cta: string;
  style: "light" | "pro" | "enterprise";
  index: number;
}) {
  const wrapperClasses =
    style === "light"
      ? "border border-[#E7EAF1] bg-[#F7F9FC] hover:border-[#9FE3D3] hover:shadow-[0_12px_32px_-14px_rgba(0,169,157,0.25)]"
      : style === "pro"
      ? "bg-[#0E2A26] hover:shadow-[0_12px_36px_-12px_rgba(0,169,157,0.45)]"
      : "bg-[#101B40] hover:shadow-[0_12px_36px_-12px_rgba(59,91,219,0.4)]";

  const titleColor =
    style === "light" ? "text-[#0F1F4E]" : "text-white";

  const descColor =
    style === "light" ? "text-[#5B6478]" : "text-white/55";

  const checkColor =
    style === "enterprise" ? "#6E8CF2" : "#3FD9CC";

  const featureTextColor = style === "light" ? "text-[#3D445A]" : "text-white/75";

  const ctaClasses =
    style === "light"
      ? "group relative w-full overflow-hidden rounded-xl bg-[#00A99D] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,169,157,0.45)] active:translate-y-0 active:scale-[0.98]"
      : style === "pro"
      ? "w-full rounded-xl border border-[#3FD9CC]/40 bg-transparent px-5 py-2.5 text-sm font-semibold text-[#3FD9CC] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#3FD9CC] hover:bg-[#3FD9CC]/10 active:translate-y-0 active:scale-[0.98]"
      : "w-full rounded-xl border border-[#6E8CF2]/40 bg-transparent px-5 py-2.5 text-sm font-semibold text-[#A9BBF7] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#6E8CF2] hover:bg-[#6E8CF2]/10 active:translate-y-0 active:scale-[0.98]";

  return (
    <div
      className={`group relative flex flex-col rounded-2xl p-7 transition-all duration-300 ease-out animate-[pharmacyPricingFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1 ${wrapperClasses}`}
      style={{ opacity: 0, animationDelay: `${300 + index * 130}ms` }}
    >
      <span
        className="text-[10.5px] font-bold uppercase tracking-[0.14em]"
        style={{ color: badgeColor }}
      >
        {badge}
      </span>

      <h3 className={`mt-2 text-[20px] font-bold ${titleColor}`}>{title}</h3>

      {description && (
        <p className={`mt-1.5 text-[13px] leading-relaxed ${descColor}`}>
          {description}
        </p>
      )}

      {price && (
        <p className={`mt-1.5 text-[13px] leading-relaxed ${descColor}`}>
          {price}
        </p>
      )}

      <ul className="mt-5 flex-1 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[13.5px]"
          >
            <svg
              className="mt-0.5 h-4 w-4 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4 10.5l3.5 3.5L16 5.5"
                stroke={checkColor}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={featureTextColor}>{feature}</span>
          </li>
        ))}
      </ul>

      <button type="button" className={`mt-7 ${ctaClasses}`}>
        {style === "light" && (
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
        )}
        <span className="relative">{cta}</span>
      </button>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                          */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-6 w-36 animate-pulse rounded-full bg-[#F2F4F8]" />
      <div className="h-9 w-[26rem] max-w-full animate-pulse rounded-lg bg-[#F2F4F8]" />
      <div className="h-4 w-full max-w-xl animate-pulse rounded bg-[#F2F4F8]" />
      <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-[#F2F4F8]" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-[#F7F9FC] p-7">
      <div className="h-3 w-14 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 h-6 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-5 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        ))}
      </div>
      <div className="mt-7 h-10 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}