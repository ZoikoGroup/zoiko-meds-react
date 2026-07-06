"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const WORKFLOWS = [
  {
    id: "healthcare-providers",
    label: "Healthcare Providers",
    workflowLabel: "WORKFLOW",
    description:
      "Connect medicine availability intelligence to care coordination, patient support, internal dashboards, and operations review.",
    cta: "Request Provider Integration Briefing",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    workflowLabel: "WORKFLOW",
    description:
      "Report confirmed availability, network participation, access signals, and support regional medicine visibility.",
    cta: "Request Pharmacy Integration Briefing",
  },
  {
    id: "wholesalers-distributors",
    label: "Wholesalers & Distributors",
    workflowLabel: "WORKFLOW",
    description:
      "Share approved market intelligence, demand signals, shortage awareness, and supply chain coordination.",
    cta: "Request Distributor Integration Briefing",
  },
  {
    id: "manufacturers",
    label: "Manufacturers",
    workflowLabel: "WORKFLOW",
    description:
      "Access regional access patterns, shortage signals, market trends, and stakeholder briefing requests.",
    cta: "Request Manufacturer Integration Briefing",
  },
  {
    id: "public-health-government",
    label: "Public Health & Government",
    workflowLabel: "WORKFLOW",
    description:
      "Review medicine access trends, shortage awareness, regional intelligence, and public-health reporting.",
    cta: "Request Government Integration Briefing",
  },
  {
    id: "enterprise-it",
    label: "Enterprise IT",
    workflowLabel: "WORKFLOW",
    description:
      "Deploy ZoikoMeds integrations, manage SSO and roles, govern data access, and support enterprise workflows.",
    cta: "Request Enterprise Integration Briefing",
  },
] as const;

export default function IntegrationsStakeholderWorkflowsSection() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(WORKFLOWS[0].id);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeWorkflow = WORKFLOWS.find((w) => w.id === activeTab) || WORKFLOWS[0];

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>06</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Stakeholder Workflows
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Integration workflows for every
            <br />
            <span style={{ color: ACCENT }}>stakeholder in medicine access.</span>
          </h2>
        </Reveal>

        {/* ── Tabs ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:mt-10 sm:gap-3">
            {WORKFLOWS.map((workflow) => (
              <button
                key={workflow.id}
                onClick={() => setActiveTab(workflow.id)}
                className="shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ease-out sm:px-5"
                style={{
                  backgroundColor: activeTab === workflow.id ? ACCENT : "transparent",
                  color: activeTab === workflow.id ? "white" : NAVY,
                  border: activeTab === workflow.id ? "none" : `1px solid ${NAVY}20`,
                }}
              >
                {workflow.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Content card ── */}
        <Reveal index={3} active={mounted}>
          <div
            className="mt-6 flex flex-col items-start justify-between gap-6 rounded-2xl border border-black/5 bg-white p-6 sm:mt-7 sm:flex-row sm:items-center sm:gap-8 sm:p-7"
            style={{ boxShadow: "0 1px 2px rgba(15,31,78,0.04)" }}
          >
            <div className="flex-1">
              <p
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                {activeWorkflow.workflowLabel}
              </p>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: NAVY }}
              >
                {activeWorkflow.description}
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-lg px-5 py-3 text-[13.5px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(19,165,148,0.3)]"
              style={{ backgroundColor: ACCENT }}
            >
              {activeWorkflow.cta}
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  index,
  active,
}: {
  children: React.ReactNode;
  index: number;
  active: boolean;
}) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `integrationsStakeholderWorkflowsFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes integrationsStakeholderWorkflowsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}