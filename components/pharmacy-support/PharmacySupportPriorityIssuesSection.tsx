"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const ISSUES = [
  {
    icon: "lock",
    title: "Portal lockout (verified pharmacy)",
    description:
      "Authenticated access support with identity verification and role review.",
    cta: "Get Portal Access Help",
    href: "/pharmacy-portal",
    tone: "navy",
  },
  {
    icon: "home",
    title: "Incorrect pharmacy information",
    description:
      "Profile correction review; branch or location verification as needed.",
    cta: "Report Profile Issue",
    href: "/pharmacy-support",
    tone: "navy",
  },
  {
    icon: "bell",
    title: "Signal or visibility concern",
    description:
      "Availability signal support; data-control and participation review.",
    cta: "Review Signal Settings",
    href: "/availability-signals",
    tone: "navy",
  },
  {
    icon: "phone",
    title: "Confirmation request overload",
    description:
      "Volume-control and pause support; branch-routing review.",
    cta: "Adjust Request Controls",
    href: "/confirmation-requests",
    tone: "navy",
  },
  {
    icon: "code",
    title: "Upload or integration failure",
    description:
      "Technical integration queue; secure handling of upload or API details.",
    cta: "Contact Integration Support",
    href: "/integrations",
    tone: "navy",
  },
  {
    icon: "shieldAlert",
    title: "Security or unauthorized access",
    description:
      "Security escalation with authenticated or additional verification.",
    cta: "Report Security Concern",
    href: "/security",
    tone: "red",
  },
] as const;

export default function PharmacySupportPriorityIssuesSection() {
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
                  Priority <span style={{ color: ACCENT }}>pharmacy issues.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Operationally urgent issues are routed to a prioritized
                  support queue.
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
      className="animate-[pharmacySupportPriorityFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacySupportPriorityFadeUp {
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
  icon: "lock" | "home" | "bell" | "phone" | "code" | "shieldAlert";
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
      className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[pharmacySupportPriorityFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
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
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#5B6478]">
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
  name: "lock" | "home" | "bell" | "phone" | "code" | "shieldAlert";
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
    case "bell":
      return (
        <svg {...common}>
          <path
            d="M6 16v-4.5a6 6 0 0 1 12 0V16l1.5 2H4.5L6 16z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M10 19.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path
            d="M5 4.5c0-.6.5-1 1-.9l3 .5c.4.1.8.4.9.8l.6 2.2c.1.4 0 .9-.3 1.2l-1.3 1.3c.8 1.8 2.3 3.3 4.1 4.1l1.3-1.3c.3-.3.8-.4 1.2-.3l2.2.6c.4.1.7.5.8.9l.5 3c.1.5-.3 1-.9 1-7.7 0-13.1-5.4-13.1-13.1z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path
            d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
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
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#0F1F4E] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(15,31,78,0.25)] animate-[pharmacySupportPriorityFadeUp_0.6s_ease-out_forwards]"
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
        Pharmacy Support does not handle emergency medical situations,
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