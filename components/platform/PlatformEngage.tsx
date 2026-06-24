import Image from 'next/image';

const plans = [
    {
        tag: "Pharmacy Node",
        audience: "For Pharmacies",
        features: [
            "Join the secure visibility network",
            "Manage availability signals via API",
            "Protect inventory from scraper tools",
        ],
        cta: "Join the Network",
        ctaPrimary: true,
    },
    {
        tag: "Systemic Access",
        audience: "For Enterprise",
        features: [
            "Access network-wide intelligence",
            "Strategic ZoikoSignal™ integration",
            "High-throughput infrastructure APIs",
        ],
        cta: "Request a Briefing",
        ctaPrimary: false,
    },
];

export default function PlatformEngage() {
    return (
        <section className="bg-[#F9F9FF] py-20 font-sans">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <h2 className="text-3xl lg:text-4xl font-extrabold text-center tracking-tight text-[#081A13]">
                    Two ways to engage.
                </h2>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:p-16 lg:grid-cols-2 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.tag}
                            className="bg-white border border-[#E2E5F0] p-16 flex flex-col gap-6"
                        >
                            {/* Tag */}
                            <p className="text-[24px] font-bold uppercase text-[#005C55]">
                                {plan.tag}
                            </p>

                            {/* Audience */}
                            <p className="text-[16px] text-[#131B2E] -mt-2">
                                {plan.audience}
                            </p>

                            {/* Features */}
                            <ul className="flex flex-col gap-3">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-3 text-[14.5px] text-[#3A4A5C]">
                                        <Image src='/platform/tick.png' alt='tick' width={16} height={16} />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button className="mt-auto pt-4">
                                <a
                                    href="#"
                                    className={`block w-full text-center py-4 rounded-lg text-[14.5px] transition-colors duration-150 ${plan.ctaPrimary
                                        ? "bg-[#005C55] hover:bg-[#044943] text-white"
                                        : "bg-transparent border border-[#C5C9D6] hover:border-[#0F6E56] text-[#081A13]"
                                        }`}
                                >
                                    {plan.cta}
                                </a>
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
