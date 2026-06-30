type IconCard = {
    src: string;
    title: string;
    body: string;
    cta: string;
};

const platformCards: IconCard[] = [
    {
        src: "/trust-center/part.png",
        title: "Verified pharmacy participation",
        body: "How ZoikoMeds reviews pharmacy identity, authorization, licensing/registry evidence where available, user roles, branch controls, and ongoing review triggers.",
        cta: "View Verification Standards",
    },
    {
        src: "/trust-center/check.png",
        title: "Availability confidence",
        body: "What strong signal, limited signal, confirmation needed, and no current signal mean — and why pharmacy confirmation still matters.",
        cta: "View Availability Confidence",
    },
    {
        src: "/trust-center/stock.png",
        title: "Exact-stock suppression",
        body: "Why public routes use confidence-based signal rather than exact pharmacy stock counts.",
        cta: "Learn About Data Controls",
    },
    {
        src: "/trust-center/plus.png",
        title: "Controlled medicine policy",
        body: "How controlled, restricted, high-risk, or jurisdiction-sensitive medicines may be suppressed, limited, routed, or governed under additional controls.",
        cta: "View Controlled Medicine Policy",
    },
    {
        src: "/trust-center/none.png",
        title: "Medical boundary",
        body: "ZoikoMeds does not provide clinical advice, substitutions, dosing, treatment recommendations, prescribing, dispensing, or emergency support.",
        cta: "View Medical Disclaimer",
    },
];

export default function TrustVerify() {
    return (
            <section className="bg-[#EEF2F7] px-6 md:px-54 py-12">
            <div className="max-w-6xl mx-auto">
                <p className="text-xs text-[#13A594] tracking-[2px] font-medium mb-4">
                    04 · Verification, Confidence &amp; Controlled Medicines
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                    Platform-specific trust, in <span className="text-[#0FAA87]">one place.</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                    {platformCards.map((c) => (
                        <div key={c.title} className="bg-white rounded-xl p-5 shadow-sm">
                            <div className="h-9 w-9 rounded-lg bg-[#13A5941A] flex items-center justify-center mb-4">
                                <img src={c.src} alt="image" />
                            </div>
                            <p className="font-bold text-sm text-[#0D1B2E]">{c.title}</p>
                            <p className="text-xs max-w-[260px] text-[#566476] mt-2 leading-relaxed">
                                {c.body}
                            </p>
                            <a href="#" className="block text-emerald-600 text-xs font-medium mt-3">
                                {c.cta} →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
