import React from "react";

const steps = [
    {
        number: 1,
        title: "Search",
        description:
            "Search by medicine name, strength or form, and location. No account needed to search.",
    },
    {
        number: 2,
        title: "Save",
        description:
            "Save the medicine query and location to your account so you can return to it later.",
    },
    {
        number: 3,
        title: "Recheck",
        description:
            "Run the saved search again, change the radius or location, and review the latest signal.",
    },
    {
        number: 4,
        title: "Alert",
        description:
            "Turn a saved search into an availability alert. Signals are not guarantees.",
    },
];

export default function SavedWork() {
    return (
        <section className="bg-[#f4f7fb7f] px-4 py-16">
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-[32px] leading-[49.6px] font-semibold text-[#0D1B2E] md:text-[32px]">
                        How saved <span className="text-[#0FAA87]">searches work.</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-[595px] text-[16px] leading-8 text-[#566476]">
                        Search once, save what matters, and return when availability
                        changes — in four simple steps.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="rounded-[14px] border border-[#E2E8F0] bg-white p-6"
                        >
                            <div className="flex h-8 w-8 p-1 items-center leading-[24px] justify-center rounded-[9px] bg-[#13A5941A]">
                                <span className="text-[15px] font-extrabold text-[#13A594]">{step.number}</span>
                            </div>

                            <h3 className="mt-4 text-base font-bold text-[#0D1B2E]">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-[14px] leading-5 text-[#566476]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom Info */}
                <div className="mt-8 flex flex-col items-start gap-4 rounded-xl leading-[12.8px] border border-[#13A59440]/25 bg-[#13A594]/10 px-[17px] py-[15px] sm:flex-row sm:items-center">
                    <div className="flex h-9 w-10 items-center justify-center rounded-[9px] bg-white border border-[#13A594]/30">
                        <img src="/saved-searches/arrow.png" alt="arrow" width={17} height={17} />
                    </div>

                    <p className="text-[14.9px] leading-[22px] text-[#2B3A4F]">
                        If you tap <span className="font-bold">Save search</span> while
                        signed out, we'll open a quick sign-in or account creation and bring
                        you right back to your search — so saving never breaks your journey.
                    </p>
                </div>
            </div>
        </section>
    );
}