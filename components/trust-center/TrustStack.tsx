type Layer = {
    tag: string;
    title: string;
    body: string;
    footnote: string;
    cta: string;
};

const layers: Layer[] = [
    {
        tag: "IDENTITY TRUST",
        title: "Identity & access",
        body: "Anonymous-first search, account controls, role-based access, MFA/passkey readiness, and SSO readiness where applicable.",
        footnote:
            "Users and organizations reach the right workflows without unnecessary data collection.",
        cta: "View Account Security",
    },
    {
        tag: "PHARMACY TRUST",
        title: "Verified participation",
        body: "Verified pharmacy participation, authorized-user controls, branch permissions, profile governance, and auditability.",
        footnote:
            "Users see participating pharmacy information with clearer accountability.",
        cta: "View Verification Standards",
    },
    {
        tag: "MEDICINE DATA TRUST",
        title: "MediBase™ identity",
        body: "Medicine identity normalization, brand/generic matching, strength/form support, and jurisdiction context.",
        footnote:
            "Search and integration rely on cleaner medicine identity logic.",
        cta: "Explore MediBase™",
    },
    {
        tag: "AVAILABILITY TRUST",
        title: "ZoikoAvail™ confidence",
        body: "Confidence signals, freshness indicators, exact-stock suppression, and confirmation guidance.",
        footnote:
            "Users understand what to check next without false certainty.",
        cta: "View Availability Confidence",
    },
    {
        tag: "INTELLIGENCE TRUST",
        title: "ZoikoSignal™ governance",
        body: "Aggregated, anonymized, thresholded, contract-scoped institutional intelligence.",
        footnote:
            "Institutions gain access visibility without patient-level exposure.",
        cta: "Explore ZoikoSignal™",
    },
    {
        tag: "OPERATIONAL TRUST",
        title: "Operations & oversight",
        body: "Incident response, support routing, security review, document governance, accessibility, and policy versioning.",
        footnote:
            "Stakeholders know how trust is maintained over time.",
        cta: "Request Trust Pack",
    },
];

export default function TrustStack() {
    return (
        <div className="bg-[#EEF2F7] px-6 md:px-54 py-12">
            <section className=" max-w-6xl mx-auto">
                <p className="text-xs text-[#13A594] tracking-[2px] font-semibold mb-3">
                    02 · ZoikoMeds Trust Stack
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                    Six governed{" "}
                    <span className="text-[#0FAA87]">layers of trust.</span>
                </h2>
                <p className="text-[#566476] max-w-[595px] mb-3">
                    From identity to operations — each layer creates trust and routes to the right
                    evidence.
                </p>
                <div className="bg-white rounded-2xl pt-4 shadow-sm">
                    {layers.map((l) => (
                        <div
                            key={l.title}
                            className="flex flex-col border-b border-[#E2E8F0] sm:flex-row sm:items-center gap-4 p-6"
                        >
                            <span className="shrink-0 self-start uppercase text-[10px] font-semibold tracking-[0.80px] text-[#0F8B7D] border border-[#13A59440] bg-[#13A5941A] rounded px-2 py-1">
                                {l.tag}
                            </span>
                            <div className="flex-1">
                                <p className="font-semibold text-[#0D1B2E]">{l.title}</p>
                                <p className="text-xs text-[#2B3A4F] max-w-155 mt-1 leading-relaxed">
                                    {l.body}
                                </p>
                                <p className="text-[11px] text-[#7C8A9B] mt-2">{l.footnote}</p>
                            </div>
                            <div className="shrink-0">
                                <button className="text-xs sm:text-sm font-semibold text-[#0D1B2E] border border-[#CDD7E3] rounded-[11px] px-3 py-1.5 whitespace-nowrap hover:bg-slate-50">
                                    {l.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
