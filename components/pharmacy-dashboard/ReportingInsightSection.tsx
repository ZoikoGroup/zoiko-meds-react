import {
  FileText,
  Check,
  ChartColumn,
  MapPin,
  Clipboard,
  LucideIcon,
} from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cards: Card[] = [
  {
    icon: FileText,
    title: "Pharmacy participation report",
    description:
      "Active locations, staff participation, confirmation volume, and dashboard usage.",
  },
  {
    icon: Check,
    title: "Availability signal report",
    description:
      "Confidence trends, reviewed medicines, stale signals, and access-risk patterns.",
  },
  {
    icon: ChartColumn,
    title: "Patient access inquiry report",
    description:
      "Aggregated access demand and inquiry trends without patient-level disclosure.",
  },
  {
    icon: MapPin,
    title: "Network health report",
    description:
      "Locations, response timeliness, signal freshness, and participation quality.",
  },
  {
    icon: Clipboard,
    title: "Executive pharmacy briefing",
    description:
      "Operational activity converted into leadership-ready insights for pharmacy groups.",
  },
];

export default function ReportingInsightSection() {
  return (
    <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 uppercase text-sm font-semibold tracking-[2px] text-[#13A594]">
          08 · Reporting & analytics
        </p>
        <h2 className="max-w-xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Recurring insight and {" "}
          <span className="text-[#0FAA87]">performance
            visibility.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Icon size={18} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
