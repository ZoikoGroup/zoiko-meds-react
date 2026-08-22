"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { internalApi } from "@/lib/config";
import { sanitizePhoneInput } from "@/lib/validation";

export default function ShareContextFormSection() {
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
  const [additionalContext, setAdditionalContext] = useState("");

  // Contact Step 5 fields
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // Step 2 & 4 additional fields
  const [orgSize, setOrgSize] = useState("");
  const [timeline, setTimeline] = useState("");

  // Status state
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const steps = [
    { number: 1, label: "Objective" },
    { number: 2, label: "Organization" },
    { number: 3, label: "Needs" },
    { number: 4, label: "Evaluation" },
    { number: 5, label: "Contact" },
  ];

  const handleNextStep = () => {
    setErrorMessage(null);
    if (currentStep === 1 && !selectedReason) {
      setErrorMessage("Please select a primary reason for contacting sales to proceed.");
      return;
    }
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Full name is required.");
      return;
    }

    if (!workEmail.trim() || !workEmail.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    if (!orgName.trim()) {
      setErrorMessage("Organization name is required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(internalApi("talk-to-sales"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primaryReason: selectedReason,
          areasOfInterest: selectedInterests,
          preferredOutcomes: selectedOutcomes,
          additionalContext,
          fullName,
          workEmail,
          orgName,
          phoneNumber,
          jobTitle,
          orgSize,
          timeline,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || "Failed to submit sales request. Please try again.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
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
              {steps.map((step) => {
                const isActive = step.number === currentStep;
                const isCompleted = step.number < currentStep;

                return (
                  <button
                    type="button"
                    key={step.number}
                    onClick={() => {
                      if (isCompleted || step.number === currentStep) {
                        setCurrentStep(step.number);
                      }
                    }}
                    className="flex items-center space-x-1.5 cursor-pointer flex-shrink-0"
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                        isActive
                          ? "bg-[#13A594] text-white"
                          : isCompleted
                            ? "bg-[#13A594]/20 text-[#13A594]"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isCompleted ? "✓" : step.number}
                    </span>
                    <span className={isActive ? "font-semibold text-[#101828]" : "text-gray-400"}>
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs font-medium text-red-700 flex items-center justify-between">
                <span>{errorMessage}</span>
                <button type="button" onClick={() => setErrorMessage(null)} className="text-red-500 font-bold ml-2">✕</button>
              </div>
            )}

            {/* Confirmation State */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-[#EDF8F6] border border-[#0FAA87]/30 rounded-2xl space-y-4 text-center"
              >
                <div className="w-12 h-12 bg-[#0FAA87] text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-md">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[#101828]">
                  Sales Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-[#344054] max-w-lg mx-auto leading-relaxed">
                  Thank you! Your sales request has been submitted to{" "}
                  <span className="font-semibold text-[#101828]">info@zoikomeds.com</span>. Our commercial account specialists will review your requirements and get in touch.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="px-6 py-2.5 bg-[#13A594] hover:bg-[#0f8b7c] text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* STEP 1: OBJECTIVE */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                        STEP 1 OF 5 &nbsp;&bull;&nbsp; OBJECTIVE
                      </span>
                      <h3 className="text-lg font-bold text-[#101828]">
                        Commercial objective
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475467]">
                        Why do you want to talk to ZoikoMeds? This drives how we route you.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Primary reason for contacting sales <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={selectedReason}
                          onChange={(e) => setSelectedReason(e.target.value)}
                          className="w-full bg-[#FBFCFE] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all cursor-pointer"
                        >
                          <option value="" disabled>
                            Select a reason
                          </option>
                          <option value="Evaluating platform features">Evaluating platform features</option>
                          <option value="Requesting commercial pricing">Requesting commercial pricing</option>
                          <option value="Exploring partnership">Exploring partnership</option>
                          <option value="API & Integration query">API & Integration query</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Areas of interest &mdash; <span className="text-gray-400 font-normal">select all that apply</span>
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

                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Preferred conversation outcome <span className="text-gray-400 font-normal">(optional)</span>
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
                  </div>
                )}

                {/* STEP 2: ORGANIZATION */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                        STEP 2 OF 5 &nbsp;&bull;&nbsp; ORGANIZATION
                      </span>
                      <h3 className="text-lg font-bold text-[#101828]">
                        Organization context
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475467]">
                        Tell us about your organization type and size.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Organization size / user count
                      </label>
                      <select
                        value={orgSize}
                        onChange={(e) => setOrgSize(e.target.value)}
                        className="w-full bg-[#FBFCFE] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all cursor-pointer"
                      >
                        <option value="">Select size</option>
                        <option value="1-50 employees">1 - 50 employees</option>
                        <option value="51-250 employees">51 - 250 employees</option>
                        <option value="251-1000 employees">251 - 1,000 employees</option>
                        <option value="1000+ employees">1,000+ employees</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 3: NEEDS */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                        STEP 3 OF 5 &nbsp;&bull;&nbsp; NEEDS
                      </span>
                      <h3 className="text-lg font-bold text-[#101828]">
                        Additional requirements & notes
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475467]">
                        Share any specific business requirements or workflow goals.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Additional context <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <textarea
                        rows={4}
                        maxLength={500}
                        value={additionalContext}
                        onChange={(e) => setAdditionalContext(e.target.value)}
                        placeholder="Human context only. No patient information, medical records, credentials, or confidential inventory."
                        className="w-full bg-[#FBFCFE] border border-gray-200 rounded-xl p-4 text-xs sm:text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all resize-none"
                      />
                      <div className="flex justify-between items-center text-[11px] text-gray-400 pt-1">
                        <span>Structured fields route your request; this is for details.</span>
                        <span>{additionalContext.length} / 500</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: EVALUATION */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                        STEP 4 OF 5 &nbsp;&bull;&nbsp; EVALUATION
                      </span>
                      <h3 className="text-lg font-bold text-[#101828]">
                        Evaluation timeline
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475467]">
                        When are you looking to implement or complete evaluation?
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Target implementation timeframe
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full bg-[#FBFCFE] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all cursor-pointer"
                      >
                        <option value="">Select timeframe</option>
                        <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                        <option value="1 - 3 months">1 - 3 months</option>
                        <option value="3 - 6 months">3 - 6 months</option>
                        <option value="Exploring for future">Exploring for future</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 5: CONTACT */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                        STEP 5 OF 5 &nbsp;&bull;&nbsp; CONTACT DETAILS
                      </span>
                      <h3 className="text-lg font-bold text-[#101828]">
                        Contact details
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475467]">
                        Where should our commercial sales team follow up with you?
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-xl text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#101828]">
                          Work email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-xl text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#101828]">
                          Organization name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          placeholder="Organization or company name"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-xl text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#101828]">
                          Phone number <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(sanitizePhoneInput(e.target.value))}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-xl text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#101828]">
                          Job title / role <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          placeholder="e.g. Director of Procurement"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-xl text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/20 focus:border-[#13A594] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 border border-gray-200 text-[#475467] font-semibold text-xs rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      &larr; Back
                    </button>
                  ) : <div />}

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2.5 bg-[#13A594] hover:bg-[#0f8b7c] text-white font-semibold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                      Continue &rarr;
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-[#13A594] hover:bg-[#0f8b7c] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? "Submitting to info@zoikomeds.com..." : "Submit Sales Inquiry"}
                    </button>
                  )}
                </div>
              </form>
            )}
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
