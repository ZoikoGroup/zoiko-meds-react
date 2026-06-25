
import Image from 'next/image'
const followUpCards = [
    {
        image: {
            src: "/searchmed/save.png",
            alt: "save"
        },
        title: "Save this search",
        desc: "Save a medicine and location so you can return without starting over — while respecting your privacy settings.",
        cta: "Create free account",
        primary: true,
    },
    {
        image: {
            src: "/searchmed/getAlert.png",
            alt: "Alert"
        },
        title: "Get availability alerts",
        desc: "Get updates when availability signals change near your location. Alerts never imply guaranteed or reserved medicine.",
        cta: "Create alert",
        primary: true,
    },
    {
        image: {
            src: "/searchmed/help.png",
            alt: "Help"
        },
        title: "Help a family member",
        desc: "Caregivers can save searches and monitor availability for someone they support — without uploading prescriptions or clinical records.",
        cta: "Caregiver access",
        primary: false,
    },
];

export default function SearchFollowup() {
    return (
        <section className="bg-[#EEF2F7] py-20 font-sans">
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <div className="mb-12 mx-auto flex flex-col justify-center items-center">
                    <h2 className="text-4xl max-w-[640px] text-center lg:text-4xl font-semibold tracking-[-0.58px] text-[#081A13] leading-[49.6px]">
                        Search now. Save it when you need to{" "}
                        <span className="text-[#0FAA87] font-semibold">follow up.</span>
                    </h2>
                    <p className="text-[15px] text-center text-[#566476] mt-4 max-w-xl leading-relaxed">
                        You don’t need an account to search. Accounts are for saved searches, alerts,
                        caregiver support, notification preferences, and privacy controls.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {followUpCards.map((card) => (
                        <div key={card.title} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col gap-4">
                            <span className="w-10 h-10 bg-[#13A5941A] p-[10px] rounded-xl flex items-center justify-center flex-shrink-0">
                                <Image src={card.image.src} alt={card.image.alt} width={22} height={22} />
                            </span>
                            <h3 className="text-[17px] font-semibold leading-[26.78px] text-[#0D1B2E]">{card.title}</h3>
                            <p className="text-[14px] text-[#566476] leading-[21.12px] flex-1">{card.desc}</p>
                            <button
                                className={`mt-auto w-full py-4 rounded-lg text-[15.2px] cursor-pointer font-semibold transition-colors duration-150 ${card.primary
                                    ? "bg-[#13A594] hover:bg-[#0e8b7d] text-white"
                                    : "bg-white border border-[#CDD7E3] text-[#0D1B2E] hover:bg-[#F8FAFC]"
                                    }`}
                            >
                                {card.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
