"use client"

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is ZoikoMeds API Access?",
    answer:
      "ZoikoMeds API Access is a secure enterprise integration layer that lets approved organizations connect medicine availability signals, pharmacy network intelligence, shortage indicators, and reporting outputs into authorized systems.",
  },
  {
    question: "Who can use ZoikoMeds API Access?",
    answer:
      "Hospital systems, clinic networks, pharmacy networks, distributors, manufacturers, and public health or government bodies can request access after organizational review and approval.",
  },
  {
    question: "Does ZoikoMeds API Access provide medical advice?",
    answer:
      "No. ZoikoMeds API Access does not diagnose, prescribe, recommend treatments, or provide clinical guidance. It delivers operational and access intelligence only.",
  },
  {
    question: "Can ZoikoMeds APIs be used to sell or dispense medicine?",
    answer:
      "No. The APIs do not support selling, dispensing, or transacting medicine. They provide availability signals, reporting, and participation infrastructure only.",
  },
  {
    question: "Does the API expose exact pharmacy inventory quantities?",
    answer:
      "No. Endpoints return confidence-based availability signals rather than exact inventory counts, protecting sensitive pharmacy and supply data.",
  },
  {
    question: "What types of integrations can ZoikoMeds support?",
    answer:
      "Availability signals, pharmacy network status, shortage intelligence, reports, alerts and webhooks, analytics export, and custom integrations for approved use cases.",
  },
  {
    question: "Is sandbox access available?",
    answer:
      "Yes. Approved prospects receive sandbox credentials, sample payloads, and mock data so integrations can be tested before any production go-live.",
  },
  {
    question: "How do organizations request API access?",
    answer:
      "Submit an API Access Briefing request. Our enterprise and integration teams review use case, systems, geography, and security requirements before approval.",
  },
];

export default function ApiAccessFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          11 · Frequently asked questions
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          API Access questions,{" "}
          <span className="text-[#0FAA87]">answered.</span>
        </h2>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#D8E2EC] bg-white">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={faq.question}
                className={i !== faqs.length - 1 ? "border-b border-[#D8E2EC]" : ""}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-8 py-5 text-left"
                >
                  <h3 className="text-sm font-semibold text-[#0D1526]">
                    {faq.question}
                  </h3>

                  <span className="text-lg font-light leading-none text-[#17B3A3]">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-8 pb-6 pr-16">
                    <p className="text-sm leading-relaxed text-[#566476]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
