"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ResponsibleDataUseSection() {
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

  const features = [
    {
      id: 1,
      title: "Data minimization",
      description:
        "We collect business categories and routing context before personal contact data \u2014 and no more than needed.",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "No sensitive uploads",
      description:
        "No file uploads on the public form; no patient data, credentials, or restricted material.",
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
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Privacy-safe analytics",
      description:
        "We track categorical funnel events only \u2014 never names, emails, free text, or commercial narrative.",
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Transparent routing",
      description:
        'Routing is categorical and auditable. No lead "score" is shown to you as a judgment.',
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
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-[#0C1B30] text-white py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            07 &nbsp;&bull;&nbsp; RESPONSIBLE DATA USE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Healthcare-grade trust, on a commercial page.
          </h2>
        </div>

        {/* 4-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="bg-[#FFFFFF08] rounded-2xl p-6 sm:p-7 border border-slate-800/80 flex flex-col space-y-4 text-left transition-all duration-200 hover:border-slate-700/80 hover:bg-[#0D1B2D]"
            >
              <div className="w-9 h-9 rounded-lg bg-[#39D7C41F] flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-[13.3px] font-bold text-white">{item.title}</h3>
                <p className="text-[12.2px] text-slate-400 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
