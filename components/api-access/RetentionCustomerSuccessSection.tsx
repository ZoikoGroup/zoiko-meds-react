"use client"
import {
  BarChart3,
  FileBarChart,
  FileText,
  RefreshCw,
  CircleHelp,
  Maximize2,
  LucideIcon,
} from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cards: Card[] = [
  {
    icon: BarChart3,
    title: "Integration health dashboard",
    description:
      "Keep technical teams aware of API status, webhook health, error rates, usage, and latency.",
  },
  {
    icon: FileBarChart,
    title: "Usage & value reviews",
    description:
      "Show API adoption, report consumption, alert activity, and operational value.",
  },
  {
    icon: FileText,
    title: "Changelog & versioning",
    description:
      "Keep customers informed of endpoint changes, deprecations, and improvements.",
  },
  {
    icon: RefreshCw,
    title: "Quarterly integration review",
    description:
      "Align business outcomes, technical performance, security posture, and expansion opportunities.",
  },
  {
    icon: CircleHelp,
    title: "Partner support model",
    description:
      "Maintain accountable support for implementation, troubleshooting, and optimization.",
  },
  {
    icon: Maximize2,
    title: "Expansion pathways",
    description:
      "Add APIs, regions, reports, endpoints, or stakeholder teams over time.",
  },
];

export default function RetentionCustomerSuccessSection() {
  return (
    <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          09 · Retention &amp; customer success
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          API access as an ongoing{" "}
          <span className="text-[#0FAA87]">enterprise relationship.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#13A5941A] text-teal-600">
                <Icon size={18} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
