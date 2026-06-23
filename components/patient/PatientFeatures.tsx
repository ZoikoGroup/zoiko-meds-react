import Image from "next/image";

const features = [
    {
        icon: '/patient/search.png',
        title: "Find",
        desc: "Search thousands of verified pharmacies across the country to see which locations have reported stock in the last 24 hours.",
    },
    {
        icon: '/patient/save.png',
        title: "Save",
        desc: "Create a free account to save your common medicines. Quickly check all your needed prescriptions with one click whenever you need a refill.",
    },
    {
        icon: '/patient/stayinformed.png',
        title: "Stay Informed",
        desc: "Set smart alerts for hard-to-find medicines. We'll notify you via email or text as soon as a pharmacy in your area reports a restocking event.",
    },
];

export default function PatientFeatures() {
    return (
        <section className="bg-[#F0F3FF] py-16 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                {features.map((f) => (
                    <div
                        key={f.title}
                        className="bg-white w-xs rounded-2xl border border-[#E2E8F0] p-7 flex flex-col gap-4"
                    >
                        <div className="w-11 h-11 rounded-full bg-[#00A99D] flex items-center justify-center text-[20px]">
                            <Image
                                src={f.icon}
                                alt={f.title}
                                width={17}
                                height={17}
                            />
                        </div>
                        <h3 className="text-[15px] text-[#151C27]">{f.title}</h3>
                        <p className="text-[16px] text-[#151C27] ">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
