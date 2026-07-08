interface Row {
    metric: string;
    definition: string;
    businessValue: string;
}

const rows: Row[] = [
    {
        metric: "Average time to ready",
        definition: "Time from intake to ready status.",
        businessValue: "Shows operational throughput.",
    },
    {
        metric: "Exception rate",
        definition:
            "Percentage of workflows delayed or blocked by reason type.",
        businessValue: "Identifies bottlenecks.",
    },
    {
        metric: "Patient response time",
        definition:
            "Time from clarification request to patient response.",
        businessValue: "Improves communication strategy.",
    },
    {
        metric: "Pharmacist review queue age",
        definition: "Age of items awaiting licensed review.",
        businessValue: "Helps manage workload and staffing.",
    },
    {
        metric: "Pickup completion signal",
        definition:
            "Tracks when workflows reach pickup-ready and closed states.",
        businessValue: "Supports operational planning.",
    },
    {
        metric: "Location performance",
        definition:
            "Compares workflow speed and exception patterns across locations.",
        businessValue: "Supports enterprise pharmacy management.",
    },
    {
        metric: "Audit completion",
        definition:
            "Measures workflows with complete status history and required notes.",
        businessValue: "Improves quality assurance.",
    },
];


export default function Analytics() {
    return (
        <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-3 uppercase text-sm font-semibold tracking-[2px] text-[#13A594]">
                    09 · Analytics & performance
                </p>
                <h2 className="max-w-150 text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
                    Throughput, bottlenecks,{" "}
                    <span className="text-[#0FAA87]"> turnaround,
                        and readiness.</span>
                </h2>

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
                                    <td className="px-6 py-2 text-sm font-semibold text-[#0D1526]">
                                        {row.metric}
                                    </td>

                                    <td className=" px-6 py-1 text-sm leading-8 text-[#364152]">
                                        {row.definition}
                                    </td>

                                    <td className="px-6 py-2 text-sm leading-8 text-[#364152]">
                                        {row.businessValue}
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
                                    {row.businessValue}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
