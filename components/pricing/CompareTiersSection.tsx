"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

export default function CompareTiersSection() {
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

  const tableData = [
    // Row 1: Header Row (bg-[#0C1B30]) -> handled in thead

    // Row 2: Category Header (bg-[#102540])
    { type: "category", label: "PATIENT & ACCESS" },
    // Row 3: Data Row (bg-white)
    {
      type: "data",
      capability: "Medicine availability search",
      values: [true, true, true, true],
    },
    // Row 4: Data Row (bg-[#F6F9FC])
    {
      type: "data",
      capability: "Saved searches & alerts",
      values: [true, true, true, true],
    },
    // Row 5: Data Row (bg-white)
    {
      type: "data",
      capability: "Caregiver organization",
      values: [true, true, true, true],
    },

    // Row 6: Category Header (bg-[#102540])
    { type: "category", label: "PHARMACY PARTICIPATION" },
    // Row 7: Data Row (bg-[#F6F9FC])
    {
      type: "data",
      capability: "Verified pharmacy profile",
      values: [false, true, true, true],
    },
    // Row 8: Data Row (bg-white)
    {
      type: "data",
      capability: "Availability confidence signals",
      values: [false, true, true, true],
    },
    // Row 9: Data Row (bg-[#F6F9FC])
    {
      type: "data",
      capability: "Confirmation request routing",
      values: [false, true, true, true],
    },
    // Row 10: Data Row (bg-white)
    {
      type: "data",
      capability: "Manual / API / SFTP feed",
      values: [false, true, true, true],
    },

    // Row 11: Category Header (bg-[#102540])
    { type: "category", label: "OPERATIONAL INTELLIGENCE" },
    // Row 12: Data Row (bg-[#F6F9FC])
    {
      type: "data",
      capability: "Local demand dashboards",
      values: [false, false, true, true],
    },
    // Row 13: Data Row (bg-white)
    {
      type: "data",
      capability: "Unfulfilled-search insights",
      values: [false, false, true, true],
    },
    // Row 14: Data Row (bg-[#F6F9FC])
    {
      type: "data",
      capability: "Restock signal analytics",
      values: [false, false, true, true],
    },
    // Row 15: Data Row (bg-white)
    {
      type: "data",
      capability: "Advanced request routing",
      values: [false, false, true, true],
    },

    // Row 16: Category Header (bg-[#102540])
    { type: "category", label: "ENTERPRISE & INTEGRATION" },
    // Row 17: Data Row (bg-[#F6F9FC])
    {
      type: "data",
      capability: "Multi-location governance",
      values: [false, false, false, true],
    },
    // Row 18: Data Row (bg-white)
    {
      type: "data",
      capability: "Headless APIs & SLAs",
      values: [false, false, false, true],
    },
    // Row 19: Data Row (bg-[#F6F9FC])
    {
      type: "data",
      capability: "Aggregate intelligence & data feeds",
      values: [false, false, false, true],
    },
    // Row 20: Data Row (bg-white)
    {
      type: "data",
      capability: "Billing unit",
      textValues: ["—", "Location", "Paid location", "Contract"],
    },
  ];

  // Helper function to render table cell values cleanly without rowspans/colspans
  const renderValue = (val: boolean | string) => {
    if (typeof val === "boolean") {
      return val ? (
        <Check className="w-4 h-4 text-[#13A594] inline-block" />
      ) : (
        <Minus className="w-4 h-4 text-gray-300 inline-block" />
      );
    }
    return <span className="font-mono text-xs text-gray-600">{val}</span>;
  };

  let dataRowIndex = 0;

  return (
    <section className="relative w-full bg-[#EEF2F7] text-[#1D1D1F] py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden min-h-screen flex items-center justify-center">
      <div className="relative max-w-6xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="space-y-2 text-left">
            <span className="text-xs sm:text-sm font-semibold tracking-[1px] text-[#13A594] uppercase block">
              04 &nbsp;·&nbsp; COMPARE TIERS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-[#0D1B2E] leading-[1.15] tracking-tight">
              What's included at each tier.
            </h2>
          </motion.div>

          {/* Table Outer Container */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200/20"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                {/* Row 1: First Row Background #0C1B30 */}
                <thead>
                  <tr className="bg-[#0C1B30] text-white">
                    <th className="py-4 px-6 font-semibold w-2/5">
                      Capability
                    </th>
                    <th className="py-4 px-4 font-semibold text-center w-1/5">
                      <div className="flex flex-col items-center">
                        <span>Patient</span>
                        <span className="text-[10px] text-gray-400 font-normal mt-0.5">
                          Free
                        </span>
                      </div>
                    </th>
                    <th className="py-4 px-4 font-semibold text-center w-1/5">
                      <div className="flex flex-col items-center">
                        <span>Network Core</span>
                        <span className="text-[10px] text-gray-400 font-normal mt-0.5">
                          $0 / location
                        </span>
                      </div>
                    </th>
                    <th className="py-4 px-4 font-semibold text-center w-1/5">
                      <div className="flex flex-col items-center">
                        <span>Intelligence Pro</span>
                        <span className="text-[10px] text-gray-400 font-normal mt-0.5">
                          $99–299 / location
                        </span>
                      </div>
                    </th>
                    <th className="py-4 px-4 font-semibold text-center w-1/5">
                      <div className="flex flex-col items-center">
                        <span>Enterprise</span>
                        <span className="text-[10px] text-gray-400 font-normal mt-0.5">
                          Custom
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((row, index) => {
                    if (row.type === "category") {
                      // Rows 2, 6, 11, 15 Category Headers Background #102540
                      return (
                        <tr key={index} className="bg-[#102540]">
                          <td className="py-2.5 px-6 text-[11px] font-bold tracking-wider text-[#13A594] uppercase">
                            {row.label}
                          </td>
                          <td className="py-2.5 px-4"></td>
                          <td className="py-2.5 px-4"></td>
                          <td className="py-2.5 px-4"></td>
                          <td className="py-2.5 px-4"></td>
                        </tr>
                      );
                    }

                    // Alternating background logic for data rows: white and #F6F9FC
                    const isEvenDataRow = dataRowIndex % 2 === 0;
                    dataRowIndex++;
                    const bgClass = isEvenDataRow ? "bg-white" : "bg-[#F6F9FC]";

                    return (
                      <tr
                        key={index}
                        className={`${bgClass} transition-colors border-b border-gray-100/50 hover:bg-slate-50`}
                      >
                        <td className="py-3.5 px-6 font-medium text-[#101828]">
                          {row.capability}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {row.values
                            ? renderValue(row.values[0])
                            : renderValue(row.textValues![0])}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {row.values
                            ? renderValue(row.values[1])
                            : renderValue(row.textValues![1])}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {row.values
                            ? renderValue(row.values[2])
                            : renderValue(row.textValues![2])}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {row.values
                            ? renderValue(row.values[3])
                            : renderValue(row.textValues![3])}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
