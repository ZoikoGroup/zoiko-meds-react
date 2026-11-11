"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart2,
  Building2,
  Check,
  Landmark,
  Layers,
  Minus,
  Search,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { PlanKey } from "@/lib/commercial/types";
import type { PlanView } from "@/lib/commercial/present";
import { itemVariants } from "./motion";

const PLAN_ICONS: Record<PlanKey, LucideIcon> = {
  publicSearch: Search,
  networkCore: Store,
  chemistPro: BarChart2,
  multiSitePro: Layers,
  enterpriseNetwork: Building2,
  distributorIntelligence: Truck,
  zoikoSignal: Activity,
  publicHealth: Landmark,
};

const TONES = {
  teal: {
    iconBox: "bg-[#E6F6F4]",
    icon: "text-[#13A594]",
    amount: "text-[#13A594]",
    button:
      "border-2 border-[#13A594] text-[#13A594] hover:bg-[#E6F6F4]",
  },
  purple: {
    iconBox: "bg-[#F0EBF9]",
    icon: "text-[#633BB3]",
    amount: "text-[#633BB3]",
    button:
      "border border-[#AAA2D5] text-[#6B619E] hover:bg-gray-50 shadow-sm",
  },
} as const;

interface PlanCardProps {
  plan: PlanView;
  tone?: keyof typeof TONES;
  /** Text for the highlight badge; the card is highlighted when set. */
  badge?: string;
}

export default function PlanCard({ plan, tone = "teal", badge }: PlanCardProps) {
  const Icon = PLAN_ICONS[plan.key];
  const colors = TONES[tone];
  const { price } = plan;

  return (
    <motion.div
      variants={itemVariants}
      data-plan={plan.key}
      className={
        badge
          ? "relative bg-white rounded-2xl p-7 border-2 border-[#13A594] shadow-[0_8px_30px_rgba(15,170,135,0.12)] flex flex-col justify-between"
          : "bg-white rounded-2xl p-7 border border-[#E7EAF1] shadow-sm flex flex-col justify-between"
      }
    >
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#13A594] text-white text-[10px] font-medium tracking-[1px] uppercase px-3 py-1 rounded-full">
          {badge}
        </div>
      )}

      <div>
        <div className={`w-10 h-10 rounded-xl ${colors.iconBox} flex items-center justify-center mb-6`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <h3 className="text-lg font-bold text-[#0F1F4E]">{plan.name}</h3>
        <p className="text-[10px] text-[#8892A6] tracking-[1.5px] uppercase font-semibold mt-1 mb-5">
          {plan.buyer}
        </p>

        <div className="mb-6">
          <div className="flex flex-wrap items-baseline gap-1">
            <span
              className={`${price.amount.length > 8 ? "text-3xl" : "text-4xl"} font-extrabold ${colors.amount} tracking-tight`}
            >
              {price.amount}
            </span>
            {price.unit && <span className="text-xs text-[#8892A6]">{price.unit}</span>}
          </div>
          {price.alternatives.map((alternative) => (
            <p key={alternative} className="text-xs font-semibold text-[#0F1F4E] mt-1.5">
              {alternative}
            </p>
          ))}
          {[...price.terms, ...(plan.eligibility ? [plan.eligibility] : [])].map((term) => (
            <p key={term} className="text-[11px] text-[#8892A6] mt-1">
              {term}
            </p>
          ))}
        </div>

        {plan.includesLabel && (
          <p className="text-xs font-semibold text-[#0F1F4E] mb-3">{plan.includesLabel}</p>
        )}

        <ul className="space-y-3.5 mb-8">
          {plan.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5">
              <Check className={`w-4 h-4 ${colors.icon} shrink-0 mt-0.5`} />
              <span className="text-xs text-[#5B6478] leading-tight">{benefit}</span>
            </li>
          ))}
          {plan.limitations.map((limitation) => (
            <li key={limitation} className="flex items-start gap-2.5">
              <Minus className="w-4 h-4 text-[#8892A6] shrink-0 mt-0.5" />
              <span className="text-xs text-[#8892A6] leading-tight">{limitation}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Link
          href={plan.cta.href}
          aria-label={`${plan.cta.label}: ${plan.name}`}
          className={
            badge
              ? "block w-full text-center py-3 px-4 rounded-xl bg-[#13A594] text-white font-semibold text-[15px] hover:bg-[#0d8f72] transition-colors shadow-sm"
              : `block w-full text-center py-3 px-4 rounded-xl ${colors.button} font-semibold text-[15px] transition-colors`
          }
        >
          {plan.cta.label}
        </Link>
        {plan.trialTerms.map((term) => (
          <p key={term} className="text-[11px] text-[#8892A6] text-center mt-3">
            {term}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
