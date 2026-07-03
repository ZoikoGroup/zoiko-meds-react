"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ChecklistItem {
  label: string;
  description: string;
}

const checklistItems: ChecklistItem[] = [
  {
    label: "Pharmacy profile management",
    description: "approved business profile, coverage, participation status, and contact pathways.",
  },
  {
    label: "Confirmation workflow",
    description: "confirm categories of availability confidence without unsafe detail exposure.",
  },
  {
    label: "Verification queue",
    description: "route pending, conflicting, and expired confirmations for review.",
  },
  {
    label: "Network performance signals",
    description: "participation, responsiveness, and confirmation coverage in aggregate.",
  },
  {
    label: "Access controls",
    description: "separate pharmacy staff, network admins, compliance reviewers, and support roles.",
  },
  {
    label: "Trust badges",
    description: "show verified participation, not medical endorsement.",
  },
];

/**
 * FeaturesPharmacyNetworkDeepDiveSection
 * Sixth section of the /features page.
 * - Scroll-triggered fade-up entrance (bottom -> top), staggered per element/checklist item
 * - Hover lift on the image panel
 * - Image on the left, copy + checklist on the right (mirrored from the availability deep dive)
 */
export default function FeaturesPharmacyNetworkDeepDiveSection() {
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
      id="pharmacy-network"
      ref={sectionRef}
      className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: Image */}
        <FeaturesFadeUp show={isVisible} delay={200}>
          <div className="relative mx-auto w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl lg:order-1">
            <Image
              src="/images/features-pharmacy-network-deep-dive.webp"
              alt="World map with a pharmacy storefront icon at the center surrounded by icons for delivery, confirmation, verification, teams, and performance, next to medicine packaging"
              width={760}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
        </FeaturesFadeUp>

        {/* RIGHT: Copy + checklist */}
        <div className="lg:order-2">
          <FeaturesFadeUp show={isVisible} delay={0}>
            <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
              PHARMACY NETWORK WORKFLOWS
            </span>
          </FeaturesFadeUp>

          <FeaturesFadeUp show={isVisible} delay={80}>
            <h2 className="mt-4 text-[1.75rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.1rem]">
              Pharmacy Network Workflows That Strengthen{" "}
              <span className="text-[#0FAA87]">Availability Confidence</span>
            </h2>
          </FeaturesFadeUp>

          <FeaturesFadeUp show={isVisible} delay={160}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#4B5567]">
              ZoikoMeds supports pharmacy participation through structured workflows that
              help strengthen medicine availability confidence while preserving appropriate
              data boundaries.
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