"use client"

import { useRouter } from "next/navigation";

const actions = [
    {
        label: "Create Free Account",
        primary: true,
        link:"/create-account"
    },
    {
        label: "Search Medicines",
        primary: false,
        link:"/searchmed"
    },
];

export default function CaregiverCta() {
    const router = useRouter();
    return (
        <section className="bg-[#081B33] px-6 py-32 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                <h2 className="text-3xl sm:[38px] font-semibold text-white">
                    Keep the medicine searches you{" "}
                    <span className="text-[#0FAA87]">
                        manage in one place.
                    </span>
                </h2>

                <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
                    {actions.map(({ label, primary, link }) => (
                        <button
                            onClick={()=>router.push(link)}
                            key={label}
                            className={`h-16 rounded-2xl cursor-pointer px-10 text-base font-medium transition-all duration-300 sm:min-w-[250px]
                ${primary
                                    ? "bg-[#00B7A8] text-white hover:bg-[#0fa08f]"
                                    : "border border-white/20 bg-transparent text-white hover:border-white/40"
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