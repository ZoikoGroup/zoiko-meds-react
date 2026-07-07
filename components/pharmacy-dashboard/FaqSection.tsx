"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is the ZoikoMeds Pharmacy Dashboard?",
    answer:
      "The ZoikoMeds Pharmacy Dashboard is a secure pharmacy participation console that helps pharmacies manage availability signals, verification tasks, access inquiries, reporting, and network participation workflows.",
  },
  {
    question: "Is ZoikoMeds pharmacy management software?",
    answer:
      "No. ZoikoMeds is not a pharmacy management system, dispensing platform, or electronic health record. It supports participation, verification, and access intelligence workflows.",
  },
  {
    question: "Does the dashboard publicly show exact inventory quantities?",
    answer:
      "No. Public visibility uses confidence states and approved visibility rules rather than exposing exact inventory quantities.",
  },
  {
    question: "Can independent pharmacies use the dashboard?",
    answer:
      "Yes. Independent pharmacies can participate, manage availability signals, verify access information, and benefit from reporting and visibility tools.",
  },
  {
    question: "Can pharmacy groups manage multiple locations?",
    answer:
      "Yes. Multi-location organizations can centrally manage locations, staff permissions, participation activity, and reporting from a single dashboard.",
  },
  {
    question: "Does ZoikoMeds provide medical advice or dispensing?",
    answer:
      "No. ZoikoMeds does not diagnose, prescribe, recommend treatments, or dispense medicines. It provides operational and participation infrastructure only.",
  },
  {
    question: "How can a pharmacy get started?",
    answer:
      "Submit an onboarding request. After eligibility review and profile setup, approved pharmacies receive access to the dashboard and participation workflows.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          12 · Frequently asked questions
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Pharmacy Dashboard questions,
          {" "}
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
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <h3 className="text-[18px] font-semibold text-[#0D1526]">
                    {faq.question}
                  </h3>

                  <span className="text-3xl font-light leading-none text-[#17B3A3]">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-8 pb-7 pr-16">
                    <p className="text-lg leading-8 text-[#364152]">
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
