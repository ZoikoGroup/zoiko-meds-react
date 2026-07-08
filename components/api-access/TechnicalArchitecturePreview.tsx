"use client"
import {
  Hospital,
  Key,
  Router,
  Lock,
  Sparkles,
  ClipboardList,
  FileText,
  LucideIcon,
  ArrowRight,
} from "lucide-react";

interface Stage {
  icon: LucideIcon;
  title: string;
  description: string;
}

const stages: Stage[] = [
  {
    icon: Hospital,
    title: "Approved systems",
    description: "Hospital, clinic, pharmacy, distributor, BI, partner apps.",
  },
  {
    icon: Key,
    title: "Identity & auth",
    description: "OAuth 2.0-style service accounts, SSO-ready, token scopes.",
  },
  {
    icon: Router,
    title: "API gateway",
    description: "Routing, rate limiting, validation, policy enforcement.",
  },
  {
    icon: Lock,
    title: "Scope enforcement",
    description: "Read, write/confirm, reporting, partner, restricted scopes.",
  },
  {
    icon: Sparkles,
    title: "Intelligence services",
    description: "Availability, pharmacy network, AI insights, reports, alerts.",
  },
  {
    icon: ClipboardList,
    title: "Audit & monitoring",
    description: "Logs, request IDs, metrics, alerting, usage dashboards.",
  },
  {
    icon: FileText,
    title: "Reports / webhooks",
    description: "Governed outputs to approved destinations.",
  },
];

export default function TechnicalArchitecturePreview() {
  return (
    <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          05 · Technical architecture preview
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Approved systems in,{" "}
          <span className="text-[#0FAA87]">governed intelligence out.</span>
        </h2>

        <div className="mt-10 flex flex-nowrap items-stretch gap-2 overflow-x-auto pb-2">
          {stages.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="flex shrink-0 items-center">
              <div className="flex w-[150px] flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#13A5941A] text-teal-600">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <h3 className="text-sm font-semibold leading-snug text-gray-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-400">
                  {description}
                </p>
              </div>
              {i !== stages.length - 1 && (
                <ArrowRight
                  className="mx-2 shrink-0 text-gray-300"
                  size={16}
                  strokeWidth={2}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
