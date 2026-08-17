"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function SSORequirementsFormSection() {
  const [currentStep] = useState(1);
  const [deploymentScopes, setDeploymentScopes] = useState<string[]>([]);
  const [ssoRequirements, setSsoRequirements] = useState<string[]>([]);

  const toggleDeploymentScope = (item: string) => {
    setDeploymentScopes((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const toggleSsoRequirement = (item: string) => {
    setSsoRequirements((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const steps = [
    { number: 1, label: "Organization" },
    { number: 2, label: "Identity" },
    { number: 3, label: "Provisioning" },
    { number: 4, label: "Rollout" },
    { number: 5, label: "Contact" },
  ];

  const deploymentScopeOptions = [
    "Single organization",
    "Multiple business units",
    "Multiple domains",
    "Multiple countries / regions",
    "Partner / external access",
    "Not sure",
  ];

  const ssoRequirementOptions = [
    "Federation",
    "MFA / access conditions",
    "Provisioning / lifecycle",
    "Roles / mapping",
    "Testing / rollout",
    "Security / procurement",
    "Not sure",
  ];

  return (
    <section className="relative w-full bg-[#F6F9FC] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            05 &nbsp;&bull;&nbsp; SSO REQUIREMENTS REVIEW
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-3xl font-bold text-[#101828] leading-tight">
            Describe your requirements in five short steps.
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed max-w-xl">
            Contact details come last. Nothing here asks for credentials,
            secrets, certificates, metadata, or patient data &mdash; and there
            is no public file upload.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Card (8 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-8 text-left"
          >
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-6 overflow-x-auto gap-2">
              {steps.map((step, idx) => {
                const isActive = step.number === currentStep;
                const isCompleted = step.number < currentStep;

                return (
                  <React.Fragment key={step.number}>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          isActive
                            ? "bg-[#13A594] text-white"
                            : isCompleted
                              ? "bg-[#13A594]/20 text-[#13A594]"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.number}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isActive
                            ? "text-[#101828] font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-4 sm:w-8 h-[1px] bg-gray-200 flex-shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Step Subheader */}
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                STEP 1 OF 5 &nbsp;&bull;&nbsp; ORGANIZATION & USE CASE
              </span>
              <h3 className="text-lg font-bold text-[#101828]">
                Organization & use case
              </h3>
              <p className="text-[13.3px] max-w-xl text-[#566476] font-normal leading-relaxed">
                Who you are, what you are evaluating, and the shape of the
                deployment. This drives which requirement steps matter most.
              </p>
            </div>

            {/* Form Fields */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Organization Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#101828]">
                  Organization name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your organization"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                />
                <p className="text-[11px] text-gray-400">
                  Used to identify the evaluating entity. We do not infer it
                  from your email domain.
                </p>
              </div>

              {/* Grid: Type & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#101828]">
                    Organization type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all">
                    <option value="">Select type</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="healthcare">Healthcare Provider</option>
                    <option value="government">
                      Government / Public Sector
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#101828]">
                    Country / primary operating region{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all">
                    <option value="">Select country/region</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="eu">Europe</option>
                    <option value="global">Global / Multiple</option>
                  </select>
                </div>
              </div>

              {/* Grid: Relationship & Stage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#101828]">
                    Relationship to ZoikoMeds{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all">
                    <option value="">Select relationship</option>
                    <option value="prospective">Prospective Customer</option>
                    <option value="existing">Existing Customer</option>
                    <option value="partner">Partner / Integrator</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#101828]">
                    Evaluation stage <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all">
                    <option value="">Select stage</option>
                    <option value="early">Early Exploration</option>
                    <option value="active">Active Evaluation</option>
                    <option value="procurement">Procurement / Legal</option>
                  </select>
                </div>
              </div>

              {/* Expected user population */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#101828]">
                  Expected user population{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <select className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all">
                  <option value="">Select</option>
                  <option value="1-100">1 - 100 users</option>
                  <option value="101-500">101 - 500 users</option>
                  <option value="501-2500">501 - 2,500 users</option>
                  <option value="2500+">2,500+ users</option>
                </select>
                <p className="text-[11px] text-gray-400">
                  A range only. Do not submit user lists, rosters, or exact
                  directory counts.
                </p>
              </div>

              {/* Deployment scope */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#101828]">
                  Deployment scope <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 max-w-xl">
                  {deploymentScopeOptions.map((opt) => {
                    const selected = deploymentScopes.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleDeploymentScope(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          selected
                            ? "bg-[#13A594]/10 border-[#13A594] text-[#13A594]"
                            : "bg-[#F6F9FC] border-gray-200 text-[#475467] hover:border-gray-300"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-gray-400">
                  Surfaces architecture complexity. Select at least one, or
                  choose &quot;Not sure&quot;.
                </p>
              </div>

              {/* SSO requirement areas */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#101828]">
                  SSO requirement areas <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 max-w-xl">
                  {ssoRequirementOptions.map((opt) => {
                    const selected = ssoRequirements.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleSsoRequirement(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          selected
                            ? "bg-[#13A594]/10 border-[#13A594] text-[#13A594]"
                            : "bg-[#F6F9FC] border-gray-200 text-[#475467] hover:border-gray-300"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-gray-400">
                  Drives which later questions are shown. Selecting a card
                  higher on this page pre-selects these for you.
                </p>
              </div>

              {/* Submit / Continue Button */}
              <div className="pt-4">
                <button
                  type="button"
                  className="w-full py-3 px-4 bg-[#13A594] hover:bg-[#108B7D] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors duration-150 text-center"
                >
                  Continue to identity &amp; federation
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Sidebar Cards (4 Columns) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5 text-left">
            {/* Card 1: What we ask — and never ask */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#0C1524] text-white rounded-2xl p-6 shadow-sm space-y-5"
            >
              <div className="flex items-center space-x-2 border-b border-gray-800 pb-4">
                <span className="w-2 h-2 rounded-full border border-teal-400"></span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  What we ask &mdash; and never ask
                </h4>
              </div>

              <div className="space-y-4 text-xs">
                {/* Check 1 */}
                <div className="flex items-start space-x-2.5">
                  <svg
                    className="w-4 h-4 text-[#13A594] flex-shrink-0 mt-0.5"
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
                  <div>
                    <strong className="block text-white font-semibold">
                      Requirement categories
                    </strong>
                    <span className="text-gray-400">
                      Provider, protocol, MFA, lifecycle, mapping, environment,
                      and review needs &mdash; as categories.
                    </span>
                  </div>
                </div>

                {/* Check 2 */}
                <div className="flex items-start space-x-2.5">
                  <svg
                    className="w-4 h-4 text-[#13A594] flex-shrink-0 mt-0.5"
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
                  <div>
                    <strong className="block text-white font-semibold">
                      Architecture shape
                    </strong>
                    <span className="text-gray-400">
                      Domains, business units, regions, and partner access at
                      the level of shape, not inventory.
                    </span>
                  </div>
                </div>

                {/* Cross 1 */}
                <div className="flex items-start space-x-2.5">
                  <svg
                    className="w-4 h-4 text-[#34D6C4] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <div>
                    <strong className="block text-white font-semibold">
                      Never: secrets or keys
                    </strong>
                    <span className="text-gray-400">
                      No passwords, private keys, API keys, client secrets,
                      tokens, or session cookies.
                    </span>
                  </div>
                </div>

                {/* Cross 2 */}
                <div className="flex items-start space-x-2.5">
                  <svg
                    className="w-4 h-4 text-[#34D6C4] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <div>
                    <strong className="block text-white font-semibold">
                      Never: metadata or certificates
                    </strong>
                    <span className="text-gray-400">
                      No raw assertions, tokens, signed metadata, or certificate
                      bundles. There is no public upload.
                    </span>
                  </div>
                </div>

                {/* Cross 3 */}
                <div className="flex items-start space-x-2.5">
                  <svg
                    className="w-4 h-4 text-[#34D6C4] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <div>
                    <strong className="block text-white font-semibold">
                      Never: patient data
                    </strong>
                    <span className="text-gray-400">
                      No patient names, identifiers, prescriptions, or clinical
                      records &mdash; in any field.
                    </span>
                  </div>
                </div>

                {/* Cross 4 */}
                <div className="flex items-start space-x-2.5">
                  <svg
                    className="w-4 h-4 text-[#34D6C4] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <div>
                    <strong className="block text-white font-semibold">
                      Never: rosters or logs
                    </strong>
                    <span className="text-gray-400">
                      No employee lists, identity dumps, production logs, or
                      incident reports.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: If this isn't the right route */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3"
            >
              <h4 className="text-xs font-bold text-[#101828]">
                If this isn&apos;t the right route
              </h4>
              <ul className="space-y-2 text-xs font-medium text-[#475467]">
                <li>
                  <a
                    href="/talk-to-sales"
                    className="hover:text-[#13A594] transition-colors flex items-center space-x-1.5"
                  >
                    <span className="text-[#34D6C4]">&rarr;</span>{" "}
                    <span>Talk to Sales &mdash; broader commercial scope</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/security"
                    className="hover:text-[#13A594] transition-colors flex items-center space-x-1.5"
                  >
                    <span className="text-[#34D6C4]">&rarr;</span>{" "}
                    <span>Security &amp; Procurement Review</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-[#13A594] transition-colors flex items-center space-x-1.5"
                  >
                    <span className="text-[#34D6C4]">&rarr;</span>{" "}
                    <span>
                      Can&apos;t sign in &mdash; support &amp; recovery
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://zoiko-meds-platform.vercel.app/login"
                    className="hover:text-[#13A594] transition-colors flex items-center space-x-1.5"
                  >
                    <span className="text-[#34D6C4]">&rarr;</span>{" "}
                    <span>Existing customer &mdash; account route</span>
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Card 3: Your progress */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-2"
            >
              <h4 className="text-xs font-bold text-[#101828]">
                Your progress
              </h4>
              <p className="text-xs text-[#475467] leading-relaxed">
                Answers are preserved when you move backward or edit from the
                review step. Nothing is submitted until you choose{" "}
                <strong className="font-semibold text-[#101828]">
                  Submit SSO requirements
                </strong>
                , and no form values appear in the page URL.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
