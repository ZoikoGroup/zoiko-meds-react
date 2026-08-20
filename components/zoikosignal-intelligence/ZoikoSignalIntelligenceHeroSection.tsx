"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

export default function ZoikoSignalIntelligenceHeroSection() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------- Breadcrumb ---------------- */}
        {mounted ? (
          <Reveal index={0}>
            <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-[12.5px] leading-relaxed text-[#8891A4]">
              <a
                href="/"
                className="shrink-0 transition-colors duration-200 hover:text-[#0F1F4E]"
              >
                Home
              </a>

              <span className="shrink-0">/</span>

              <a
                href="/enterprise"
                className="transition-colors duration-200 hover:text-[#0F1F4E]"
              >
                Enterprise &amp; Intelligence
              </a>

              <span className="shrink-0">/</span>

              <span className="font-medium text-[#0F1F4E]">
                ZoikoSignal™ intelligence
              </span>
            </nav>
          </Reveal>
        ) : (
          <div className="mb-6 h-4 w-72 animate-pulse rounded bg-[#E4E8F0]" />
        )}

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Left column ---------------- */}
          <div>
            {mounted ? (
              <div className="flex flex-col gap-5">
                <Reveal index={1}>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: ACCENT }}
                  >
                    ZoikoSignal™ Intelligence
                  </span>
                </Reveal>

                <Reveal index={2}>
                  <h1 className="font-[var(--font-plus-jakarta-sans)] text-4xl font-bold leading-[1.15] text-[#0F1F4E] sm:text-[2.65rem]">
                    Medicine availability
                    <br />
                    intelligence for institutions.
                  </h1>
                </Reveal>

                <Reveal index={3}>
                  <p className="max-w-lg text-[15px] leading-relaxed text-[#5B6478]">
                    ZoikoSignal™ turns aggregated medicine availability signals,
                    shortage pressure, demand movement, restock patterns, and
                    regional access risk into governed intelligence for health
                    systems, governments, manufacturers, payers, and
                    public-health organizations.
                  </p>
                </Reveal>

                <Reveal index={4}>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => router.push("#request")}
                      type="button"
                      className="group cursor-pointer relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                      style={{ backgroundColor: ACCENT }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 8px 24px -4px rgba(15,170,135,0.45)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow = "none")
                      }
                    >
                      <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
                      <span className="relative">
                        Request ZoikoSignal™ Briefing
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/pharmacy-dashboard")}
                      className="rounded-xl border border-[#D7DCE6] cursor-pointer bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                    >
                      View Sample Intelligence Dashboard
                    </button>
                  </div>
                </Reveal>

                <Reveal index={6}>
                  <p className="mt-1 flex max-w-lg items-start gap-2.5 text-[12.5px] leading-relaxed text-[#8891A4]">
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 1.5l5 1.8v4c0 3.4-2.2 5.7-5 6.7-2.8-1-5-3.3-5-6.7v-4l5-1.8z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Aggregated intelligence. Privacy thresholds. Contract-scoped
                    outputs. No identifiable patient-data sales. No exact public
                    pharmacy stock exposure.
                  </p>
                </Reveal>
              </div>
            ) : (
              <LeftSkeleton />
            )}
          </div>

          {/* ---------------- Right column: Image ---------------- */}
          <div className="w-full flex justify-center lg:justify-end">
            {mounted ? (
              <Reveal index={3}>
                <img
                  src="/signal/hero.png"
                  alt="ZoikoSignal Intelligence Dashboard"
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
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoSignalFadeUp {
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
    <div className="flex flex-col gap-5">
      <div className="h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="space-y-3">
        <div className="h-9 w-full max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-9 w-5/6 max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-5/6 max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-3/4 max-w-md animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 flex gap-3">
        <div className="h-11 w-60 animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-11 w-64 animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-48 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-10 w-full max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}
