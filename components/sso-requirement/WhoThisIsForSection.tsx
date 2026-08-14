"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function WhoThisIsForSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  } as const;

  const options = [
    {
      id: 1,
      title: "Evaluating ZoikoMeds",
      description:
        "New or active buying evaluation. Full SSO requirement flow with commercial context.",
    },
    {
      id: 2,
      title: "Planning implementation",
      description:
        "Fit is already being evaluated or approved. Emphasis on rollout, testing, and dependencies.",
    },
    {
      id: 3,
      title: "Existing customer / partner",
      description:
        "You already have a ZoikoMeds relationship. Routed to your account or implementation owner.",
    },
    {
      id: 4,
      title: "Security or procurement review",
      description:
        "Evidence, questionnaire, DPA, or vendor review is the primary need.",
    },
    {
      id: 5,
      title: "Not sure",
      description:
        "Proceed in plain language. No identity expertise is required to complete this form.",
    },
  ];

  return (
    <section className="relative w-full bg-[#EEF2F7] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            04 &nbsp;&bull;&nbsp; WHO THIS IS FOR
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-180 font-bold text-[#101828] leading-tight">
            Tell us where you are &mdash; the form adapts, not hides.
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed max-w-xl">
            One lightweight question so copy and routing can be tailored. Every
            option leads to the same full requirements flow.
          </p>
        </div>

        {/* 5-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3"
        >
          {options.map((option) => {
            const isSelected = selectedCard === option.id;

            return (
              <motion.div
                key={option.id}
                variants={cardVariants}
                onClick={() => setSelectedCard(option.id)}
                className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 text-left select-none ${
                  isSelected
                    ? "border-[#13A594] ring-2 ring-[#13A594]/20 shadow-md"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="">
                  <h3 className="text-[13px] font-bold text-[#101828] leading-snug">
                    {option.title}
                  </h3>
                  <p className="text-xs mt-2 text-[#475467] font-normal leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
