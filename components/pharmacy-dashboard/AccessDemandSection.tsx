interface Row {
  metric: string;
  definition: string;
  requirement: string;
}

const rows: Row[] = [
  {
    metric: "Access demand signal",
    definition:
      "Aggregated interest, search, or inquiry activity for a medicine or category.",
    requirement:
      "Show trend and relative demand, not patient-identifying data.",
  },
  {
    metric: "Availability confidence",
    definition:
      "Structured signal showing the confidence level of access availability.",
    requirement:
      "Use confidence labels instead of exact public quantity claims.",
  },
  {
    metric: "Response timeliness",
    definition:
      "How quickly the pharmacy reviews or responds to allowed confirmation tasks.",
    requirement:
      "Show internal performance metrics to authorized users only.",
  },
  {
    metric: "Signal freshness",
    definition:
      "How current a confirmation or availability signal is.",
    requirement:
      "Show stale, expiring, verified, or needs-review states.",
  },
];

export default function AccessDemandSection() {
  return (
    <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 uppercase text-sm font-semibold tracking-[2px] text-[#13A594]">
          07 · Patient access visibility
        </p>
        <h2 className="max-w-150 text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Understand access demand without
          turning pharmacy operations into a{" "}
          <span className="text-[#0FAA87]">public marketplace.</span>
        </h2>
        <p className="mt-4 max-w-155 leading-relaxed text-[#566476]">
          See aggregated access signals, inquiry patterns, and availability confidence
          movement to make better operational decisions while protecting sensitive
          inventory and clinical boundaries.
        </p>

        <div className="hidden md:block mt-10 overflow-hidden rounded-xl bg-white border border-[#D8E2EC]">
          <table className="w-full min-w-[800px] mt-8 border-collapse text-left">
            <thead className="bg-[#0F1C2E]">
              <tr>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  Metric
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  Definition
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  Safe Display Requirement
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.metric} className="border-t border-[#D8E2EC]">
                  <td className="w-[220px] px-6 py-5 text-lg font-semibold text-[#0D1526]">
                    {row.metric}
                  </td>

                  <td className="w-[520px] px-6 py-5 text-lg leading-8 text-[#364152]">
                    {row.definition}
                  </td>

                  <td className="px-6 py-5 text-lg leading-8 text-[#364152]">
                    {row.requirement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 space-y-4 md:hidden">
          {rows.map((row) => (
            <div
              key={row.metric}
              className="rounded-xl border border-[#D8E2EC] bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[#0D1526]">
                {row.metric}
              </h3>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#009D8C]">
                  Definition
                </p>
                <p className="mt-2 text-sm leading-7 text-[#5A6E87]">
                  {row.definition}
                </p>
              </div>

              <div className="mt-5 border-t border-[#D8E2EC] pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#009D8C]">
                  Safe Display Requirement
                </p>
                <p className="mt-2 text-sm leading-7 text-[#5A6E87]">
                  {row.requirement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
