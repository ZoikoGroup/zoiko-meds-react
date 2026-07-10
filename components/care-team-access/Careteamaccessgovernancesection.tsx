"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const ITEMS = [
  {
    icon: "personCheck",
    title: "Role-based access",
    description:
      "Care-team users receive access based on organization, role, workflow need, and approved permissions.",
  },
  {
    icon: "branch",
    title: "Organization-level controls",
    description:
      "Manage approved users, care-team roles, access scope, SSO readiness, and support escalation where enabled.",
  },
  {
    icon: "routing",
    title: "Data-minimized by default",
    description:
      "Workflows don't collect diagnosis, symptoms, prescription images, insurance IDs, full records, DOB, or clinical notes by default.",
  },
  {
    icon: "person",
    title: "Patient-owned follow-up",
    description:
      "Saved searches, alerts, caregiver labels, and notification preferences stay patient- or caregiver-owned wherever possible.",
  },
  {
    icon: "doc",
    title: "Auditability",
    description:
      "Material care-team actions, access changes, workflow configurations, and shared guidance tools are auditable where built.",
  },
  {
    icon: "ban",
    title: "Clinical boundaries",
    description:
      "ZoikoMeds does not provide medical advice, prescribe, recommend substitutions, validate prescriptions, authorize dispensing, or replace provider or pharmacist judgment.",
  },
] as const;

export default function CareTeamAccessGovernanceSection() {
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
                  Access designed for{" "}
                  <span style={{ color: ACCENT }}>healthcare</span>
                  <br />
                  <span style={{ color: ACCENT }}>environments.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  The governance, permissions, privacy, and boundaries
                  that make care-team access safe for provider
                  organizations.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Governance items ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mounted
            ? ITEMS.map((item, i) => (
                <GovernanceItem key={item.title} {...item} index={i} />
              ))
            : ITEMS.map((_, i) => <ItemSkeleton key={i} />)}
        </div>

        {/* ---------------- CTA ---------------- */}
        <div className="mt-5">
          {mounted ? (
            <Reveal index={9}>
              <a
                href="/trust-center"
                className="inline-flex items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-6 py-2.5 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
              >
                Visit Trust Center
              </a>
            </Reveal>
          ) : (
            <div className="h-10 w-44 animate-pulse rounded-xl bg-white" />
          )}
        </div>

        {/* ---------------- Disclaimer bar ---------------- */}
        <div className="mt-5">
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
      className="animate-[careTeamGovFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes careTeamGovFadeUp {
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
/*  Governance item                                                     */
/* ----------------------------------------------------------------- */
function GovernanceItem({
  icon,
  title,
  description,
  index,
}: {
  icon: GovernanceIconName;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 ease-out animate-[careTeamGovFadeUp_0.55s_ease-out_forwards] hover:-translate-y-0.5"
      style={{ opacity: 0, animationDelay: `${250 + index * 80}ms` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9FE3D3";
        e.currentTarget.style.boxShadow =
          "0 12px 28px -16px rgba(15,170,135,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
      >
        <GovernanceIcon name={icon} />
      </span>

      <div>
        <h3 className="text-[14px] font-bold text-[#0F1F4E]">{title}</h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
      </div>
    </div>
  );
}

type GovernanceIconName =
  | "personCheck"
  | "branch"
  | "routing"
  | "person"
  | "doc"
  | "ban";

function GovernanceIcon({ name }: { name: GovernanceIconName }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-4.5 w-4.5" };

  switch (name) {
    case "personCheck":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 19c.6-2.6 2.6-4.3 5-4.3M14 13.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "branch":
      return (
        <svg {...common}>
          <rect x="4" y="14" width="4" height="6" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="9" width="4" height="11" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="4" width="4" height="16" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "routing":
      return (
        <svg {...common}>
          <path
            d="M4 7h11a3 3 0 0 1 0 6H7M4 7l3-3M4 7l3 3M9 17h11a3 3 0 0 0 0-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5.5 19c.8-3 3.3-5 6.5-5s5.7 2 6.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "ban":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6.5 6.5l11 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#0F1F4E] bg-[#EEF1F6] p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(15,31,78,0.25)] animate-[careTeamGovFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "1050ms" }}
    >
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#5B6478]">
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 5.5v.01M8 7.5v3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed text-[#5B6478]">
        If a provider organization requires patient-specific workflows,
        PHI handling, or integration with clinical systems, those
        workflows must be separately scoped, legally reviewed,
        contract-governed, and privacy-approved before launch.
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
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white" />
      <div className="h-8 w-56 animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function ItemSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-5">
      <div className="h-9 w-9 flex-shrink-0 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
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