"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function RequirementAreasSection() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const toggleCard = (id: string) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

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

  const requirementAreas = [
    {
      id: "sso-federation",
      title: "SSO & Federation",
      description:
        "Identity provider, federation method, sign-in entry points, domains, and multi-tenant needs.",
      preselectLabel: "PRESELECT \u00B7 SSO & FEDERATION",
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
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      ),
    },
    {
      id: "mfa-access",
      title: "MFA & Access Conditions",
      description:
        "MFA ownership, conditional-access expectations, step-up needs, and session constraints.",
      preselectLabel: "PRESELECT \u00B7 MFA & ACCESS CONDITIONS",
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      id: "provisioning-lifecycle",
      title: "Provisioning & Lifecycle",
      description:
        "SCIM or JIT requirements, joiner-mover-leaver flow, group synchronization, and deprovisioning expectations.",
      preselectLabel: "PRESELECT \u00B7 PROVISIONING & LIFECYCLE",
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
    {
      id: "roles-mapping",
      title: "Roles & Mapping",
      description:
        "Role model, attribute or group mapping, admin separation, guest and external access, and exception handling.",
      preselectLabel: "PRESELECT \u00B7 ROLES & MAPPING",
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: "testing-rollout",
      title: "Testing & Rollout",
      description:
        "Environment, pilot scope, cutover, rollback, certificate or metadata change process, and launch stage.",
      preselectLabel: "PRESELECT \u00B7 TESTING & ROLLOUT",
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
            d="M7 12l3 3 7-7M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
          />
        </svg>
      ),
    },
    {
      id: "security-procurement",
      title: "Security & Procurement",
      description:
        "Security review, questionnaire, privacy, accessibility, DPA, and evidence requirements related to identity.",
      preselectLabel: "PRESELECT \u00B7 SECURITY & PROCUREMENT",
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
            02 &nbsp;&bull;&nbsp; REQUIREMENT AREAS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-3xl font-bold text-[#101828] leading-tight">
            Select the areas that matter to your organization.
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed max-w-xl">
            Selecting a card pre-selects the matching requirement area in the
            form &mdash; you can always change it there.
          </p>
        </div>

        {/* 3x2 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {requirementAreas.map((card) => {
            const isSelected = selectedCards.includes(card.id);

            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                onClick={() => toggleCard(card.id)}
                className={`group relative bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-6 text-left select-none ${
                  isSelected
                    ? "border-[#13A594] ring-2 ring-[#13A594]/20 shadow-md"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                {/* Card Top: Icon & Check Circle */}
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#13A5941A] flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>

                  {/* Radio / Check Circle */}
                  <div
                    className={`w-5 h-5 rounded-full border transition-colors duration-150 flex items-center justify-center ${
                      isSelected
                        ? "border-[#13A594] bg-[#13A594]"
                        : "border-gray-300 group-hover:border-gray-400 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Card Middle: Content */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-base font-bold text-[#101828]">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card Bottom: Preselect Label */}
                <div className="pt-2">
                  <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase group-hover:text-[#13A594] transition-colors">
                    {card.preselectLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
