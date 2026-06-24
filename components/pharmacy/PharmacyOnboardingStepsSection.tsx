"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PharmacyOnboardingStepsSection
 * Dark "onboarding flow" section — six-step horizontal stepper, step 1
 * highlighted as active/current, connected by a thin line.
 */

const STEPS = [
  {
    number: 1,
    title: "Claim Search",
    description:
      "Select pre-loaded pharmacy record or submit new-entity request",
    active: true,
  },
  {
    number: 2,
    title: "Authority Verification",
    description:
      "Pharmacist license, owner auth, corporate email, or chain admin",
    active: false,
  },
  {
    number: 3,
    title: "Account Security",
    description: "Create admin with MFA, accept network terms, set role",
    active: false,
  },
  {
    number: 4,
    title: "Inventory Sync",
    description: "Choose PMS/API, SFTP/CSV, or manual dashboard path",
    active: false,
  },
  {
    number: 5,
    title: "Visibility Rules",
    description:
      "Confirm categories, controlled medicine blackout, service radius",
    active: false,
  },
  {
    number: 6,
    title: "Activation Review",
    description: "Network node activated after verification and data readiness",
    active: false,
  },
] as const;

export default function PharmacyOnboardingStepsSection() {
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
    <section ref={ref} className="relative w-full bg-[#0A1330] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white">
                  Onboarding Flow
                </span>
              </Reveal>

              <Reveal index={1}>
                <h2 className="mt-5 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-white sm:text-[2.5rem]">
                  Six steps from claim
                  <br />
                  <span className="text-[#00A99D]">to activated node</span>.
                </h2>
              </Reveal>

              <Reveal index={2}>
                <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/50">
                  Automated where possible. Human review as a governed
                  fallback.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Stepper ---------------- */}
        <div className="relative mt-16">
          {mounted ? (
            <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:flex lg:gap-0">
              {STEPS.map((step, i) => (
                <Step key={step.number} {...step} index={i} isLast={i === STEPS.length - 1} />
              ))}
            </div>
          ) : (
            <StepperSkeleton />
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
      className="animate-[pharmacyStepFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacyStepFadeUp {
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
/*  Step                                                               */
/* ----------------------------------------------------------------- */
function Step({
  number,
  title,
  description,
  active,
  index,
  isLast,
}: {
  number: number;
  title: string;
  description: string;
  active: boolean;
  index: number;
  isLast: boolean;
}) {
  return (
    <div
      className="group relative flex flex-1 flex-col items-center px-2 text-center animate-[pharmacyStepFadeUp_0.6s_ease-out_forwards] lg:px-3"
      style={{ opacity: 0, animationDelay: `${300 + index * 110}ms` }}
    >
      {/* connecting line to next step (desktop only) */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-1/2 top-6 hidden h-px w-full bg-white/10 lg:block"
          style={{ left: "calc(50% + 24px)", width: "calc(100% - 48px)" }}
        />
      )}

      <div
        className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-[15px] font-bold transition-all duration-300 ${
          active
            ? "border-[#00A99D] bg-[#0E2A26] text-[#00A99D] shadow-[0_0_24px_-4px_rgba(0,169,157,0.7)] group-hover:scale-110"
            : "border-white/15 bg-[#111B3A] text-white/40 group-hover:border-[#00A99D]/50 group-hover:bg-[#0E2A26] group-hover:text-[#00A99D] group-hover:scale-110"
        }`}
      >
        {number}
      </div>

      <h3 className="mt-4 text-[14px] font-bold text-white transition-colors duration-300 group-hover:text-[#00A99D]">
        {title}
      </h3>

      <p className="mt-2 max-w-[10.5rem] text-[12.5px] leading-relaxed text-white/40">
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
      <div className="h-6 w-36 animate-pulse rounded-full bg-white/10" />
      <div className="h-9 w-80 max-w-full animate-pulse rounded-lg bg-white/10" />
      <div className="h-9 w-64 max-w-full animate-pulse rounded-lg bg-white/10" />
      <div className="h-4 w-full max-w-md animate-pulse rounded bg-white/10" />
    </div>
  );
}

function StepperSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:flex lg:gap-0">
      {STEPS.map((_, i) => (
        <div key={i} className="flex flex-1 flex-col items-center px-2 text-center">
          <div className="h-12 w-12 animate-pulse rounded-full bg-white/10" />
          <div className="mt-4 h-3.5 w-24 animate-pulse rounded bg-white/10" />
          <div className="mt-2 h-3 w-28 animate-pulse rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}