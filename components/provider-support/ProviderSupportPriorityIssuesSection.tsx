"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const ISSUES = [
  {
    icon: "lock",
    title: "Provider access blocked",
    description:
      "Authenticated provider access support with identity and role review.",
    cta: "Get Access Help",
    href: "#",
    tone: "navy",
  },
  {
    icon: "doc",
    title: "Patient-safe language concern",
    description: "Referral guidance support and approved-language review.",
    cta: "Request Language Review",
    href: "#",
    tone: "navy",
  },
  {
    icon: "pulse",
    title: "Signal interpretation concern",
    description: "Signal guidance support for state, freshness, and limitations.",
    cta: "Get Signal Guidance",
    href: "#",
    tone: "navy",
  },
  {
    icon: "lines",
    title: "Workflow routing issue",
    description: "Workflow operations review and routing correction.",
    cta: "Report Routing Issue",
    href: "#",
    tone: "navy",
  },
  {
    icon: "shield",
    title: "Privacy or PHI concern",
    description: "Privacy support escalation handled under incident procedures.",
    cta: "Report Privacy Concern",
    href: "#",
    tone: "red",
  },
  {
    icon: "shieldAlert",
    title: "Security or unauthorized access",
    description: "Security support escalation with verification and audit.",
    cta: "Report Security Concern",
    href: "#",
    tone: "red",
  },
] as const;

export default function ProviderSupportPriorityIssuesSection() {
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
                  High-priority <span style={{ color: ACCENT }}>provider issues.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Issues that need faster routing or escalation.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Issue cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {mounted
            ? ISSUES.map((issue, i) => (
                <IssueCard key={issue.title} {...issue} index={i} />
              ))
            : ISSUES.map((_, i) => <IssueCardSkeleton key={i} />)}
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
      className="animate-[providerSupportPriorityFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes providerSupportPriorityFadeUp {
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
/*  Issue card                                                          */
/* ----------------------------------------------------------------- */
function IssueCard({
  icon,
  title,
  description,
  cta,
  href,
  tone,
  index,
}: {
  icon: "lock" | "doc" | "pulse" | "lines" | "shield" | "shieldAlert";
  title: string;
  description: string;
  cta: string;
  href: string;
  tone: "navy" | "red";
  index: number;
}) {
  const iconBg = tone === "red" ? "#B3261E" : "#0F1F4E";

  return (
    <div
      className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[providerSupportPriorityFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${250 + index * 100}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor =
          tone === "red" ? "#F0B4AC" : "#9FE3D3";
        e.currentTarget.style.boxShadow =
          tone === "red"
            ? "0 14px 32px -16px rgba(179,38,30,0.25)"
            : "0 14px 32px -16px rgba(15,170,135,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: iconBg, color: "#FFFFFF" }}
        >
          <IssueIcon name={icon} />
        </div>

        <div className="flex-1">
          <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
            {description}
          </p>
        </div>
      </div>

      <a
        href={href}
        className="mt-5 inline-flex w-fit items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </a>
    </div>
  );
}

function IssueIcon({
  name,
}: {
  name: "lock" | "doc" | "pulse" | "lines" | "shield" | "shieldAlert";
}) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path
            d="M3 12h3l2.5-6 4 12 2-6H21"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "lines":
      return (
        <svg {...common}>
          <path d="M5 7h14M5 12h14M5 17h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
        </svg>
      );
    case "shieldAlert":
      return (
        <svg {...common}>
          <path
            d="M12 3.5l7 2.5v5.4c0 4.6-3 7.7-7 9.1-4-1.4-7-4.5-7-9.1V6l7-2.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M12 9v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="15" r="0.7" fill="currentColor" />
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
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#0F1F4E] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(15,31,78,0.25)] animate-[providerSupportPriorityFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "850ms" }}
    >
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#EAEDF2] text-[#3A4258]">
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2l6.5 11.2H1.5L8 2z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="11.5" r="0.6" fill="currentColor" />
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed text-[#5B6478]">
        Provider Support does not handle emergency medical situations,
        clinical advice, dispensing decisions, prescription validation,
        or patient treatment questions.{" "}
        <span className="font-semibold text-[#0F1F4E]">
          For emergencies, contact local emergency services.
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
    </div>
  );
}

function IssueCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
          <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
        </div>
      </div>
      <div className="mt-5 h-9 w-44 animate-pulse rounded-xl bg-[#E4E8F0]" />
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