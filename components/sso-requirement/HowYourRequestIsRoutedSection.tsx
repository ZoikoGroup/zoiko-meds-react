"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HowYourRequestIsRoutedSection() {
  const routingData = [
    {
      detectedNeed: "Net-new SSO evaluation",
      primaryRoute: "Enterprise intake",
      submitHere: "Yes",
      whatYoullSee:
        "Requirements are reviewed and routed to the appropriate enterprise team.",
      isSupport: false,
    },
    {
      detectedNeed: "Identity architecture is the dominant topic",
      primaryRoute: "Identity & solutions engineering",
      submitHere: "Yes",
      whatYoullSee:
        "A technical summary, with no compatibility promise attached.",
      isSupport: false,
    },
    {
      detectedNeed: "Security questionnaire / procurement evidence",
      primaryRoute: "Security & Procurement Review",
      submitHere: "Yes",
      whatYoullSee:
        "A controlled handoff that preserves your requirement categories.",
      isSupport: false,
    },
    {
      detectedNeed: "Existing customer or active implementation",
      primaryRoute: "Account / Customer Success",
      submitHere: "Yes",
      whatYoullSee:
        "Routed to your account or implementation owner \u2014 no duplicate lead.",
      isSupport: false,
    },
    {
      detectedNeed: "Public-sector or multi-jurisdiction evaluation",
      primaryRoute: "Public-sector owner",
      submitHere: "Yes",
      whatYoullSee:
        "Routed under approved commercial governance, with privacy and legal as needed.",
      isSupport: false,
    },
    {
      detectedNeed: "Broader pricing or commercial discussion",
      primaryRoute: "Talk to Sales",
      submitHere: "Yes",
      whatYoullSee: "Source context carries over to the sales route.",
      isSupport: false,
    },
    {
      detectedNeed: "Support incident \u2014 cannot sign in",
      primaryRoute: "Support / sign-in recovery",
      submitHere: "Support first",
      whatYoullSee: "Treated as support, never as a sales lead.",
      isSupport: true,
    },
    {
      detectedNeed: "Unclear need",
      primaryRoute: "General enterprise triage",
      submitHere: "Yes",
      whatYoullSee: "Submission is never blocked for being unsure.",
      isSupport: false,
    },
  ];

  return (
    <section className="relative w-full bg-[#EEF2F7] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            06 &nbsp;&bull;&nbsp; WHERE REQUESTS GO
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] leading-tight">
            How your request is routed.
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed max-w-xl">
            Routing uses categorical tags only. No form text, real domains,
            tenant identifiers, or contact details are placed in URLs or
            analytics.
          </p>
        </div>

        {/* Table Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              {/* Table Header */}
              <thead>
                <tr className="bg-[#0C1524] text-[#E7EEF6EB] text-[11px] font-semibold uppercase tracking-wider">
                  <th scope="col" className="py-4 px-6 sm:px-8 w-[28%]">
                    Detected Need
                  </th>
                  <th scope="col" className="py-4 px-6 w-[24%]">
                    Primary Route
                  </th>
                  <th scope="col" className="py-4 px-6 w-[15%]">
                    Submit Here?
                  </th>
                  <th scope="col" className="py-4 px-6 sm:px-8 w-[33%]">
                    What You&apos;ll See
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-normal text-[#475467]">
                {routingData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/60 transition-colors duration-150"
                  >
                    {/* Detected Need */}
                    <td className="py-4 px-6 sm:px-8 text-[#101828] font-normal">
                      {row.detectedNeed}
                    </td>

                    {/* Primary Route */}
                    <td className="py-4 px-6 font-bold text-[#101828]">
                      {row.primaryRoute}
                    </td>

                    {/* Submit Here? */}
                    <td className="py-4 px-6 font-medium">
                      {row.isSupport ? (
                        <span className="text-[#D97706] font-semibold">
                          {row.submitHere}
                        </span>
                      ) : (
                        <span className="text-[#13A594] font-semibold">
                          {row.submitHere}
                        </span>
                      )}
                    </td>

                    {/* What You'll See */}
                    <td className="py-4 px-6 sm:px-8 text-[#475467] leading-relaxed">
                      {row.whatYoullSee}
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
