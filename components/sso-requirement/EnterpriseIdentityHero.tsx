"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function EnterpriseIdentityHero() {
  const router = useRouter();
  return (
    <section className="relative w-full bg-gradient-to-b from-[#F6F9FC] to-[#EEF2F7] text-[#1D1D1F] py-16 sm:py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col items-start space-y-6 text-left"
        >
          {/* Eyebrow */}
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            ENTERPRISE IDENTITY & ACCESS
          </span>

          {/* Heading */}
          <h1 className="text-3xl md:text-[38px] font-bold text-[#101828] leading-[1.15] tracking-tight">
            Discuss your SSO <br />
            requirements with ZoikoMeds.
          </h1>

          {/* Body Description */}
          <p className="text-sm sm:text-base text-[#475467] font-normal leading-relaxed max-w-xl">
            Tell us how your organization handles identity, federation, MFA,
            user lifecycle, roles, and rollout. We&apos;ll use the requirements
            to evaluate fit and route your request to the appropriate enterprise
            team.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => router.push("/overview")}
              className="px-6 cursor-pointer py-3.5 bg-[#13A594] hover:bg-[#0f8b7c] text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
            >
              Book Demo
            </button>
            <button
              type="button"
              onClick={() => router.push("/talk-to-sales")}
              className="px-6 py-3.5 cursor-pointer bg-white hover:bg-gray-50 text-[#101828] font-semibold rounded-xl text-sm border border-gray-200 shadow-sm transition-all duration-200 active:scale-[0.98]"
            >
              Talk to Sales
            </button>
          </div>
        </motion.div>

        {/* Right Image Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-6 relative w-full rounded-3xl overflow-hidden"
        >
          <img
            src="/sso/hero.png"
            alt="Enterprise presentation discussing SSO and Identity Access with ZoikoMeds"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}
