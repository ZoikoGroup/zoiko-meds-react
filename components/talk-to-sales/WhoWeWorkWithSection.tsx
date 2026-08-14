"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function WhoWeWorkWithSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  } as const;

  const partners = [
    {
      id: 1,
      title: "Healthcare Providers & Health Systems",
      description:
        "Medicine access visibility, regional intelligence, reporting, enterprise workflows, integrations, governance.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H7"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Pharmacies & Pharmacy Networks",
      description:
        "Participation, verification workflows, network coordination, role-based access, reporting, enterprise setup.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Wholesalers & Distributors",
      description:
        "Aggregated demand/access signals, partner workflows, reporting, integration, regional scope.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Manufacturers",
      description:
        "Shortage/access pressure, regional intelligence, watchlists and reporting, executive use cases.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Government & Public Health",
      description:
        "Regional access intelligence, public-sector evaluation, governance, security/procurement, reporting.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: 6,
      title: "Enterprise & Ecosystem Partners",
      description:
        "Enterprise deployment, APIs and integrations, SSO, security review, partnerships, multi-organization use.",
      icon: (
        <svg
          className="w-4 h-4 text-[#13A594]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-[#EEF2F7] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            02 &nbsp;&bull;&nbsp; WHO WE WORK WITH
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101828] leading-tight">
            Find your path in.
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed max-w-xl">
            Selecting a card pre-selects your organization type in the form
            &mdash; you can always change it.
          </p>
        </div>

        {/* 2-row Flexbox Cards Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-6"
        >
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-6">
            {partners.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onClick={() => setSelectedCard(item.id)}
                className={`w-full lg:w-1/3 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border transition-all duration-200 cursor-pointer flex flex-col space-y-4 text-left ${
                  selectedCard === item.id
                    ? "border-[#13A594] ring-2 ring-[#13A594]/20 shadow-md"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-[#13A5941A] flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#101828]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row gap-6">
            {partners.slice(3, 6).map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onClick={() => setSelectedCard(item.id)}
                className={`w-full lg:w-1/3 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border transition-all duration-200 cursor-pointer flex flex-col space-y-4 text-left ${
                  selectedCard === item.id
                    ? "border-[#13A594] ring-2 ring-[#13A594]/20 shadow-md"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-[#13A5941A] flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#101828]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
