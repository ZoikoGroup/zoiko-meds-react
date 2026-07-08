"use client"
import {
  Radar,
  Network,
  AlertTriangle,
  FileText,
  Rss,
  Building2,
  ClipboardList,
  LucideIcon,
} from "lucide-react";

interface Row {
  icon: LucideIcon;
  family: string;
  capability: string;
  boundary: string;
}

const rows: Row[] = [
  {
    icon: Radar,
    family: "Availability Signal API",
    capability:
      "Retrieve confidence-based medicine availability signals by approved geography, category, or medicine identifier.",
    boundary: "No unauthorized exact inventory exposure.",
  },
  {
    icon: Network,
    family: "Pharmacy Network API",
    capability:
      "Support verified pharmacy participation status, confirmation workflows, and confidence contribution signals.",
    boundary: "Pharmacy and partner permissions required.",
  },
  {
    icon: AlertTriangle,
    family: "Shortage Intelligence API",
    capability:
      "Deliver emerging access-risk indicators, confidence movement, and shortage signal summaries.",
    boundary: "Operational intelligence only; not regulatory determination.",
  },
  {
    icon: FileText,
    family: "Reports API",
    capability:
      "Generate or retrieve compliance-conscious reports, executive summaries, and scheduled outputs.",
    boundary: "Role-based access and audit logging required.",
  },
  {
    icon: Rss,
    family: "Alert & Webhook API",
    capability:
      "Notify approved systems when signal thresholds, report readiness, or confidence changes occur.",
    boundary: "Event subscriptions are scope controlled.",
  },
  {
    icon: Building2,
    family: "Organization & Location API",
    capability:
      "Manage approved enterprise entities, locations, service areas, and integration mappings.",
    boundary: "Admin permissions required.",
  },
  {
    icon: ClipboardList,
    family: "Audit & Usage API",
    capability:
      "Provide API usage, access logs, status, error summaries, and governance evidence.",
    boundary: "Security and admin roles only.",
  },
];

export default function ApiCapabilityMatrix() {
  return (
    <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          04 · API capability matrix
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Key API families and their{" "}
          <span className="text-[#0FAA87]">access boundaries.</span>
        </h2>

        <div className="mt-10 overflow-hidden rounded-xl border bg-white border-gray-200 shadow-sm">
          <table className="w-full mt-4 border-collapse bg-white text-left">
            <thead>
              <tr className="bg-[#0B1220]">
                <th className="w-[26%] px-6 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-gray-300">
                  API family
                </th>
                <th className="w-[42%] px-6 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-gray-300">
                  Capability
                </th>
                <th className="w-[32%] px-6 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-gray-300">
                  Access boundary
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ icon: Icon, family, capability, boundary }, i) => (
                <tr
                  key={family}
                  className={i !== rows.length - 1 ? "border-b border-gray-100" : ""}
                >
                  <td className="px-6 py-5 align-top">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#13A5941A] text-teal-600">
                        <Icon size={14} strokeWidth={2} />
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {family}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top text-sm leading-relaxed text-gray-500">
                    {capability}
                  </td>
                  <td className="px-6 py-5 align-top text-sm leading-relaxed text-[#C2552E]">
                    {boundary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
