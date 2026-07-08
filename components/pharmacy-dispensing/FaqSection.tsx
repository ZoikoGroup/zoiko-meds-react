"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is ZoikoMeds Dispensing?",
    answer:
      "ZoikoMeds Dispensing is a pharmacy workflow support page and product area designed to help authorized pharmacy teams manage prescription workflow visibility, readiness status, patient updates, exception routing, and audit trails. ZoikoMeds does not prescribe, dispense, sell, fulfill, or deliver medicine.",
  },
  {
    question: "Does ZoikoMeds dispense medicine?",
    answer:
      "No. ZoikoMeds does not dispense, sell, fulfill, or deliver medicines. Licensed pharmacies remain responsible for regulated dispensing activities.",
  },
  {
    question: "Who is this page for?",
    answer:
      "This page is intended for authorized pharmacy teams, pharmacists, technicians, managers, compliance reviewers, and pharmacy group administrators managing dispensing workflows.",
  },
  {
    question: "Can ZoikoMeds help reduce dispensing workflow delays?",
    answer:
      "Yes. ZoikoMeds supports workflow visibility, exception management, readiness tracking, and task coordination to help pharmacy teams identify and resolve operational bottlenecks more efficiently.",
  },
  {
    question: "Does ZoikoMeds recommend medication substitutions?",
    answer:
      "No. ZoikoMeds does not provide diagnosis, prescribing, treatment recommendations, or medication substitution guidance. Clinical decisions remain the responsibility of licensed healthcare professionals.",
  },
  {
    question: "Can ZoikoMeds connect to pharmacy inventory workflows?",
    answer:
      "Yes. ZoikoMeds can connect to authorized inventory workflows for internal pharmacy operations while maintaining appropriate access controls and visibility restrictions.",
  },
  {
    question: "Can pharmacy groups use ZoikoMeds across multiple locations?",
    answer:
      "Yes. Pharmacy groups and enterprise organizations can manage workflows, permissions, reporting, and operational performance across multiple locations where permitted.",
  },
  {
    question: "How does a pharmacy get started?",
    answer:
      "Pharmacies can begin through onboarding and implementation setup, including workflow configuration, permissions review, training, and operational readiness planning.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          13 · Frequently asked questions
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Dispensing questions,
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
                  <h3 className="text-sm font-semibold text-[#0D1526]">
                    {faq.question}
                  </h3>

                  <span className="text-lg font-light leading-none text-[#17B3A3]">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-8 pb-7 pr-16">
                    <p className="text-sm leading-8 text-[#364152]">
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
