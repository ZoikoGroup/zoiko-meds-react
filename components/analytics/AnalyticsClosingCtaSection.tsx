"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AnalyticsClosingCtaSection() {
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
      <div className="mx-auto max-w-6xl">
        <CtaFadeUp show={isVisible} delay={0}>
          <div className="rounded-3xl border border-white/10 bg-[#0B142E] px-6 py-16 text-center sm:px-12 lg:px-20">
            <h2 className="mx-auto max-w-3xl text-[1.6rem] font-bold leading-[1.3] text-white sm:text-[2rem] lg:text-[2.25rem]">
              Turn medicine availability signals into{" "}
              <span className="text-[#1BC49B]">operating visibility.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#8A93A6] sm:text-[0.95rem]">
              Request a ZoikoMeds Analytics briefing to see availability
              confidence, regional access gaps, demand signals, and shortage
              movement for your organization.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
              onClick={()=>router.push("/request-a-briefing")}
                type="button"
                className="w-full rounded-xl bg-[#1BC49B] px-6 py-3 text-sm font-semibold text-[#0B142E] transition-all duration-200 hover:bg-[#1BC49B]/90 focus:outline-none sm:w-auto"
              >
                Request a Briefing
              </button>

              <button
              onClick={()=>router.push("/trust-center")}
                type="button"
                className="w-full cursor-pointer rounded-xl border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5 focus:outline-none sm:w-auto"
              >
                Visit Trust Center
              </button>
            </div>
          </div>
        </CtaFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function CtaFadeUp({
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