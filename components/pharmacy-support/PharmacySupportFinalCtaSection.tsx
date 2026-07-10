"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

export default function PharmacySupportFinalCtaSection() {
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
    <section ref={ref} className="relative w-full bg-[#0C1B30] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl border border-[#1F2E55] px-6 py-14 text-center sm:px-12 sm:py-16"
          style={{
            background:
              "radial-gradient(120% 140% at 50% -10%, #16234A 0%, #0B1226 60%, #0A0F1F 100%)",
          }}
        >
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold leading-tight text-white sm:text-[1.85rem]">
                  Route the issue. Protect pharmacy data. Resolve faster.
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#A9B2C8]">
                  Get help with verification, portal access, profile
                  updates, availability signals, confirmation requests,
                  inventory workflows, branch controls, integrations, and
                  security through the right ZoikoMeds support path.
                </p>
              </Reveal>

              <Reveal index={2}>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="#support"
                    className="inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:w-auto"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Get Pharmacy Support
                  </a>
                  <a
                    href="/pharmacy-portal"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-[#3A4668] bg-transparent px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-white/5 active:translate-y-0 active:scale-[0.98] sm:w-auto"
                  >
                    Sign In to Pharmacy Portal
                  </a>
                </div>
              </Reveal>
            </>
          ) : (
            <CtaSkeleton />
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
      className="animate-[pharmacySupportFinalCtaFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacySupportFinalCtaFadeUp {
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
/*  Skeleton                                                             */
/* ----------------------------------------------------------------- */
function CtaSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-7 w-full max-w-md animate-pulse rounded-lg bg-white/10" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white/10" />
      <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-white/10" />
      <div className="mt-3 flex gap-3">
        <div className="h-11 w-48 animate-pulse rounded-xl bg-white/10" />
        <div className="h-11 w-48 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}