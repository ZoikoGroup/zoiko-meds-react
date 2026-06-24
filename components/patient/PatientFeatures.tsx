import Image from "next/image";

const features = [
    {
        icon: '/patient/search.png',
        title: "Find",
        height: 22.5,
        width: 22.5,
        desc: "Search thousands of verified pharmacies across the country to see which locations have reported stock in the last 24 hours.",
    },
    {
        icon: '/patient/save.png',
        title: "Save",
        height: 22.5,
        width: 17.5,
        desc: "Create a free account to save your common medicines. Quickly check all your needed prescriptions with one click whenever you need a refill.",
    },
    {
        icon: '/patient/stayinformed.png',
        title: "Stay Informed",
        height: 25,
        width: 25,
        desc: "Set smart alerts for hard-to-find medicines. We'll notify you via email or text as soon as a pharmacy in your area reports a restocking event.",
    },
];

export default function PatientFeatures() {
    return (
        <section className="bg-[#F0F3FF] py-16 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-0">
                {features.map((f) => (
                    <div
                        key={f.title}
                        className="bg-white w-xs md:min-w-[362px] rounded-3xl border border-[#E2E8F0]/20 p-12 flex flex-col gap-2"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#00A99D] flex items-center justify-center text-[20px]">
                            <Image
                                src={f.icon}
                                alt={f.title}
                                width={f.width}
                                height={f.height}
                            />
                        </div>
                        <h3 className="text-[16px] text-[#151C27] mt-4">{f.title}</h3>
                        <p className="text-[16px] text-[#44474D]">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
