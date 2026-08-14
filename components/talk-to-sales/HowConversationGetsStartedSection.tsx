"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HowConversationGetsStartedSection() {
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

  const steps = [
    {
      stepNumber: 1,
      title: "Tell us what you're evaluating",
      description:
        "Choose the organization type, objective, and areas of interest that matter.",
    },
    {
      stepNumber: 2,
      title: "Add business & deployment context",
      description:
        "Share scope, regions, scale, stage, integrations, and specialist dependencies.",
    },
    {
      stepNumber: 3,
      title: "Review before submitting",
      description:
        "See a readable summary and correct any field without losing progress.",
    },
    {
      stepNumber: 4,
      title: "ZoikoMeds routes the request",
      description:
        "Your request is assigned to the appropriate commercial or specialist team.",
    },
    {
      stepNumber: 5,
      title: "Continue the evaluation",
      description:
        "Use your reference to review trust evidence or continue via demo, SSO, or security routes.",
    },
  ];

  return (
    <section className="relative w-full bg-[#F6F9FC] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            05 &nbsp;&bull;&nbsp; WHAT TO EXPECT
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] leading-tight">
            How the conversation gets started.
          </h2>
        </div>

        {/* 5-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5"
        >
          {steps.map((step) => (
            <motion.div
              key={step.stepNumber}
              variants={cardVariants}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col space-y-4 text-left transition-all duration-200 hover:border-gray-200 hover:shadow-md"
            >
              {/* Circular Step Badge */}
              <div className="w-8 h-8 rounded-full bg-[#13A594] text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
                {step.stepNumber}
              </div>

              <div className="">
                <h3 className="text-[12.8px] mb-2 font-bold text-[#101828]">
                  {step.title}
                </h3>
                <p className="text-[11.8px] text-[#475467] font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
