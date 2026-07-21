"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PharmacyPortalAccessScaleSection
 * "Secure access that scales from one store to many" section — header,
 * a 3-col grid of access-tier cards (icon, title, copy, role pills or
 * CTA), a highlighted info banner, and a 2x2 "what you'll see, by
 * state" grid.
 *
 * Brand accent for this page: #0FAA87
 */

const ACCENT = "#0FAA87";

const TIERS = [
  {
    icon: "home",
    title: "Independent pharmacy",
    description:
      "Single-location and pharmacist-owned stores manage profile, availability settings, confirmation routing, support, and basic user access.",
    pills: null,
    cta: "Claim Your Pharmacy",
    link:"#claim-your-pharmacy"
  },
  {
    icon: "users",
    title: "Pharmacy team",
    description:
      "Assign authorized users to verified roles with least-privilege defaults and step-up authentication for sensitive settings.",
    pills: [
      "Owner",
      "Pharmacist-in-Charge",
      "Pharmacy Manager",
      "Operations",
      "Support",
      "Read-Only",
      "Integration",
    ],
    cta: null,
    link:"#"
  },
  {
    icon: "building",
    title: "Pharmacy group & chain",
    description:
      "Multi-branch operators use branch-level control, organization roles, SSO readiness, audit visibility, and integration governance.",
    pills: null,
    cta: "Request Chain Briefing",
    link:"#"
  },
] as const;

const STATES = [
  {
    icon: "check",
    tone: "green",
    title: "Verified pharmacy user",
    description:
      "Routed straight to your authenticated dashboard — no marketing above operational content.",
  },
  {
    icon: "clock",
    tone: "blue",
    title: "Unverified applicant",
    description:
      "See your verification status, the next required action, and a support route.",
  },
  {
    icon: "home",
    tone: "amber",
    title: "Existing profile not claimed",
    description:
      "A profile may already exist for your location. Claim it, request access review, or contact support.",
  },
  {
    icon: "ban",
    tone: "gray",
    title: "Access denied",
    description:
      "We couldn't verify access. Request an access review or sign in with another account.",
  },
] as const;

export default function PharmacyPortalAccessScaleSection() {
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
                  Secure access that scales from
                  <br />
                  <span style={{ color: ACCENT }}>one store to many.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Role-based access for independents, teams, branches, and
                  groups — no separate login portals.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Tier cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {mounted
            ? TIERS.map((t, i) => <TierCard key={t.title} {...t} index={i} />)
            : TIERS.map((_, i) => <TierCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Info banner ---------------- */}
        <div className="mt-6">
          {mounted ? <InfoBanner /> : <InfoBannerSkeleton />}
        </div>

        {/* ---------------- States subheader ---------------- */}
        <div className="mt-12">
          {mounted ? (
            <Reveal index={8}>
              <h3 className="text-[15px] font-bold text-[#0F1F4E]">
                What you&apos;ll see, by state
              </h3>
            </Reveal>
          ) : (
            <div className="h-5 w-48 animate-pulse rounded bg-[#E4E8F0]" />
          )}
        </div>

        {/* ---------------- State cards ---------------- */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mounted
            ? STATES.map((s, i) => (
                <StateCard key={s.title} {...s} index={i} />
              ))
            : STATES.map((_, i) => <StateCardSkeleton key={i} />)}
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
      className="animate-[portalAccessScaleFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes portalAccessScaleFadeUp {
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
/*  Tier card                                                           */
/* ----------------------------------------------------------------- */
function TierCard({
  icon,
  title,
  description,
  pills,
  cta,
  index,
  link
}: {
  icon: "home" | "users" | "building";
  title: string;
  description: string;
  pills: readonly string[] | null;
  cta: string | null;
  index: number;
  link:string;
}) {
  return (
    <div
      className="group flex flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[portalAccessScaleFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
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
        className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#0F1F4E", color: "#FFFFFF" }}
      >
        <TierIcon name={icon} />
      </div>

      <h3 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2 text-[13px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      {pills && (
        <div className="mt-4 flex flex-wrap gap-2">
          {pills.map((p) => (
            <span
              key={p}
              className="rounded-full border border-[#E7EAF1] bg-[#F7F8FB] px-3 py-1 text-[11.5px] font-medium text-[#3A4258]"
            >
              {p}
            </span>
          ))}
        </div>
      )}

      {cta && (
        <a
          href={link}
          className="mt-auto inline-flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 pt-6 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
        >
          {cta}
        </a>
      )}
    </div>
  );
}

function TierIcon({ name }: { name: "home" | "users" | "building" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path
            d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8.2" r="2.6" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M4 19c0-2.8 2.2-4.7 5-4.7s5 1.9 5 4.7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="16" cy="8.7" r="2.1" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M14.5 14.6c.6-.3 1.3-.5 2-.5 2.3 0 4.1 1.6 4.1 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="4" y="14" width="4" height="6" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="9" width="4" height="11" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="4" width="4" height="16" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Info banner                                                         */
/* ----------------------------------------------------------------- */
function InfoBanner() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-[#BFE4DA] bg-[#E3F5F0] p-5 animate-[portalAccessScaleFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "650ms" }}
    >
      <span
        className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white"
        style={{ color: ACCENT }}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed text-[#0F1F4E]">
        One sign-in, no portal picker. After you authenticate, your
        verified role and permissions route you to the right workspace —
        dashboard, branch selector, or integration workspace — without
        revealing whether any specific account exists.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  State card                                                          */
/* ----------------------------------------------------------------- */
const STATE_TONES: Record<
  "green" | "blue" | "amber" | "gray",
  { bg: string; fg: string; title: string }
> = {
  green: { bg: "#DCF5EE", fg: "#0E8F70", title: "#0E8F70" },
  blue: { bg: "#E3E8FB", fg: "#3B5BDB", title: "#3B5BDB" },
  amber: { bg: "#FCEFD9", fg: "#B6791D", title: "#B6791D" },
  gray: { bg: "#E9EBF0", fg: "#6B7280", title: "#3A4258" },
};

function StateCard({
  icon,
  tone,
  title,
  description,
  index,
}: {
  icon: "check" | "clock" | "home" | "ban";
  tone: "green" | "blue" | "amber" | "gray";
  title: string;
  description: string;
  index: number;
}) {
  const colors = STATE_TONES[tone];

  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 ease-out animate-[portalAccessScaleFadeUp_0.6s_ease-out_forwards] hover:-translate-y-0.5"
      style={{
        opacity: 0,
        animationDelay: `${950 + index * 100}ms`,
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
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: colors.bg, color: colors.fg }}
      >
        <StateIcon name={icon} />
      </span>
      <div>
        <h4 className="text-[13.5px] font-bold" style={{ color: colors.title }}>
          {title}
        </h4>
        <p className="mt-1 text-[12.5px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
      </div>
    </div>
  );
}

function StateIcon({ name }: { name: "check" | "clock" | "home" | "ban" }) {
  const common = { viewBox: "0 0 16 16", fill: "none" as const, className: "h-3.5 w-3.5" };

  switch (name) {
    case "check":
      return (
        <svg {...common}>
          <path
            d="M3.5 8.5l3 3 6-6.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path
            d="M2.5 7.5L8 3l5.5 4.5M4.3 6.8v5.7a.7.7 0 0 0 .7.7h6a.7.7 0 0 0 .7-.7V6.8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ban":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4.5 4.5l7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
      <div className="h-8 w-2/3 max-w-xs animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function TierCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-6 h-9 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

function InfoBannerSkeleton() {
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

function StateCardSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] bg-white p-5">
      <div className="h-7 w-7 flex-shrink-0 animate-pulse rounded-full bg-[#E4E8F0]" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-1/2 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}