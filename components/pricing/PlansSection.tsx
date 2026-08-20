"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Store, BarChart2, Building2, Check } from "lucide-react";

export default function PlansSection() {
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

  const plans = [
    {
      icon: User,
      title: "Patient & Caregiver",
      subtitle: "FREE PUBLIC / USER ACCESS",
      price: "$0",
      priceNote: "Free at launch",
      description:
        "Everything a patient or caregiver needs to find medicine availability.",
      features: [
        "Anonymous medicine search",
        "Optional account & saved searches",
        "Availability alerts",
        "Caregiver organization",
        "Confidence & freshness guidance",
      ],
      buttonText: "Create Free Account",
      href: "/register",
      buttonStyle:
        "bg-white hover:bg-gray-50 text-[#101828] border border-gray-200",
      footerNote: "No payment info required to search.",
      isPopular: false,
    },
    {
      icon: Store,
      title: "Network Core",
      subtitle: "SUPPLY-DENSITY PARTICIPATION",
      price: "$0",
      pricePer: "/ verified location",
      priceNote: "Free during the supply-density build phase",
      description:
        "The baseline for verified pharmacies to appear with availability confidence.",
      features: [
        "Claimed + verified pharmacy profile",
        "Availability confidence signals",
        "Manual, API, or SFTP feed",
        "Confirmation request routing",
        "Pharmacist visibility controls",
      ],
      buttonText: "Join the Network",
      href: "/join-the-network",
      buttonStyle:
        "bg-white hover:bg-gray-50 text-[#101828] border border-gray-200",
      footerNote: "No card. Never auto-converts to paid.",
      isPopular: false,
    },
    {
      icon: BarChart2,
      title: "Intelligence Pro",
      subtitle: "OPERATIONAL INTELLIGENCE",
      price: "$99–299",
      pricePer: "/ location / mo",
      priceNote: "Indicative range · exact price by market",
      description:
        "Everything in Network Core, plus decision-support intelligence for the location.",
      features: [
        "Local demand dashboards",
        "Unfulfilled-search insights",
        "Restock signal analytics",
        "Advanced request routing",
        "Approved analytics features",
      ],
      buttonText: "Start 30-Day Evaluation",
      href: "https://zoiko-meds-platform.vercel.app/dashboard",
      buttonStyle: "bg-[#13A594] hover:bg-[#0f8779] text-white",
      footerNote: "Verified locations · no card · no auto-conversion.",
      isPopular: true,
    },
    {
      icon: Building2,
      title: "Enterprise / API",
      subtitle: "INSTITUTIONAL INFRASTRUCTURE",
      price: "Custom",
      priceNote: "Contract-defined by Order Form",
      description:
        "For chains, hospitals, health systems, governments, PMS & data partners.",
      features: [
        "Multi-location governance",
        "Headless APIs & SLAs",
        "Dedicated integration",
        "Aggregate intelligence & data controls",
        "ZoikoAvail™ / ZoikoSignal™ / MediBase™",
      ],
      buttonText: "Request a Briefing",
      href: "/request-a-briefing",
      buttonStyle:
        "bg-white hover:bg-gray-50 text-[#101828] border border-gray-200",
      footerNote: "Sales-led · invoice or Stripe per contract.",
      isPopular: false,
    },
  ];

  return (
    <section
      id="plans"
      className="relative w-full bg-[#EEF2F7] text-[#1D1D1F] py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-10 md:gap-12"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="space-y-3 text-left">
            <span className="text-xs sm:text-sm font-semibold tracking-[1px] text-[#13A594] uppercase block">
              02 &nbsp;·&nbsp; PLANS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] max-w-3xl font-bold text-[#101828] leading-[1.15] tracking-tight">
              Four access tiers, one commercial source of truth.
            </h2>
            <p className="text-[#475467] leading-relaxed max-w-160 font-normal pt-1">
              Commercial entitlement is separate from eligibility: a paid
              pharmacy can still be governed by verification,
              controlled-medicine policy, jurisdiction, and data-quality rules.
            </p>
          </motion.div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch pt-4">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative bg-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left transition-all duration-200 ${
                    plan.isPopular
                      ? "border-2 border-[#13A594] shadow-[0_4px_20px_rgba(19,165,148,0.12)]"
                      : "border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  {/* Badge for Popular Plan */}
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#13A594] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                      MOST POPULAR
                    </div>
                  )}

                  {/* Top Content Area */}
                  <div>
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-[#E6F6F4] flex items-center justify-center mb-5">
                      <IconComponent className="w-5 h-5 text-[#13A594]" />
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg font-bold text-[#101828] leading-tight">
                      {plan.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-[#667085] tracking-[1px] uppercase mt-1 mb-4">
                      {plan.subtitle}
                    </p>

                    {/* Price Section */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="md:text-[30px] text-3xl font-bold text-[#101828] tracking-tight">
                          {plan.price}
                        </span>
                        {plan.pricePer && (
                          <span className="text-xs text-[#667085] font-normal">
                            {plan.pricePer}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#667085] mt-0.5">
                        {plan.priceNote}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#475467] leading-relaxed mb-6 font-normal">
                      {plan.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#13A594] flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-[#344054] leading-tight font-normal">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="pt-2">
                    <a
                      href={plan.href}
                      className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 shadow-sm flex items-center justify-center text-center ${plan.buttonStyle}`}
                    >
                      {plan.buttonText}
                    </a>
                    <p className="text-[11px] text-[#667085] text-center mt-3">
                      {plan.footerNote}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
