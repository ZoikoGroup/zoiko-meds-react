"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  BarChart2,
  Building2,
  Check,
  Globe,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlansSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );
  const [showVolumePricing, setShowVolumePricing] = useState(true);

  const router = useRouter();

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

  const volumePricingRows = [
    {
      locations: "1",
      monthly: "$149",
      annual: "$1,490",
      equivalent: "( Equivalent to $124.17 / month )",
    },
    {
      locations: "2 - 5",
      monthly: "$139",
      annual: "$1,390",
      equivalent: "( Equivalent to $115.83 / month )",
    },
    {
      locations: "6 - 20",
      monthly: "$129",
      annual: "$1,290",
      equivalent: "( Equivalent to $107.50 / month )",
    },
    {
      locations: "21+",
      monthly: "Contact Sales",
      annual: "Contact Sales",
      equivalent: "Enterprise Network",
      isEnterprise: true,
    },
  ];

  return (
    <section
      id="plans"
      className="relative w-full bg-[#EEF2F7] text-[#1D1D1F] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 font-sans antialiased"
    >
      <div className="relative max-w-6xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-10"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="space-y-3 text-center">
            <span className="text-xs font-semibold tracking-[2px] text-[#13A594] uppercase block">
              02 &nbsp;·&nbsp; PLANS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[35px] max-w-2xl mx-auto font-bold text-[#0F1F4E] leading-[1.2] tracking-tight">
              Four access tiers, one commercial source of truth.
            </h2>
            <p className="text-[#5B6478] leading-relaxed max-w-2xl mx-auto text-sm font-normal pt-1">
              Commercial entitlement is separate from eligibility: a paid
              pharmacy can still be <br />
              governed by verification, controlled-medicine policy,
              jurisdiction, and data-quality rules.
            </p>
          </motion.div>

          {/* Toggle & Controls Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2"
          >
            <div className="hidden sm:block sm:w-48" />{" "}
            {/* Spacer for symmetry */}
            {/* Monthly / Annual Toggle */}
            <div className="bg-white p-1 rounded-full border border-[#E7EAF1] shadow-sm flex items-center gap-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-150 ${
                  billingCycle === "monthly"
                    ? "bg-[#13A594] text-white shadow-sm"
                    : "text-[#5B6478] hover:text-[#0F1F4E]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-150 ${
                  billingCycle === "annual"
                    ? "bg-[#13A594] text-white shadow-sm"
                    : "text-[#5B6478] hover:text-[#0F1F4E]"
                }`}
              >
                Annual - 2 months free
              </button>
            </div>
            {/* Region & Currency Selector */}
            <div className="flex flex-col items-end gap-1">
              <button className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#E7EAF1] text-xs font-semibold text-[#0F1F4E] shadow-sm hover:bg-gray-50">
                <Globe className="w-4 h-4 text-[#5B6478]" />
                <span>United States . USD</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5B6478]" />
              </button>
              <p className="text-[11px] text-[#8892A6] flex items-center gap-1">
                <Info className="w-3 h-3 inline" /> Prices exclude applicable
                taxes.
              </p>
            </div>
          </motion.div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Network Core */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-7 border border-[#E7EAF1] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E6F6F4] flex items-center justify-center mb-6">
                  <Store className="w-5 h-5 text-[#13A594]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F1F4E]">
                  Network Core
                </h3>
                <p className="text-[10px] text-[#8892A6] tracking-[1.5px] uppercase font-semibold mt-1 mb-5">
                  VERIFIED NETWORK PARTICIPATION
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-[#13A594] tracking-tight">
                    Free
                  </span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {[
                    "Claimed + verified pharmacy profile",
                    "Availability confidence signals",
                    "Manual, API, or SFTP feed",
                    "Confirmation request routing",
                    "Pharmacist visibility controls",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#13A594] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#5B6478] leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => router.push("/join-the-network")}
                  className="w-full cursor-pointer py-3 px-4 rounded-xl border-2 border-[#13A594] text-[#13A594] font-semibold text-[15px] hover:bg-[#E6F6F4] transition-colors"
                >
                  Join the Network
                </button>
                <p className="text-[11px] text-[#8892A6] text-center mt-3">
                  No card Required. No pay-to-rank.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Intelligence Pro (Popular) */}
            <motion.div
              variants={itemVariants}
              className="relative bg-white rounded-2xl p-7 border-2 border-[#13A594] shadow-[0_8px_30px_rgba(15,170,135,0.12)] flex flex-col justify-between"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#13A594] text-white text-[10px] font-medium tracking-[1px] uppercase px-3 py-1 rounded-full">
                MOST POPULAR
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E6F6F4] flex items-center justify-center mb-6">
                  <BarChart2 className="w-5 h-5 text-[#13A594]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F1F4E]">
                  Intelligence Pro
                </h3>
                <p className="text-[10px] text-[#8892A6] tracking-[1.5px] uppercase font-semibold mt-1 mb-5">
                  PRIVACY-SAFE OPERATIONAL INTELLIGENCE
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#13A594] tracking-tight">
                      $149
                    </span>
                    <span className="text-xs text-[#8892A6]">
                      / Verification location
                    </span>
                  </div>
                </div>

                <p className="text-xs font-semibold text-[#0F1F4E] mb-3">
                  Everything in Network Core, plus:
                </p>

                <ul className="space-y-3.5 mb-8">
                  {[
                    "Local demand dashboards",
                    "Unfulfilled-search insights",
                    "Restock signal analytics",
                    "Advanced request routing",
                    "Approved analytics features",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#13A594] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#5B6478] leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button onClick={()=>router.push("https://zoiko-meds-platform.vercel.app/dashboard")} className="w-full cursor-pointer py-3 px-4 rounded-xl bg-[#13A594] text-white font-semibold text-[15px] hover:bg-[#0d8f72] transition-colors shadow-sm">
                  Start 30-Day Evaluation
                </button>
                <p className="text-[11px] text-[#8892A6] text-center mt-3">
                  Verified locations · no card · no auto-conversion.
                </p>
                <button
                  onClick={() => setShowVolumePricing(!showVolumePricing)}
                  className="w-full text-center text-xs font-semibold text-[#13A594] hover:underline mt-4 flex items-center justify-center gap-1"
                >
                  View Volume Pricing{" "}
                  <img
                    src="/pricing/down.png"
                    alt="down"
                    className="h-[10px] w-[8px]"
                  />
                </button>
              </div>
            </motion.div>

            {/* Card 3: Enterprise Network */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-7 border border-[#E7EAF1] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#F0EBF9] flex items-center justify-center mb-6">
                  <Building2 className="w-5 h-5 text-[#633BB3]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F1F4E]">
                  Enterprise Network
                </h3>
                <p className="text-[10px] text-[#8892A6] tracking-[1.5px] uppercase font-semibold mt-1 mb-5">
                  INFRASTRUCTURE FOR PHARMACY ORGANIZATIONS
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-[#633BB3] tracking-tight">
                    Custom
                  </span>
                  <p className="text-[11px] text-[#8892A6] mt-1">
                    Contract-defined by Order Form
                  </p>
                </div>

                <p className="text-xs font-semibold text-[#0F1F4E] mb-3">
                  Everything in Intelligence Pro plus:
                </p>

                <ul className="space-y-3.5 mb-8">
                  {[
                    "Multi-location governance",
                    "Headless APIs & SLAs",
                    "Dedicated integration",
                    "Aggregate intelligence & data controls",
                    "ZoikoAvail™ / ZoikoSignal™ / MediBase™",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#633BB3] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#5B6478] leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => router.push("/talk-to-sales")}
                  className="w-full py-3 px-4 cursor-pointer rounded-xl border border-[#AAA2D5] text-[#6B619E] font-semibold text-[15px] hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Talk to Enterprise Sales
                </button>
                <p className="text-[11px] text-[#8892A6] text-center mt-3">
                  Annual agreement / Order Form
                </p>
              </div>
            </motion.div>
          </div>

          {/* Collapsible Volume Pricing Table */}
          <AnimatePresence>
            {showVolumePricing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-2xl border border-[#E7EAF1] p-6 shadow-sm">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-[#0F1F4E]">
                      Intelligence Pro - Volume Pricing{" "}
                      <span className="text-xs font-normal text-[#0D1B2E]">
                        (per verified location)
                      </span>
                    </h4>
                    <button
                      onClick={() => setShowVolumePricing(false)}
                      className="text-xs font-medium text-[#8892A6] hover:text-[#0F1F4E] flex items-center gap-1"
                    >
                      Hide <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Table Container with Outer Border and Grid Dividers */}
                  <div className="overflow-x-auto rounded-xl border border-[#E7EAF1]">
                    <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                      <thead>
                        <tr className="bg-[#FAFAFA] text-[#1D2939] border-b border-[#E7EAF1]">
                          <th className="py-3 px-4 font-semibold w-1/4 border-r border-[#E7EAF1]">
                            Pro-enabled locations
                          </th>
                          <th className="py-3 px-4 font-semibold w-1/4 border-r border-[#E7EAF1]">
                            Monthly / location
                          </th>
                          <th
                            className="py-3 px-4 font-semibold w-1/2"
                            colSpan={2}
                          >
                            <div className="flex items-center gap-2">
                              <span>Annual / location</span>
                              <span className="bg-[#C3ECDE] text-[#0FAA87] text-[10px] px-2.5 py-1.5 rounded-full font-medium">
                                Save 2 months
                              </span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E7EAF1]">
                        {volumePricingRows.map((row, i) => (
                          <tr key={i} className="hover:bg-[#FAFBFD]">
                            <td className="py-3.5 px-4 font-bold text-[#0F1F4E] border-r border-[#E7EAF1]">
                              {row.locations}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-[#0F1F4E] border-r border-[#E7EAF1]">
                              {row.monthly}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-[#0F1F4E]">
                              {row.annual}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              {row.isEnterprise ? (
                                <a
                                  href="/enterprise"
                                  className="font-semibold text-[#4434AE] hover:underline"
                                >
                                  {row.equivalent}
                                </a>
                              ) : (
                                <span className="text-[#0D1B2E99] font-normal">
                                  {row.equivalent}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Note */}
                  <p className="mt-4 text-[11px] text-[#0D1B2E99] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#0D1B2E99] shrink-0" />
                    <span>
                      Volume pricing uses total Pro-enabled locations in the
                      selected country. All locations receive the same unit
                      price.
                    </span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
