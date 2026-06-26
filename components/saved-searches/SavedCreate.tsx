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

                {/* Bottom CTA */}
                <div className="bg-gradient-to-b from-[#102540] to-[#0C1B30] border border-white/10 rounded-2xl py-8 sm:py-10 lg:py-12 px-5 sm:px-7 flex flex-col items-center gap-5 sm:gap-6">
                    <span className="text-2xl font-semibold text-white text-center leading-snug">
                        Save the searches you come back to.
                    </span>
                    <p className="text-[15px] sm:text-[15.5px] text-[#E7EEF6B2]/70 text-center max-w-[470px] leading-relaxed">Create a free account to save medicine availability searches, run
                        them again, and create alerts when signals change.</p>
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                        <button className="bg-[#13A594] hover:bg-[#11887a] border border-[#13A594] cursor-pointer text-white font-semibold text-[15px] px-5 py-3.5 rounded-[11px] transition-colors duration-150">
                            Create Free Account
                        </button>
                        <button className="border border-[#FFFFFF]/25 hover:bg-[#b6d1ce0a] text-white cursor-pointer font-semibold text-[15px] px-5 py-3.5 rounded-[11px] transition-colors duration-150">
                            Search Medicines
                        </button>
                    </div>
                </div>
            </div>
        </section >
    );
}
