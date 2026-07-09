"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AiInsightsHeroSection() {
  const router = useRouter();
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
    <section
      ref={sectionRef}
      className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column */}
        <div>
          <HeroFadeUp show={isVisible} delay={0}>
            <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
              ZOIKOMEDS AI INSIGHTS
            </span>
          </HeroFadeUp>

          <HeroFadeUp show={isVisible} delay={80}>
            <h1 className="mt-4 text-[2rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.5rem] lg:text-[2.75rem]">
              Predictive Medicine Availability Intelligence Built for{" "}
              <span className="text-[#0FAA87]">
                Responsible Healthcare Decisions
              </span>
            </h1>
          </HeroFadeUp>

          <HeroFadeUp show={isVisible} delay={160}>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-[#4B5567]">
              Identify potential access risks, shortage movement, demand
              anomalies, and confidence changes before they become
              operational blind spots. ZoikoMeds AI Insights helps authorized
              stakeholders interpret medicine availability signals through
              governed, explainable, and compliance-conscious intelligence.
            </p>
          </HeroFadeUp>

          <HeroFadeUp show={isVisible} delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
              onClick={()=>router.push("#ai-intelligence-briefing")}
                type="button"
                className="rounded-xl cursor-pointer bg-[#0FAA87] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0FAA87]/90 focus:outline-none"
              >
                Request an AI Intelligence Briefing
              </button>

              <button
                type="button"
                className="rounded-xl cursor-pointer border border-[#E7EAF1] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-200 hover:border-[#0FAA87]/30 hover:shadow-sm focus:outline-none"
              >
                See How AI Insights Work
              </button>
            </div>
          </HeroFadeUp>

          <HeroFadeUp show={isVisible} delay={300}>
            <div className="mt-6 flex items-start gap-2">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full border-2 border-[#0FAA87]" />
              <p className="text-xs leading-relaxed text-[#8A93A6]">
                Operational intelligence only. ZoikoMeds does not diagnose,
                prescribe, dispense, deliver, or provide medical advice.
              </p>
            </div>
          </HeroFadeUp>
        </div>

        {/* Right column — visual */}
        <HeroFadeUp show={isVisible} delay={160}>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/images/ai-insights-hero.webp"
              alt="ZoikoMeds AI Insights predictive intelligence dashboard"
              className="h-full w-full object-cover"
            />
          </div>
        </HeroFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function HeroFadeUp({
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