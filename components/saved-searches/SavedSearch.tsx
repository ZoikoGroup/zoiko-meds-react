"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const cards = [
    {
        src: "/saved-searches/refresh.png",
        alt: "refresh",
        title: "Check again without starting over.",
        description:
            "Save medicine, location, radius, and selected preferences so you can run the same search later.",
        buttonText: "Create free account",
        link:"/create-account",
        primary: true,
    },
    {
        src: "/saved-searches/bell.png",
        alt: "bell",
        title: "Follow medicines that may change.",
        description:
            "Availability can change quickly. Saved searches make it easier to create alerts for medicines you need to monitor.",
        buttonText: "Create availability alert",
        link:"/availability-alert"
    },
    {
        src: "/saved-searches/people.png",
        alt: "people",
        title: "Organize searches for someone you support.",
        description:
            "Caregivers can label saved searches for family members or situations without creating a medical record.",
        buttonText: "Explore caregiver access",
        link:"/caregiver-access"
    },
];

export default function SavedSearch() {
    const router = useRouter();
    return (
        <section className="bg-[#F4F7FB] pb-16 px-4">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <h1 className="text-[32px] leading-[49px] font-semibold text-[#0D1B2E]">
                        Why saved <span className="text-[#0FAA87]">searches matter.</span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-[595px] text-[16px] text-[#566476] leading-[25px]">
                        For the medicines you check often — during shortages, when
                        traveling, or when helping someone you care for.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#13A5941A] text-[#13A594]">
                                <Image src={card.src} alt={card.alt} width={22} height={22} />
                            </div>

                            <h3 className="text-[17px] font-semibold leading-[25px] text-[#0D1B2E]">
                                {card.title}
                            </h3>

                            <p className="mt-3 flex-1 text-[14.1px] leading-[21px] text-[#566476]">
                                {card.description}
                            </p>

                            <button
                            onClick={()=>router.push(card.link)}
                                className={`mt-8 w-full rounded-xl px-5 py-3 text-sm font-semibold cursor-pointer transition ${card.primary
                                        ? "border border-[#13A594] bg-[#13A594] text-white hover:bg-[#109889]"
                                        : "border border-[#CDD7E3] bg-white text-[#0D1B2E] hover:bg-gray-50"
                                    }`}
                            >
                                {card.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}