"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

type Tone = "gray" | "blue" | "amber" | "green" | "red";

const STATUSES = [
  {
    tone: "gray" as Tone,
    icon: "lock",
    badge: "Unclaimed profile",
    description:
      "A pharmacy profile may exist, but an authorized representative has not completed claim verification.",
    visibility: "Limited or suppressed, where approved.",
    action: "An authorized representative can start a claim.",
    cta: "Claim This Pharmacy",
    link:"#claim-your-pharmacy"
  },
  {
    tone: "blue" as Tone,
    icon: "clock",
    badge: "Claim in review",
    description:
      "ZoikoMeds is reviewing the claim, requester authorization, and supporting information.",
    visibility: "No verified badge until review is complete.",
    action: "Check status or provide more information.",
    cta: "Check Verification Status",
    link:"#",
  },
  {
    tone: "amber" as Tone,
    icon: "shield",
    badge: "Verified pharmacy participant",
    description:
      "ZoikoMeds has reviewed required evidence and approved the pharmacy for verified participation.",
    visibility:
      "May display a verified participation badge, subject to platform rules.",
    action: "View details and availability signals where supported.",
    cta: "View Pharmacy Profile",
    link:"#",
  },
  {
    tone: "green" as Tone,
    icon: "check",
    badge: "Availability signal participant",
    description:
      "The pharmacy participates in availability workflows such as portal updates, confirmation responses, or approved integrations.",
    visibility:
      "Search may show confidence-based signals, not exact stock.",
    action: "Review signals and confirm with the pharmacy.",
    cta: "Learn About Availability Confidence",
    link:"/availability-confidence"
  },
  {
    tone: "red" as Tone,
    icon: "warning",
    badge: "Review required",
    description:
      "Additional review is needed because information is incomplete, stale, disputed, or affected by status changes.",
    visibility: "May be limited, paused, or updated pending review.",
    action: "Provide updated information.",
    cta: "Contact Pharmacy Support",
    link:"/pharmacy-support"
  },
];

const TONE_STYLES: Record<
  Tone,
  { border: string; badgeBg: string; badgeFg: string; hoverShadow: string }
> = {
  gray: {
    border: "#C7CEDC",
    badgeBg: "#EAEDF2",
    badgeFg: "#3A4258",
    hoverShadow: "rgba(58,66,88,0.18)",
  },
  blue: {
    border: "#3B5BDB",
    badgeBg: "#E3E8FB",
    badgeFg: "#3B5BDB",
    hoverShadow: "rgba(59,91,219,0.22)",
  },
  amber: {
    border: "#D9A227",
    badgeBg: "#FCEFD9",
    badgeFg: "#B6791D",
    hoverShadow: "rgba(217,162,39,0.22)",
  },
  green: {
    border: ACCENT,
    badgeBg: "#DCF5EE",
    badgeFg: "#0E8F70",
    hoverShadow: "rgba(15,170,135,0.22)",
  },
  red: {
    border: "#D9603A",
    badgeBg: "#FBE7DE",
    badgeFg: "#B6531F",
    hoverShadow: "rgba(217,96,58,0.22)",
  },
};

export default function PharmacyPortalVerificationStatusSection() {
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
                  What <span style={{ color: ACCENT }}>verification status means.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Plain-language statuses used consistently across search
                  results, pharmacy profiles, the portal, and support —
                  each with an icon, a color, and text, never color alone.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Status cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {mounted
            ? STATUSES.map((s, i) => (
                <StatusCard
  key={s.badge}
  tone={s.tone}
  icon={s.icon as "lock" | "clock" | "shield" | "check" | "warning"}
  badge={s.badge}
  description={s.description}
  visibility={s.visibility}
  action={s.action}
  cta={s.cta}
  link={s.link}
  index={i}
/>
              ))
            : STATUSES.map((_, i) => <StatusCardSkeleton key={i} />)}
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
      className="animate-[portalVerifStatusFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes portalVerifStatusFadeUp {
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
function StatusCard({
  tone,
  icon,
  badge,
  description,
  visibility,
  action,
  cta,
  index,
  link
}: {
  tone: Tone;
  icon: "lock" | "clock" | "shield" | "check" | "warning";
  badge: string;
  description: string;
  visibility: string;
  action: string;
  cta: string;
  index: number;
  link:string;
}) {
  const colors = TONE_STYLES[tone];

  return (
    <div
      className="flex flex-col rounded-2xl border-2 bg-white p-6 transition-all duration-300 ease-out animate-[portalVerifStatusFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${250 + index * 100}ms`,
        borderColor: colors.border,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 16px 36px -18px ${colors.hoverShadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span
        className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold"
        style={{ backgroundColor: colors.badgeBg, color: colors.badgeFg }}
      >
        <StatusIcon name={icon} />
        {badge}
      </span>

      <p className="mt-3 text-[13px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      <div className="mt-4 space-y-2">
        <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
          <span className="font-semibold text-[#0F1F4E]">Visibility:</span>{" "}
          {visibility}
        </p>
        <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
          <span className="font-semibold text-[#0F1F4E]">Your action:</span>{" "}
          {action}
        </p>
      </div>

      <div className="mt-4 h-px w-full bg-[#EEF0F5]" />

      <a
        href={link}
        className="mt-4 inline-flex w-fit items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </a>
    </div>
  );
}

function StatusIcon({
  name,
}: {
  name: "lock" | "clock" | "shield" | "check" | "warning";
}) {
  const common = { viewBox: "0 0 16 16", fill: "none" as const, className: "h-3.5 w-3.5" };

  switch (name) {
    case "lock":
      return (
        <svg {...common}>
          <rect x="3.5" y="7.5" width="9" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5.5 7.5V5.3a2.5 2.5 0 0 1 5 0v2.2" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M8 1.8l5 1.8v3.8c0 3.3-2.1 5.5-5 6.4-2.9-.9-5-3.1-5-6.4V3.6l5-1.8z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );
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
  }
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

function StatusCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-6 w-44 animate-pulse rounded-full bg-[#E4E8F0]" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-6 h-9 w-40 animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}