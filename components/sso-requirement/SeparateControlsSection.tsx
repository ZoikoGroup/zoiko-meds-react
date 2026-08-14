"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SeparateControlsSection() {
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

  const controls = [
    {
      id: 1,
      title: "Authentication / SSO",
      description:
        "SSO establishes an authentication relationship between an approved identity system and ZoikoMeds.",
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Authorization",
      description:
        "ZoikoMeds access is governed through approved roles and permissions.",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Provisioning",
      description:
        "User lifecycle synchronization may be evaluated separately from authentication.",
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "MFA / conditional access",
      description:
        "Your organization can describe MFA and conditional-access expectations as part of the review.",
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Security evidence",
      description:
        "Public authentication and security evidence is available through the Trust Center where approved.",
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
  ];

  return (
    <section className="relative w-full bg-[#F6F9FC] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            01 &nbsp;&bull;&nbsp; WHAT THIS REVIEW COVERS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-3xl font-bold text-[#101828] leading-tight">
            Authentication, access, and lifecycle are separate controls.
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed max-w-xl">
            Read these boundaries before you describe your requirements &mdash;
            they determine what the review can and cannot confirm.
          </p>
        </div>

        {/* 5-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-4"
        >
          {controls.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col space-y-4 text-left transition-all duration-200 hover:border-gray-200 hover:shadow-md"
            >
              {/* Icon Badge */}
              <div className="w-8 h-8 rounded-lg bg-[#13A5941A] flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>

              <div className="">
                <h3 className="text-[13px] mb-2 font-bold text-[#101828] leading-snug">
                  {item.title}
                </h3>
                <p className="text-[12.5px] text-[#475467] font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Informational Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 border-l-4 border-l-[#1F6FB2] flex items-start space-x-4 text-left"
        >
          {/* Info Icon */}
          <div className="w-7 h-7 rounded-full bg-blue-50 text-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Callout Text */}
          <p className="text-xs sm:text-sm text-[#475467] leading-relaxed font-normal">
            This page is a{" "}
            <strong className="font-semibold text-[#101828]">
              requirements review
            </strong>
            , not an SSO setup console. Configuration endpoints, ACS URLs,
            entity IDs, certificates, client IDs, secrets, metadata files,
            callback URLs, and tenant identifiers belong in securely exchanged
            implementation documentation after compatibility and entitlement are
            confirmed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
