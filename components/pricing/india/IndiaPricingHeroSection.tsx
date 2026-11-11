"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import type { MarketPricingView } from "@/lib/commercial/present";
import { containerVariants, itemVariants } from "./motion";

export default function IndiaPricingHeroSection({ view }: { view: MarketPricingView }) {
  const { plans } = view;
  const facts = [
    `${view.marketName} · ${view.currency} (${view.currencySymbol})`,
    view.taxNote,
    `Billed by ${view.seller}`,
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F6F9FC] to-[#EEF2F7] text-[#1D1D1F] py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden min-h-screen flex items-center justify-center">
      <div className="relative max-w-6xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-start gap-5 text-left">
            <span className="text-xs sm:text-sm font-semibold tracking-[1px] text-[#13A594] uppercase block">
              PRICING &amp; PLANS &nbsp;·&nbsp; {view.marketName}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-[#101828] leading-[1.15] tracking-tight">
              Simple, Governed Pricing for Medicine Availability in {view.marketName}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#475467] leading-relaxed font-normal">
              {plans.publicSearch.name} is free. Independent pharmacies join{" "}
              {plans.networkCore.name} free, permanently. {plans.chemistPro.name},
              multi-site and enterprise plans are priced in {view.currency}{" "}
              &mdash; never by influencing search, and never by charging for
              medicines.
            </p>

            <ul className="flex flex-wrap gap-2">
              {facts.map((fact) => (
                <li
                  key={fact}
                  className="inline-flex items-center rounded-full bg-white border border-[#E7EAF1] px-3 py-1 text-[11px] font-semibold text-[#0F1F4E] shadow-sm"
                >
                  {fact}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={view.createAccount.href}
                className="bg-[#13A594] hover:bg-[#0f8779] text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors duration-200 shadow-sm inline-flex items-center justify-center"
              >
                {view.createAccount.label}
              </Link>
              <Link
                href={view.signIn.href}
                className="bg-white hover:bg-gray-50 text-[#101828] font-medium text-xs sm:text-sm px-6 py-3 rounded-xl border border-gray-200 transition-colors duration-200 shadow-sm inline-flex items-center justify-center"
              >
                {view.signIn.label}
              </Link>
            </div>

            <div className="flex items-start gap-2.5 pt-3">
              <Info className="w-4 h-4 text-[#13A594] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#667085] leading-relaxed">
                ZoikoMeds is medicine availability infrastructure &mdash; not a
                pharmacy or marketplace. It does not sell, prescribe, dispense,
                deliver, or take payment for medicines.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center items-center w-full">
            <div className="relative w-full rounded-2xl overflow-hidden">
              <Image
                src="/pricing/hero.png"
                alt={`Simple, governed pricing for medicine availability in ${view.marketName}`}
                width={488}
                height={395}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
