"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const ROLES = [
  {
    icon: "team",
    title: "Care coordinators & patient navigators",
    description:
      "Explain availability signals, guide pharmacy confirmation, and direct patients to self-service tools.",
    cta: "Request Care Team Access Briefing",
    ctaStyle: "filled",
    link:"#request"
  },
  {
    icon: "home",
    title: "Discharge planners & hospital teams",
    description:
      "Support discharge conversations with availability search guidance and pharmacy confirmation reminders.",
    cta: "Explore Discharge Workflow Support",
    ctaStyle: "outline",
    link:"#"
  },
  {
    icon: "monitor",
    title: "Clinic & telehealth operations teams",
    description:
      "Route patients toward availability search, saved searches, alerts, and pharmacy confirmation.",
    cta: "Request Workflow Briefing",
    ctaStyle: "outline",
    link:"#"
  },
  {
    icon: "gear",
    title: "Provider organization administrators",
    description:
      "Evaluate organization-wide access, SSO readiness, governance, auditability, and support escalation.",
    cta: "Request Organization Review",
    ctaStyle: "outline",
    link:"#"
  },
] as const;

export default function CareTeamAccessRolesSection() {
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
      { threshold: 0.1 }
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
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
                  Built for care teams that help patients
                  <br />
                  <span style={{ color: ACCENT }}>
                    navigate access barriers.
                  </span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Clear roles, so the right team members use ZoikoMeds the
                  right way.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Role cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {mounted
            ? ROLES.map((r, i) => <RoleCard key={r.title} {...r} index={i} />)
            : ROLES.map((_, i) => <CardSkeleton key={i} />)}
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
      className="animate-[careTeamRoleFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes careTeamRoleFadeUp {
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
/*  Role card                                                          */
/* ----------------------------------------------------------------- */
function RoleCard({
  icon,
  title,
  description,
  cta,
  ctaStyle,
  index,
  link
}: {
  icon: "team" | "home" | "monitor" | "gear";
  title: string;
  description: string;
  cta: string;
  ctaStyle: "filled" | "outline";
  index: number;
  link:string;
}) {
  return (
    <div
      className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-7 transition-all duration-300 ease-out animate-[careTeamRoleFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{ opacity: 0, animationDelay: `${250 + index * 110}ms` }}
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
        style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
      >
        <RoleIcon name={icon} />
      </div>

      <h3 className="mt-5 text-[16.5px] font-bold text-[#0F1F4E]">{title}</h3>

      {/* flex-1 keeps buttons aligned on the same baseline per row */}
      <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      <a
        href={link}
        className={
          ctaStyle === "filled"
            ? "group relative mt-5 inline-flex w-full overflow-hidden rounded-xl px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            : "mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
        }
        style={
          ctaStyle === "filled"
            ? { backgroundColor: ACCENT, justifyContent: "center" }
            : undefined
        }
        onMouseEnter={(e) => {
          if (ctaStyle === "filled")
            e.currentTarget.style.boxShadow =
              "0 8px 24px -4px rgba(15,170,157,0.45)";
        }}
        onMouseLeave={(e) => {
          if (ctaStyle === "filled") e.currentTarget.style.boxShadow = "none";
        }}
      >
        {ctaStyle === "filled" && (
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
        )}
        <span className="relative">{cta}</span>
      </a>
    </div>
  );
}

function RoleIcon({ name }: { name: "team" | "home" | "monitor" | "gear" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="8.5" r="2.6" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16.5" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 19c.5-2.7 2.4-4.3 5-4.3s4.5 1.6 5 4.3M14.5 19c.4-2 1.7-3.3 3.5-3.3s3.1 1.3 3.5 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
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
    case "monitor":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="11" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 20h7M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M9 10.5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 4v2.2M12 17.8V20M4 12h2.2M17.8 12H20M6.3 6.3l1.5 1.5M16.2 16.2l1.5 1.5M6.3 17.7l1.5-1.5M16.2 7.8l1.5-1.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Disclaimer bar                                                       */
/* ----------------------------------------------------------------- */
function NoteBar() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(59,91,219,0.3)] animate-[careTeamRoleFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "800ms" }}
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
        Care team access supports patient availability guidance.{" "}
        <span className="font-semibold text-[#0F1F4E]">
          It does not make clinical decisions, change prescriptions,
          validate eligibility, or replace pharmacy confirmation.
        </span>
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                            */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-white" />
      <div className="h-8 w-64 animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-7">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-5 h-4 w-3/4 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 flex-1 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-5 h-9 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
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