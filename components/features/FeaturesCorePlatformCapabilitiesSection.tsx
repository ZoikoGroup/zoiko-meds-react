"use client";

import { useEffect, useRef, useState } from "react";

interface CapabilityCard {
  priority: string;
  anchor?: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  linkLabel: string;
  href: string;
}

const capabilityCards: CapabilityCard[] = [
  {
    priority: "Priority 01",
    anchor: true,
    icon: <CheckIcon />,
    title: "Medicine Availability Intelligence",
    description:
      "Track structured signals indicating where medicine access may be available, uncertain, limited, or changing.",
    tags: ["Medicine", "Region", "Confidence tier", "Signal source", "Last updated"],
    linkLabel: "Explore Availability Intelligence",
    href: "#availability",
  },
  {
    priority: "Priority 02",
    icon: <StoreIcon />,
    title: "Pharmacy Network Workflows",
    description:
      "Enable authorized pharmacy participation and confirmation workflows that strengthen availability confidence.",
    tags: ["Pharmacy status", "Verification flow", "Confirmation category", "Role access"],
    linkLabel: "View Pharmacy Network",
    href: "#pharmacy-network",
  },
  {
    priority: "Priority 03",
    icon: <WarningTriangleIcon />,
    title: "Shortage Signal Awareness",
    description:
      "Detect potential shortage movement, access pressure, and confidence deterioration through structured intelligence.",
    tags: ["Risk level", "Signal trend", "Region", "Confidence movement"],
    linkLabel: "View Shortage Signals",
    href: "#shortage-signals",
  },
  {
    priority: "Priority 04",
    icon: <BarChartIcon />,
    title: "Analytics and Dashboards",
    description:
      "Provide role-based dashboards for regional access, demand patterns, pharmacy participation, and reporting.",
    tags: ["Dashboard views", "Filters", "Saved views", "Alerts"],
    linkLabel: "View Analytics",
    href: "#analytics",
  },
  {
    priority: "Priority 05",
    icon: <ReportIcon />,
    title: "Reports and Briefings",
    description:
      "Convert platform intelligence into compliance-conscious reports for leadership, operations, partners, and public-health stakeholders.",
    tags: ["Report type", "Frequency", "Recipient role", "Evidence notes"],
    linkLabel: "View Reports",
    href: "#reports",
  },
  {
    priority: "Priority 06",
    icon: <IntegrationsIcon />,
    title: "Secure Integrations",
    description:
      "Support approved integrations with enterprise, pharmacy, analytics, reporting, identity, and partner systems.",
    tags: ["API", "SSO", "Data feed", "Audit log", "Status"],
    linkLabel: "Talk to Sales",
    href: "#contact",
  },
];

/**
 * FeaturesCorePlatformCapabilitiesSection
 * Fourth section of the /features page.
 * - Scroll-triggered fade-up entrance (bottom -> top), staggered per element/card
 * - Hover lift on each card
 * - Skeleton placeholders shown until the section enters view
 * - First card (anchor capability) gets a teal border to stand out
 */
export default function FeaturesCorePlatformCapabilitiesSection() {
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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <FeaturesFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            03 &nbsp;&middot;&nbsp; CORE PLATFORM CAPABILITIES
          </span>
        </FeaturesFadeUp>

        <FeaturesFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-2xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem]">
            Six capabilities built for{" "}
            <span className="text-[#0FAA87]">medicine access intelligence.</span>
          </h2>
        </FeaturesFadeUp>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {capabilityCards.map((card, i) =>
            isVisible ? (
              <FeaturesFadeUp key={card.title} show={isVisible} delay={160 + i * 90}>
                <div
                  className={`flex h-full flex-col rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0FAA87]/10 ${
                    card.anchor ? "border-[#0FAA87]/40" : "border-[#E7EAF1]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold tracking-wide text-[#0FAA87]">
                      {card.priority}
                    </span>
                    {card.anchor && (
                      <span className="rounded-full border border-[#0FAA87]/30 bg-[#0FAA87]/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#0FAA87]">
                        ANCHOR CAPABILITY
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0FAA87]/10 text-[#0FAA87]">
                    {card.icon}
                  </div>

                  <h3 className="mt-4 text-base font-bold text-[#0F1F4E]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                    {card.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-[#E7EAF1] bg-[#F4F6FA] px-2.5 py-1 text-[11px] font-medium text-[#6B7280]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={card.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0FAA87] transition-all duration-300 hover:gap-2.5 hover:text-[#00A99D]"
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
      <div className="h-3 w-16 animate-pulse rounded bg-[#F4F6FA]" />
      <div className="mt-3 h-10 w-10 animate-pulse rounded-lg bg-[#F4F6FA]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#F4F6FA]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#F4F6FA]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-[#F4F6FA]" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-5 w-16 animate-pulse rounded bg-[#F4F6FA]" />
        <div className="h-5 w-20 animate-pulse rounded bg-[#F4F6FA]" />
        <div className="h-5 w-14 animate-pulse rounded bg-[#F4F6FA]" />
      </div>
      <div className="mt-5 h-3 w-1/3 animate-pulse rounded bg-[#F4F6FA]" />
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