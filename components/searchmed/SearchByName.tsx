import Image from "next/image";

const searchTypes = [
    {
        image: "/searchmed/brand.png",
        alt: "brand1",
        width: 22,
        height: 22,
        title: "Brand or generic",
        desc: "Search by brand name or generic name ZoikoMeds may help match common medicine names where supported.",
        example: {
            common: "Example",
            prefix: "Advil",
            postfix: "ibuprofen",
            middle: "or"
        },
        cta: "Start a search",
    },
    {
        image: "/searchmed/strength.png",
        alt: "brand1",
        width: 22,
        height: 22,
        title: "Strength helps",
        desc: "Adding strength can improve the match when a medicine has multiple versions.",
        example: {
            common: "Example",
            prefix: "5mg, 10mg, 20mg",
            postfix: "",
            middle: ""
        },
        cta: "Start a search",
    },
    {
        image: "/searchmed/location.png",
        alt: "brand1",
        width: 13,
        height: 16,
        title: "Location matters",
        desc: "Availability changes by pharmacy, area, and time. Search near where you can realistically travel.",
        example: {
            common: "Example",
            prefix: "Austin, TX",
            postfix: "78701",
            middle: "or"
        },
        cta: "Start a search",
    },
];

export default function SearchByName() {
    return (
        <section className="bg-[#EEF2F7] py-20 font-sans">
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <div className="mb-12 flex flex-col items-center">
                    <h2 className="text-3xl text-center lg:text-4xl font-semibold tracking-tight text-[#081A13] leading-tight">
                        Search by the{" "}
                        <span className="text-[#0FAA87]">name you know.</span>
                    </h2>
                    <p className="text-[15px] text-center text-[#566476] mt-3 md:max-w-[590] leading-[24px]">
                        A few tips help you get a better match. ZoikoMeds doesn’t recommend medicines
                        — it just helps you search.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                    {searchTypes.map((item) => (
                        <div key={item.title} className="bg-white border md:min-h-[300px] border-[#E2E8F0] rounded-2xl p-6 flex flex-col gap-2">
                            <span className="w-10 h-10 bg-[#13A5941A] rounded-xl flex items-center justify-center">
                                <Image src={item.image} alt={item.alt} width={item.width} height={item.height} />
                            </span>
                            <h3 className="text-[15px] font-bold text-[#081A13]">{item.title}</h3>
                            <p className="text-[13.5px] text-[#5A6478] leading-relaxed flex-1">{item.desc}</p>
                            <p className="text-[#7C8A9B] text-sm mb-4">
                                {item.example.common}:{" "}
                                <span className="text-[#2B3A4F] font-semibold">
                                    {item.example.prefix}
                                </span>{" "}
                                {item.example.middle}{" "}
                                <span className="text-[#2B3A4F] font-semibold">
                                    {item.example.postfix}
                                </span>
                                .
                            </p>
                            <button className="text-[15px] px-[20.8px] py-[11px] font-semibold border border-[#CDD7E3] hover:bg-[#bacac831] cursor-pointer rounded-2xl text-[#0D1B2E] text-center">
                                {item.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Info banner */}
                <div className="flex justify-center items-center gap-2 bg-white border border-l-3 border-[#E2E8F0] border-l-[#1F6FB2] rounded-xl px-4.5 py-4 text-[13px] text-[#2B3A4F] leading-relaxed">
                    <div className="bg-[#EAF3FB] p-[7px] rounded-xl w-[32px] h-[32px] flex items-center justify-center">
                        <Image src="/searchmed/tick.png" alt="tick" height={18} width={18} />
                    </div>
                    <div className="text-[#2B3A4F] text-[15px]">
                        <span className="font-bold">ZoikoMeds does not recommend which medicine you should take </span>and does not provide clinical substitutions. Speak with a licensed healthcare
                        professional or pharmacist for medical guidance.
                    </div>
                </div>
            </div>
        </section>
    );
}
