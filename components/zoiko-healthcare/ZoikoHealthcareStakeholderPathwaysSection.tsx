"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const PATHWAY_CARDS = [
  {
    title: "Patients & caregivers",
    description:
      "Check availability, save searches, create alerts, and understand availability confidence.",
    cta: "Search Medicines",
    icon: "search",
    link:"/searchmed"
  },
  {
    title: "Pharmacies",
    description:
      "Join the verified network, manage profiles, participate in availability signals, and access pharmacy support.",
    cta: "Join the Network",
    icon: "pharmacy",
    link:"/join-the-network"
  },
  {
    title: "Healthcare providers",
    description:
      "Support patient access conversations, referral guidance, care-team workflows, and signal education.",
    cta: "Explore Provider Workflows",
    icon: "home",
    link:"/provider-overview"
  },
  {
    title: "Enterprise & public sector",
    description:
      "Access intelligence, APIs, data products, and availability-risk visibility.",
    cta: "Request Enterprise Briefing",
    icon: "building",
    link:"/enterprise"
  },
  {
    title: "Media & press",
    description:
      "Request official company information, statements, media assets, and spokesperson routing.",
    cta: "Press Inquiries",
    icon: "message",
    link:"/press"
  },
  {
    title: "Careers",
    description:
      "Explore opportunities to build healthcare infrastructure with Zoiko Healthcare and the Zoiko ecosystem.",
    cta: "View Careers",
    icon: "people",
    link:"/careers"
  },
] as const;

export default function ZoikoHealthcareStakeholderPathwaysSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                04 · Stakeholder Pathways
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Choose the right{" "}
                <span style={{ color: ACCENT }}>Zoiko Healthcare pathway.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-48 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Pathway cards grid ---------------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? PATHWAY_CARDS.map((card, i) => (
                <Reveal key={card.title} index={2 + i}>
                  <PathwayCard {...card} />
                </Reveal>
              ))
            : Array.from({ length: 6 }).map((_, i) => <PathwayCardSkeleton key={i} />)}
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
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 70}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoSignalFadeUp {
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
/*  Pathway card                                                       */
/* ----------------------------------------------------------------- */
function PathwayCard({
  title,
  description,
  cta,
  icon,
  link
}: {
  title: string;
  description: string;
  cta: string;
  icon: string;
  link:string;
}) {
  const router = useRouter();
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(15,31,78,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D7DCE6] hover:shadow-[0_16px_36px_-12px_rgba(15,31,78,0.14)]">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#0F1F4E", color: ACCENT }}
      >
        <PathwayIcon name={icon} />
      </div>

      <h4 className="mt-4 text-[15.5px] font-bold text-[#0F1F4E]">
        {title}
      </h4>

      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#8891A4]">
        {description}
      </p>

      <button
      onClick={()=>router.push(link)}
        type="button"
        className="mt-5 w-full cursor-pointer rounded-xl border border-[#D7DCE6] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </button>
    </div>
  );
}

function PathwayCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-36 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Icons                                                              */
/* ----------------------------------------------------------------- */
function PathwayIcon({ name }: { name: string }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "pharmacy":
      return (
        <svg {...common}>
          <path d="M7 3h7l3 3v15a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
          <path d="M14 3v3h3M12 11v6M9 14h6" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-9" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H8l-4 4V5z" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19c.6-3 3-5 5.5-5s4.9 2 5.5 5" />
          <path d="M16 9a2.5 2.5 0 100-5M18.5 19c-.3-2.2-1.5-3.8-3.2-4.6" />
        </svg>
      );
    default:
      return null;
  }
}