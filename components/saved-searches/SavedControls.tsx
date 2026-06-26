import React from "react";
import Image from 'next/image'
const controls = [
    {
        src: "/saved-searches/search.png",
        alt: "Image",
        title: "Search without saving",
        description:
            "You can search medicine availability without an account or saving anything.",
    },
    {
        src: "/saved-searches/edit.png",
        alt: "Image",
        title: "Edit or delete saved searches",
        description:
            "Update, rename, archive, or delete saved searches from your account dashboard.",
    },
    {
        src: "/saved-searches/bell.png",
        alt: "Image",
        title: "Manage alerts separately",
        description:
            "If a saved search has an alert, we explain whether editing or deleting it changes the alert.",
    },
    {
        src: "/saved-searches/lock.png",
        alt: "Image",
        title: "Privacy controls",
        description:
            "Manage search history, notifications, alerts, export, and deletion from your privacy area.",
    },
    {
        src: "/saved-searches/prescription.png",
        alt: "Image",
        title: "No prescription upload required",
        description:
            "No prescription images, diagnosis, insurance, symptoms, or medical history to save a search.",
    },
    {
        src: "/saved-searches/invalid.png",
        alt: "Image",
        title: "No stock guarantee",
        description:
            "Saved searches do not reserve medicines, confirm stock, or guarantee future availability.",
    },
];

const actions = [
    "Privacy Center",
    "Learn about availability confidence",
];

export default function SavedControls() {
    return (
        <section className="bg-[#f4f7fb7f] px-4 py-16 lg:py-24">
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-[32px] font-semibold leading-[49px] text-[#0D1B2E]">
                        Your saved searches.{" "}
                        <span className="text-[#0FAA87]">Your controls.</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-6 text-[#566476]">
                        Stated once, plainly: what you control, and what saved
                        searches never do.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-12 grid gap-4 md:grid-cols-2">
                    {controls.map((item) => (
                        <div
                            key={item.title}
                            className="flex gap-4 rounded-xl border border-[#E2E8F0] bg-white p-5"
                        >
                            <div className="flex shrink-0 h-8 w-8 p-[7.5px] rounded-[9px] bg-[#13A594]/10 text-lg">
                                <Image src={item.src} alt={item.alt} width={17} height={17} />
                            </div>

                            <div>
                                <h3 className="text-[14px] font-bold text-[#566476]">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-[13px] md:max-w-[430px] leading-6 text-[#566476]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    {actions.map((action) => (
                        <button
                            key={action}
                            className="rounded-xl cursor-pointer border border-[#CDD7E3] bg-white px-5 py-2.5 text-[15px] font-semibold text-[#0D1B2E] transition hover:bg-gray-50"
                        >
                            {action}
                        </button>
                    ))}
                </div>

                {/* Bottom Notice */}
                <div className="mt-6 flex items-start gap-4 rounded-xl border-l-4 border-[#0C1B30] bg-[#EEF2F7] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] border border-[#E2E8F0] bg-white p-[7.5px]">
                        <img
                            src="/saved-searches/verify.png"
                            alt="Verify"
                            width={22}
                            height={22}
                            className="h-auto w-full max-w-[22px]"
                        />
                    </div>

                    <p className="text-[13px] leading-6 text-[#2B3A4F]">
                        ZoikoMeds is not a pharmacy and does not prescribe, dispense, sell, deliver, reserve, recommend, or guarantee medicines. Saved searches are
                        convenience tools — not prescriptions, refills, or clinical records. Availability is confidence-based and must be confirmed directly with the pharmacy.
                    </p>
                </div>
            </div>
        </section>
    );
}