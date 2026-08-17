"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ChooseRightRouteSection() {
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

  const routes = [
    {
      title: "Organizational inquiries",
      description:
        "Sales is for healthcare, pharmacy, wholesale, manufacturer, public-sector, enterprise, and partner evaluation.",
      iconBg: "bg-[#13A5940D]",
      iconColor: "text-[#13A594]",
      icon: (
        <svg
          className="w-4 h-4"
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
      title: "Product demonstration",
      description:
        "If your main goal is to see the platform in action, a demo is the faster path.",
      iconBg: "bg-[#13A5940D]",
      iconColor: "text-[#13A594]",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Identity / SSO",
      description:
        "If identity architecture is the main topic, use the dedicated SSO requirements review.",
      iconBg: "bg-[#13A5940D]",
      iconColor: "text-[#13A594]",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z"
          />
        </svg>
      ),
    },
    {
      title: "Security / procurement",
      description:
        "For security evidence, questionnaires, privacy/legal, or procurement review, use the controlled route.",
      iconBg: "bg-[#13A5940D]",
      iconColor: "text-[#13A594]",
      icon: (
        <svg
          className="w-4 h-4"
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
      title: "Existing customer",
      description:
        "Existing customers and active pilots should be routed to their account or implementation owner.",
      iconBg: "bg-[#13A5940D]",
      iconColor: "text-[#13A594]",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Patients / medical questions",
      description:
        "ZoikoMeds sales does not provide medical advice, prescribe, dispense, or respond to emergencies.",
      iconBg: "bg-[#FFF4ED]",
      iconColor: "text-[#D97706]",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-[#F6F9FC] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            01 &nbsp;&bull;&nbsp; CHOOSE THE RIGHT ROUTE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] leading-tight">
            Make sure Talk to Sales is the right
            <br className="hidden sm:inline" />
            destination.
          </h2>
        </div>

        {/* 2-row Flexbox Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-6"
        >
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-6">
            {routes.slice(0, 3).map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="w-full lg:w-1/3 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col space-y-4 text-left"
              >
                <div
                  className={`w-9 h-9 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <div className="space-y-2">
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
            {routes.slice(3, 6).map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="w-full lg:w-1/3 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col space-y-4 text-left"
              >
                <div
                  className={`w-9 h-9 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <div className="space-y-2">
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
