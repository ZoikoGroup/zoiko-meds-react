import {
  ChartColumn,
  Sun,
  AlignJustify,
  BarChart3,
  ArrowUp,
  LucideIcon,
} from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cards: Card[] = [
  {
    icon: ChartColumn,
    title: "Network admin dashboard",
    description:
      "Central view with location list, participation status, staff roles, verification activity, and alerts.",
  },
  {
    icon: Sun,
    title: "Location-level permissions",
    description:
      "Independent users, service areas, hours, signal settings, and review responsibilities per location.",
  },
  {
    icon: AlignJustify,
    title: "Bulk configuration",
    description:
      "Apply consistent settings across approved locations while preserving permitted local overrides.",
  },
  {
    icon: BarChart3,
    title: "Performance comparison",
    description:
      "Response rates, confirmation timeliness, signal freshness, and participation health across locations.",
  },
  {
    icon: ArrowUp,
    title: "Escalation rules",
    description:
      "Route overdue or sensitive items to pharmacists-in-charge, operations managers, or ZoikoMeds support.",
  },
];

export default function EnterpriseNetworksSection() {
  return (
    <section className="bg-[#0C1B30] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 uppercase text-sm font-semibold tracking-[2px] text-[#34D6C4]">
          06 · Multi-location & network controls
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] text-white font-semibold leading-snug text-gray-900">
          Built for pharmacy groups and{" "}
          <span className="text-[#0FAA87]">enterprise
            networks.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                <Icon size={18} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#E7EEF69E] max-w-45">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
