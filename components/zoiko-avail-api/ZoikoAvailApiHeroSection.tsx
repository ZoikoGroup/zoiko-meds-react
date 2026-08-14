"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ACCENT = "#0FAA87";

export default function ZoikoAvailApiHeroSection() {
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
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------- Breadcrumb ---------------- */}
        <div className="mb-8">
          {mounted ? (
            <Reveal index={0}>
              <nav className="flex items-center gap-2 text-[13px] text-[#8A91A3]">
                <Link
                  href="/"
                  className="transition-colors duration-200 hover:text-[#0F1F4E]"
                >
                  Home
                </Link>
                <span>/</span>
                <a
                  href="/enterprise-solutions"
                  className="transition-colors duration-200 hover:text-[#0F1F4E]"
                >
                  Enterprise &amp; Intelligence
                </a>
                <span>/</span>
                <span className="text-[#3A4258]">ZoikoAvail™ API</span>
              </nav>
            </Reveal>
          ) : (
            <div className="h-4 w-72 animate-pulse rounded bg-[#E4E8F0]" />
          )}
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Left: copy (Unchanged) ---------------- */}
          <div>
            {mounted ? (
              <>
                <Reveal index={1}>
                  <p
                    className="text-[12px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: ACCENT }}
                  >
                    ZoikoAvail™ API
                  </p>
                </Reveal>

                <Reveal index={2}>
                  <h2 className="font-[var(--font-plus-jakarta-sans)] mt-3 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                    Integrate medicine availability signals into regulated
                    healthcare workflows.
                  </h2>
                </Reveal>

                <Reveal index={3}>
                  <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[#5B6478]">
                    ZoikoAvail™ API gives approved organizations access to
                    confidence-based medicine availability signals, freshness
                    metadata, pharmacy confirmation pathways, and location-aware
                    availability workflows — without exposing exact public stock
                    or replacing clinical judgment.
                  </p>
                </Reveal>

                <Reveal index={4}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href="#request"
                      className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Request API Access
                    </a>
                    <a
                      href="#view"
                      className="inline-flex items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                    >
                      View API Capabilities
                    </a>
                  </div>
                </Reveal>

                <Reveal index={5}>
                  <a
                    href="/security"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors duration-200 hover:text-[#00786F]"
                    style={{ color: ACCENT }}
                  >
                    Request Security Pack
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

                <Reveal index={6}>
                  <p className="mt-4 flex items-start gap-1.5 text-[12.5px] leading-relaxed text-[#5B6478]">
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ color: ACCENT }}
                    >
                      <path
                        d="M8 1.5l5 1.8v4c0 3.4-2.2 5.7-5 6.7-2.8-1-5-3.3-5-6.7v-4l5-1.8z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                    </svg>
                    API access is contract-scoped, jurisdiction-aware, and
                    governed by privacy, security, pharmacy, and data-use
                    controls.
                  </p>
                </Reveal>
              </>
            ) : (
              <LeftSkeleton />
            )}
          </div>

          {/* ---------------- Right: Hero Image ---------------- */}
          <div className="relative flex items-center justify-center">
            {mounted ? (
              <Reveal index={3}>
                <div className="relative w-full overflow-hidden rounded-2xl">
                  <img
                    src="/avail-api/hero.png"
                    alt="ZoikoAvail API Hero Illustration"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </Reveal>
            ) : (
              <div className="h-[350px] w-full animate-pulse rounded-2xl bg-[#E4E8F0]" />
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
      className="animate-[zoikoAvailHeroFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoAvailHeroFadeUp {
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
/*  Skeleton for left column                                         */
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
        <div className="h-11 w-44 animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
      <div className="mt-3 h-4 w-40 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 h-4 w-full max-w-md animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}
