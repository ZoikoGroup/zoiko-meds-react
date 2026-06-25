"use client"
import { useState } from "react";

export default function SearchHero() {
    const [medicine, setMedicine] = useState("");
    const [location, setLocation] = useState("");
    const [radius, setRadius] = useState("10 mi")

    return (
        <section className="bg-gradient-to-r from-[#F6F9FC] to-[#EEF2F7] py-16 font-sans">
            <div className="max-w-4xl mx-auto px-6">

                <p className="text-center text-[12px] font-bold leading-[17px] tracking-[1.84px] uppercase text-[#13A594] mb-4">
                    Search Medicines
                </p>

                {/* Heading */}
                <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#081A13] leading-tight tracking-tight mb-3">
                    Check if your medicine may be{" "}
                    <span className="text-[#0FAA87]">available near you.</span>
                </h1>

                <p className="text-center text-[16px] tracking-nomal text-[#566476] mb-10 max-w-[483px] mx-auto leading-relaxed">
                    Search availability signals from participating verified pharmacies. No account needed to start.
                </p>

                {/* Search card */}
                <div className="md:relative md:right-25 w-full md:min-w-[1032px] mx-auto bg-white rounded-2xl border border-[#E2E8F0] px-6 py-8 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {/* Medicine name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-[#2B3A4F]">Medicine name</label>
                            <input
                                type="text"
                                placeholder="Enter medicine name, brand, or generic"
                                value={medicine}
                                onChange={(e) => setMedicine(e.target.value)}
                                className="w-full md:min-h-[52px] border border-[#D1D5E0] rounded-lg px-4 py-2.5 text-[14px] placeholder-[#7C8A9B] focus:outline-none focus:border-[#1D9E75] transition-colors bg-[#FBFCFE]"
                            />
                            <p className="text-[12px] text-[#7C8A9B]">
                                You can include strength or form if you know it, such as 20 mg tablet.
                            </p>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-[#2B3A4F]">Location</label>
                            <input
                                type="text"
                                placeholder="City, ZIP code, postcode, or current location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full md:min-h-[52px] border border-[#D1D5E0] rounded-lg px-4 py-2.5 text-[14px]  placeholder-[#7C8A9B] focus:outline-none focus:border-[#1D9E75] transition-colors bg-[#FBFCFE]"
                            />
                            <button className="flex items-center gap-1 text-[13px] font-medium text-[#13A594] w-fit">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#13A594" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                                </svg>
                                Use my current location
                            </button>
                            <p className="text-[12px] text-[#7C8A9B]">
                                Use your area to find nearby pharmacy availability signals.
                            </p>
                        </div>
                    </div>

                    {/* Search radius + CTA */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-[13px] font-semibold text-[#2B3A4F]">Search radius</span>
                            <div className="flex gap-2">
                                {["5 mi", "10 mi", "25 mi", "50 mi"].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRadius(r)}
                                        className={`min-h-[40px] w-[66px] px-3.5 py-1.5 bg-[#FBFCFE] rounded-[9px] text-[13px] border transition-colors ${radius === r
                                            ? "border-[#13A594] bg-[#13A5941A] border-2 text-[#0F8B7D] font-semibold"
                                            : "border-[#D1D5E0] text-[#3A4A5C]"
                                            }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="border border-[#13A594] w-full md:w-[650px] flex items-center justify-center gap-2 bg-[#13A594] hover:bg-[#128f81] cursor-pointer text-white font-semibold text-[14px] px-5 md:px-7 py-4 rounded-lg transition-colors duration-150">                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                        </svg>
                            Search Availability
                        </button>
                    </div>

                    {/* Add strength toggle */}
                    <button className="flex items-center gap-1 text-[14px] font-medium text-[#13A594] my-4">
                        Add strength or form (optional)
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#13A594" strokeWidth="2.5">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>

                    {/* Disclaimer */}
                    <div className="flex items-start gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <p className="text-[13px] text-[#566476] leading-relaxed">
                            Availability is a signal, not a guarantee. Confirm directly with the pharmacy before traveling.
                        </p>
                    </div>
                </div>

                {/* Sub link */}
                <p className="text-center mt-5 text-[14.4px] text-[#13A594] font-medium cursor-pointer">
                    How availability signals work
                </p>
            </div>
        </section>
    );
}
