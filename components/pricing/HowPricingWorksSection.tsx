"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, RefreshCw, ShieldCheck } from "lucide-react";

export default function HowPricingWorksSection() {
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

  const cardsData = [
    {
      icon: MapPin,
      title: "Per verified location",
      description:
        "Intelligence Pro is billed per verified paid pharmacy location — not per staff user, patient search, confirmation request, prescription, or dispensing outcome.",
    },
    {
      icon: RefreshCw,
      title: "Add & remove cleanly",
      description:
        "Added locations activate after verification and prorate to your renewal. Removed or closed locations release capacity immediately; a paid license can be reassigned within the same verified organization.",
    },
    {
      icon: ShieldCheck,
      title: "Verified before paid",
      description:
        "Claims, pending verification, rejected locations, and internal, demo, or pilot records are never billable. Only an activated, verified location with an authorized payer can be charged.",
    },
  ];

  return (
    <section className="relative w-full bg-[#F6F9FC] text-[#1D1D1F] py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="relative max-w-6xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-10 md:gap-12"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 text-left max-w-3xl"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-[1px] text-[#13A594] uppercase block">
              03 &nbsp;·&nbsp; HOW PRICING WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-[#101828] leading-[1.15] tracking-tight">
              The billing unit is the verified pharmacy location.
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cardsData.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-start text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E6F6F4] flex items-center justify-center mb-6">
                    <IconComponent className="w-5 h-5 text-[#13A594]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#101828] mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed font-normal">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
