"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const ITEMS = [
  {
    icon: "monitor",
    title: "No PHI in public forms",
    description:
      "Public support forms must not collect patient identifiers, diagnosis, clinical notes, prescription images, insurance IDs, date of birth, or medical records.",
  },
  {
    icon: "lock",
    title: "Sensitive issues require verification",
    description:
      "Requests involving provider access, organization permissions, SSO, workflow settings, integration, privacy, or security may require authenticated access.",
  },
  {
    icon: "personCheck",
    title: "Role-based ticket visibility",
    description:
      "Provider users only see support tickets, organization information, workflows, or access details they are authorized to view.",
  },
  {
    icon: "ban",
    title: "No clinical support",
    description:
      "Provider Support does not provide medical advice, prescribing guidance, substitution recommendations, diagnosis support, treatment decisions, or emergency care.",
  },
  {
    icon: "phone",
    title: "Pharmacy confirmation still applies",
    description:
      "Support cannot confirm stock, dispensing eligibility, prescription validity, or fulfillment. Confirm directly with the pharmacy where appropriate.",
  },
  {
    icon: "doc",
    title: "Audit & escalation",
    description:
      "Material support actions affecting provider access, organization routing, workflow settings, privacy, security, or integration routing are logged.",
  },
] as const;

export default function ProviderSupportBoundariesSection() {
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
                  What support can and cannot{" "}
                  <span style={{ color: ACCENT }}>access or</span>
                  <br />
                  <span style={{ color: ACCENT }}>answer.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  How ZoikoMeds keeps provider support secure — and what
                  it never collects or decides.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Boundary items ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mounted
            ? ITEMS.map((item, i) => (
                <BoundaryItem key={item.title} {...item} index={i} />
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
      className="animate-[providerBoundaryFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes providerBoundaryFadeUp {
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
/*  Boundary item                                                       */
/* ----------------------------------------------------------------- */
function BoundaryItem({
  icon,
  title,
  description,
  index,
}: {
  icon: BoundaryIconName;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 ease-out animate-[providerBoundaryFadeUp_0.55s_ease-out_forwards] hover:-translate-y-0.5"
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
        <BoundaryIcon name={icon} />
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

type BoundaryIconName =
  | "monitor"
  | "lock"
  | "personCheck"
  | "ban"
  | "phone"
  | "doc";

function BoundaryIcon({ name }: { name: BoundaryIconName }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-4.5 w-4.5" };

  switch (name) {
    case "monitor":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="11" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 20h7M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "personCheck":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 19c.6-2.6 2.6-4.3 5-4.3M14 13.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "ban":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6.5 6.5l11 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
/*  Skeletons                                                            */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-white" />
      <div className="h-8 w-40 animate-pulse rounded-lg bg-white" />
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