"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewConfirmFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the ZoikoMeds SSO requirements review?",
      answer:
        "It is an initial evaluation process where your organization outlines its identity, federation, and authentication expectations to determine architectural compatibility before implementation.",
    },
    {
      question: "Does ZoikoMeds support my identity provider?",
      answer:
        "ZoikoMeds integrates with major enterprise Identity Providers (IdPs) including Okta, Microsoft Entra ID (Azure AD), Ping Identity, Google Workspace, and SAML/OIDC compliant systems.",
    },
    {
      question: "Can I request SAML 2.0 or OpenID Connect?",
      answer:
        "Yes, both SAML 2.0 and OpenID Connect (OIDC) standards are supported for single sign-on federation depending on your enterprise subscription and security requirements.",
    },
    {
      question: "Can I request SCIM provisioning?",
      answer:
        "Yes. Automated user lifecycle management and deprovisioning via SCIM 2.0 can be evaluated and configured as part of your enterprise setup.",
    },
    {
      question: "Does SSO control ZoikoMeds roles and permissions?",
      answer:
        "SSO handles authentication. Fine-grained roles and authorization permissions within ZoikoMeds can be mapped through SAML/OIDC group claims or configured directly within the platform governance settings.",
    },
    {
      question:
        "Can I send my metadata, certificate, or security questionnaire here?",
      answer:
        "You can initiate the request here. Once your inquiry is routed, our security and engineering teams will provide a secure portal for exchanging XML metadata, certificates, or compliance questionnaires.",
    },
    {
      question: "What information should I not submit?",
      answer:
        "Do not submit sensitive credentials, private keys, client secrets, patient data (PHI), medical records, or live production tenant tokens on this initial review form.",
    },
    {
      question: "What if my organization already uses ZoikoMeds?",
      answer:
        "Existing clients should reach out directly to their assigned Account Executive or Implementation Owner to streamline technical updates without initiating duplicate sales leads.",
    },
    {
      question: "Can I also request a security or procurement review?",
      answer:
        "Yes, you can combine SSO requirements with broader security, SOC 2, HIPAA compliance, or procurement evaluations during this intake process.",
    },
    {
      question: "How quickly will ZoikoMeds respond?",
      answer:
        "Our solutions engineering and enterprise intake teams typically review requests and respond within 1 to 2 business days.",
    },
    {
      question: "Does ZoikoMeds provide medical advice through this process?",
      answer:
        "No. ZoikoMeds is an enterprise software platform. This intake form is strictly for administrative, technical, and commercial reviews, not clinical or patient inquiries.",
    },
  ];

  return (
    <section className="relative w-full bg-[#F6F9FC] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            07 &nbsp;&bull;&nbsp; QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] leading-tight">
            What this review can and cannot confirm.
          </h2>
        </div>

        {/* Accordion Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="transition-colors duration-150">
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#101828] group-hover:text-[#13A594] transition-colors pr-4">
                    {faq.question}
                  </span>

                  {/* Toggle Icon */}
                  <span className="text-[#13A594] flex-shrink-0 flex items-center justify-center">
                    {isOpen ? (
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </span>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 px-6 sm:px-8 text-xs sm:text-sm text-[#475467] font-normal leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
