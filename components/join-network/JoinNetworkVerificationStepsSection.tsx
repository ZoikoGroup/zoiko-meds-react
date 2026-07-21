"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * JoinNetworkVerificationStepsSection
 * "Verified participation starts with pharmacy control" section — header,
 * five numbered process cards in a row, and a closing CTA button.
 */

const STEPS = [
  {
    number: 1,
    title: "Submit pharmacy details",
    description:
      "Pharmacy name, location or region, authorized contact, business email, and pharmacy type. Low-friction — no documents yet.",
  },
  {
    number: 2,
    title: "Confirm authorization",
    description:
      "We verify the requester is authorized to act for the pharmacy, branch, group, or organization.",
  },
  {
    number: 3,
    title: "Review credentials",
    description:
      "License status, registry checks, role, and business identity — collected in a secure, authenticated workflow.",
  },
  {
    number: 4,
    title: "Set network controls",
    description:
      "Visibility settings, confirmation routing, branch controls, notifications, and participation boundaries.",
  },
  {
    number: 5,
    title: "Activate participation",
    description:
      "Once approved, your pharmacy can appear in relevant availability workflows — auditable and reversible.",
  },
] as const;

export default function JoinNetworkVerificationStepsSection() {
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
                  Verified participation starts with
                  <br />
                  <span className="text-[#00A99D]">pharmacy control.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Start with a lightweight network request. Sensitive
                  licensing and documentation are collected later, inside
                  a secure verification workflow.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Step cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {mounted
            ? STEPS.map((s, i) => <StepCard key={s.number} {...s} index={i} />)
            : STEPS.map((_, i) => <CardSkeleton key={i} />)}
        </div>

        {/* ---------------- CTA ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <Reveal index={6}>
              <button
              onClick={()=>router.push("#verified-network")}
                type="button"
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#00A99D] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,169,157,0.45)] active:translate-y-0 active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
                <span className="relative">Start Pharmacy Verification</span>
              </button>
            </Reveal>
          ) : (
            <div className="h-11 w-60 animate-pulse rounded-xl bg-white" />
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
      className="animate-[joinNetworkStepFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes joinNetworkStepFadeUp {
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
/*  Step card                                                          */
/* ----------------------------------------------------------------- */
function StepCard({
  number,
  title,
  description,
  index,
}: {
  number: number;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[joinNetworkStepFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_14px_32px_-16px_rgba(0,169,157,0.25)]"
      style={{ opacity: 0, animationDelay: `${250 + index * 100}ms` }}
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#DCF5EE] text-[13px] font-bold text-[#00A99D] transition-transform duration-300 group-hover:scale-110">
        {number}
      </span>

      <h3 className="mt-4 text-[14.5px] font-bold leading-snug text-[#0F1F4E]">
        {title}
      </h3>

      <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#5B6478]">
        {description}
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
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white" />
      <div className="h-8 w-56 animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-7 w-7 animate-pulse rounded-full bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}