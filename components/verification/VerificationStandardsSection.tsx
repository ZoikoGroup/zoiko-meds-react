"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const STATUS_ROWS = [
  { label: "Registry / license review", value: "Reviewed", tone: "green" },
  { label: "Authorized user", value: "Confirmed", tone: "green" },
  { label: "Signal participation", value: "Active", tone: "blue" },
] as const;

export default function PharmacyPortalVerificationStandardsSection() {
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
                    Verification standards
                  </p>
                </Reveal>

                <Reveal index={1}>
                  <h2 className="font-[var(--font-plus-jakarta-sans)] mt-3 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                    Trust starts with verified{" "}
                    <span style={{ color: ACCENT }}>
                      pharmacy participation.
                    </span>
                  </h2>
                </Reveal>

                <Reveal index={2}>
                  <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[#5B6478]">
                    ZoikoMeds reviews pharmacy profiles, authorized users,
                    and participation workflows before verified pharmacies
                    appear in medicine availability experiences — helping
                    patients search with more confidence while pharmacies
                    stay in control.
                  </p>
                </Reveal>

                <Reveal index={3}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href="#claim-your-pharmacy"
                      className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Claim Your Pharmacy
                    </a>
                    <a
                      href="/join-the-network"
                      className="inline-flex items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                    >
                      Join the Verified Network
                    </a>
                  </div>
                </Reveal>

                <Reveal index={4}>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors duration-200 hover:text-[#00786F]"
                    style={{ color: ACCENT }}
                  >
                    Search Verified Pharmacies
                    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
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
                      <svg className="h-3 w-3 text-[#7C8499]" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M8 7v4M8 5.2v.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </span>
                    <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
                      Verification supports trust in pharmacy
                      participation. It does not guarantee medicine
                      stock, dispensing eligibility, clinical
                      suitability, or pharmacy availability at the time
                      of visit.
                    </p>
                  </div>
                </Reveal>
              </>
            ) : (
              <LeftSkeleton />
            )}
          </div>

          {/* ---------------- Right: status card mockup ---------------- */}
          <div>
            {mounted ? <StatusCard /> : <StatusCardSkeleton />}
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
      className="animate-[portalVerificationFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes portalVerificationFadeUp {
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
/*  Status card                                                         */
/* ----------------------------------------------------------------- */
function StatusCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_24px_60px_-30px_rgba(15,31,78,0.25)] animate-[portalVerificationFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "300ms" }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-6 py-5">
        <h3 className="text-[15px] font-bold text-[#0F1F4E]">
          Riverside Community Pharmacy
        </h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#DCF5EE] px-3 py-1 text-[12px] font-semibold text-[#0E8F70]">
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 8.5l3 3 6-6.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Verified
        </span>
      </div>

      <div className="h-px w-full bg-[#EEF0F5]" />

      {/* Participant pill row */}
      <div className="flex items-center justify-center py-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCEFD9] px-4 py-1.5 text-[12.5px] font-semibold text-[#B6791D]">
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1.5l5 1.8v4c0 3.4-2.2 5.7-5 6.7-2.8-1-5-3.3-5-6.7v-4l5-1.8z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          Verified Pharmacy Participant
        </span>
      </div>

      <div className="h-px w-full bg-[#EEF0F5]" />

      {/* Status rows */}
      <div>
        {STATUS_ROWS.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-[13.5px] text-[#3A4258]">
                {row.label}
              </span>
              <StatusPill value={row.value} tone={row.tone} />
            </div>
            {i < STATUS_ROWS.length - 1 && (
              <div className="h-px w-full bg-[#EEF0F5]" />
            )}
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-[#EEF0F5]" />

      {/* Footer row */}
      <div className="flex items-center justify-between px-6 py-4">
        <span className="flex items-center gap-1.5 text-[12px] text-[#8A91A3]">
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Last reviewed Apr 2026
        </span>
        <span className="text-[12px] text-[#8A91A3]">
          Governed participation
        </span>
      </div>

      <p className="px-6 pb-6 text-center text-[11.5px] leading-relaxed text-[#A6ADBD]">
        Illustrative example. Verification status depends on evidence
        reviewed, jurisdiction, participation level, and platform
        controls.
      </p>
    </div>
  );
}

const PILL_TONES: Record<"green" | "blue", { bg: string; fg: string }> = {
  green: { bg: "#DCF5EE", fg: "#0E8F70" },
  blue: { bg: "#E3E8FB", fg: "#3B5BDB" },
};

function StatusPill({
  value,
  tone,
}: {
  value: string;
  tone: "green" | "blue";
}) {
  const colors = PILL_TONES[tone];
  return (
    <span
      className="rounded-full px-3 py-1 text-[12px] font-semibold"
      style={{ backgroundColor: colors.bg, color: colors.fg }}
    >
      {value}
    </span>
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
        <div className="h-11 w-44 animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
      <div className="mt-3 h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-5 h-16 w-full max-w-md animate-pulse rounded-2xl bg-[#E4E8F0]" />
    </div>
  );
}

function StatusCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="h-4 w-48 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-[#E4E8F0]" />
      </div>
      <div className="mt-6 flex justify-center">
        <div className="h-7 w-56 animate-pulse rounded-full bg-[#E4E8F0]" />
      </div>
      <div className="mt-6 space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="h-3.5 w-32 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-[#E4E8F0]" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="h-3 w-28 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-28 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}