"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AnalyticsHeroSection() {
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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: Copy */}
        <div>
          <AnalyticsFadeUp show={isVisible} delay={0}>
            <span className="text-xs font-bold tracking-[0.18em] text-[#00A99D]">
              ZOIKOMEDS ANALYTICS
            </span>
          </AnalyticsFadeUp>

          <AnalyticsFadeUp show={isVisible} delay={80}>
            <h1 className="mt-4 text-[2rem] font-bold leading-[1.15] text-[#0F1F4E] sm:text-[2.5rem] lg:text-[2.75rem]">
              Medicine Availability Analytics for{" "}
              <span className="text-[#0FAA87]">Healthcare Access Visibility</span>
            </h1>
          </AnalyticsFadeUp>

          <AnalyticsFadeUp show={isVisible} delay={160}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4B5567]">
              Understand medicine availability trends, regional access gaps, pharmacy
              confirmation coverage, and shortage movement through analytics designed for
              responsible healthcare operations.
            </p>
          </AnalyticsFadeUp>

          <AnalyticsFadeUp show={isVisible} delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
              onClick={()=>router.push("/request-a-briefing")}
                type="button"
                className="rounded-lg cursor-pointer bg-[#0FAA87] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#00A99D] hover:shadow-lg hover:shadow-[#0FAA87]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2"
              >
                Request a Briefing
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#D8DEE8] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 hover:-translate-y-1 hover:border-[#0FAA87] hover:text-[#0FAA87] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2"
              >
                View Sample Dashboard
              </button>
            </div>
          </AnalyticsFadeUp>

          <AnalyticsFadeUp show={isVisible} delay={320}>
            <div className="mt-6 flex items-start gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 shrink-0 text-[#0FAA87]"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M8.5 12.3l2.4 2.4 4.6-5.4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs leading-relaxed text-[#7C8496]">
                Operational intelligence only. ZoikoMeds does not sell, prescribe, dispense,
                deliver, or recommend medicines.
              </p>
            </div>
          </AnalyticsFadeUp>
        </div>

        {/* RIGHT: Visual */}
        <AnalyticsFadeUp show={isVisible} delay={200}>
          <AnalyticsHeroVisual />
        </AnalyticsFadeUp>
      </div>

      <style jsx>{`
        @keyframes analyticsFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function AnalyticsFadeUp({
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
/* Right-side hero image                */
/* ---------------------------------- */
function AnalyticsHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <Image
        src="/images/analytics-hero.webp" 
        alt="ZoikoMeds analytics dashboard showing medicine availability across regions"
        width={720}
        height={600}
        priority
        className="h-auto w-full object-cover"
      />
    </div>
  );
}