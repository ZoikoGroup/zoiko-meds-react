"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bookmark,
  FileText,
  Bell,
  History,
  CreditCard,
  Building2,
  Code2,
  ArrowRight,
} from "lucide-react";

type RetentionItem = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const ITEMS: RetentionItem[] = [
  {
    icon: Bookmark,
    title: "Saved medicine watchlists",
    description: "Return to monitor priority medicines, categories, or regions.",
  },
  {
    icon: FileText,
    title: "Recurring reports",
    description: "Leadership, operations, and partners receive scheduled intelligence outputs.",
  },
  {
    icon: Bell,
    title: "Alert thresholds",
    description: "Get notified when confidence shifts, access pressure increases, or review is required.",
  },
  {
    icon: History,
    title: "Briefing history",
    description: "Past briefings, reports, and decisions remain accessible for continuity.",
  },
  {
    icon: CreditCard,
    title: "Role-based dashboards",
    description: "Different teams see the views most relevant to their responsibilities.",
  },
  {
    icon: Building2,
    title: "Partner signal growth",
    description: "Network participation strengthens platform value and confidence over time.",
  },
  {
    icon: Code2,
    title: "Integration stickiness",
    description: "Approved APIs, SSO, BI exports, and workflows embed ZoikoMeds into operations.",
  },
];

export default function FeaturesRetentionExpansionSection() {
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
        <RetentionFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            08 &nbsp;&middot;&nbsp; RETENTION &amp; EXPANSION
          </span>
        </RetentionFadeUp>

        <RetentionFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-2xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            ZoikoMeds becomes more <span className="text-[#0FAA87]">valuable over time.</span>
          </h2>
        </RetentionFadeUp>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <RetentionFadeUp key={item.title} show={isVisible} delay={140 + i * 60}>
                <div className="h-full rounded-2xl border border-[#E7EAF1] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0FAA87]/10">
                    <Icon className="h-4.5 w-4.5 text-[#0FAA87]" strokeWidth={2} />
                  </span>
                  <h3 className="mt-3.5 text-[0.9rem] font-bold text-[#0F1F4E]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.83rem] leading-relaxed text-[#6B7385]">
                    {item.description}
                  </p>
                </div>
              </RetentionFadeUp>
            );
          })}

          {/* CTA cell */}
          <RetentionFadeUp show={isVisible} delay={140 + ITEMS.length * 60}>
            <a
              href="#"
              className="group flex h-full flex-col rounded-2xl border border-[#0FAA87]/20 bg-[#E7F8F1] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F1F4E] transition-colors duration-300 group-hover:bg-[#0FAA87]">
                <ArrowRight className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
              </span>
              <h3 className="mt-3.5 text-[0.9rem] font-bold text-[#0F1F4E]">
                See it in a demo
              </h3>
              <p className="mt-2 text-[0.83rem] leading-relaxed text-[#4B5567]">
                Book a demo to explore recurring value.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0FAA87] transition-all duration-300 group-hover:gap-2.5">
                Book a Demo
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            </a>
          </RetentionFadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function RetentionFadeUp({
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