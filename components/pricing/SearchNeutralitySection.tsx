"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, Database, X, Eye, Lock, ShieldCheck } from "lucide-react";

export default function SearchNeutralitySection() {
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
      icon: Scale,
      title: "Neutral ranking",
      description:
        "Organic ranking uses medicine match, distance, signal confidence, freshness, and governed policy — never plan code or subscription spend.",
    },
    {
      icon: Database,
      title: "Verified-first source order",
      description:
        "The participating verified pharmacy database is searched first; governed external web discovery is a labeled fallback, never represented as verified participation.",
    },
    {
      icon: X,
      title: "No sponsored placement",
      description:
        "There is no sponsored medicine-search result or paid ranking weight at launch. Availability search is a trust function, not an advertising auction.",
    },
    {
      icon: Eye,
      title: "No exact public stock",
      description:
        "No paid entitlement can expose exact public stock counts. Visibility stays pharmacist-controlled on every tier.",
    },
    {
      icon: Lock,
      title: "No patient-data sale",
      description:
        "No sale of patient-level search behavior, PHI, or prescriptions. Enterprise intelligence stays aggregated, anonymized, and thresholded.",
    },
    {
      icon: ShieldCheck,
      title: "No outcome fees",
      description:
        "No per-search, per-lead, per-confirmation, reservation, or dispensing-success fee. Routing and confirmations are analytics events, not billing events.",
    },
  ];

  return (
    <section className="relative w-full bg-[#0C1B30] text-white py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
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
              05 &nbsp;·&nbsp; SEARCH NEUTRALITY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-white leading-[1.15] tracking-tight">
              Commercial spend never touches medicine search.
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardsData.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-[#FFFFFF08] rounded-2xl p-6 sm:p-7 border border-[#1E2E4A] flex flex-col items-start text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#39D7C41F] border border-[#1E3A5F] flex items-center justify-center mb-6">
                    <IconComponent className="w-5 h-5 text-[#34D6C4]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8E9B93] leading-relaxed font-normal">
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
