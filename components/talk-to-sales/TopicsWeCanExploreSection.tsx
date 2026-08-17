"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TopicsWeCanExploreSection() {
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

  const topicsRow1 = [
    {
      id: 1,
      title: "Platform evaluation",
      description:
        "Understand the ZoikoMeds platform, stakeholder workflows, enterprise fit, and evaluation path.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Medicine Availability Intelligence",
      description:
        "Access signals, shortage awareness, regional visibility, dashboards, and responsible reporting.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  const topicsRow2 = [
    {
      id: 3,
      title: "Pharmacy Network / Participation",
      description:
        "Pharmacy participation, verification, network workflows, and enterprise coordination.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H7"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Wholesale / Distribution Workflows",
      description:
        "Wholesale and distribution participation, aggregated intelligence, partner workflows, and reporting.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
  ];

  const topicsRow3 = [
    {
      id: 5,
      title: "Reports & Intelligence",
      description:
        "Executive reporting, dashboards, recurring briefings, watchlists, and analytics.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 6,
      title: "Integrations & APIs",
      description:
        "Approved enterprise integration requirements and implementation context.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  ];

  const topicsRow4 = [
    {
      id: 7,
      title: "Enterprise Deployment",
      description:
        "Organization scale, regions, support, rollout, roles, governance, and implementation needs.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      id: 8,
      title: "Partnerships",
      description:
        "Approved ecosystem, technology, distribution, or strategic partnership opportunities.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-[#F6F9FC] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            03 &nbsp;&bull;&nbsp; WHAT SALES CAN HELP WITH
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] leading-tight">
            Topics we can explore together.
          </h2>
        </div>

        {/* 2-Column Grid via Flexbox Rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-6"
        >
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-6">
            {topicsRow1.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onClick={() => setSelectedCard(item.id)}
                className={`w-full lg:w-1/2 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border transition-all duration-200 cursor-pointer flex items-start gap-4 text-left ${
                  selectedCard === item.id
                    ? "border-[#13A594] ring-2 ring-[#13A594]/20 shadow-md"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-[#13A5941A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[#101828]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row gap-6">
            {topicsRow2.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onClick={() => setSelectedCard(item.id)}
                className={`w-full lg:w-1/2 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border transition-all duration-200 cursor-pointer flex items-start gap-4 text-left ${
                  selectedCard === item.id
                    ? "border-[#13A594] ring-2 ring-[#13A594]/20 shadow-md"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-[#13A5941A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[#101828]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="flex flex-col lg:flex-row gap-6">
            {topicsRow3.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onClick={() => setSelectedCard(item.id)}
                className={`w-full lg:w-1/2 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border transition-all duration-200 cursor-pointer flex items-start gap-4 text-left ${
                  selectedCard === item.id
                    ? "border-[#13A594] ring-2 ring-[#13A594]/20 shadow-md"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-[#13A5941A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[#101828]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 4 */}
          <div className="flex flex-col lg:flex-row gap-6">
            {topicsRow4.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onClick={() => setSelectedCard(item.id)}
                className={`w-full lg:w-1/2 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border transition-all duration-200 cursor-pointer flex items-start gap-4 text-left ${
                  selectedCard === item.id
                    ? "border-[#13A594] ring-2 ring-[#13A594]/20 shadow-md"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-[#13A5941A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[#101828]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
