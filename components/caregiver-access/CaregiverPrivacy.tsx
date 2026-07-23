import React from "react";

const privacyCards = [
    {
        src: "/caregiver-access/file.png",
        title: "No Prescription Upload",
        description:
            "We never ask for or store medical records, prescriptions, or clinical histories. We only track market availability.",
    },
    {
        src: "/caregiver-access/tag.png",
        title: "Labels are Metadata Only",
        description:
            "Labels like 'Mom' or 'Child' are local organization markers for you. They are not linked to legal identities.",
    },
    {
        src: "/caregiver-access/account.png",
        title: "Search without Account",
        description:
            "Single-use searches don't require an account. Data is only persistent if you choose to create a workspace.",
    },
    {
        src: "/caregiver-access/delete.png",
        title: "User-Controlled Data",
        description:
            "Delete your history, labels, or entire account instantly. We do not sell or trade your search behaviors.",
    },
    {
        src: "/caregiver-access/bellprivacy.png",
        title: "Notification Privacy",
        description:
            "Alerts are sent only to the channels you authorize. No third-party data sharing for marketing.",
    },
    {
        src: "/caregiver-access/signal.png",
        title: "Availability as Signal",
        description:
            "We treat stock data as a technical signal, not a medical fact. Real-time verification is always recommended.",
    },
];

export default function CaregiverPrivacy() {
    return (
        <section className="bg-[#132540] px-4 py-16">
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <div className="text-center">
                    
                    <h2 className="text-3xl sm:text-[38px] font-semibold leading-tight sm:leading-[46px] text-white">
                        Privacy &{" "}
                        <span className="text-[#0FAA87]">User Control</span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-[16px] leading-7 text-white/70">
                        Trust is our primary infrastructure component. We build tools that
                        prioritize your control over data and identity.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-10 p-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {privacyCards.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6"
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                width={22}
                                height={22}
                            />

                            <h3 className="mt-3 text-[18px] leading-6 text-white">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-[16px] leading-7 text-white/75">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom Banner */}
                <div className="mt-10 md:mx-5 max-w-6xl rounded-[24px] border border-[#13A59433] bg-gradient-to-r from-[#00B7A833] to-[#F4B9421A] px-8 py-7">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2.5">
                            <img
                                src="/caregiver-access/spinner.png"
                                alt="Shared Access"
                                className="h-6 w-6 shrink-0"
                            />
                            <h3 className="text-[16px] leading-6 text-white">
                                Future Shared Access Notice
                            </h3>
                        </div>
                        <p className="mt-3 max-w-[760px] text-[16px] leading-[24px] text-white/80">
                            We are currently engineering a &quot;Multi-Caregiver Node&quot; feature. This
                            will allow multiple users (e.g., two siblings caring for a parent) to
                            securely share a single workspace label. Participation in this feature
                            will be strictly opt-in and require mutual verification.
                        </p>

                        <button className="mt-4 flex items-center gap-2 text-[15px] font-semibold text-[#00B7A8] transition hover:underline">
                            <span>Join the waitlist for Shared Access</span>
                        </button>
                    </div>
                </div>
            </div>
        </section >
    );
}