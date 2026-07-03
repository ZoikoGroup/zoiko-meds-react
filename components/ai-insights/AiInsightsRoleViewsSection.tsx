"use client";

import { useEffect, useRef, useState } from "react";

type RoleRow = {
  role: string;
  defaultView: string;
  primaryAction: string;
};

const ROLE_ROWS: RoleRow[] = [
  {
    role: "Executive",
    defaultView:
      "Risk overview, top access concerns, trend movement, briefing-ready summary.",
    primaryAction: "Request executive briefing",
  },
  {
    role: "Operations",
    defaultView:
      "Region, medicine category, confidence movement, network coverage gaps.",
    primaryAction: "Create operational review",
  },
  {
    role: "Pharmacy network",
    defaultView:
      "Confirmation coverage, pharmacy participation, confidence contribution.",
    primaryAction: "Improve confirmation coverage",
  },
  {
    role: "Wholesaler / distributor",
    defaultView:
      "Aggregated demand and access signal patterns without unauthorized inventory exposure.",
    primaryAction: "Discuss partnership intelligence",
  },
  {
    role: "Compliance / risk",
    defaultView: "Audit logs, evidence trails, governance notes, review status.",
    primaryAction: "Export compliance report",
  },
  {
    role: "Public health",
    defaultView:
      "Regional access indicators, shortage signal movement, briefing summaries.",
    primaryAction: "Request public-health briefing",
  },
];

export default function AiInsightsRoleViewsSection() {
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
        <RoleFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            08 &nbsp;&middot;&nbsp; ROLE-BASED DASHBOARD VIEWS
          </span>
        </RoleFadeUp>

        <RoleFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            The right view for <span className="text-[#0FAA87]">each stakeholder.</span>
          </h2>
        </RoleFadeUp>

        <RoleFadeUp show={isVisible} delay={160}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#0B142E]">
                    <th className="px-6 py-4 text-xs font-bold tracking-[0.1em] text-white sm:px-7">
                      ROLE
                    </th>
                    <th className="px-6 py-4 text-xs font-bold tracking-[0.1em] text-white sm:px-7">
                      DEFAULT VIEW
                    </th>
                    <th className="px-6 py-4 text-xs font-bold tracking-[0.1em] text-white sm:px-7">
                      PRIMARY ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROLE_ROWS.map((row, i) => (
                    <tr
                      key={row.role}
                      className={i !== 0 ? "border-t border-[#E7EAF1]" : ""}
                    >
                      <td className="px-6 py-4 align-top text-sm font-bold text-[#0F1F4E] sm:px-7">
                        {row.role}
                      </td>
                      <td className="px-6 py-4 align-top text-sm leading-relaxed text-[#4B5567] sm:px-7">
                        {row.defaultView}
                      </td>
                      <td className="px-6 py-4 align-top text-sm font-semibold text-[#0FAA87] sm:px-7">
                        {row.primaryAction}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </RoleFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function RoleFadeUp({
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