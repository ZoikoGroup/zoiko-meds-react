"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const STATUS_ROWS = [
  { label: "Pharmacy support", value: "In review", tone: "blue" },
  { label: "Verification status", value: "Verified", tone: "green" },
  { label: "Portal access", value: "Help available", tone: "blue" },
  { label: "Availability signals", value: "Supported", tone: "blue" },
  { label: "Confirmation requests", value: "Supported", tone: "blue" },
  { label: "Inventory & integration", value: "Supported", tone: "blue" },
] as const;

export default function PharmacySupportHeroSection() {
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
                    Pharmacy support
                  </p>
                </Reveal>

                <Reveal index={1}>
                  <h2 className="font-[var(--font-plus-jakarta-sans)] mt-3 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                    Get help with your ZoikoMeds{" "}
                    <span style={{ color: ACCENT }}>
                      pharmacy workspace.
                    </span>
                  </h2>
                </Reveal>

                <Reveal index={2}>
                  <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[#5B6478]">
                    Use Pharmacy Support for verification, portal access,
                    profile updates, availability signal settings,
                    confirmation requests, inventory signal workflows,
                    branch controls, integrations, and security concerns.
                  </p>
                </Reveal>

                <Reveal index={3}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Get Pharmacy Support
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                    >
                      Sign In to Pharmacy Portal
                    </a>
                  </div>
                </Reveal>

                <Reveal index={4}>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors duration-200 hover:text-[#00786F]"
                    style={{ color: ACCENT }}
                  >
                    Check Verification Status
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
                      For patient medicine searches, use Search Medicines.
                      For clinical, prescription, dispensing, or
                      emergency questions, contact the pharmacy, a
                      healthcare professional, or emergency services
                      directly.
                    </p>
                  </div>
                </Reveal>
              </>
            ) : (
              <LeftSkeleton />
            )}
          </div>

          {/* ---------------- Right: support status card mockup ---------------- */}
          <div>
            <img src="/pharmacy-support/hero.png" alt="Image" />
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
      className="animate-[pharmacySupportHeroFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacySupportHeroFadeUp {
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
/*  Support status card                                                  */
/* ----------------------------------------------------------------- */
function SupportStatusCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_24px_60px_-30px_rgba(15,31,78,0.25)] animate-[pharmacySupportHeroFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "300ms" }}
    >
      {/* Status rows */}
      <div>
        {STATUS_ROWS.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between px-6 py-4">
              <span
                className={
                  i === 0
                    ? "text-[14px] font-bold text-[#0F1F4E]"
                    : "text-[13.5px] text-[#3A4258]"
                }
              >
                {row.label}
              </span>
              <StatusPill value={row.value} tone={row.tone} />
            </div>
            {i < STATUS_ROWS.length - 1 && (
              <div className="h-px w-full bg-[#EEF0F5]" />
            )}
          </div>
        ))}

        <div className="h-px w-full bg-[#EEF0F5]" />

        {/* Sensitive issues row */}
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-[13.5px] text-[#3A4258]">
            Sensitive issues
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#DCF5EE] px-3 py-1 text-[12px] font-semibold text-[#0E8F70]">
            <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5l6 2.2v4.3c0 4-2.6 6.7-6 7.6-3.4-.9-6-3.6-6-7.6V3.7l6-2.2z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
            Authenticated
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-[#EEF0F5]" />

      <p className="px-6 py-5 text-center text-[11.5px] leading-relaxed text-[#A6ADBD]">
        Illustrative interface. Support access, ticket visibility, and
        issue resolution depend on verification, role permissions,
        support category, and platform controls.
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
      <div className="mt-3 h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-5 h-16 w-full max-w-md animate-pulse rounded-2xl bg-[#E4E8F0]" />
    </div>
  );
}

function SupportStatusCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="space-y-4">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="h-3.5 w-32 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-[#E4E8F0]" />
          </div>
        ))}
      </div>
      <div className="mt-6 h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}