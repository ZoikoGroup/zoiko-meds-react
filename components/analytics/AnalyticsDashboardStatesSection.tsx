"use client";

import { useEffect, useRef, useState } from "react";
import {
  CircleDashed,
  Check,
  TriangleAlert,
  Lock,
  Clock,
  ArrowUp,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

type DashboardState = {
  icon: React.ElementType;
  label: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  linkLabel: string;
  href: string;
};

const STATES: DashboardState[] = [
  {
    icon: CircleDashed,
    label: "EMPTY",
    badgeBg: "bg-[#EEF0F4]",
    badgeText: "text-[#5B6472]",
    description:
      "Select a medicine, geography, or category to begin building an analytics view.",
    linkLabel: "Start with common medicines",
    href: "/searchmed",
  },
  {
    icon: Check,
    label: "STANDARD",
    badgeBg: "bg-[#E1F5EE]",
    badgeText: "text-[#0FAA87]",
    description:
      "Analytics view loaded with confidence, trend, and network modules.",
    linkLabel: "Save view",
    href: "https://zoiko-meds-platform.vercel.app/login",
  },
  {
    icon: TriangleAlert,
    label: "WARNING",
    badgeBg: "bg-[#FCEFDD]",
    badgeText: "text-[#B5701A]",
    description:
      "Availability confidence has changed. Review source freshness and confirmation coverage.",
    linkLabel: "Request briefing",
    href: "/request-a-briefing",
  },
  {
    icon: Lock,
    label: "RESTRICTED",
    badgeBg: "bg-[#FCE9E9]",
    badgeText: "text-[#C23B3B]",
    description: "This analytics layer requires authorized access.",
    linkLabel: "Request access",
    href: "/api-access",
  },
  {
    icon: Clock,
    label: "STALE DATA",
    badgeBg: "bg-[#E5EEFB]",
    badgeText: "text-[#2F6FCB]",
    description:
      "Some signals may be outdated. Review freshness before acting.",
    linkLabel: "Refresh or contact support",
    href: "/contact",
  },
  {
    icon: ArrowUp,
    label: "EXPORT",
    badgeBg: "bg-[#E1F5EE]",
    badgeText: "text-[#0FAA87]",
    description:
      "Exports include filters, timestamps, permitted-use notes, and governance labels.",
    linkLabel: "Export report",
    href: "/reports",
  },
];

export default function AnalyticsDashboardStatesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

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
      { threshold: 0.1 },
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
        <StatesFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            07 &nbsp;&middot;&nbsp; DASHBOARD STATES
          </span>
        </StatesFadeUp>

        <StatesFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Every state, designed for{" "}
            <span className="text-[#0FAA87]">product quality.</span>
          </h2>
        </StatesFadeUp>

        <StatesFadeUp show={isVisible} delay={140}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6B7385]">
            States are shown with an icon and a label, never color alone.
          </p>
        </StatesFadeUp>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STATES.map((state, i) => {
            const Icon = state.icon;
            return (
              <StatesFadeUp
                key={state.label}
                show={isVisible}
                delay={200 + i * 60}
              >
                <div className="h-full rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-bold tracking-[0.08em] ${state.badgeBg} ${state.badgeText}`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                    {state.label}
                  </span>

                  <p className="mt-4 text-sm leading-relaxed text-[#3A4254]">
                    {state.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => router.push(state.href)}
                    className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#0FAA87] transition-all duration-300 hover:gap-2.5 focus:outline-none"
                  >
                    {state.linkLabel}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>
              </StatesFadeUp>
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
function StatesFadeUp({
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
