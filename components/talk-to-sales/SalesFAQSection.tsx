"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SalesFAQSection() {
  // First item open by default to match screenshot
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Who should use Talk to Sales?",
      answer:
        "Organizations evaluating ZoikoMeds for healthcare, pharmacy, wholesale or distribution, manufacturer, public-sector, enterprise, integration, deployment, or partnership needs.",
    },
    {
      question: "Should I book a demo or talk to sales?",
      answer:
        "If you want a direct walkthrough of the product interface, booking a demo is faster. If you need custom commercial terms, deployment discussion, or broad evaluations, Talk to Sales is best.",
    },
    {
      question: "Can I discuss SSO with sales?",
      answer:
        "Yes! Our sales team can discuss SSO and identity architecture requirements or direct you to our dedicated SSO evaluation flow.",
    },
    {
      question: "Can I send a security questionnaire here?",
      answer:
        "You can initiate the security review request here, and we will direct you to our controlled-evidence security and procurement portal.",
    },
    {
      question: "Does Talk to Sales provide pricing?",
      answer:
        "Yes, our commercial specialists provide custom pricing models based on your organization scale, regional scope, and deployment needs.",
    },
    {
      question: "Does ZoikoMeds sell or dispense medicine?",
      answer:
        "No. ZoikoMeds provides availability intelligence, regional visibility, and workflow software. We do not sell or dispense pharmaceutical products.",
    },
    {
      question:
        "Can patients use this form for medicine advice or emergencies?",
      answer:
        "No. This form is strictly for commercial and enterprise inquiries. Patients seeking medical advice or emergency help should contact their healthcare provider or emergency services immediately.",
    },
    {
      question: "What if my organization already works with ZoikoMeds?",
      answer:
        "Existing customers or pilot partners can connect directly with their assigned Account / Customer Success representative to avoid duplicate leads.",
    },
  ];

  return (
    <section className="relative w-full bg-[#F6F9FC] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            08 &nbsp;&bull;&nbsp; FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] leading-tight">
            Sales & scope questions, answered.
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
