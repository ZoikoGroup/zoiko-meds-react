"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const CONTROLS = [
  {
    icon: "lock",
    title: "Sensitive issues require verification",
    description:
      "Requests involving settings, user access, branch controls, integrations, documents, or signal configuration may require authenticated access.",
  },
  {
    icon: "eyeOff",
    title: "Exact stock stays protected",
    description:
      "Support must not expose exact stock through public forms, email, unauthenticated support, or general analytics.",
  },
  {
    icon: "user",
    title: "Role-based support visibility",
    description:
      "Users only see tickets, pharmacy details, branches, documents, and configuration they're authorized to access.",
  },
  {
    icon: "doc",
    title: "Secure document handling",
    description:
      "If documentation is required, uploads happen through secure authenticated workflows — never ordinary public forms.",
  },
  {
    icon: "clipboard",
    title: "Audit & escalation",
    description:
      "Material actions affecting profile data, portal access, signal settings, branch controls, integrations, or security are logged.",
  },
  {
    icon: "ban",
    title: "No clinical support",
    description:
      "Pharmacy Support does not provide medical advice, prescription validation, dispensing approval, clinical guidance, or emergency support.",
  },
] as const;

export default function PharmacySupportSecuritySection() {
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
                  Controlled, permissioned, and safe for{" "}
                  <span style={{ color: ACCENT }}>operational issues.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  How ZoikoMeds keeps pharmacy support secure — and what
                  it never collects in a public channel.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Control cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {mounted
            ? CONTROLS.map((c, i) => (
                <ControlCard key={c.title} {...c} index={i} />
              ))
            : CONTROLS.map((_, i) => <CardSkeleton key={i} />)}
        </div>

        {/* ---------------- CTA ---------------- */}
        <div className="mt-6">
          {mounted ? (
            <Reveal index={9}>
              <a
                href="/security"
                className="inline-flex items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
              >
                View Support Security Standards
              </a>
            </Reveal>
          ) : (
            <div className="h-11 w-60 animate-pulse rounded-xl bg-[#E4E8F0]" />
          )}
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
      className="animate-[pharmacySupportSecurityFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacySupportSecurityFadeUp {
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
/*  Control card                                                        */
/* ----------------------------------------------------------------- */
function ControlCard({
  icon,
  title,
  description,
  index,
}: {
  icon: "lock" | "eyeOff" | "user" | "doc" | "clipboard" | "ban";
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[pharmacySupportSecurityFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
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
        <ControlIcon name={icon} />
      </div>

      <div>
        <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
      </div>
    </div>
  );
}

function ControlIcon({
  name,
}: {
  name: "lock" | "eyeOff" | "user" | "doc" | "clipboard" | "ban";
}) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-4.5 w-4.5" };

  switch (name) {
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
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
    case "doc":
      return (
        <svg {...common}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common}>
          <rect x="6" y="4.5" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9.5 4.5h5v2h-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 12.5l1.7 1.7L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "ban":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6.5 6.5l11 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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