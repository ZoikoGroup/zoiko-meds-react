"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bookmark,
  Calendar,
  Bell,
  CircleCheck,
  TriangleAlert,
  FileText,
} from "lucide-react";

type ValueItem = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const VALUE_ITEMS: ValueItem[] = [
  {
    icon: Bookmark,
    title: "Saved AI views",
    description: "Monitor priority medicines, categories, and regions over time.",
  },
  {
    icon: Calendar,
    title: "Recurring briefings",
    description: "Leadership receives scheduled intelligence reviews.",
  },
  {
    icon: Bell,
    title: "Signal watchlists",
    description:
      "Track specific confidence changes, regions, or medicine categories.",
  },
  {
    icon: CircleCheck,
    title: "Reviewer workflow",
    description:
      "Compliance and operations can review, annotate, approve, and export insight records.",
  },
  {
    icon: TriangleAlert,
    title: "Alert thresholds",
    description:
      "Authorized teams receive alerts when risk or confidence movement crosses defined levels.",
  },
  {
    icon: FileText,
    title: "Report integration",
    description:
      "AI insights convert directly into compliance-ready and executive-ready reports.",
  },
];

export default function AiInsightsRecurringValueSection() {
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
        <ValueFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            11 &nbsp;&middot;&nbsp; RECURRING INTELLIGENCE VALUE
          </span>
        </ValueFadeUp>

        <ValueFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Insight that compounds through{" "}
            <span className="text-[#0FAA87]">governed workflows.</span>
          </h2>
        </ValueFadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <ValueFadeUp key={item.title} show={isVisible} delay={140 + i * 60}>
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
              </ValueFadeUp>
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
function ValueFadeUp({
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