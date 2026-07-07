"use client"
import { useState } from "react";
import { LucideIcon } from "lucide-react";

import {
    Shield,
    Check,
} from "lucide-react";

interface Criterion {
    icon: LucideIcon;
    title: string;
    description: string;
}

const criteria: Criterion[] = [
    {
        icon: Check,
        title: "Workflow support only",
        description:
            "The licensed pharmacy remains responsible for regulated dispensing.",
    },
    {
        icon: Check,
        title: "Licensed review",
        description:
            "Restricted actions require authorized pharmacist roles.",
    },
    {
        icon: Check,
        title: "No substitution advice",
        description:
            "No diagnosis, prescribing, treatment, or substitution guidance.",
    },
    {
        icon: Check,
        title: "Audit-ready",
        description:
            "Every status change, note, and handoff is captured.",
    },
];

const interestOptions = [
    "Dispensing workflow",
    "Inventory",
    "Patient updates",
    "Reporting",
    "Integrations",
    "Enterprise rollout",
];

export default function JoinNetworkFormSection() {
    const [agreed, setAgreed] = useState(false);
    const [interests, setInterests] = useState<string[]>([]);

    const toggleInterest = (option: string) => {
        setInterests((prev) =>
            prev.includes(option) ? prev.filter((i) => i !== option) : [...prev, option]
        );
    };

    return (
        <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
                    12 · Request a pharmacy demo
                </p>
                <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
                    See ZoikoMeds dispensing workflows
                    {" "}
                    <span className="text-[#0FAA87]">matched to your pharmacy.</span>
                </h2>
                <p className="mt-4 max-w-160 leading-relaxed text-[#566476]">
                    Request a demo, sign in if you're already onboarded, or talk to pharmacy
                    partnerships about your workflow needs.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <form className="rounded-2xl border border-[#D8E2EC] bg-white p-6 shadow-sm lg:col-span-2">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Full name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                                />
                            </div>

                            {/* Work Email */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Work email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="name@pharmacy.org"
                                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Phone number <span className="font-normal text-[#98A2B3]">(optional)</span>
                                </label>
                                <input
                                    type="tel"
                                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                                />
                            </div>

                            {/* Pharmacy */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Pharmacy / organization name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <select className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#344054] outline-none focus:border-[#00A99D]">
                                    <option>Select role</option>
                                    <option>Owner</option>
                                    <option>Pharmacist</option>
                                    <option>Operations Manager</option>
                                    <option>Administrator</option>
                                    <option>Support</option>
                                </select>
                            </div>

                            {/* Pharmacy Type */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Pharmacy type <span className="text-red-500">*</span>
                                </label>
                                <select className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#344054] outline-none focus:border-[#00A99D]">
                                    <option>Select type</option>
                                    <option>Independent</option>
                                    <option>Multi-location</option>
                                    <option>Hospital</option>
                                    <option>Retail Chain</option>
                                </select>
                            </div>

                            {/* Locations */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Number of locations <span className="text-red-500">*</span>
                                </label>
                                <select className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#344054] outline-none focus:border-[#00A99D]">
                                    <option>Select</option>
                                    <option>1</option>
                                    <option>2–5</option>
                                    <option>6–20</option>
                                    <option>20+</option>
                                </select>
                            </div>

                            {/* Country */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Country / region <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. US, UK, EU"
                                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                                />
                            </div>

                            {/* Area of interest */}
                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Area of interest <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {interestOptions.map((option) => (
                                        <label
                                            key={option}
                                            className="flex items-center gap-2 text-sm text-[#344054]"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={interests.includes(option)}
                                                onChange={() => toggleInterest(option)}
                                                className="h-4 w-4 rounded border-gray-300 text-[#00A99D] focus:ring-[#00A99D]"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Current system */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Current system <span className="font-normal text-[#98A2B3]">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. current PMS"
                                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                                    Message <span className="font-normal text-[#98A2B3]">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Specific needs"
                                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                                />
                            </div>
                        </div>

                        <label className="mt-5 flex items-start gap-3 text-sm text-[#344054]">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#00A99D] focus:ring-[#00A99D]"
                            />
                            <span>
                                I consent to be contacted about ZoikoMeds pharmacy participation and
                                acknowledge the{" "}
                                <a href="#" className="text-[#00A99D] hover:underline">
                                    privacy notice.
                                </a>{" "}
                                <span className="text-red-500">*</span>
                            </span>
                        </label>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                            <button
                                type="submit"
                                className="h-12 flex-1 rounded-xl bg-[#00A99D] font-semibold text-white transition hover:bg-[#009487]"
                            >
                                Join Pharmacy Network
                            </button>

                            <button
                                type="button"
                                className="h-12 flex-1 rounded-xl border border-[#D8E2EC] bg-white font-semibold text-[#0D1526] transition hover:bg-gray-50"
                            >
                                Request a Demo
                            </button>
                        </div>

                        {/* Footer Note */}
                        <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#667085]">
                            <span className="mt-1 h-2 w-2 rounded-full border border-[#00A99D]" />
                            <p>
                                A ZoikoMeds representative will review eligibility and onboarding fit.
                                Not medical advice, dispensing, or a pharmacy management system — don't
                                include PHI, prescriptions, or exact stock.
                            </p>
                        </div>

                    </form>
                    <div className="rounded-xl max-h-110 bg-slate-900 p-6">
                        <h3 className="text-sm font-semibold text-white flex gap-4 items-center">
                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                                <Shield size={14} strokeWidth={2} />
                            </span>
                            Workflow foundations</h3>
                        <ul className="mt-8 space-y-4">
                            {criteria.map(({ icon: Icon, title, description }) => (
                                <li key={title} className="flex gap-3">
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                                        <Icon size={14} strokeWidth={2} />
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-white">{title}</p>
                                        <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                                            {description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
