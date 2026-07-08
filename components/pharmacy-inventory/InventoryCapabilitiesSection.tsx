import {
  Gauge,
  Bell,
  Bookmark,
  MapPin,
  UserRound,
  ChartColumn,
  FileText,
  CodeXml,
  LucideIcon,
  ArrowRight
} from "lucide-react";

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
  linkLabel: string;
}

const capabilities: Capability[] = [
  {
    icon: Gauge,
    title: "Availability signal updates",
    description:
      "Update structured availability status without publishing sensitive counts.",
    linkLabel: "Update availability signal",
  },
  {
    icon: Bell,
    title: "Stock-risk alerts",
    description:
      "Flag medicines with demand pressure, shortage sensitivity, or stale signals.",
    linkLabel: "Review alert",
  },
  {
    icon: Bookmark,
    title: "Medicine watchlists",
    description:
      "Track priority medicines, chronic-care medicines, or shortage-sensitive categories.",
    linkLabel: "Create watchlist",
  },
  {
    icon: MapPin,
    title: "Location-level controls",
    description:
      "Support single-location and multi-location inventory workflows.",
    linkLabel: "Manage locations",
  },
  {
    icon: UserRound,
    title: "Role-based permissions",
    description:
      "Control who can update, approve, export, or view restricted inventory data.",
    linkLabel: "Manage permissions",
  },
  {
    icon: ChartColumn,
    title: "Demand signal insights",
    description:
      "Show local and regional search interest to support planning and patient routing.",
    linkLabel: "View demand insights",
  },
  {
    icon: FileText,
    title: "Exportable reports",
    description:
      "Create operational, network, and compliance-conscious visibility reports.",
    linkLabel: "Export report",
  },
  {
    icon: CodeXml,
    title: "Integration options",
    description:
      "Support API, CSV, manual updates, and approved pharmacy system connections.",
    linkLabel: "Discuss integration",
  },
];

export default function InventoryCapabilitiesSection() {
  return (
    <section className="bg-slate-50 px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
          03 · Inventory capabilities
        </p>

        <h1 className="text-3xl max-w-160 font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
          Eight capabilities for responsible{" "}
          <span className="text-[#0FAA87]">availability management.</span>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, description, linkLabel }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-9 w-9 items-center p-2 justify-center rounded-[9px] bg-[#13A5941A] text-teal-600">
                <Icon size={18} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
              <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700">
                {linkLabel}
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
