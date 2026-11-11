"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, type LucideIcon } from "lucide-react";
import { containerVariants, itemVariants } from "./motion";

export interface InfoCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface InfoCardsSectionProps {
  eyebrow: string;
  title: string;
  cards: InfoCard[];
  note?: string;
  className?: string;
}

/** Eyebrow + heading + icon cards (+ optional callout), as on the global pricing page. */
export default function InfoCardsSection({ eyebrow, title, cards, note, className = "bg-[#EEF2F7]" }: InfoCardsSectionProps) {
  return (
    <section
      className={`relative w-full ${className} text-[#1D1D1F] py-16 sm:py-20 md:py-24 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden`}
    >
      <div className="relative max-w-6xl mx-auto w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-8 md:gap-10"
        >
          <motion.div variants={itemVariants} className="space-y-3 text-center mx-auto">
            <span className="text-xs sm:text-sm font-semibold tracking-[1px] text-[#13A594] uppercase block">
              {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[35px] max-w-2xl font-bold text-[#101828] leading-[1.15] tracking-tight">
              {title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-start text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E6F6F4] flex items-center justify-center flex-shrink-0 mb-5">
                    <Icon className="w-4.5 h-4.5 text-[#13A594]" />
                  </div>
                  <h3 className="text-base font-bold text-[#101828] mb-2">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed font-normal">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {note && (
            <motion.div
              variants={itemVariants}
              className="border-l-4 border-[#0C1B30] rounded-l-[10px] p-4 sm:p-5 flex items-start gap-3.5 text-left"
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <Info className="w-3.5 h-3.5 text-[#101828]" />
              </div>
              <p className="text-xs sm:text-sm text-[#344054] leading-relaxed font-normal">{note}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
