"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Globe, Info, Minus, Search } from "lucide-react";
import type { MarketPricingView } from "@/lib/commercial/present";
import PlanCard from "./PlanCard";
import { containerVariants, itemVariants } from "./motion";

export default function IndiaPlansSection({ view }: { view: MarketPricingView }) {
  const { publicSearch, networkCore, chemistPro, multiSitePro, enterpriseNetwork } = view.plans;

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
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-10"
        >
          <motion.div variants={itemVariants} className="space-y-3 text-center">
            <span className="text-xs font-semibold tracking-[2px] text-[#13A594] uppercase block">
              01 &nbsp;·&nbsp; PLANS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[35px] max-w-2xl mx-auto font-bold text-[#0F1F4E] leading-[1.2] tracking-tight">
              Free to join. Priced per store when you need intelligence.
            </h2>
            <p className="text-[#5B6478] leading-relaxed max-w-2xl mx-auto text-sm font-normal pt-1">
              {networkCore.name} is free permanently. Paid plans add demand
              intelligence and group tools &mdash; never a ranking advantage.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center gap-1">
            <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#E7EAF1] text-xs font-semibold text-[#0F1F4E] shadow-sm">
              <Globe className="w-4 h-4 text-[#5B6478]" />
              {view.marketName} · {view.currency} ({view.currencySymbol})
            </span>
            <p className="text-[11px] text-[#8892A6] flex items-center gap-1">
              <Info className="w-3 h-3 inline" /> {view.taxNote}.
            </p>
          </motion.div>

          {/* Public search — for people, not pharmacies */}
          <motion.div
            variants={itemVariants}
            data-plan={publicSearch.key}
            className="bg-white rounded-2xl p-6 border border-[#E7EAF1] shadow-sm flex flex-col md:flex-row md:items-center gap-5"
          >
            <div className="flex items-center gap-4 md:w-64 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#E6F6F4] flex items-center justify-center shrink-0">
                <Search className="w-5 h-5 text-[#13A594]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F1F4E]">{publicSearch.name}</h3>
                <p className="text-[10px] text-[#8892A6] tracking-[1.5px] uppercase font-semibold mt-0.5">
                  {publicSearch.buyer}
                </p>
              </div>
            </div>
            <span className="text-3xl font-extrabold text-[#13A594] tracking-tight md:w-28 shrink-0">
              {publicSearch.price.amount}
            </span>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 flex-1">
              {publicSearch.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#13A594] shrink-0" />
                  <span className="text-xs text-[#5B6478]">{benefit}</span>
                </li>
              ))}
              {publicSearch.limitations.map((limitation) => (
                <li key={limitation} className="flex items-center gap-2">
                  <Minus className="w-4 h-4 text-[#8892A6] shrink-0" />
                  <span className="text-xs text-[#8892A6]">{limitation}</span>
                </li>
              ))}
            </ul>
            <Link
              href={publicSearch.cta.href}
              className="shrink-0 text-center py-2.5 px-5 rounded-xl border-2 border-[#13A594] text-[#13A594] font-semibold text-sm hover:bg-[#E6F6F4] transition-colors"
            >
              {publicSearch.cta.label}
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-2">
            <PlanCard plan={networkCore} />
            <PlanCard
              plan={chemistPro}
              badge={chemistPro.trial ? `${chemistPro.trial.days}-day free trial` : undefined}
            />
            <PlanCard plan={multiSitePro} />
            <PlanCard plan={enterpriseNetwork} tone="purple" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
