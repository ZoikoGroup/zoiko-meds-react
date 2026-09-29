"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { MarketPricingView } from "@/lib/commercial/present";

const containerVariants = {
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

export default function IndiaCtaBannerSection({ view }: { view: MarketPricingView }) {
  const { networkCore, chemistPro } = view.plans;

  return (
    <section className="relative w-full bg-[#0C1B30] text-white py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="relative max-w-5xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-gradient-to-b from-[#102540] to-[#0C1B30] rounded-[16px] border border-[#1E2E4A] p-8 sm:p-12 md:p-16 text-center flex flex-col items-center justify-center shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white tracking-tight mb-4 leading-tight">
            Find the right plan for your pharmacy or organisation.
          </h2>

          <p className="text-[15.2px] text-[#E7EEF6B2] leading-relaxed max-w-120 mb-8 font-normal">
            Patients search free and {networkCore.name} is free permanently.
            Start a {chemistPro.name} trial once your pharmacy is verified, or
            talk to us about multi-site, enterprise and data contracts.{" "}
            {view.taxNote}.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <Link
              href={view.createAccount.href}
              className="bg-[#13A594] hover:bg-[#0f8779] text-white font-medium text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors duration-200 shadow-sm text-center min-w-[180px]"
            >
              {view.createAccount.label}
            </Link>
            <Link
              href={view.signIn.href}
              className="bg-transparent hover:bg-[#1B2B45] text-white border border-[#2B3E5C] font-medium text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors duration-200 text-center min-w-[180px]"
            >
              {view.signIn.label}
            </Link>
            <Link
              href={view.contactSales.href}
              className="bg-transparent hover:bg-[#1B2B45] text-white border border-[#2B3E5C] font-medium text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors duration-200 text-center min-w-[180px]"
            >
              {view.contactSales.label}
            </Link>
          </div>

          <p className="text-[13px] text-[#E7EEF699] leading-relaxed max-w-155 font-normal">
            ZoikoMeds provides medicine availability information from
            participating verified pharmacies. It is not a pharmacy, does not
            prescribe, dispense, sell, deliver, or recommend medicines, and does
            not provide medical advice. Availability is confidence-based and not
            a guarantee of stock.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
