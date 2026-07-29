"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PharmacyPortalDataProtectionSection
 * "Control and data protection" section — header, a 2x3 grid of
 * commitment cards (icon, title, copy), a secondary CTA button, and a
 * closing disclaimer bar with a left accent border.
 *
 * Brand accent for this page: #0FAA87
 */

const ACCENT = "#0FAA87";

const COMMITMENTS = [
  {
    icon: "eyeOff",
    title: "Exact public stock stays hidden",
    description:
      "ZoikoMeds does not publicly display exact stock quantities. Public results use confidence-based signals.",
  },
  {
    icon: "user",
    title: "Pharmacist judgment remains final",
    description:
      "We do not override prescription validation, counseling, eligibility checks, pharmacy policy, or dispensing decisions.",
  },
  {
    icon: "toggle",
    title: "Participation can be managed",
    description:
      "Adjust participation settings, visibility controls, confirmation workflows, and operational preferences where supported.",
  },
  {
    icon: "shield",
    title: "Controlled medicine safeguards",
    description:
      "Restricted, controlled, high-risk, or jurisdiction-sensitive medicines may be suppressed, limited, or routed through extra controls.",
  },
  {
    icon: "userBadge",
    title: "Role-based access",
    description:
      "Portal users receive access based on verified role, organization, branch, and approved permissions.",
  },
  {
    icon: "doc",
    title: "Auditability",
    description:
      "Material changes to profile, signal settings, branch controls, roles, and confirmation workflows are logged.",
  },
] as const;

export default function PharmacyPortalDataProtectionSection() {
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Control and{" "}
                  <span style={{ color: ACCENT }}>data protection.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  The commitments that keep your pharmacy in charge of its
                  data, workflow, and professional judgment.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Commitment cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {mounted
            ? COMMITMENTS.map((c, i) => (
                <CommitmentCard key={c.title} {...c} index={i} />
              ))
            : COMMITMENTS.map((_, i) => <CardSkeleton key={i} />)}
        </div>

        {/* ---------------- Secondary CTA ---------------- */}
        <div className="mt-8 flex justify-center sm:justify-start">
          {mounted ? (
            <Reveal index={9}>
              <a
                href="/join-the-network"
                className="inline-flex items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
              >
                View Pharmacy Data Controls
              </a>
            </Reveal>
          ) : (
            <div className="h-11 w-56 animate-pulse rounded-xl bg-[#E4E8F0]" />
          )}
        </div>

        {/* ---------------- Disclaimer bar ---------------- */}
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
      className="animate-[portalDataProtectionFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes portalDataProtectionFadeUp {
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
/*  Commitment card                                                     */
/* ----------------------------------------------------------------- */
function CommitmentCard({
  icon,
  title,
  description,
  index,
}: {
  icon: "eyeOff" | "user" | "toggle" | "shield" | "userBadge" | "doc";
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[portalDataProtectionFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${250 + index * 100}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9FE3D3";
        e.currentTarget.style.boxShadow =
          "0 14px 32px -16px rgba(15,170,135,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
      >
        <CommitmentIcon name={icon} />
      </div>

      <div>
        <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
      </div>
    </div>
  );
}

function CommitmentIcon({
  name,
}: {
  name: "eyeOff" | "user" | "toggle" | "shield" | "userBadge" | "doc";
}) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-4.5 w-4.5" };

  switch (name) {
    case "eyeOff":
      return (
        <svg {...common}>
          <path
            d="M3.5 12s3.5-6.5 8.5-6.5 8.5 6.5 8.5 6.5-3.5 6.5-8.5 6.5S3.5 12 3.5 12z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8.2" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M5 19.5c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "toggle":
      return (
        <svg {...common}>
          <rect x="3.5" y="8" width="17" height="8" rx="4" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="15.5" cy="12" r="2.4" fill="currentColor" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 3.5l7 2.5v5.4c0 4.6-3 7.7-7 9.1-4-1.4-7-4.5-7-9.1V6l7-2.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9.2 12l2 2 3.6-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "userBadge":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M6 19c0-3 2.7-5 6-5s6 2 6 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M9.5 19.5l1.2-1.5 1.3 1 1.3-1 1.2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(59,91,219,0.3)] animate-[portalDataProtectionFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "1100ms" }}
    >
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
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
        ZoikoMeds does not publicly expose exact stock quantities and does
        not prescribe, dispense, sell, deliver, reserve, recommend,
        allocate, or guarantee medicines.{" "}
        <span className="font-semibold text-[#0F1F4E]">
          Pharmacist judgment, prescription requirements, pharmacy
          policies, and jurisdiction-specific laws always apply.
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

function CardSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-9 w-9 flex-shrink-0 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
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