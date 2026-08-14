"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

export default function AvailabilityConfidenceHeroSection() {
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
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Left: copy ---------------- */}
          <div>
            {mounted ? (
              <>
                <Reveal index={0}>
                  <p
                    className="text-[12px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: ACCENT }}
                  >
                    Availability confidence
                  </p>
                </Reveal>

                <Reveal index={1}>
                  <h2 className="font-[var(--font-plus-jakarta-sans)] mt-3 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                    Understand what medicine{" "}
                    <span style={{ color: ACCENT }}>
                      availability signals mean.
                    </span>
                  </h2>
                </Reveal>

                <Reveal index={2}>
                  <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[#5B6478]">
                    ZoikoMeds uses confidence-based signals to help you see
                    where a medicine may be available, where confirmation is
                    needed, and when to check again.
                  </p>
                </Reveal>

                <Reveal index={3}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href="/searchmed"
                      className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Search Medicines
                    </a>
                    <a
                      href="/availability-alert"
                      className="inline-flex items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                    >
                      Create Availability Alert
                    </a>
                  </div>
                </Reveal>

                <Reveal index={4}>
                  <p className="mt-4 flex items-start gap-1.5 text-[12.5px] leading-relaxed text-[#9A7B2E]">
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 2l6.5 11.2H1.5L8 2z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 6.5v3"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                      <circle cx="8" cy="11.5" r="0.6" fill="currentColor" />
                    </svg>
                    Availability can change at any time. Always confirm directly
                    with the pharmacy before traveling.
                  </p>
                </Reveal>
              </>
            ) : (
              <LeftSkeleton />
            )}
          </div>

          {/* ---------------- Right: Image ---------------- */}
          <div className="flex justify-center lg:justify-end">
            {mounted ? (
              <Reveal index={3}>
                <img
                  src="/availability/hero.png"
                  alt="Availability Confidence Preview"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </Reveal>
            ) : (
              <div className="h-80 w-full animate-pulse rounded-2xl bg-[#E4E8F0]" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/*  Reveal: bottom -> top staggered fade-up wrapper                  */
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
      className="animate-[availabilityConfidenceHeroFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes availabilityConfidenceHeroFadeUp {
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
/*  Skeleton                                                         */
/* ----------------------------------------------------------------- */
function LeftSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-3 w-40 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="h-8 w-2/3 max-w-sm animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-2 space-y-2">
        <div className="h-3.5 w-full max-w-md animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-full max-w-md animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 max-w-sm animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-4 flex gap-3">
        <div className="h-11 w-40 animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-11 w-48 animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
      <div className="mt-3 h-4 w-full max-w-md animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}
