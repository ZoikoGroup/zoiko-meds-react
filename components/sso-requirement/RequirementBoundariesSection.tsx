"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RequirementBoundariesSection() {
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

  const layersRow1 = [
    {
      id: "layer-1",
      layerNum: "Layer 1",
      title: "Organization identity",
      description:
        "Identity provider or directory operated by your organization.",
      tag: {
        text: "Source identity and authentication context",
        bg: "bg-[#EBF5FF]",
        border: "border-blue-100",
        textColor: "text-[#2B6CB0]",
      },
      borderColor: "border-gray-200/80",
    },
    {
      id: "layer-2",
      layerNum: "Layer 2",
      title: "Federation",
      description:
        "SSO or federation relationship between your identity system and ZoikoMeds.",
      tag: {
        text: "Requirement subject to compatibility and configuration review",
        bg: "bg-[#FFF9EA]",
        border: "border-[#FEEBC8]",
        textColor: "text-[#975A16]",
      },
      borderColor: "border-gray-200/80",
    },
    {
      id: "layer-3",
      layerNum: "Layer 3",
      title: "ZoikoMeds access boundary",
      description:
        "The authenticated principal enters the ZoikoMeds access layer.",
      tag: {
        text: "Authentication \u2260 authorization",
        bg: "bg-[#FFF9EA]",
        border: "border-[#FEEBC8]",
        textColor: "text-[#975A16]",
      },
      borderColor: "border-[#13A594] bg-[#F4FBFA]", // Highlighted green border & tint
    },
    {
      id: "layer-4",
      layerNum: "Layer 4",
      title: "Roles & permissions",
      description:
        "Approved ZoikoMeds role and permission model governs what a user can do.",
      tag: {
        text: "Claims or groups map only through approved rules",
        bg: "bg-[#EBF5FF]",
        border: "border-blue-100",
        textColor: "text-[#2B6CB0]",
      },
      borderColor: "border-gray-200/80",
    },
  ];

  return (
    <section className="relative w-full bg-[#F6F9FC] text-[#1D1D1F] py-20 px-6 sm:px-12 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-left">
          <span className="text-[11.5px] font-semibold text-[#13A594] tracking-[1.5px] uppercase">
            03 &nbsp;&bull;&nbsp; REQUIREMENT BOUNDARIES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-2xl font-bold text-[#101828] leading-tight">
            How identity, access, lifecycle, and evidence relate.
          </h2>
          <p className="text-xs sm:text-sm text-[#475467] font-normal leading-relaxed max-w-xl">
            A conceptual model, not a configuration guide. No provider tenant
            names, customer domains, IDs, endpoints, or credentials are shown.
          </p>
        </div>

        {/* Outer White Card Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-100 space-y-6">
          {/* Top Sequential Flow: Layers 1 to 4 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 relative"
          >
            {layersRow1.map((layer, index) => (
              <React.Fragment key={layer.id}>
                <motion.div
                  variants={cardVariants}
                  className={`rounded-xl p-5 border flex flex-col justify-between space-y-4 text-left relative transition-all duration-200 ${
                    layer.borderColor.includes("border-[#13A594]")
                      ? `${layer.borderColor} bg-[#13A5941A]`
                      : `${layer.borderColor} bg-[#F6F9FC] hover:border-gray-300`
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono tracking-wider text-gray-400 uppercase">
                      {layer.layerNum}
                    </span>
                    <h3 className="text-sm font-bold text-[#101828]">
                      {layer.title}
                    </h3>
                    <p className="text-xs text-[#475467] leading-relaxed font-normal">
                      {layer.description}
                    </p>
                  </div>

                  {/* Highlighted Tag/Badge Box */}
                  <div
                    className={`p-2.5 rounded-lg text-[11px] leading-snug font-medium border ${layer.tag.bg} ${layer.tag.border} ${layer.tag.textColor}`}
                  >
                    {layer.tag.text}
                  </div>
                </motion.div>

                {/* Arrow Connector (Visible only on desktop between items) */}
                {index < layersRow1.length - 1 && (
                  <div
                    className="hidden xl:flex absolute top-1/2 -translate-y-1/2 z-10 text-gray-400 pointer-events-none"
                    style={{ left: `calc(${(index + 1) * 25}% - 12px)` }}
                  >
                    <svg
                      className="w-5 h-5 text-[#13A594]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Bottom Grid: Layers 5 & 6 (Dashed Containers) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* Layer 5: Separate Path */}
            <motion.div
              variants={cardVariants}
              className="rounded-xl p-5 border border-dashed border-gray-200 flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono tracking-wider text-gray-400 uppercase">
                  Layer 5 &nbsp;&bull;&nbsp; separate path
                </span>
                <h3 className="text-sm font-bold text-[#101828]">
                  Lifecycle: provisioning &amp; deprovisioning
                </h3>
                <p className="text-xs text-[#475467] leading-relaxed font-normal">
                  User creation, update, suspension, and removal are handled as
                  a lifecycle concern alongside &mdash; not inside &mdash;
                  authentication.
                </p>
              </div>

              <div className="p-2.5 rounded-lg text-[11px] leading-snug font-medium border bg-[#FFF9EA] border-[#FEEBC8] text-[#975A16] max-w-max">
                Provisioning &ne; authentication
              </div>
            </motion.div>

            {/* Layer 6: Separate Output */}
            <motion.div
              variants={cardVariants}
              className="rounded-xl p-5 border border-dashed border-gray-200 flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono tracking-wider text-gray-400 uppercase">
                  Layer 6 &nbsp;&bull;&nbsp; separate output
                </span>
                <h3 className="text-sm font-bold text-[#101828]">
                  Audit &amp; evidence
                </h3>
                <p className="text-xs text-[#475467] leading-relaxed font-normal">
                  Administrative and access-event visibility where applicable to
                  the approved product scope.
                </p>
              </div>

              <div className="p-2.5 rounded-lg text-[11px] leading-snug font-medium border bg-[#EBF5FF] border-blue-100 text-[#2B6CB0]">
                Evidence and retention depend on approved product scope
              </div>
            </motion.div>
          </motion.div>

          {/* Dark Callout Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-full bg-[#0C1524] rounded-xl p-4 sm:p-5 text-white flex items-center space-x-3 text-left"
          >
            <div className="w-5 h-5 rounded-full border border-[#13A594] flex items-center justify-center flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13A594]"></span>
            </div>
            <p className="text-xs text-gray-300 font-normal leading-relaxed">
              <strong className="text-white font-semibold">
                Non-equivalence law.
              </strong>{" "}
              Identity, authentication, authorization, provisioning,
              organizational role, and business authority are related but
              distinct. This page never uses one as shorthand for the others.
            </p>
          </motion.div>

          {/* Text Alternative Footnote */}
          <p className="text-[11px] text-gray-400 leading-relaxed text-left font-normal">
            Text alternative: an organization identity provider authenticates a
            user; the authenticated principal crosses the ZoikoMeds access
            boundary, where approved roles and permissions determine access.
            Provisioning runs as a separate lifecycle path, and audit or
            evidence visibility is a separate output. Each layer carries its own
            boundary label, and no arrow implies supported configuration.
          </p>
        </div>
      </div>
    </section>
  );
}
