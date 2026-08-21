"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { internalApi } from "@/lib/config";

export default function SSORequirementsFormSection() {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [countryRegion, setCountryRegion] = useState("");
  const [relationship, setRelationship] = useState("");
  const [evaluationStage, setEvaluationStage] = useState("");
  const [expectedUsers, setExpectedUsers] = useState("");
  const [deploymentScopes, setDeploymentScopes] = useState<string[]>([]);
  const [ssoRequirements, setSsoRequirements] = useState<string[]>([]);

  // Step 2 & 3 & 4 fields
  const [idpProvider, setIdpProvider] = useState("");
  const [ssoProtocol, setSsoProtocol] = useState("");
  const [provisioningType, setProvisioningType] = useState("");

  // Step 5 Contact fields
  const [contactName, setContactName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [notes, setNotes] = useState("");

  // Status state
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleNextStep = () => {
    setErrorMessage(null);
    if (currentStep === 1) {
      if (!organizationName.trim()) {
        setErrorMessage("Please enter your organization name to continue.");
        return;
      }
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

    if (!organizationName.trim()) {
      setErrorMessage("Organization name is required.");
      setCurrentStep(1);
      return;
    }

    if (!contactName.trim()) {
      setErrorMessage("Contact name is required.");
      return;
    }

    if (!workEmail.trim() || !workEmail.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(internalApi("sso-requirement"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName,
          organizationType,
          countryRegion,
          relationship,
          evaluationStage,
          expectedUsers,
          deploymentScopes,
          ssoRequirements,
          idpProvider,
          ssoProtocol,
          provisioningType,
          contactName,
          workEmail,
          jobTitle,
          notes,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || "Failed to submit SSO requirements. Please try again.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

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
                    <button
                      type="button"
                      onClick={() => {
                        if (isCompleted || step.number === currentStep) {
                          setCurrentStep(step.number);
                        }
                      }}
                      className="flex items-center space-x-2 flex-shrink-0 cursor-pointer"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                          isActive
                            ? "bg-[#13A594] text-white"
                            : isCompleted
                              ? "bg-[#13A594]/20 text-[#13A594]"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? "✓" : step.number}
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
                    </button>
                    {idx < steps.length - 1 && (
                      <div className="w-4 sm:w-8 h-[1px] bg-gray-200 flex-shrink-0" />
                    )}
                  </React.Fragment>
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
                  SSO Requirements Submitted
                </h3>
                <p className="text-xs sm:text-sm text-[#344054] max-w-lg mx-auto leading-relaxed">
                  Thank you! Your requirements review has been dispatched directly to{" "}
                  <span className="font-semibold text-[#101828]">info@zoikomeds.com</span>. Our enterprise security and architecture team will review your specifications and reach out shortly.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="px-6 py-2.5 bg-[#13A594] hover:bg-[#108B7D] text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    Submit Another Requirement Review
                  </button>
                </div>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* STEP 1: ORGANIZATION */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                        STEP 1 OF 5 &nbsp;&bull;&nbsp; ORGANIZATION & USE CASE
                      </span>
                      <h3 className="text-lg font-bold text-[#101828]">
                        Organization & use case
                      </h3>
                      <p className="text-[13.3px] max-w-xl text-[#566476] font-normal leading-relaxed">
                        Who you are, what you are evaluating, and the shape of the deployment.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Organization name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        placeholder="Your organization"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#101828]">
                          Organization type
                        </label>
                        <select
                          value={organizationType}
                          onChange={(e) => setOrganizationType(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                        >
                          <option value="">Select type</option>
                          <option value="Enterprise">Enterprise</option>
                          <option value="Healthcare Provider">Healthcare Provider</option>
                          <option value="Government / Public Sector">Government / Public Sector</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#101828]">
                          Country / primary operating region
                        </label>
                        <select
                          value={countryRegion}
                          onChange={(e) => setCountryRegion(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                        >
                          <option value="">Select country/region</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="Europe">Europe</option>
                          <option value="Global / Multiple">Global / Multiple</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#101828]">
                          Relationship to ZoikoMeds
                        </label>
                        <select
                          value={relationship}
                          onChange={(e) => setRelationship(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                        >
                          <option value="">Select relationship</option>
                          <option value="Prospective Customer">Prospective Customer</option>
                          <option value="Existing Customer">Existing Customer</option>
                          <option value="Partner / Integrator">Partner / Integrator</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#101828]">
                          Evaluation stage
                        </label>
                        <select
                          value={evaluationStage}
                          onChange={(e) => setEvaluationStage(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                        >
                          <option value="">Select stage</option>
                          <option value="Early Exploration">Early Exploration</option>
                          <option value="Active Evaluation">Active Evaluation</option>
                          <option value="Procurement / Legal">Procurement / Legal</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Expected user population
                      </label>
                      <select
                        value={expectedUsers}
                        onChange={(e) => setExpectedUsers(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                      >
                        <option value="">Select range</option>
                        <option value="1 - 100 users">1 - 100 users</option>
                        <option value="101 - 500 users">101 - 500 users</option>
                        <option value="501 - 2,500 users">501 - 2,500 users</option>
                        <option value="2,500+ users">2,500+ users</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Deployment scope
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
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-[#101828]">
                        SSO requirement areas
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
                    </div>
                  </div>
                )}

                {/* STEP 2: IDENTITY & FEDERATION */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                        STEP 2 OF 5 &nbsp;&bull;&nbsp; IDENTITY & FEDERATION
                      </span>
                      <h3 className="text-lg font-bold text-[#101828]">
                        Identity provider & federation
                      </h3>
                      <p className="text-[13.3px] max-w-xl text-[#566476] font-normal leading-relaxed">
                        Specify your primary identity provider and protocol requirements.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Primary Identity Provider (IdP)
                      </label>
                      <select
                        value={idpProvider}
                        onChange={(e) => setIdpProvider(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                      >
                        <option value="">Select IdP</option>
                        <option value="Microsoft Entra ID / Azure AD">Microsoft Entra ID (Azure AD)</option>
                        <option value="Okta">Okta</option>
                        <option value="Ping Identity">Ping Identity</option>
                        <option value="Google Workspace">Google Workspace</option>
                        <option value="Auth0">Auth0</option>
                        <option value="Custom / Other">Custom / Other SAML Provider</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Preferred Protocol
                      </label>
                      <select
                        value={ssoProtocol}
                        onChange={(e) => setSsoProtocol(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                      >
                        <option value="">Select protocol</option>
                        <option value="SAML 2.0">SAML 2.0</option>
                        <option value="OIDC / OAuth 2.0">OIDC / OpenID Connect</option>
                        <option value="WS-Federation">WS-Federation</option>
                        <option value="Flexible / Either">Flexible / Either</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 3: PROVISIONING */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                        STEP 3 OF 5 &nbsp;&bull;&nbsp; PROVISIONING & LIFECYCLE
                      </span>
                      <h3 className="text-lg font-bold text-[#101828]">
                        Provisioning & user lifecycle
                      </h3>
                      <p className="text-[13.3px] max-w-xl text-[#566476] font-normal leading-relaxed">
                        How accounts, attributes, and user deprovisioning should be managed.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Provisioning mechanism
                      </label>
                      <select
                        value={provisioningType}
                        onChange={(e) => setProvisioningType(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                      >
                        <option value="">Select provisioning method</option>
                        <option value="Just-In-Time (JIT)">Just-In-Time (JIT) Provisioning</option>
                        <option value="SCIM 2.0">SCIM 2.0 Automated Lifecycle</option>
                        <option value="Manual Admin Provisioning">Manual Admin Invitation</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 4: ROLLOUT */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                        STEP 4 OF 5 &nbsp;&bull;&nbsp; ROLLOUT & GOVERNANCE
                      </span>
                      <h3 className="text-lg font-bold text-[#101828]">
                        Rollout timeline & security review
                      </h3>
                      <p className="text-[13.3px] max-w-xl text-[#566476] font-normal leading-relaxed">
                        Expected deployment timeline and security review process.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Additional architecture / governance notes
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any specific MFA requirements, IP restriction policies, or domain verification details..."
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 5: CONTACT & SUBMIT */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-[1px] uppercase">
                        STEP 5 OF 5 &nbsp;&bull;&nbsp; CONTACT DETAILS
                      </span>
                      <h3 className="text-lg font-bold text-[#101828]">
                        Contact details & review dispatch
                      </h3>
                      <p className="text-[13.3px] max-w-xl text-[#566476] font-normal leading-relaxed">
                        Where should our enterprise architecture team send your SSO specifications?
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#101828]">
                        Contact name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Full name"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
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
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#101828]">
                          Job title / role
                        </label>
                        <input
                          type="text"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          placeholder="e.g. Lead Identity Architect / CISO"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FBFCFE] border border-gray-200 rounded-lg text-[#101828] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13A594]/30 focus:border-[#13A594] transition-all"
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
                      className="px-6 py-2.5 bg-[#13A594] hover:bg-[#108B7D] text-white font-semibold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                      Continue &rarr;
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-[#13A594] hover:bg-[#108B7D] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? "Submitting to info@zoikomeds.com..." : "Submit SSO requirements"}
                    </button>
                  )}
                </div>
              </form>
            )}
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
                      bundles.
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
                    <span>Can&apos;t sign in &mdash; support &amp; recovery</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
