"use client";

import { useEffect, useRef, useState } from "react";
import {
  Shield,
  AlignLeft,
  Sparkles,
  Rows3,
  MonitorSmartphone,
  FileText,
  Accessibility,
  ArrowRight,
} from "lucide-react";

type ControlItem = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const CONTROLS: ControlItem[] = [
  {
    icon: Shield,
    title: "Role-based access",
    description:
      "Pharmacy workflows, wholesale tools, reports, exports, and admin settings are permission-controlled.",
  },
  {
    icon: AlignLeft,
    title: "Audit trails",
    description:
      "Capture relevant access, export, report generation, user action, and administrative changes.",
  },
  {
    icon: Sparkles,
    title: "Responsible AI boundaries",
    description:
      "AI-assisted features remain operational, explainable, reviewable, and non-clinical.",
  },
  {
    icon: Rows3,
    title: "Data minimization",
    description:
      "Display only the information necessary for the user role and approved use case.",
  },
  {
    icon: MonitorSmartphone,
    title: "Sensitive inventory protection",
    description:
      "Avoid public exposure of exact stock counts, controlled medicine signals, and restricted data.",
  },
  {
    icon: FileText,
    title: "Compliance notices",
    description:
      "Display appropriate disclaimers on reports, intelligence outputs, demo visuals, and user-facing features.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    description:
      "Feature pages, dashboards, forms, tabs, accordions, tables, and charts meet WCAG 2.2 AA.",
  },
];

export default function FeaturesEnterpriseControlsSection() {
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
    <section ref={sectionRef} className="bg-[#0B1733] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <ControlsFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            07 &nbsp;&middot;&nbsp; ENTERPRISE CONTROLS
          </span>
        </ControlsFadeUp>

        <ControlsFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-2xl text-[1.9rem] font-bold leading-[1.2] text-white sm:text-[2.3rem] lg:text-[2.5rem]">
            Built for enterprise trust and{" "}
            <span className="text-[#3FE3B8]">healthcare sensitivity.</span>
          </h2>
        </ControlsFadeUp>

        <ControlsFadeUp show={isVisible} delay={160}>
          <div className="mt-10 rounded-3xl bg-white p-4 shadow-xl sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CONTROLS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-[#F4F6FA] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
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
                );
              })}

              {/* CTA cell */}
              <a
                href="#"
                className="group flex flex-col rounded-2xl bg-[#E7F8F1] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F1F4E] transition-colors duration-300 group-hover:bg-[#0FAA87]">
                  <ArrowRight className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
                </span>
                <h3 className="mt-3.5 text-[0.9rem] font-bold text-[#0F1F4E]">
                  See the controls
                </h3>
                <p className="mt-2 text-[0.83rem] leading-relaxed text-[#4B5567]">
                  Explore governance in the Trust Center.
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0FAA87] transition-all duration-300 group-hover:gap-2.5">
                  Visit Trust Center
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </a>
            </div>
          </div>
        </ControlsFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function ControlsFadeUp({
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