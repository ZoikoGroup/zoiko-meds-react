"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

export default function MediBaseDataHeroSection() {
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
            <nav className="mb-6 flex items-center gap-2 text-[12.5px] text-[#8891A4]">
              <Link
                href="/"
                className="transition-colors duration-200 hover:text-[#0F1F4E]"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/enterprise"
                className="transition-colors duration-200 hover:text-[#0F1F4E]"
              >
                Enterprise &amp;
              </Link>
              <Link
                href="/intelligence"
                className="transition-colors duration-200 hover:text-[#0F1F4E]"
              >
                intelligence
              </Link>
              <span>/</span>
              <span className="text-[#0F1F4E]">MediBase™ data</span>
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
                    MediBase™ Data
                  </span>
                </Reveal>

                <Reveal index={2}>
                  <h1 className="font-[var(--font-plus-jakarta-sans)] text-4xl font-bold leading-[1.15] text-[#0F1F4E] sm:text-[2.65rem]">
                    The medicine identity layer behind{" "}
                    <span style={{ color: ACCENT }}>
                      availability intelligence.
                    </span>
                  </h1>
                </Reveal>

                <Reveal index={3}>
                  <p className="max-w-lg text-[15px] leading-relaxed text-[#5B6478]">
                    MediBase™ normalizes medicine names, brands, generics,
                    strengths, dosage forms, identifiers, and jurisdictional
                    context so enterprises can build cleaner search, API,
                    availability, and intelligence workflows on governed
                    medicine data.
                  </p>
                </Reveal>

                <Reveal index={4}>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => router.push("#request")}
                      type="button"
                      className="group relative cursor-pointer overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
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
                        Request MediBase™ Data Briefing
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/api-access")}
                      className="cursor-pointer rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                    >
                      Discuss Data/API Access
                    </button>
                  </div>
                </Reveal>

                <Reveal index={5}>
                  <a
                    href="#view"
                    className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors duration-200"
                    style={{ color: ACCENT }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#0C8A6E")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = ACCENT)}
                  >
                    View Data Governance
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </Reveal>

                <Reveal index={6}>
                  <p className="mt-1 flex max-w-lg items-start gap-2.5 text-[12.5px] leading-relaxed text-[#8891A4]">
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                    </svg>
                    MediBase™ supports medicine identity matching and
                    availability workflows. It does not provide clinical advice,
                    recommend substitutes, validate prescriptions, or confirm
                    dispensing eligibility.
                  </p>
                </Reveal>
              </div>
            ) : (
              <LeftSkeleton />
            )}
          </div>

          {/* ---------------- Right column: Hero Image ---------------- */}
          <div className="relative flex items-center justify-center">
            {mounted ? (
              <Reveal index={3}>
                <div className="relative w-full overflow-hidden rounded-2xl">
                  <img
                    src="/medibase-data/hero.png"
                    alt="MediBase Data Identity Illustration"
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
/*  Skeletons                                                        */
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
