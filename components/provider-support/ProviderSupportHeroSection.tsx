"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

export default function ProviderSupportHeroSection() {
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
                    Provider support
                  </p>
                </Reveal>

                <Reveal index={1}>
                  <h2 className="font-[var(--font-plus-jakarta-sans)] mt-3 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                    Get help with ZoikoMeds{" "}
                    <span style={{ color: ACCENT }}>provider workflows.</span>
                  </h2>
                </Reveal>

                <Reveal index={2}>
                  <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[#5B6478]">
                    Use Provider Support for medicine availability signal
                    guidance, patient support workflows, care-team access,
                    referral language, provider briefings, organization review,
                    privacy or security escalation, and integration routing.
                  </p>
                </Reveal>

                <Reveal index={3}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href="#support"
                      className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Get Provider Support
                    </a>
                    <a
                      href="/request-a-briefing"
                      className="inline-flex items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                    >
                      Request Provider Briefing
                    </a>
                  </div>
                </Reveal>

                <Reveal index={4}>
                  <a
                    href="/searchmed"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors duration-200 hover:text-[#00786F]"
                    style={{ color: ACCENT }}
                  >
                    Search Medicines
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6.5 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </Reveal>

                <Reveal index={5}>
                  <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] bg-white p-4">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[#C7CEDC]">
                      <svg
                        className="h-3 w-3 text-[#7C8499]"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M8 7v4M8 5.2v.1"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
                      Provider Support does not provide medical advice, clinical
                      decisions, prescription guidance, dispensing support, or
                      emergency assistance. Patients should use Search Medicines
                      and contact healthcare professionals or emergency services
                      for clinical or urgent needs.
                    </p>
                  </div>
                </Reveal>
              </>
            ) : (
              <LeftSkeleton />
            )}
          </div>

          {/* ---------------- Right: Hero Image ---------------- */}
          <div className="flex justify-center lg:justify-end">
            <Reveal index={2}>
              {mounted ? (
                <img
                  src="/provider-support/hero.png"
                  alt="Provider Support Interface Preview"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              ) : (
                <div className="h-80 w-full animate-pulse rounded-2xl bg-[#E4E8F0]" />
              )}
            </Reveal>
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
      className="animate-[providerSupportHeroFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes providerSupportHeroFadeUp {
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
/*  Skeletons                                                        */
/* ----------------------------------------------------------------- */
function LeftSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-3 w-32 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="h-8 w-2/3 max-w-sm animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-2 space-y-2">
        <div className="h-3.5 w-full max-w-md animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-full max-w-md animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 max-w-sm animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-4 flex gap-3">
        <div className="h-11 w-44 animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-11 w-48 animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
      <div className="mt-3 h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-5 h-16 w-full max-w-md animate-pulse rounded-2xl bg-[#E4E8F0]" />
    </div>
  );
}
