type ControlRow = {
    area: string;
    promise: string;
    cta: string;
};

const controlRows: ControlRow[] = [
    {
        area: "Privacy by design",
        promise:
            "Search without an account. Account features are opt-in for saved searches, alerts, preferences, and caregiver organization.",
        cta: "View Privacy Center",
    },
    {
        area: "Data minimization",
        promise:
            "Collect only what's needed for search, account preferences, alerts, workflows, security, and governance.",
        cta: "Request Data Governance Pack",
    },
    {
        area: "Security controls",
        promise:
            "Role-based access, MFA readiness, encryption, audit logging, secure sessions, bot protection, and secure document routing for verified workflows.",
        cta: "Request Security Pack",
    },
    {
        area: "Enterprise governance",
        promise:
            "Enterprise outputs are contract-scoped, jurisdiction-aware, deidentified, aggregated, and access-controlled.",
        cta: "Request Enterprise Trust Review",
    },
    {
        area: "Analytics privacy",
        promise:
            "Identifiable medicine search, precise location, PHI, exact stock, internal session, and sensitive operational data must not flow into general marketing analytics.",
        cta: "View Analytics Governance",
    },
    {
        area: "Policy governance",
        promise:
            "Public policies, disclaimers, controlled medicine rules, privacy materials, and trust pages are versioned and reviewed.",
        cta: "View Legal & Trust Policies",
    },
];

export default function TrustControls() {
    return (
        <section className="bg-slate-50 px-6 md:px-54 py-12">
            <div className="max-w-6xl mx-auto">
                <p className="text-xs text-[#13A594] leading-6 tracking-[2px] font-medium mb-2">
                    03 · Privacy, Security &amp; Data Governance
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                    Controls that <span className="text-[#0FAA87]">matter to every reviewer.</span>
                </h2>

                {/* Desktop Table */}
                <div className="hidden md:block mt-8 overflow-hidden rounded-[24px] border border-[#D7DEE8] bg-white shadow-sm">
                    <table className="w-full my-7 border-collapse">
                        <thead>
                            <tr className="bg-[#16253B]">
                                <th className="w-[19%] px-5 py-5 text-left text-[12px] font-semibold uppercase tracking-[1.6px] text-[#E7EEF6EB]">
                                    Control Area
                                </th>

                                <th className="w-[53%] px-5 py-5 text-left text-[12px] font-semibold uppercase tracking-[1.6px] text-[#E7EEF6EB]">
                                    Public Promise
                                </th>

                                <th className="w-[28%] px-5 py-5 text-left text-[12px] font-semibold uppercase tracking-[1.6px] text-[#E7EEF6EB]">
                                    Detail Route
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {controlRows.map((r, index) => (
                                <tr
                                    key={r.area}
                                    className={`border-t border-[#D7DEE8] align-top ${
                                        index % 2 === 1 ? "bg-[#F6F9FC]" : "bg-white"
                                    }`}
                                >
                                    <td className="px-5 py-5 text-[18px] font-semibold text-[#16253B]">
                                        {r.area}
                                    </td>

                                    <td className="px-5 py-5 text-[16px] text-[#425466]">
                                        {r.promise}
                                    </td>

                                    <td className="px-5 py-5 whitespace-nowrap">
                                        <a
                                            href="#"
                                            className="text-[16px] font-semibold text-[#13A594] hover:text-[#119483]"
                                        >
                                            {r.cta}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden mt-8 space-y-4">
                    {controlRows.map((r, index) => (
                        <div
                            key={r.area}
                            className={`rounded-xl border border-[#D7DEE8] p-5 ${
                                index % 2 === 1 ? "bg-[#F6F9FC]" : "bg-white"
                            }`}
                        >
                            <h3 className="text-lg font-semibold text-[#16253B]">
                                {r.area}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#425466]">
                                {r.promise}
                            </p>

                            <a
                                href="#"
                                className="mt-4 inline-block text-sm font-semibold text-[#13A594] hover:text-[#119483]"
                            >
                                {r.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}