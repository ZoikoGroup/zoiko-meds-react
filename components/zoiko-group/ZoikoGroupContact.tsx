"use client"
import React, { useState } from "react";

const fadeUp = (delay: number): React.CSSProperties => ({
    animation: `fadeUp 0.6s ease-out ${delay}s both`,
});


const fields = [
    {
        label: "Work email",
        name: "workEmail",
        type: "email",
        placeholder: "name@organization.org",
        required: true,
    },
    {
        label: "Full name",
        name: "fullName",
        type: "text",
        placeholder: "Full name",
        required: true,
    },
    {
        label: "Organization name",
        name: "orgName",
        type: "text",
        placeholder: "Organization",
        required: true,
    },
];

export default function ZoikoGroupContact() {
    const [form, setForm] = useState({
        workEmail: "",
        fullName: "",
        orgName: "",
        inquiryType: "",
        note: "",
    });

    const handleChange = (key: keyof typeof form) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <section className="bg-[#EEF2F7] px-6 py-16 md:px-16">
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <div id="contact" className="mx-auto max-w-5xl">
                <p style={fadeUp(0)} className="text-xs font-semibold tracking-[2px] text-[#13A594]">
                    06 · CONTACT ZOIKO GROUP
                </p>
                <h2 style={fadeUp(0.05)} className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
                    Start a <span className="text-[#0FAA87]">corporate conversation.</span>
                </h2>
                <p style={fadeUp(0.1)} className="mt-4 max-w-140 text-sm text-[#566476]">
                    Tell us the nature of your inquiry. We route it to the right Zoiko Group, Zoiko Healthcare,
                    ZoikoMeds, enterprise, press, careers, or partnership team.
                </p>

                <form
                    onSubmit={handleSubmit}
                    style={fadeUp(0.2)}
                    className="mt-3 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8"
                >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label className="text-sm font-medium text-[#2B3A4F]">
                                    {field.label}
                                    {field.required && <span className="text-[#B42318]"> *</span>}
                                </label>

                                <input
                                    type={field.type}
                                    required={field.required}
                                    placeholder={field.placeholder}
                                    value={form[field.name as keyof typeof form]}
                                    onChange={handleChange(field.name as keyof typeof form)}
                                    className="mt-2 w-full rounded-lg border border-[#CDD7E3] bg-[#FBFCFE] px-4 py-2.5 text-sm outline-none focus:border-teal-500"
                                />
                            </div>
                        ))}

                        {/* Inquiry Type */}
                        <div>
                            <label className="text-sm font-medium text-[#2B3A4F]">
                                Inquiry type <span className="text-[#B42318]">*</span>
                            </label>

                            <select
                                required
                                value={form.inquiryType}
                                onChange={handleChange("inquiryType")}
                                className="mt-2 w-full rounded-lg border border-[#CDD7E3] bg-[#FBFCFE] px-4 py-2.5 text-sm appearance-none outline-none focus:border-teal-500"
                            >
                                <option value="">Select type</option>
                                <option value="institutional">Institutional Briefing</option>
                                <option value="press">Press Inquiry</option>
                                <option value="partnership">Partnership</option>
                                <option value="careers">Careers</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Textarea */}
                        <div className="sm:col-span-2">
                            <label className="text-sm font-medium text-[#2B3A4F]">
                                Brief note about your inquiry <span className="text-[#7C8A9B]">(optional)</span>
                            </label>

                            <textarea
                                rows={4}
                                placeholder="A short summary of what you need."
                                value={form.note}
                                onChange={handleChange("note")}
                                className="mt-2 w-full resize-none rounded-lg border border-[#CDD7E3] bg-[#FBFCFE] px-4 py-3 text-sm outline-none focus:border-teal-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full rounded-lg cursor-pointer bg-[#13A594] py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                        Send Inquiry
                    </button>

                    <div className="mt-4 flex items-center gap-2">
                        <img src="/zoiko-group/governed.png" alt="image" />
                        <p className="text-xs w-[550px] text-[#566476]">Don't include patient or medical details, prescription data, insert work, identified pharmacy,
                            or sequence claim documents, or sensitive info in this form.</p>
                    </div>
                </form>
            </div>
        </section>
    );
}
