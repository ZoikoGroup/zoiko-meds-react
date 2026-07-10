"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * FeaturesHeroSection
 * First section of the /features page.
 * - Scroll-triggered fade-up entrance (bottom -> top), staggered per element
 * - Hover lift on CTAs, the compare-capabilities link, and the image panel
 */
export default function FeaturesHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

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
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: Copy */}
        <div>
          <FeaturesFadeUp show={isVisible} delay={0}>
            <span className="text-xs font-bold tracking-[0.18em] text-[#00A99D]">
              ZOIKOMEDS PLATFORM FEATURES
            </span>
          </FeaturesFadeUp>

          <FeaturesFadeUp show={isVisible} delay={80}>
            <h1 className="mt-4 text-[2rem] font-bold leading-[1.15] text-[#0F1F4E] sm:text-[2.5rem] lg:text-[2.75rem]">
              Core Capabilities for Medicine{" "}
              <span className="text-[#0FAA87]">Availability Intelligence</span>
            </h1>
          </FeaturesFadeUp>

          <FeaturesFadeUp show={isVisible} delay={160}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4B5567]">
              Explore the capabilities that help healthcare stakeholders understand medicine
              availability signals, pharmacy network activity, shortage risk, regional access
              patterns, secure reporting, and enterprise workflows.
            </p>
          </FeaturesFadeUp>

          <FeaturesFadeUp show={isVisible} delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
              onClick={()=>router.push('#book-a-demo')}
                type="button"
                className="rounded-lg cursor-pointer bg-[#0FAA87] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#00A99D] hover:shadow-lg hover:shadow-[#0FAA87]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2"
              >
                Book a Demo
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#D8DEE8] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 hover:-translate-y-1 hover:border-[#0FAA87] hover:text-[#0FAA87] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2"
              >
                Talk to Sales
              </button>
            </div>
          </FeaturesFadeUp>

          <FeaturesFadeUp show={isVisible} delay={300}>
            <a
              href="#compare"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0FAA87] transition-all duration-300 hover:gap-2.5 hover:text-[#00A99D]"
            >
              Compare capabilities
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </FeaturesFadeUp>

          <FeaturesFadeUp show={isVisible} delay={360}>
            <div className="mt-6 flex items-start gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 shrink-0 text-[#0FAA87]"
              >
                <path
                  d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs leading-relaxed text-[#7C8496]">
                ZoikoMeds does not sell, prescribe, dispense, or deliver medicine. Features
                support responsible medicine availability intelligence and healthcare access
                visibility.
              </p>
            </div>
          </FeaturesFadeUp>
        </div>

        {/* RIGHT: Image */}
        <FeaturesFadeUp show={isVisible} delay={200}>
          <div className="relative mx-auto w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <Image
              src="/images/features-hero.webp" 
              alt="ZoikoMeds platform capability map showing analytics, availability tracking, alerts, compliance, reporting, and forecasting around a global network"
              width={760}
              height={600}
              priority
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