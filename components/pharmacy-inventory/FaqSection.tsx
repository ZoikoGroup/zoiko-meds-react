"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is ZoikoMeds Inventory?",
    answer:
      "ZoikoMeds Inventory is a pharmacy availability visibility workflow that helps pharmacies manage medicine availability signals, stock-risk alerts, demand insights, and verified network participation through controlled, permission-based tools.",
  },
  {
    question: "Does ZoikoMeds publicly show exact pharmacy stock quantities?",
    answer:
      "No. ZoikoMeds is designed to expose availability signals rather than exact stock counts. Visibility is permission-based and helps pharmacies communicate availability without revealing sensitive inventory quantities.",
  },
  {
    question: "Can pharmacies update medicine availability in ZoikoMeds?",
    answer:
      "Yes. Authorized pharmacy users can update medicine availability signals, review stock-risk alerts, and manage watchlists through role-based workflows and audit-supported controls.",
  },
  {
    question: "Is ZoikoMeds a pharmacy management system?",
    answer:
      "No. ZoikoMeds is an inventory visibility and availability workflow platform. It supports pharmacies with availability signals, demand insights, reporting, and governance but does not replace pharmacy management systems.",
  },
  {
    question: "How does ZoikoMeds help pharmacies reduce availability calls?",
    answer:
      "ZoikoMeds reduces repetitive availability inquiries by providing structured availability signals, confidence indicators, and controlled visibility, helping patients find medicines without requiring frequent phone calls.",
  },
  {
    question: "Can multi-location pharmacies use ZoikoMeds Inventory?",
    answer:
      "Yes. Multi-location pharmacies can standardize availability updates, manage permissions, monitor participation, and review reporting across multiple branches from a centralized workflow.",
  },
  {
    question: "Does ZoikoMeds provide medical advice?",
    answer:
      "No. ZoikoMeds does not diagnose conditions, recommend treatments, prescribe medicines, or provide medical advice. Clinical decisions remain the responsibility of licensed healthcare professionals.",
  },
  {
    question: "How can a pharmacy get started?",
    answer:
      "Pharmacies can begin by onboarding their organization, configuring permissions, setting up medicine watchlists, defining availability workflows, and training authorized staff to use the platform.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          12 · Frequently asked questions
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Inventory questions,
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
