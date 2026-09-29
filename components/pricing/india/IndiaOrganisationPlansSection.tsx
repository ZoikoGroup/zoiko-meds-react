"use client";

import React from "react";
import { motion } from "framer-motion";
import type { MarketPricingView } from "@/lib/commercial/present";
import PlanCard from "./PlanCard";
import { containerVariants, itemVariants } from "./motion";

export default function IndiaOrganisationPlansSection({ view }: { view: MarketPricingView }) {
  const { distributorIntelligence, zoikoSignal, publicHealth } = view.plans;

  return (
    <section className="relative w-full bg-white text-[#1D1D1F] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="relative max-w-6xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-10"
        >
          <motion.div variants={itemVariants} className="space-y-3 text-center">
            <span className="text-xs font-semibold tracking-[2px] text-[#13A594] uppercase block">
              02 &nbsp;·&nbsp; DISTRIBUTORS, DATA &amp; PUBLIC HEALTH
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[35px] max-w-2xl mx-auto font-bold text-[#0F1F4E] leading-[1.2] tracking-tight">
              Aggregated intelligence, contracted and privacy-gated.
            </h2>
            <p className="text-[#5B6478] leading-relaxed max-w-2xl mx-auto text-sm font-normal pt-1">
              Distributor, pharma and programme products use approved aggregate
              data only. {view.taxNote}.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <PlanCard plan={distributorIntelligence} tone="purple" />
            <PlanCard plan={zoikoSignal} tone="purple" />
            <PlanCard plan={publicHealth} tone="purple" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
