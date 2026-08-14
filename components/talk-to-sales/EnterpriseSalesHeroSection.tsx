"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EnterpriseSalesHeroSection() {
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
    <section className="relative w-full bg-gradient-to-b from-[#F6F9FC] to-[#EEF2F7] text-[#1D1D1F] py-24 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
    
      <div className="relative max-w-6xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12"
        >
          {/* Left Side: Content */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 flex flex-col space-y-6 text-left"
          >
            {/* Eyebrow */}
            <span className="text-xs tracking-[1px] sm:text-sm font-semibold text-[#13A594] uppercase block">
              Enterprise Sales
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-[38px] font-bold text-[#101828] leading-[1.15]">
              Talk to ZoikoMeds About Your Organization&apos;s Medicine
              Availability Strategy
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-[#475467] leading-relaxed font-normal">
              Tell us what you are evaluating &mdash; platform access, pharmacy
              or wholesale workflows, enterprise deployment, integrations,
              reporting, security review, or partnership needs. We&apos;ll use
              the context to route you to the right commercial or specialist
              team.
            </p>

            {/* Action Button */}
            <div className="pt-2 flex">
              <button className="bg-[#13A594] hover:bg-[#0f8779] text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors duration-200 shadow-sm">
                Book Demo
              </button>
            </div>

            {/* Verification / Notice Note */}
            <div className="flex items-start gap-2.5 pt-3">
              <svg
                className="w-4 h-4 text-[#13A594] flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-[13px] max-w-95 sm:text-xs text-[#667085] leading-relaxed">
                For organizational and commercial inquiries. Do not submit
                patient information, medical records, prescriptions,
                credentials, or emergency requests.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 flex justify-center items-center"
          >
            <img
              src="/talk-to-sales/hero.png"
              alt="Talk to ZoikoMeds About Your Organization's Medicine Availability Strategy"
              className="w-full h-auto rounded-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
