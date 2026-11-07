"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function EnquirySection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-[#F4F5F9] text-[#16245A] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Explanatory copy & Stepper */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#16245A] tracking-tight leading-tight">
                How a partner enquiry works
              </h2>
              <p className="text-xs sm:text-[14px] text-[#5A6B82] mt-3 max-w-md leading-relaxed">
                Enquiring doesn&apos;t make you a partner automatically. It starts a conversation about eligibility.
              </p>
            </div>

            {/* Stepper Process */}
            <div className="mt-8 space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-[#16245A] bg-transparent shrink-0 mt-0.5" />
                  <div className="w-0.5 bg-[#CBD5E1] h-12 my-1" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#16245A] leading-snug">
                    Choose a plan and tell us about your pharmacy
                  </h3>
                  <p className="text-xs text-[#5A6B82] mt-1 leading-relaxed max-w-sm">
                    Your organisation, your role, where you operate and how to reach you.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-[#16245A] bg-transparent shrink-0 mt-0.5" />
                  <div className="w-0.5 bg-[#CBD5E1] h-12 my-1" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#16245A] leading-snug">
                    ZoikoMeds checks eligibility
                  </h3>
                  <p className="text-xs text-[#5A6B82] mt-1 leading-relaxed max-w-sm">
                    Profiles are claimed and verified first. Chemist Pro trials start after verification.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-[#16245A] bg-transparent shrink-0 mt-0.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#16245A] leading-snug">
                    The partnerships team follows up
                  </h3>
                  <p className="text-xs text-[#5A6B82] mt-1 leading-relaxed max-w-sm">
                    You&apos;ll hear about next steps for your plan. Enterprise Network customers receive a quoted annual contract.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E2E8F0] max-w-xl lg:max-w-none">
              <h3 className="text-xl font-bold text-[#16245A]">
                Become a pharmacy partner
              </h3>
              <p className="text-xs text-[#8896A6] mt-1 mb-6">
                All fields are required. Choosing a plan here doesn&apos;t start billing.
              </p>

              {submitted ? (
                <div className="p-6 bg-[#E6F7F5] rounded-xl border border-[#D0F0EB] text-[#134E48] text-center">
                  <p className="font-bold text-base mb-1">Enquiry submitted successfully!</p>
                  <p className="text-xs">Our partnerships team will follow up with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Organisation Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#16245A] mb-1.5">
                      Organisation name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder=""
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#16245A] focus:outline-none focus:ring-2 focus:ring-[#16245A]/20 focus:border-[#16245A] transition-all bg-white"
                    />
                  </div>

                  {/* Plan Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#16245A] mb-1.5">
                      Plan
                    </label>
                    <div className="relative">
                      <select
                        required
                        defaultValue=""
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#5A6B82] focus:outline-none focus:ring-2 focus:ring-[#16245A]/20 focus:border-[#16245A] transition-all bg-white pr-9"
                      >
                        <option value="" disabled>
                          Choose a plan
                        </option>
                        <option value="network-core">Network Core (Free)</option>
                        <option value="chemist-pro">Chemist Pro ($374 / month)</option>
                        <option value="multi-site-pro">Multi-site Pro ($299 / month)</option>
                        <option value="enterprise-network">Enterprise Network (Custom)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#8896A6] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Your role & Location Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#16245A] mb-1.5">
                        Your role
                      </label>
                      <div className="relative">
                        <select
                          required
                          defaultValue=""
                          className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#5A6B82] focus:outline-none focus:ring-2 focus:ring-[#16245A]/20 focus:border-[#16245A] transition-all bg-white pr-9"
                        >
                          <option value="" disabled>
                            Choose a role
                          </option>
                          <option value="owner">Owner / Pharmacist in charge</option>
                          <option value="manager">Operations / Branch Manager</option>
                          <option value="procurement">Commercial / Procurement Lead</option>
                          <option value="director">Clinical / Medical Director</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#8896A6] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#16245A] mb-1.5">
                        Location
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="State and city, India"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#16245A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#16245A]/20 focus:border-[#16245A] transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Contact Name & Work Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#16245A] mb-1.5">
                        Contact name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder=""
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#16245A] focus:outline-none focus:ring-2 focus:ring-[#16245A]/20 focus:border-[#16245A] transition-all bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#16245A] mb-1.5">
                        Work email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder=""
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-sm text-[#16245A] focus:outline-none focus:ring-2 focus:ring-[#16245A]/20 focus:border-[#16245A] transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        className="mt-0.5 rounded border-[#CBD5E1] text-[#1E3581] focus:ring-[#1E3581]"
                      />
                      <span className="text-xs text-[#5A6B82] leading-tight">
                        I&apos;ve read the privacy notice and agree to be contacted about this enquiry.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-[#1E3581] hover:bg-[#16245A] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-lg transition-colors shadow-sm"
                    >
                      Become a pharmacy partner
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
