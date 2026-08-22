"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart2, Building2, Check, LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

interface CardData {
  icon: LucideIcon;
  title: string;
  badge: string;
  description: string;
  features: Feature[];
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  href: string;
}

const CARDS_DATA: CardData[] = [
  {
    icon: BarChart2,
    title: "Intelligence Pro",
    badge: "30-day evaluation · no card · no auto-conversion",
    href: "https://zoiko-meds-platform.vercel.app/dashboard",
    description:
      "A predictable per-location subscription for decision-support intelligence — demand visibility, unfulfilled-search insight, restock signals, and advanced routing. It never converts routing or dashboards into paid search ranking.",
    features: [
      {
        title: "Exact market price",
        description:
          "drawn from an approved catalog by market, currency, and interval — not an algorithmic pick from the range.",
      },
      {
        title: "No hidden usage fees",
        description:
          "for dashboards, searches, alerts, or routing; the per-location price is the price.",
      },
      {
        title: "Downgrade, not disappearance",
        description:
          "— if Pro lapses, an eligible location reverts to free Network Core rather than leaving the availability network.",
      },
      {
        title: "Authorized payers only",
        description:
          "— purchase and cancellation require Organization Owner or Billing Admin authority.",
      },
    ],
    buttonText: "Start 30-Day Evaluation",
    buttonVariant: "primary",
  },
  {
    icon: Building2,
    title: "Enterprise, API & Data",
    badge: "Signed Order Form · explicit metric · customer-visible usage",
    href: "/request-a-briefing",
    description:
      "Custom agreements for chains, hospitals, health systems, governments, PMS partners, and data customers who need multi-location governance, SLAs, residency, or custom deployment.",
    features: [
      {
        title: "Explicit contract metric",
        description:
          "— committed locations, platform fee, API/data usage blocks, integration package, or support tier.",
      },
      {
        title: "No hidden overage",
        description:
          "— metered usage requires explicit units, thresholds, a rate card, and customer acceptance; failed, duplicate, or 5xx events never count.",
      },
      {
        title: "Usage transparency",
        description:
          "— notifications at 70%, 85%, and 100%, with usage and reset dates visible in your portal.",
      },
      {
        title: "Privacy-preserving data",
        description:
          "— aggregated, anonymized, thresholded, and contract-scoped; no patient-level targeting.",
      },
    ],
    buttonText: "Request an Enterprise Briefing",
    buttonVariant: "secondary",
  },
];

export default function ProAndEnterpriseDetailSection() {
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

  return (
    <section className="relative w-full bg-[#F6F9FC] text-[#1D1D1F] py-12 sm:py-20 md:py-24 px-4 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="relative max-w-6xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-8 md:gap-12"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 text-center mx-auto"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-[1px] text-[#13A594] uppercase block">
              06 &nbsp;·&nbsp; PRO &amp; ENTERPRISE IN DETAIL
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-[35px] max-w-2xl font-bold text-[#101828] leading-tight sm:leading-[1.15] tracking-tight">
              Predictable for pharmacies, negotiated for institutions.
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {CARDS_DATA.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Icon & Title Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E6F6F4] flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-[#13A594]" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#101828]">
                        {card.title}
                      </h3>
                    </div>

                    {/* Pill Badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-start sm:items-center gap-1.5 bg-[#E6F6F4] text-[#13A594] text-[10px] sm:text-[11px] font-mono font-medium px-3 py-1.5 sm:py-1 rounded-full leading-normal">
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0" />
                        <span>{card.badge}</span>
                      </span>
                    </div>

                    {/* Subtitle / Paragraph */}
                    <p className="text-xs sm:text-sm text-[#475467] leading-relaxed font-normal mb-5">
                      {card.description}
                    </p>

                    {/* Feature Bullet List */}
                    <ul className="space-y-2 mb-6">
                      {card.features.map((feature, featureIdx) => (
                        <li
                          key={featureIdx}
                          className="flex items-start gap-2.5 border-t border-gray-100 pt-2.5"
                        >
                          <Check className="w-4 h-4 text-[#13A594] flex-shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                            <strong className="text-[#101828] font-semibold">
                              {feature.title}
                            </strong>{" "}
                            {feature.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button: Full width on Mobile, Start-aligned with fixed padding on Desktop */}
                  <div className="pt-2 flex justify-start">
                    <a
                      href={card.href}
                      className={`w-full sm:w-auto inline-flex items-center justify-center border text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 shadow-sm ${
                        card.buttonVariant === "primary"
                          ? "bg-[#13A594] px-6 sm:px-10 py-3 hover:bg-[#0f8779] text-white border-transparent"
                          : "bg-white px-6 sm:px-10 py-3 hover:bg-gray-50 text-[#101828] border-gray-200"
                      }`}
                    >
                      {card.buttonText}
                    </a>
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
