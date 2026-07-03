"use client";

import { useEffect, useRef, useState } from "react";

export default function FeaturesFinalCtaSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
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
    <section className="bg-[#0B1633] px-6 py-20 md:px-12 lg:px-20">
      <div
        ref={sectionRef}
        className="mx-auto max-w-5xl rounded-3xl border border-white/[0.06] bg-[#101F45] px-6 py-14 text-center sm:px-12 sm:py-16"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <h2 className="mx-auto max-w-3xl text-[1.5rem] font-bold leading-[1.3] text-white sm:text-[1.9rem] lg:text-[2.1rem]">
          See how ZoikoMeds capabilities support your{" "}
          <span className="text-[#1FCB9F]">medicine availability strategy.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[0.9rem] leading-relaxed text-[#AEB6CC]">
          Book a demo or talk to sales to explore availability intelligence, pharmacy workflows,
          shortage awareness, analytics, reporting, and secure integrations for your
          organization.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg bg-[#0FAA87] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0C9575]"
          >
            Book a Demo
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/40"
          >
            Talk to Sales
          </a>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-[0.75rem] leading-relaxed text-[#7C84A0]">
          ZoikoMeds does not sell, prescribe, dispense, deliver, or provide medical advice, and
          does not expose exact inventory quantities to unauthorized users.
        </p>
      </div>
    </section>
  );
}