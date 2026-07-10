"use client"

import { useRouter } from "next/navigation";

const buttons = [
    {
        label: "Create Availability Alert",
        primary: true,
        link:"#"
    },
    {
        label: "Search Medicines",
        primary: false,
        link:"/searchmed"
    },
];

export default function AvailabilityCta() {
    const router = useRouter();
    return (
        <section className="bg-[#000615] px-6 py-20 lg:px-12">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.32px] text-white md:text-[32px]">
                    Create an alert for the{" "}
                    <span className="text-[#0FAA87]">
                        medicines you check often.
                    </span>
                </h2>

                <p className="mt-6 max-w-2xl leading-6 text-[#7587A7]">
                    Secure, professional monitoring for your healthcare logistics.
                </p>

                <div className="mt-12 flex w-full flex-col items-center justify-center gap-5 sm:w-auto sm:flex-row">
                    {buttons.map(({ label, primary,link }) => (
                        <button
                        onClick={()=>router.push(link)}
                            key={label}
                            className={`h-14 rounded-xl cursor-pointer px-12 py-4 text-base font-medium transition-all duration-300 sm:min-w-[270px]
                ${primary
                                    ? "bg-[#006A65] text-white hover:bg-[#0B6C67]"
                                    : "border border-[#75777E] bg-transparent text-white hover:border-white/60"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}