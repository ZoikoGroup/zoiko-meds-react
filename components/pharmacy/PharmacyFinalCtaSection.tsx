"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PharmacyFinalCtaSection
 * Closing CTA banner — dark gradient rounded card with heading, subtext,
 * and two CTAs (filled + outline).
 */

export default function PharmacyFinalCtaSection() {
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-white px-6 py-4 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#0A1330] px-8 py-14 sm:px-14 sm:py-16">
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full bg-[#00A99D]/15 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-[260px] w-[260px] rounded-full bg-[#3B5BDB]/10 blur-3xl" />
          </div>

          <div className="relative">
            {mounted ? (
              <>
                <Reveal index={0}>
                  <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-white sm:text-[2.25rem]">
                    Ready to join the{" "}
                    <span className="text-[#00A99D]">verified network</span>?
                  </h2>
                </Reveal>

                <Reveal index={1}>
                  <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-white/55">
                    Search for your pharmacy, claim your node, and start
                    routing high-intent patients to your counter today.
                  </p>
                </Reveal>

                <Reveal index={2}>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      className="group relative overflow-hidden rounded-xl bg-[#00A99D] px-6 py-3 text-sm font-semibold text-[#06241F] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,169,157,0.45)] active:translate-y-0 active:scale-[0.98]"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
                      <span className="relative">Search &amp; Claim Your Pharmacy</span>
                    </button>

                    <button
                      type="button"
                      className="rounded-xl border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 active:translate-y-0 active:scale-[0.98]"
                    >
                      Request Enterprise Architecture Briefing
                    </button>
                  </div>
                </Reveal>
              </>
            ) : (
              <Skeleton />
            )}
          </div>
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
      className="animate-[pharmacyCtaFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacyCtaFadeUp {
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
/*  Skeleton                                                           */
/* ----------------------------------------------------------------- */
function Skeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white/10" />
      <div className="h-4 w-full max-w-md animate-pulse rounded bg-white/10" />
      <div className="h-4 w-2/3 max-w-sm animate-pulse rounded bg-white/10" />
      <div className="mt-3 flex gap-3">
        <div className="h-11 w-52 animate-pulse rounded-xl bg-white/10" />
        <div className="h-11 w-64 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}