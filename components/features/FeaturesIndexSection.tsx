"use client";

import { useEffect, useRef, useState } from "react";

interface IndexCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
}

const indexCards: IndexCard[] = [
  {
    icon: <CheckIcon />,
    title: "Medicine Availability Intelligence",
    description:
      "Understand access signals, availability confidence, and regional visibility.",
    linkLabel: "Jump to Availability",
    href: "#availability",
  },
  {
    icon: <StoreIcon />,
    title: "Pharmacy Network Workflows",
    description:
      "Support pharmacy participation, verification, and confidence-building.",
    linkLabel: "Jump to Pharmacy Network",
    href: "#pharmacy-network",
  },
  {
    icon: <WarningTriangleIcon />,
    title: "Shortage Signal Awareness",
    description: "Identify emerging shortage movement and access-risk patterns.",
    linkLabel: "Jump to Shortage Signals",
    href: "#shortage-signals",
  },
  {
    icon: <BarChartIcon />,
    title: "Analytics and Dashboards",
    description: "Turn signals into stakeholder-ready insights and operating views.",
    linkLabel: "Jump to Analytics",
    href: "#analytics",
  },
  {
    icon: <ReportIcon />,
    title: "Reports and Briefings",
    description: "Generate compliance-conscious reports for leadership and partners.",
    linkLabel: "Jump to Reports",
    href: "#reports",
  },
  {
    icon: <IntegrationsIcon />,
    title: "Secure Integrations",
    description:
      "Connect approved systems, APIs, identity, reporting, and enterprise tools.",
    linkLabel: "Jump to Integrations",
    href: "#integrations",
  },
];

/**
 * FeaturesIndexSection
 * Third section of the /features page.
 * - Scroll-triggered fade-up entrance (bottom -> top), staggered per element/card
 * - Hover lift on each card, arrow nudge on the jump links
 * - Skeleton placeholders shown until the section enters view
 */
export default function FeaturesIndexSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <FeaturesFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            02 &nbsp;&middot;&nbsp; FEATURE INDEX
          </span>
        </FeaturesFadeUp>

        <FeaturesFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-2xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem]">
            Jump to the capability that{" "}
            <span className="text-[#0FAA87]">matters to you.</span>
          </h2>
        </FeaturesFadeUp>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {indexCards.map((card, i) =>
            isVisible ? (
              <FeaturesFadeUp key={card.title} show={isVisible} delay={160 + i * 80}>
                <div className="flex h-full flex-col rounded-xl border border-[#E7EAF1] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0FAA87]/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0FAA87]/10 text-[#0FAA87]">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-[#0F1F4E]">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                    {card.description}
                  </p>
                  <a
                    href={card.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0FAA87] transition-all duration-300 hover:gap-2.5 hover:text-[#00A99D]"
                  >
                    {card.linkLabel}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </FeaturesFadeUp>
            ) : (
              <FeaturesCardSkeleton key={card.title} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function FeaturesFadeUp({
  show,
  delay = 0,
  children,
}: {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- */
/* Skeleton loading state              */
/* ---------------------------------- */
function FeaturesCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-[#E7EAF1] bg-white p-6 shadow-sm">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-[#F4F6FA]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#F4F6FA]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#F4F6FA]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-[#F4F6FA]" />
      </div>
      <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-[#F4F6FA]" />
    </div>
  );
}

/* ---------------------------------- */
/* Icons                               */
/* ---------------------------------- */
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 9l1-5h14l1 5M4 9v10h16V9M4 9a2.5 2.5 0 005 0 2.5 2.5 0 005 0 2.5 2.5 0 005 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningTriangleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4L2 20h20L12 4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 10v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 19V10M11 19V5M17 19v-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3h7l4 4v14H7V3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.5 13h5M9.5 16.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IntegrationsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 6L3 12l6 6M15 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}