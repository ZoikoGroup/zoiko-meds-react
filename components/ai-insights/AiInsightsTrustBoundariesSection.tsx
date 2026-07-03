"use client";

import { useEffect, useRef, useState } from "react";
import { Ban, Store, ShieldCheck, Rows3 } from "lucide-react";

type Boundary = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const BOUNDARIES: Boundary[] = [
  {
    icon: Ban,
    title: "Not clinical AI",
    description:
      "AI Insights do not provide diagnosis, treatment, prescribing, substitution, or patient-specific medical advice.",
  },
  {
    icon: Store,
    title: "Not a pharmacy",
    description:
      "ZoikoMeds does not sell, prescribe, dispense, or deliver medicine.",
  },
  {
    icon: ShieldCheck,
    title: "Governed intelligence",
    description:
      "Signals are designed for authorized review, explainability, auditability, and controlled access.",
  },
  {
    icon: Rows3,
    title: "No quantity exposure",
    description:
      "Insights are structured around confidence, pattern, and risk indicators rather than unauthorized exact inventory quantities.",
  },
];

export default function AiInsightsTrustBoundariesSection() {
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
        <BoundaryFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            01 &nbsp;&middot;&nbsp; TRUST &amp; BOUNDARIES
          </span>
        </BoundaryFadeUp>

        <BoundaryFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-2xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Governed AI, with the{" "}
            <span className="text-[#0FAA87]">boundaries stated first.</span>
          </h2>
        </BoundaryFadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BOUNDARIES.map((item, i) => {
            const Icon = item.icon;
            return (
              <BoundaryFadeUp key={item.title} show={isVisible} delay={140 + i * 60}>
                <div className="h-full rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0FAA87]/30 hover:shadow-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0FAA87]/10">
                    <Icon className="h-5 w-5 text-[#0FAA87]" strokeWidth={2} />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-[#0F1F4E]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#4B5567]">
                    {item.description}
                  </p>
                </div>
              </BoundaryFadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function BoundaryFadeUp({
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