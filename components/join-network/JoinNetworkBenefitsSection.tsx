"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * JoinNetworkBenefitsSection
 * "Make availability easier to manage" section — header, a 2x2 grid of
 * benefit cards (icon, title, copy, outline CTA), and a closing
 * disclaimer note bar with a left accent border.
 */

const BENEFITS = [
  {
    icon: "phone",
    title: "Reduce avoidable availability calls.",
    description:
      "Turn repeated manual stock inquiries into structured availability signals and confirmation workflows, easing front-counter and phone pressure over time.",
    cta: "Join the Network",
    ctaStyle: "filled",
    link:"#verified-network"
  },
  {
    icon: "search",
    title: "Support high-intent patients.",
    description:
      "Appear in relevant searches when users are actively checking availability near your location — subject to verification, participation status, and jurisdiction rules.",
    cta: "Claim Your Pharmacy",
    ctaStyle: "outline",
    link:"#claim-your-pharmacy"
  },
  {
    icon: "lock",
    title: "Protect exact stock information.",
    description:
      "Use confidence-based signals instead of public exact stock quantities — giving patients guidance without exposing sensitive inventory.",
    cta: "View Data Controls",
    ctaStyle: "outline",
    link:"#"
  },
  {
    icon: "scale",
    title: "Scale from one store to many.",
    description:
      "Independents can begin with the portal. Groups and chains can discuss branch-level controls, integrations, SSO, and operational governance.",
    cta: "Request Chain Briefing",
    ctaStyle: "outline",
    link:"#"
  },
] as const;

export default function JoinNetworkBenefitsSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Make availability easier to manage —
                  <br />
                  <span className="text-[#00A99D]">
                    without giving up control.
                  </span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Practical value for pharmacies: operational relief,
                  patient support, stock protection, and participation
                  that scales.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {mounted
            ? BENEFITS.map((b, i) => (
                <BenefitCard key={b.title} {...b} index={i} />
              ))
            : BENEFITS.map((_, i) => <CardSkeleton key={i} />)}
        </div>

        {/* ---------------- Disclaimer note bar ---------------- */}
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
      className="animate-[joinNetworkBenefitFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes joinNetworkBenefitFadeUp {
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
/*  Benefit card                                                       */
/* ----------------------------------------------------------------- */
function BenefitCard({
  icon,
  title,
  description,
  cta,
  ctaStyle,
  index,
  link
}: {
  icon: "phone" | "search" | "lock" | "scale";
  title: string;
  description: string;
  cta: string;
  ctaStyle: "filled" | "outline";
  index: number;
  link:string;
}) {
  const router = useRouter();
  return (
    <div
      className="group rounded-2xl border border-[#E7EAF1] bg-white p-7 transition-all duration-300 ease-out animate-[joinNetworkBenefitFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_14px_36px_-16px_rgba(0,169,157,0.25)]"
      style={{ opacity: 0, animationDelay: `${250 + index * 110}ms` }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCF5EE] text-[#00A99D] transition-transform duration-300 group-hover:scale-110">
        <BenefitIcon name={icon} />
      </div>

      <h3 className="mt-5 text-[16.5px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      <button
      onClick={()=>router.push(link)}
        type="button"
        className={
          ctaStyle === "filled"
            ? "group relative mt-5 cursor-pointer overflow-hidden rounded-xl bg-[#00A99D] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,169,157,0.45)] active:translate-y-0 active:scale-[0.98]"
            : "mt-5 rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
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

function BenefitIcon({ name }: { name: "phone" | "search" | "lock" | "scale" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path
            d="M5 4.5c0-.6.5-1 1-.9l3 .5c.4.1.8.4.9.8l.6 2.2c.1.4 0 .9-.3 1.2l-1.3 1.3c.8 1.8 2.3 3.3 4.1 4.1l1.3-1.3c.3-.3.8-.4 1.2-.3l2.2.6c.4.1.7.5.8.9l.5 3c.1.5-.3 1-.9 1-7.7 0-13.1-5.4-13.1-13.1z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M19 19l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path
            d="M4 5h7M4 5l-2 5.5c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5L6 5M15 5h7m-7 0l-2 5.5c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5L18 5M11.5 4v16M8 20h7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Note bar                                                           */
/* ----------------------------------------------------------------- */
function NoteBar() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(59,91,219,0.3)] animate-[joinNetworkBenefitFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "700ms" }}
    >
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 5.5v.01M8 7.5v3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed text-[#5B6478]">
        ZoikoMeds does not override pharmacist judgment, prescription
        requirements, pharmacy policies, licensing rules, clinical
        counseling obligations, eligibility checks, or jurisdiction-specific
        dispensing obligations.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                          */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-white" />
      <div className="h-8 w-64 animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-7">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-5 h-9 w-40 animate-pulse rounded-xl bg-[#E4E8F0]" />
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