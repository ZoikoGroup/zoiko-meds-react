"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * PatientSupportClosingCtaSection
 * Final closing CTA — dark rounded card, centered heading + subtext,
 * two buttons (filled teal + outline).
 *
 * Brand accent for this page: #0FAA87
 */

const ACCENT = "#0FAA87";

export default function PatientSupportClosingCtaSection() {
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#0C1B30] px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0E1A3A] px-8 py-14 text-center sm:px-14">
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-[280px] w-[280px] rounded-full bg-[#0FAA87]/10 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-[260px] w-[260px] rounded-full bg-[#3B5BDB]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            {mounted ? (
              <>
                <Reveal index={0}>
                  <h2 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold leading-tight text-white sm:text-[1.85rem]">
                    Give patients clearer availability next steps.
                  </h2>
                </Reveal>

                <Reveal index={1}>
                  <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-white/50">
                    Use ZoikoMeds to help patients understand availability
                    signals, confirm with pharmacies, and return when
                    signals change — without replacing clinical care.
                  </p>
                </Reveal>

                <Reveal index={2}>
                  <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                    onClick={()=>router.push("#request")}
                      type="button"
                      className="group relative cursor-pointer overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-[#06241F] transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
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
                      <span className="relative">Request Workflow Briefing</span>
                    </button>

                    <button
                    onClick={()=>router.push("/searchmed")}
                      type="button"
                      className="rounded-xl cursor-pointer border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 active:translate-y-0 active:scale-[0.98]"
                    >
                      Search Medicines
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
      className="animate-[patientCtaFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes patientCtaFadeUp {
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
    <div className="flex flex-col items-center gap-4">
      <div className="h-7 w-full max-w-md animate-pulse rounded-lg bg-white/10" />
      <div className="h-4 w-full max-w-sm animate-pulse rounded bg-white/10" />
      <div className="h-4 w-2/3 max-w-xs animate-pulse rounded bg-white/10" />
      <div className="mt-3 flex gap-3">
        <div className="h-11 w-52 animate-pulse rounded-xl bg-white/10" />
        <div className="h-11 w-40 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}