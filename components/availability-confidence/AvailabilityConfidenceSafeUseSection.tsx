"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

type Tone = "green" | "amber" | "blue" | "gray";
type IconName = "check" | "warning" | "phone" | "ban";

type SafeUseRowData = {
  tone: Tone;
  icon: IconName;
  badge: string;
  description: string;
  cta: string;
  href:string;
};

// Explicitly typed as SafeUseRowData[] so every field (icon, tone)
// stays narrowed to its literal union instead of widening to `string`.
// Without this annotation, `icon: "check"` infers as `string`, which
// no longer matches SafeUseRow's `icon: IconName` prop — that mismatch
// was the source of the type error.
const ROWS: SafeUseRowData[] = [
  {
    tone: "green",
    icon: "check",
    badge: "Strong signal",
    description:
      "Review pharmacy details, check distance and hours, then confirm before traveling.",
    cta: "View Pharmacy Details",
    href:"/pharmacy",
  },
  {
    tone: "amber",
    icon: "warning",
    badge: "Limited signal",
    description:
      "Contact the pharmacy before making a trip. Consider expanding the search radius or creating an alert.",
    cta: "Create Availability Alert",
    href:"/availability-alert",
  },
  {
    tone: "blue",
    icon: "phone",
    badge: "Confirmation needed",
    description: "Use the pharmacy contact or confirmation option where supported.",
    cta: "Request Confirmation",
    href:"/confirmation-requests",
  },
  {
    tone: "gray",
    icon: "ban",
    badge: "No current signal",
    description:
      "Try a wider radius, check the medicine spelling, add strength or form, or create an alert for future changes.",
    cta: "Search Again",
    href:"/searchmed",
  },
];

const TONE_STYLES: Record<Tone, { bg: string; fg: string }> = {
  green: { bg: "#DCF5EE", fg: "#0E8F70" },
  amber: { bg: "#FBE7DE", fg: "#B6531F" },
  blue: { bg: "#E3E8FB", fg: "#3B5BDB" },
  gray: { bg: "#EAEDF2", fg: "#3A4258" },
};

export default function AvailabilityConfidenceSafeUseSection() {
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
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  How to use a <span style={{ color: ACCENT }}>signal safely.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Each signal points to a safe next step. A signal helps
                  you decide what to do — it never reserves or guarantees
                  medicine.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Rows ---------------- */}
        <div className="mt-12 flex flex-col gap-5">
          {mounted
            ? ROWS.map((r, i) => <SafeUseRow key={r.badge} {...r} index={i} />)
            : ROWS.map((_, i) => <RowSkeleton key={i} />)}
        </div>

        {/* ---------------- Note bar ---------------- */}
        <div className="mt-6">
          {mounted ? <NoteBar /> : <NoteBarSkeleton />}
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
      className="animate-[availabilitySafeUseFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes availabilitySafeUseFadeUp {
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
/*  Row                                                                  */
/* ----------------------------------------------------------------- */
function SafeUseRow({
  tone,
  icon,
  badge,
  description,
  cta,
  index,
  href
}: SafeUseRowData & { index: number }) {
  const colors = TONE_STYLES[tone];

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 ease-out animate-[availabilitySafeUseFadeUp_0.6s_ease-out_forwards] sm:flex-row sm:items-center sm:gap-6 hover:-translate-y-0.5"
      style={{
        opacity: 0,
        animationDelay: `${250 + index * 100}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9FE3D3";
        e.currentTarget.style.boxShadow =
          "0 14px 32px -16px rgba(15,170,135,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span
        className="inline-flex w-fit flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold sm:w-44"
        style={{ backgroundColor: colors.bg, color: colors.fg }}
      >
        <SafeUseIcon name={icon} />
        {badge}
      </span>

      <p className="flex-1 text-[13.5px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      <a
        href={href}
        className="inline-flex w-fit flex-shrink-0 items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </a>
    </div>
  );
}

function SafeUseIcon({ name }: { name: IconName }) {
  const common = { viewBox: "0 0 16 16", fill: "none" as const, className: "h-3.5 w-3.5" };

  switch (name) {
    case "check":
      return (
        <svg {...common}>
          <path
            d="M3.5 8.5l3 3 6-6.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "warning":
      return (
        <svg {...common}>
          <path
            d="M8 2l6.5 11.2H1.5L8 2z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="11.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path
            d="M3.2 2.9c0-.4.3-.6.6-.5l2 .3c.3 0 .5.2.6.5l.4 1.5c.1.3 0 .6-.2.8l-.9.9c.5 1.2 1.5 2.2 2.7 2.7l.9-.9c.2-.2.5-.3.8-.2l1.5.4c.3.1.5.3.5.6 0 .3-.2.6-.5.6-5.1 0-8.7-3.6-8.7-8.7z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ban":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
          <path d="M4.5 4.5l7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Note bar                                                            */
/* ----------------------------------------------------------------- */
function NoteBar() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#0FAA87] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(15,170,135,0.3)] animate-[availabilitySafeUseFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "650ms" }}
    >
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#DCF5EE] text-[#0E8F70]">
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.5l5 1.8v4c0 3.4-2.2 5.7-5 6.7-2.8-1-5-3.3-5-6.7v-4l5-1.8z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed text-[#5B6478]">
        A signal helps you decide what to do next.{" "}
        <span className="font-semibold text-[#0F1F4E]">
          It does not reserve medicine, guarantee availability, or
          confirm that a prescription can be dispensed.
        </span>
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
      <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-white" />
    </div>
  );
}

function RowSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-5 sm:flex-row sm:items-center sm:gap-6">
      <div className="h-7 w-40 flex-shrink-0 animate-pulse rounded-full bg-[#E4E8F0]" />
      <div className="h-3.5 w-full flex-1 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-9 w-44 flex-shrink-0 animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

function NoteBarSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] bg-white p-5">
      <div className="h-7 w-7 flex-shrink-0 animate-pulse rounded-full bg-[#E4E8F0]" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}