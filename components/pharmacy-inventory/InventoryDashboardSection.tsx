interface Stat {
  label: string;
  value: string;
  colorClass: string;
}

const stats: Stat[] = [
  { label: "Signals updated", value: "128", colorClass: "text-teal-600" },
  { label: "Review needed", value: "6", colorClass: "text-amber-500" },
  { label: "High demand", value: "14", colorClass: "text-blue-600" },
  { label: "Staff signals", value: "3", colorClass: "text-orange-500" },
];

interface MedicineRow {
  medicine: string;
  category: string;
  signal: string;
  signalClass: string;
  confidence: string;
  lastUpdated: string;
  demand: string;
  visibility: string;
  action: string;
}

const rows: MedicineRow[] = [
  {
    medicine: "Medicine A",
    category: "Chronic care",
    signal: "Available",
    signalClass: "bg-emerald-50 text-emerald-600",
    confidence: "Tier 1",
    lastUpdated: "2h ago · Pharmacist",
    demand: "Moderate",
    visibility: "Public Confidence",
    action: "Update",
  },
  {
    medicine: "Medicine B",
    category: "Respiratory",
    signal: "Limited",
    signalClass: "bg-yellow-50 text-yellow-700",
    confidence: "Tier 3",
    lastUpdated: "1d ago · Staff",
    demand: "High",
    visibility: "Network Restricted",
    action: "Review",
  },
  {
    medicine: "Medicine C",
    category: "Shortage-sensitive",
    signal: "Review needed",
    signalClass: "bg-orange-50 text-orange-600",
    confidence: "Tier 4",
    lastUpdated: "5d ago · Ops",
    demand: "Rising",
    visibility: "Internal Only",
    action: "Assign",
  },
  {
    medicine: "Medicine D",
    category: "General",
    signal: "Not available",
    signalClass: "bg-red-50 text-red-600",
    confidence: "Tier 2",
    lastUpdated: "3h ago · Pharmacist",
    demand: "Low",
    visibility: "Public Confidence",
    action: "Update",
  },
  {
    medicine: "Medicine E",
    category: "Specialty",
    signal: "Uncertain",
    signalClass: "bg-gray-100 text-gray-600",
    confidence: "Tier 5",
    lastUpdated: "2d ago · Ops",
    demand: "Moderate",
    visibility: "Enterprise Restricted",
    action: "Export",
  },
];

export default function InventoryDashboardSection() {
  return (
    <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
          04 · Inventory dashboard
        </p>

        <h1 className="text-3xl max-w-160 font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
          One operating view for {" "}
          <span className="text-[#0FAA87]">availability
            signals.</span>
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {stat.label}
              </p>
              <p className={`mt-2 text-2xl font-semibold ${stat.colorClass}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
          <table className="text-left text-sm">
            <thead>
              <tr className="bg-slate-900 text-xs font-medium uppercase tracking-wide text-slate-300">
                <th className="px-5 py-3">Medicine</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Availability signal</th>
                <th className="px-5 py-3">Confidence</th>
                <th className="px-5 py-3">Last updated</th>
                <th className="px-5 py-3">Demand pressure</th>
                <th className="px-5 py-3">Visibility</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {rows.map((row) => (
                <tr key={row.medicine}>
                  <td className="px-5 py-4 text-[13px] font-semibold text-gray-900">{row.medicine}</td>
                  <td className="px-5 py-4 text-[13px] text-gray-500">{row.category}</td>
                  <td className="px-5 py-4 text-[13px]">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${row.signalClass}`}
                    >
                      {row.signal}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-gray-500">{row.confidence}</td>
                  <td className="px-5 py-4 text-[13px] text-gray-500">{row.lastUpdated}</td>
                  <td className="px-5 py-4 text-[13px] text-gray-500">{row.demand}</td>
                  <td className="px-5 py-4 text-[13px] text-gray-500 text-xs">{row.visibility}</td>
                  <td className="px-5 py-4">
                    <button className="font-medium text-teal-600 hover:text-teal-700">
                      {row.action}
                    </button>
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
