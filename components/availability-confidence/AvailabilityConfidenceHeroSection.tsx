"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const RESULTS = [
  {
    name: "Riverside Community Pharmacy",
    distance: "About 2.4 miles away",
    note: "Recently updated. Confirm before traveling.",
    meta: "Updated today",
    pill: "Strong signal",
    tone: "green" as const,
    pillIcon: "check" as const,
  },
  {
    name: "Greenline Health Pharmacy",
    distance: "About 3.8 miles away",
    note: "Contact the pharmacy directly.",
    meta: "Confirmation recommended",
    pill: "Confirmation needed",
    tone: "blue" as const,
    pillIcon: "phone" as const,
  },
];

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
      { threshold: 0.12 }
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
                    ZoikoMeds uses confidence-based signals to help you
                    see where a medicine may be available, where
                    confirmation is needed, and when to check again.
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
                      href="#"
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
                      <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      <circle cx="8" cy="11.5" r="0.6" fill="currentColor" />
                    </svg>
                    Availability can change at any time. Always confirm
                    directly with the pharmacy before traveling.
                  </p>
                </Reveal>
              </>
            ) : (
              <LeftSkeleton />
            )}
          </div>

          {/* ---------------- Right: search results card mockup ---------------- */}
          <div>
            {mounted ? <ResultsCard /> : <ResultsCardSkeleton />}
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
/*  Results card                                                        */
/* ----------------------------------------------------------------- */
function ResultsCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_24px_60px_-30px_rgba(15,31,78,0.25)] animate-[availabilityConfidenceHeroFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "300ms" }}
    >
      {/* Query header */}
      <div className="px-6 py-4">
        <p className="text-[13px] text-[#5B6478]">
          Search results ·{" "}
          <span className="font-bold text-[#0F1F4E]">Ibuprofen 200 mg</span>{" "}
          · Austin, TX
        </p>
      </div>

      <div className="h-px w-full bg-[#EEF0F5]" />

      {/* Result rows */}
      <div>
        {RESULTS.map((r, i) => (
          <div key={r.name}>
            <div className="px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">
                  {r.name}
                </h3>
                <ResultPill icon={r.pillIcon} tone={r.tone}>
                  {r.pill}
                </ResultPill>
              </div>
              <p className="mt-1 text-[12.5px] text-[#8A91A3]">
                {r.distance}
              </p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-[#5B6478]">
                {r.note}
              </p>
              <p className="mt-1 text-[11.5px] text-[#A6ADBD]">{r.meta}</p>
            </div>
            {i < RESULTS.length - 1 && (
              <div className="h-px w-full bg-[#EEF0F5]" />
            )}
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-[#EEF0F5]" />

      {/* CTA */}
      <div className="px-6 py-5">
        <a
          href="#"
          className="inline-flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
        >
          View pharmacy details
        </a>
      </div>

      <p className="px-6 pb-5 text-center text-[11.5px] leading-relaxed text-[#A6ADBD]">
        Illustrative example. Signals are not stock guarantees,
        reservations, or dispensing approvals.
      </p>
    </div>
  );
}

const PILL_TONES: Record<"green" | "blue", { bg: string; fg: string }> = {
  green: { bg: "#DCF5EE", fg: "#0E8F70" },
  blue: { bg: "#E3E8FB", fg: "#3B5BDB" },
};

function ResultPill({
  children,
  icon,
  tone,
}: {
  children: React.ReactNode;
  icon: "check" | "phone";
  tone: "green" | "blue";
}) {
  const colors = PILL_TONES[tone];
  return (
    <span
      className="inline-flex flex-shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-semibold"
      style={{ backgroundColor: colors.bg, color: colors.fg }}
    >
      <ResultPillIcon name={icon} />
      {children}
    </span>
  );
}

function ResultPillIcon({ name }: { name: "check" | "phone" }) {
  if (name === "check") {
    return (
      <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 8.5l3 3 6-6.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.2 2.9c0-.4.3-.6.6-.5l2 .3c.3 0 .5.2.6.5l.4 1.5c.1.3 0 .6-.2.8l-.9.9c.5 1.2 1.5 2.2 2.7 2.7l.9-.9c.2-.2.5-.3.8-.2l1.5.4c.3.1.5.3.5.6 0 .3-.2.6-.5.6-5.1 0-8.7-3.6-8.7-8.7z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
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

function ResultsCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-3.5 w-56 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-6 space-y-6">
        {[0, 1].map((i) => (
          <div key={i}>
            <div className="flex items-center justify-between">
              <div className="h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
              <div className="h-6 w-28 animate-pulse rounded-full bg-[#E4E8F0]" />
            </div>
            <div className="mt-2 h-3 w-32 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="mt-3 h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
          </div>
        ))}
      </div>
      <div className="mt-6 h-10 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}