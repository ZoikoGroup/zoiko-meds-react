"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ShareContextFormSection() {
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
  const [additionalContext, setAdditionalContext] = useState("");

  const areasOfInterest = [
    "Platform Overview",
    "Availability Intelligence",
    "Pharmacy Network",
    "Wholesale workflows",
    "AI-assisted insights",
    "Reports",
    "Integrations",
    "Partnership",
    "Enterprise Deployment",
    "SSO / identity",
    "Security / Procurement",
    "Not sure",
  ];

  const preferredOutcomes = [
    "Understand fit",
    "See product",
    "Discuss commercial model",
    "Review architecture",
    "Discuss implementation",
    "Discuss partnership",
    "Prepare procurement",
    "Not sure",
  ];

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const toggleOutcome = (item: string) => {
    setSelectedOutcomes((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  return (
    <section className="relative w-full bg-[#EEF2F7] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            06 &nbsp;&bull;&nbsp; START YOUR SALES CONVERSATION
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-2xl font-bold text-[#101828] leading-tight">
            Share enough context for accurate routing.
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] max-w-140 font-normal leading-relaxed">
            Five short steps. Contact details come last &mdash; and phone and
            budget are never required.
          </p>
        </div>

        {/* Main Grid: Form Left, Sidebar Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col space-y-8 text-left"
          >
            {/* Step Stepper Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-6 overflow-x-auto text-xs font-medium text-gray-400 gap-2">
              <div className="flex items-center space-y-0.5 text-[#101828]">
                <span className="w-6 h-6 rounded-full bg-[#13A594] text-white flex items-center justify-center font-bold text-[11px] mr-2">
                  1
                </span>
                <span className="font-semibold">Objective</span>
              </div>
              <div className="h-px bg-gray-200 flex-1 min-w-[12px] mx-1" />

              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[11px] mr-2 font-medium">
                  2
                </span>
                <span>Organization</span>
              </div>
              <div className="h-px bg-gray-200 flex-1 min-w-[12px] mx-1" />

              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[11px] mr-2 font-medium">
                  3
                </span>
                <span>Needs</span>
              </div>
              <div className="h-px bg-gray-200 flex-1 min-w-[12px] mx-1" />

              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[11px] mr-2 font-medium">
                  4
                </span>
                <span>Evaluation</span>
              </div>
              <div className="h-px bg-gray-200 flex-1 min-w-[12px] mx-1" />

              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[11px] mr-2 font-medium">
                  5
                </span>
                <span>Contact</span>
              </div>
            </div>

            {/* Form Step Title */}
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#101828]">
                Commercial objective
              </h3>
              <p className="text-xs sm:text-sm text-[#475467]">
                Why do you want to talk to ZoikoMeds? This drives how we route
                you.
              </p>
            </div>

            {/* Primary Reason Select */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#101828]">
                Primary reason for contacting sales{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-full bg-[#FBFCFE] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select a reason
                  </option>
                  <option value="evaluation">
                    Evaluating platform features
                  </option>
                  <option value="pricing">Requesting commercial pricing</option>
                  <option value="partnership">Exploring partnership</option>
                  <option value="integration">API & Integration query</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Areas of interest */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#101828]">
                Areas of interest <span className="text-red-500">*</span>{" "}
                <span className="text-gray-400 font-normal">
                  &mdash; select all that apply
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {areasOfInterest.map((item) => {
                  const active = selectedInterests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`px-3.5 py-2 rounded-xl text-[11.5px] font-medium border transition-all duration-150 ${
                        active
                          ? "bg-[#13A594] text-white border-[#13A594] shadow-sm"
                          : "bg-[#F6F9FC] text-[#344054] border-gray-100 hover:bg-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferred conversation outcome */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#101828]">
                Preferred conversation outcome{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {preferredOutcomes.map((item) => {
                  const active = selectedOutcomes.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleOutcome(item)}
                      className={`px-3.5 py-2 rounded-xl text-[11.5px] font-medium border transition-all duration-150 ${
                        active
                          ? "bg-[#13A594] text-white border-[#13A594] shadow-sm"
                          : "bg-[#F6F9FC] text-[#344054] border-gray-100 hover:bg-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional context textarea */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#101828]">
                Additional context{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                rows={3}
                maxLength={500}
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="Human context only. No patient information, medical records, credentials, or confidential inventory."
                className="w-full bg-[#FBFCFE] border border-gray-200 rounded-xl p-4 text-xs sm:text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all resize-none"
              />
              <div className="flex justify-between items-center text-[11px] text-gray-400 pt-1">
                <span>
                  Structured fields route your request; this is just for color.
                </span>
                <span>{additionalContext.length} / 500</span>
              </div>
            </div>

            {/* Submit / Continue Button */}
            <button
              type="button"
              className="w-full bg-[#13A594] hover:bg-[#0f8b7c] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow active:scale-[0.99]"
            >
              Continue
            </button>
          </motion.div>

          {/* Right Column: "What to expect" Dark Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 bg-[#0C1524] text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col space-y-6 text-left border border-slate-800"
          >
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-800">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-[#13A594]" />
              <h3 className="text-base font-bold text-white tracking-wide">
                What to expect
              </h3>
            </div>

            <div className="space-y-6 text-xs sm:text-sm">
              {/* Feature 1 */}
              <div className="flex items-start space-x-3">
                <svg
                  className="w-4 h-4 text-[#13A594] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-1">
                  <h4 className="font-semibold text-white">
                    Reviewed & routed
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-normal text-xs">
                    Your request goes to the accountable commercial or
                    specialist team based on the context you provide.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-3">
                <svg
                  className="w-4 h-4 text-[#13A594] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-1">
                  <h4 className="font-semibold text-white">
                    Contact data last
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-normal text-xs">
                    Business context first; phone and budget are never required
                    to submit.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-3">
                <svg
                  className="w-4 h-4 text-[#13A594] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-1">
                  <h4 className="font-semibold text-white">
                    No repeated context
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-normal text-xs">
                    SSO or security handoffs carry your categories across
                    &mdash; no re-entering the basics.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start space-x-3">
                <svg
                  className="w-4 h-4 text-[#13A594] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div className="space-y-1">
                  <h4 className="font-semibold text-white">No invented SLA</h4>
                  <p className="text-slate-400 leading-relaxed font-normal text-xs">
                    No response-time or meeting promise unless an approved
                    service policy exists.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
