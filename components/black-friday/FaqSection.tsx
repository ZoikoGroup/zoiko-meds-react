"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Does ZoikoMeds sell or discount medicines?",
    answer:
      "No. ZoikoMeds is an availability and discovery infrastructure platform. We never sell, ship, dispense, or discount medicines.",
  },
  {
    question: "Is there a Black Friday discount for pharmacy partners?",
    answer:
      "Yes. Eligible new pharmacy partners receive 25% off their first three months on Chemist Pro and Multi-site Pro subscriptions. Standard pricing resumes from month four.",
  },
  {
    question: "Does submitting an enquiry make me a partner?",
    answer:
      "No. Submitting an enquiry initiates an eligibility review. Our team verifies your pharmacy credentials and licences before partner status or trial access is granted.",
  },
  {
    question: "Where are the plans available?",
    answer:
      "Partner plans are available across India for independent pharmacies, pharmacy groups, chains, and hospital networks in eligible operating regions.",
  },
  {
    question: "Does ZoikoMeds guarantee a medicine is in stock?",
    answer:
      "No. ZoikoMeds publishes pharmacy-verified availability signals, but physical inventory can fluctuate in real-time. We do not provide absolute stock guarantees.",
  },
  {
    question: "What happens when the Chemist Pro trial ends?",
    answer:
      "When your 30-day trial ends, your account smoothly moves to the free Network Core plan. Your pharmacy listing and availability sync continue uninterrupted with no forced charges.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white text-[#16245A] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#16245A] tracking-tight leading-tight">
              Questions from
              <br />
              pharmacies
            </h2>
            <p className="text-xs sm:text-[14px] text-[#5A6B82] mt-3 max-w-sm leading-relaxed">
              Straight answers about the partnership and this campaign.
            </p>
          </div>

          {/* Right Column: Accordion Questions */}
          <div className="lg:col-span-7">
            <div className="border-t border-[#E2E8F0]">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="border-b border-[#E2E8F0] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-[15px] font-bold text-[#16245A] group-hover:text-[#00A99D] transition-colors">
                        {faq.question}
                      </span>
                      <span className="shrink-0 text-[#5C6EA6] group-hover:text-[#00A99D] transition-colors">
                        {isOpen ? (
                          <Minus className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pb-5 pt-1 text-xs sm:text-sm text-[#5A6B82] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
