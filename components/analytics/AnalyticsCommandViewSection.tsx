"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AnalyticsCommandViewSection() {
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
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: Copy */}
        <div>
          <AnalyticsFadeUp show={isVisible} delay={0}>
            <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
              02 &nbsp;&middot;&nbsp; ANALYTICS COMMAND VIEW
            </span>
          </AnalyticsFadeUp>

          <AnalyticsFadeUp show={isVisible} delay={80}>
            <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
              See medicine availability patterns before they{" "}
              <span className="text-[#0FAA87]">become operational blind spots.</span>
            </h2>
          </AnalyticsFadeUp>

          <AnalyticsFadeUp show={isVisible} delay={160}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4B5567]">
              ZoikoMeds Analytics helps teams interpret availability confidence, regional
              demand, pharmacy network confirmation, and access risk in a single operating
              view — with confidence tiers instead of exact stock, and freshness on every
              module.
            </p>
          </AnalyticsFadeUp>

          <AnalyticsFadeUp show={isVisible} delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
              onClick={()=>router.push("/request-a-briefing")}
                type="button"
                className="rounded-lg bg-[#0FAA87] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#00A99D] hover:shadow-lg hover:shadow-[#0FAA87]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2"
              >
                Request a Briefing
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#D8DEE8] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 hover:-translate-y-1 hover:border-[#0FAA87] hover:text-[#0FAA87] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2"
              >
                Explore Modules
              </button>
            </div>
          </AnalyticsFadeUp>
        </div>

        {/* RIGHT: Image */}
        <AnalyticsFadeUp show={isVisible} delay={200}>
          <div className="relative mx-auto w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <Image
              src="/images/analytics-command-view.webp" 
              alt="ZoikoMeds analytics command view showing a tablet with a medicine availability map of India and network status icons"
              width={760}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
        </AnalyticsFadeUp>
      </div>
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