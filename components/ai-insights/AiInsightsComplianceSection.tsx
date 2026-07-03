"use client";

import { useEffect, useRef, useState } from "react";
import { Crop, User, Lock, AlignLeft, ShieldCheck, Share2 } from "lucide-react";

type ComplianceItem = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    icon: Crop,
    title: "Bounded use",
    description:
      "AI outputs stay within medicine access visibility, shortage awareness, and operational decision support.",
  },
  {
    icon: User,
    title: "Human-in-the-loop",
    description:
      "High-risk or sensitive insights require authorized review before escalation.",
  },
  {
    icon: Lock,
    title: "Role-based access",
    description:
      "Executives, pharmacy networks, compliance, operations, and partners see only authorized views.",
  },
  {
    icon: AlignLeft,
    title: "Auditability",
    description:
      "Insights store timestamp, source category, confidence level, reviewer, action taken, and report export.",
  },
  {
    icon: ShieldCheck,
    title: "Sensitive data controls",
    description:
      "No unauthorized exact inventory exposure; no patient-specific advice; no unsafe medication substitution.",
  },
  {
    icon: Share2,
    title: "Model governance",
    description:
      "Model boundary statement, review history, limitations, and escalation route are shown.",
  },
];

export default function AiInsightsComplianceSection() {
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
      className="bg-[#0B142E] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <ComplianceFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#1BC49B]">
            07 &nbsp;&middot;&nbsp; RESPONSIBLE AI &amp; COMPLIANCE
          </span>
        </ComplianceFadeUp>

        <ComplianceFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-white sm:text-[2.3rem] lg:text-[2.5rem]">
            Bounded, <span className="text-[#1BC49B]">reviewable, auditable.</span>
          </h2>
        </ComplianceFadeUp>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COMPLIANCE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <ComplianceFadeUp key={item.title} show={isVisible} delay={140 + i * 60}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#101d3e] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1BC49B]/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1BC49B]/10">
                    <Icon className="h-5 w-5 text-[#1BC49B]" strokeWidth={2} />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#8A93A6]">
                    {item.description}
                  </p>
                </div>
              </ComplianceFadeUp>
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
function ComplianceFadeUp({
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