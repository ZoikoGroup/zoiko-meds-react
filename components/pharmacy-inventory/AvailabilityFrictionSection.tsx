import { TriangleAlert, LucideIcon } from "lucide-react";

interface Row {
  icon: LucideIcon;
  friction: string;
  impact: string;
  solution: string;
}

const rows: Row[] = [
  {
    icon: TriangleAlert,
    friction: "High availability call volume",
    impact: "Staff lose time answering repetitive availability questions.",
    solution:
      "Availability signals and patient routing reduce repetitive friction without exposing exact stock counts.",
  },
  {
    icon: TriangleAlert,
    friction: "Stock uncertainty during shortages",
    impact: "Patients may be misdirected or frustrated.",
    solution:
      "Confidence levels, update timestamps, and review-needed alerts provide safer visibility.",
  },
  {
    icon: TriangleAlert,
    friction: "Disconnected inventory & demand",
    impact: "Pharmacy cannot easily see local interest patterns.",
    solution:
      "Demand signal analytics show search pressure and access friction.",
  },
  {
    icon: TriangleAlert,
    friction: "Multi-location inconsistency",
    impact: "Networks struggle to keep signals consistent.",
    solution:
      "Role-based dashboards and location-level controls standardize participation.",
  },
  {
    icon: TriangleAlert,
    friction: "Compliance concerns",
    impact:
      "Unsafe public stock claims or clinical assumptions create risk.",
    solution:
      "Clear boundaries, permission tiers, disclaimers, and audit trails protect workflows.",
  },
];

export default function AvailabilityFrictionSection() {
  return (
    <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
          02 · The problem
        </p>

        <h1 className="text-3xl max-w-160 font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
          Availability friction is costing{" "}
          <span className="text-[#0FAA87]">pharmacies
            time and trust.</span>
        </h1>

        <div className="mt-4 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
          {rows.map(({ icon: Icon, friction, impact, solution }) => (
            <div
              key={friction}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="flex items-center gap-3 sm:w-56 sm:shrink-0">
                <Icon
                  size={16}
                  className="shrink-0 text-amber-600"
                  strokeWidth={2}
                />
                <p className="text-sm font-semibold text-gray-900">
                  {friction}
                </p>
              </div>

              <p className="text-sm text-gray-500 sm:flex-1">
                {impact}
              </p>

              <p className="text-sm text-[#0F8B7D] sm:w-100 sm:shrink-0">
                {solution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
