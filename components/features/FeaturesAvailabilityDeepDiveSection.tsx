"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ChecklistItem {
  label: string;
  description: string;
}

const checklistItems: ChecklistItem[] = [
  {
    label: "Confidence tiers",
    description: "communicate availability strength without exposing exact quantities.",
  },
  {
    label: "Regional access view",
    description: "show where confidence appears stronger, weaker, uncertain, or changing.",
  },
  {
    label: "Medicine watchlists",
    description: "monitor priority medicines, categories, or therapeutic areas.",
  },
  {
    label: "Signal history",
    description: "see how confidence changes over time and where review may be needed.",
  },
  {
    label: "Verification overlay",
    description: "platform-derived, pharmacy-confirmed, partner-fed, or awaiting review.",
  },
  {
    label: "Access risk indicators",
    description: "flag operational concerns without clinical determinations.",
  },
];

/**
 * FeaturesAvailabilityDeepDiveSection
 * Fifth section of the /features page.
 * - Scroll-triggered fade-up entrance (bottom -> top), staggered per element/checklist item
 * - Hover lift on the image panel
 */
export default function FeaturesAvailabilityDeepDiveSection() {
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
    <section
      id="availability"
      ref={sectionRef}
      className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: Copy + checklist */}
        <div>
          <FeaturesFadeUp show={isVisible} delay={0}>
            <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
              04 &nbsp;&middot;&nbsp; CAPABILITY DEEP DIVE
            </span>
          </FeaturesFadeUp>

          <FeaturesFadeUp show={isVisible} delay={80}>
            <h2 className="mt-4 text-[1.75rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.1rem]">
              Medicine Availability Intelligence Built for{" "}
              <span className="text-[#0FAA87]">Responsible Access Visibility</span>
            </h2>
          </FeaturesFadeUp>

          <FeaturesFadeUp show={isVisible} delay={160}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#4B5567]">
              ZoikoMeds helps authorized stakeholders understand medicine availability
              signals across medicines, regions, pharmacy participation, and demand patterns
              while avoiding unsafe public inventory claims.
            </p>
          </FeaturesFadeUp>

          <div className="mt-6 divide-y divide-[#E7EAF1]">
            {checklistItems.map((item, i) => (
              <FeaturesFadeUp key={item.label} show={isVisible} delay={220 + i * 80}>
                <div className="flex items-start gap-3 py-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 shrink-0 text-[#0FAA87]"
                  >
                    <path
                      d="M5 12.5l4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm leading-relaxed text-[#3D4657]">
                    <span className="font-bold text-[#0F1F4E]">{item.label}</span> —{" "}
                    {item.description}
                  </p>
                </div>
              </FeaturesFadeUp>
            ))}
          </div>
        </div>

        {/* RIGHT: Image */}
        <FeaturesFadeUp show={isVisible} delay={200}>
          <div className="relative mx-auto w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <Image
              src="/images/features-availability-deep-dive.webp"
              alt="World map with confidence signal markers surrounded by icons for search, verification, alerts, teams, and location, next to medicine packaging and confidence charts"
              width={760}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
        </FeaturesFadeUp>
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