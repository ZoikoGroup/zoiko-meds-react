"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const CONTROLS = [
  {
    icon: "routing",
    title: "Request routing",
    description:
      "Send requests to a portal queue, branch queue, designated user, operations queue, approved email, or integration workflow.",
    cta: "Discuss Workflow Routing",
  },
  {
    icon: "moon",
    title: "Volume controls",
    description:
      "Set daily limits, branch limits, medicine-category limits, queue pause, after-hours routing, and priority rules where approved.",
    cta: "View Request Controls",
  },
  {
    icon: "calendar",
    title: "Hours & availability windows",
    description:
      "Align requests with operating hours, holidays, temporary closures, staffing capacity, and approved response windows.",
    cta: "Configure Portal Settings",
  },
  {
    icon: "doc",
    title: "Approved response templates",
    description:
      "Use standardized response options that avoid clinical advice, stock guarantees, dispensing promises, and uncontrolled free text.",
    cta: "Review Response Templates",
  },
  {
    icon: "pause",
    title: "Pause & escalation",
    description:
      "Pause workflows during high volume, staffing limits, maintenance, inventory delays, restricted handling, or compliance review.",
    cta: "Learn About Pause Controls",
  },
  {
    icon: "audit",
    title: "Audit history",
    description:
      "Track request received, assigned branch, user action, response state, timestamps, pause/resume, escalation, and closure.",
    cta: "View Audit Standards",
  },
] as const;

export default function ConfirmationRequestsControlsSection() {
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
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Control when, how, and what your
                  <br />
                  <span style={{ color: ACCENT }}>pharmacy confirms.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Confirmation requests never create uncontrolled patient
                  messaging, staff overload, or public stock exposure.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Control cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? CONTROLS.map((c, i) => (
                <ControlCard key={c.title} {...c} index={i} />
              ))
            : CONTROLS.map((_, i) => <CardSkeleton key={i} />)}
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
      className="animate-[confirmControlsFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes confirmControlsFadeUp {
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
/*  Control card                                                       */
/* ----------------------------------------------------------------- */
function ControlCard({
  icon,
  title,
  description,
  cta,
  index,
}: {
  icon: "routing" | "moon" | "calendar" | "doc" | "pause" | "audit";
  title: string;
  description: string;
  cta: string;
  index: number;
}) {
  return (
    <div
      className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[confirmControlsFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{ opacity: 0, animationDelay: `${250 + index * 100}ms` }}
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
        <ControlIcon name={icon} />
      </div>

      <h3 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h3>

      {/* flex-1 pushes the button to a shared baseline across the row,
          regardless of how long each description is */}
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
        {description}
      </p>
      
    </div>
  );
}

function ControlIcon({
  name,
}: {
  name: "routing" | "moon" | "calendar" | "doc" | "pause" | "audit";
}) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
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
    case "moon":
      return (
        <svg {...common}>
          <path
            d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5.5" width="16" height="14" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 9.5h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "pause":
      return (
        <svg {...common}>
          <rect x="7" y="5" width="3.2" height="14" rx="1" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13.8" y="5" width="3.2" height="14" rx="1" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "audit":
      return (
        <svg {...common}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Disclaimer bar                                                     */
/* ----------------------------------------------------------------- */
function NoteBar() {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#0F1F4E] bg-[#EEF1F6] p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(15,31,78,0.25)] animate-[confirmControlsFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "900ms" }}
    >
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#5B6478]">
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 5.5v.01M8 7.5v3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed text-[#5B6478]">
        Confirmation workflows are built for speed under operational
        pressure — the MVP prefers approved response templates and
        structured states over free-text messaging.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                          */
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
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
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