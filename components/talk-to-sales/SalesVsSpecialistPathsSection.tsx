"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SalesVsSpecialistPathsSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  } as const;

  const tableData = [
    {
      need: "A broad commercial conversation",
      route: "Talk to Sales",
      continueHere: "Yes",
      statusType: "yes",
      why: "This page is the correct broad commercial gateway.",
    },
    {
      need: "To see the product",
      route: "Book a Demo",
      continueHere: "Yes",
      statusType: "yes",
      why: "A demo is more direct, but sales remains available.",
    },
    {
      need: "SSO / identity architecture review",
      route: "Discuss SSO Requirements",
      continueHere: "Yes",
      statusType: "yes",
      why: "The dedicated flow captures identity context safely.",
    },
    {
      need: "Security evidence / procurement review",
      route: "Security & Procurement Review",
      continueHere: "Yes",
      statusType: "yes",
      why: "A controlled-evidence path avoids generic lead-form misuse.",
    },
    {
      need: "You're an existing customer / pilot",
      route: "Account / Customer Success",
      continueHere: "Yes",
      statusType: "yes",
      why: "Avoids duplicate net-new leads while preserving expansion context.",
    },
    {
      need: "Can't sign in / need support",
      route: "Support / Sign-in recovery",
      continueHere: "Support first",
      statusType: "warning",
      why: "The commercial queue shouldn't delay support.",
    },
    {
      need: "A patient or medical question",
      route: "Patient / public information",
      continueHere: "Not here",
      statusType: "danger",
      why: "Sales does not provide medical advice or emergency help.",
    },
  ];

  return (
    <section className="relative w-full bg-[#EEF2F7] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            04 &nbsp;&bull;&nbsp; SALES VS SPECIALIST PATHS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] leading-tight">
            Not sure where to start? Here&apos;s the map.
          </h2>
        </div>

        {/* Table Container Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              {/* Header Row */}
              <thead>
                <tr className="bg-[#0C1524] text-white uppercase text-[11px] font-semibold tracking-wider">
                  <th className="py-4 px-6 w-[28%]">WHAT YOU NEED</th>
                  <th className="py-4 px-6 w-[27%]">RECOMMENDED ROUTE</th>
                  <th className="py-4 px-6 w-[18%]">CONTINUE HERE?</th>
                  <th className="py-4 px-6 w-[27%]">WHY</th>
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-normal text-[#475467]">
                {tableData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/60 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 text-[#101828] font-medium">
                      {row.need}
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#101828]">
                      {row.route}
                    </td>
                    <td className="py-4 px-6 font-semibold">
                      {row.statusType === "yes" && (
                        <span className="text-[#13A594]">
                          {row.continueHere}
                        </span>
                      )}
                      {row.statusType === "warning" && (
                        <span className="text-[#D97706] font-mono text-xs">
                          {row.continueHere}
                        </span>
                      )}
                      {row.statusType === "danger" && (
                        <span className="text-[#D97706] font-mono text-xs">
                          {row.continueHere}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-[#667085] leading-relaxed">
                      {row.why}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
