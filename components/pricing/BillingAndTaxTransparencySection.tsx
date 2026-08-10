"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Percent,
  Building,
  CreditCard,
  FileText,
  Info,
  LucideIcon,
} from "lucide-react";

interface CardData {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CARDS_DATA: CardData[] = [
  {
    icon: Percent,
    title: "Jurisdiction-aware tax",
    description:
      "SaaS, API, and data taxes are calculated by jurisdiction and customer status — no hard-coded global rate.",
  },
  {
    icon: Building,
    title: "No medicine sales tax",
    description:
      "ZoikoMeds isn't the medicine seller, so medicine retail tax stays with the dispensing pharmacy. We bill only our own services.",
  },
  {
    icon: CreditCard,
    title: "No processor surcharge",
    description:
      'Standard payment-processing fees are absorbed in published self-serve pricing — no add-on "processor fee" line item.',
  },
  {
    icon: FileText,
    title: "Privacy-safe invoices",
    description:
      "Invoices identify plan, locations, and totals — never patient names, medicine names, or search history.",
  },
];

export default function BillingAndTaxTransparencySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <section className="relative w-full bg-[#EEF2F7] text-[#1D1D1F] py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="relative max-w-6xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-8 md:gap-10"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 text-left max-w-3xl"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-[1px] text-[#13A594] uppercase block">
              07 &nbsp;·&nbsp; BILLING &amp; TAX TRANSPARENCY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-[#101828] leading-[1.15] tracking-tight">
              Clear invoices, jurisdiction-aware tax.
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CARDS_DATA.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-start text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E6F6F4] flex items-center justify-center flex-shrink-0 mb-5">
                    <IconComponent className="w-4.5 h-4.5 text-[#13A594]" />
                  </div>
                  <h3 className="text-base font-bold text-[#101828] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed font-normal">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Note Callout Banner */}
          <motion.div
            variants={itemVariants}
            className="border-l-4 border-[#0C1B30] rounded-l-[10px] p-4 sm:p-5 flex items-start gap-3.5 text-left"
          >
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <Info className="w-3.5 h-3.5 text-[#101828]" />
            </div>
            <p className="text-xs sm:text-sm text-[#344054] leading-relaxed font-normal">
              Prices are managed as approved catalog records by market and
              currency. The public $99–$299 range is shown for guidance only;
              checkout always displays the exact amount before authorization.
              Annual savings, where offered, reflect an approved annual price.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
