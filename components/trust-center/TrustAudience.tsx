type AudienceCard = {
    src: string;
    title: string;
    body: string;
    trust: string;
    cta: string;
};

const audienceCards: AudienceCard[] = [
    {
        src: "/trust-center/search.png",
        title: "Patients & caregivers",
        body: "Search safely and understand what results mean.",
        trust: "Privacy Center, Medical Disclaimer, Availability Confidence, Accessibility.",
        cta: "Search Medicines",
    },
    {
        src: "/trust-center/pharma.png",
        title: "Pharmacies",
        body: "Protect your stock and pharmacy control.",
        trust: "Verification Standards, Pharmacy Data Controls, Confirmation Requests, Inventory Signal Governance.",
        cta: "Join Verified Network",
    },
    {
        src: "/trust-center/healthcare.png",
        title: "Healthcare providers",
        body: "Support patients without clinical overreach.",
        trust: "Provider Workflows, Availability Signals, Referral Guidance, Medical Disclaimer.",
        cta: "Request Provider Briefing",
    },
    {
        src: "/trust-center/buyers.png",
        title: "Enterprise buyers",
        body: "Trust the data, APIs, governance, and security posture.",
        trust: "Enterprise Trust Pack, Security Pack, Data Governance, ZoikoSignal™, ZoikoAvail™ API.",
        cta: "Request Enterprise Briefing",
    },
    {
        src: "/trust-center/house.png",
        title: "Government & public health",
        body: "Public access visibility without exposing sensitive data.",
        trust: "Public Health Trust Review, Controlled Medicine Policy, Data Governance, Jurisdiction Controls.",
        cta: "Request Public Health Briefing",
    },
    {
        src: "/trust-center/verify.png",
        title: "Legal, security & procurement",
        body: "Review policies, controls, and available evidence.",
        trust: "Trust Pack, Privacy Center, Technical Use, Security Reviews, Accessibility Statement.",
        cta: "Request Trust Pack",
    },
];

export default function TrustAudience() {
    return (
        <section className="bg-slate-50 px-6 md:px-54 py-12">
            <div className="max-w-6xl mx-auto">
                <p className="text-xs text-[#13A594] tracking-[2px] font-medium mb-2">
                    05 · Audience Trust Pathways
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                    The right trust content for <span className="text-[#0FAA87]">each audience.</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {audienceCards.map((c) => (
                        <div
                            key={c.title}
                            className="flex h-full flex-col rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
                        >
                            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-emerald-400">
                                <img src={c.src} alt="image" />
                            </div>

                            <p className="text-sm font-bold text-slate-900">
                                {c.title}
                            </p>

                            <p className="mt-2 max-w-[260px] text-xs leading-relaxed text-[#566476]">
                                {c.body}
                            </p>

                            <p className="my-3 text-xs leading-relaxed text-slate-500">
                                <span className="font-semibold text-slate-700">Trust: </span>
                                {c.trust}
                            </p>

                            <button className="mt-auto rounded-md border border-slate-300 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
                                {c.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
