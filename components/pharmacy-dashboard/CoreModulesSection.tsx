"use client"
import {
  Check,
  Circle,
  ChartColumn,
  Sparkles,
  UserRound,
  FileText,
  Bell,
  LifeBuoy,
  ArrowRight,
  LucideIcon
} from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
}

const cards: Card[] = [
  {
    icon: Check,
    title: "Availability signal management",
    description:
      "Review, confirm, update, or restrict medicine availability confidence signals through structured workflows.",
    action: "See signal workflow",
  },
  {
    icon: Circle,
    title: "Verification queue",
    description:
      "Prioritize pending pharmacy confirmations, expired signals, and high-impact access requests.",
    action: "View verification flow",
  },
  {
    icon: ChartColumn,
    title: "Patient access visibility",
    description:
      "Understand aggregated access demand patterns and inquiry volume by category, location, or region.",
    action: "Explore access signals",
  },
  {
    icon: Sparkles,
    title: "Pharmacy profile & locations",
    description:
      "Manage details, service areas, hours, participation settings, and location-specific access permissions.",
    action: "Configure profile",
  },
  {
    icon: UserRound,
    title: "Staff roles & permissions",
    description:
      "Assign owner, pharmacist, operations manager, staff, and viewer permissions.",
    action: "Review access controls",
  },
  {
    icon: FileText,
    title: "Network reporting",
    description:
      "Track participation, response activity, confidence contribution, and recurring reports.",
    action: "Request sample report",
  },
  {
    icon: Bell,
    title: "Notifications & alerts",
    description:
      "Prompts for expiring confirmations, high-demand medicines, access-risk signals, and reporting cycles.",
    action: "Preview alerts",
  },
  {
    icon: LifeBuoy,
    title: "Support & onboarding",
    description:
      "Setup guidance, partnership support, and help resources.",
    action: "Start onboarding",
  },
];

export default function CoreModulesSection() {
  return (
    <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">

        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          03 · Core dashboard modules
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Eight modules built for {" "}
          <span className="text-[#0FAA87]">pharmacy
            participation.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, description, action }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Icon size={18} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
              <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700">
                {action}
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
