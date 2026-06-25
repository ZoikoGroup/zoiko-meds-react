import Image from "next/image";

const features = [
    {
        image: {
            src: "/searchmed/search.png",
            alt: "Image"
        },
        title: "Search without an account",
        desc: "Start a medicine availability search without creating an account.",
    },
    {
        image: {
            src: "/searchmed/verified.png",
            alt: "Image"
        },
        title: "Verified pharmacy signals",
        desc: "Availability signals come from participating verified pharmacies and approved workflows.",
    },
    {
        image: {
            src: "/searchmed/stock.png",
            alt: "Image"
        },
        title: "No exact public stock",
        desc: "ZoikoMeds does not publicly expose exact pharmacy stock counts.",
    },
    {
        image: {
            src: "/searchmed/confirm.png",
            alt: "Image"
        },
        title: "Confirm before traveling",
        desc: "Availability changes. Always confirm directly with the pharmacy before making a trip.",
    },
    {
        image: {
            src: "/searchmed/invalid.png",
            alt: "Image"
        },
        title: "Not a pharmacy",
        desc: "ZoikoMeds does not prescribe, dispense, sell, deliver, reserve, recommend, or guarantee medicines.",
    },
    {
        image: {
            src: "/searchmed/lock.png",
            alt: "Image"
        },
        title: "Privacy controls",
        desc: "Account users manage saved searches, alerts, notifications, privacy settings, and deletion.",
    },
];

export default function SearchBuilt() {
    return (
        <section className="bg-[#0C1B30] py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="mb-12 mx-auto flex flex-col justify-center items-center">
                    <h2 className="max-w-[640px] text-center text-3xl sm:text-4xl font-semibold tracking-[-0.58px] text-white leading-tight lg:leading-[49.6px]">
                        Built for medicine availability search —{" "}
                        <span className="text-[#0FAA87]">not medical advice.</span>
                    </h2>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                    {features.map((f) => (
                        <div key={f.title} className="bg-white/[0.03] border border-[#FFFFFF]/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-2 ">
                            <span className="w-9 h-9 p-2 bg-[#13A5941A] border border-[#1E2A3A] rounded-xl flex items-center justify-center">
                                <Image src={f.image.src} alt={f.image.alt} width={18} height={18} />
                            </span>
                            <h3 className="text-[15px] leading-[24px] font-bold text-white">{f.title}</h3>
                            <p className="text-[14px] text-[#E7EEF6A6] leading-[20px]">{f.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-[#E7EEF6D1]/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-3 mb-6">
                    <Image src="/searchmed/redAlert.png" alt="Image" width={18} height={18} />
                    <p className="text-sm text-[#E7EEF6D1]/[.82] leading-5">In a medical emergency, contact local emergency services immediately.</p>
                </div>

                {/* Bottom CTA */}
                <div className="bg-gradient-to-b from-[#102540] to-[#0C1B30] border border-white/10 rounded-2xl py-8 sm:py-10 lg:py-12 px-5 sm:px-7 flex flex-col items-center gap-5 sm:gap-6">
                    <span className="text-xl sm:text-2xl font-semibold text-white text-center leading-snug">
                        Start with a medicine search.
                    </span>
                    <p className="text-sm sm:text-[15.5px] text-[#E7EEF6B2]/70 text-center max-w-[450px] leading-relaxed">Search first. Save searches and alerts only when you want to return or monitor changes.</p>
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                        <button className="bg-[#13A594] hover:bg-[#11887a] border border-[#13A594] cursor-pointer text-white font-semibold text-[15px] px-5 py-3.5 rounded-lg transition-colors duration-150">
                            Search Availability
                        </button>
                        <button className="border border-[#FFFFFF40]/25 hover:bg-[#b6d1ce0a] text-white cursor-pointer font-semibold text-[15px] px-5 py-3.5 rounded-lg transition-colors duration-150">
                            Create Free Account
                        </button>
                    </div>
                </div>
            </div>
        </section >
    );
}
