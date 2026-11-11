"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Store, BarChart2, Layers, Building2, Check, Minus } from "lucide-react";

export default function PlansSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="bg-[#F3F5F9] text-[#16245A] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#16245A] tracking-tight">
            Pharmacy-partner plans
          </h2>
          <p className="text-xs sm:text-[14px] text-[#5A6B82] mt-2 max-w-2xl leading-relaxed">
            Start free on Network Core, then add demand intelligence, group tools or enterprise administration as you grow. Pay monthly or yearly.
          </p>
        </div>

        {/* Black Friday Promotional Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-[#16245A] text-white p-5 sm:p-7 mt-8 shadow-md">
          {/* Subtle 25% Watermark */}
          <div
            className="absolute right-36 -bottom-8 pointer-events-none select-none hidden lg:block"
            aria-hidden="true"
          >
            <span className="text-[130px] font-black tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.06)] leading-none">
              25%
            </span>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left Column: Black Friday Pill & Dates */}
            <div className="shrink-0 flex flex-col items-start">
              <span className="text-white font-extrabold text-sm sm:text-base leading-tight">
                Black Friday
                <br />
                & Cyber
                <br />
                Monday
              </span>
              <span className="bg-[#00A99D] text-[#002f34] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-[2px] mt-2.5 inline-block">
                27-30 NOV 2026
              </span>
            </div>

            {/* Middle Column: Promo details */}
            <div className="flex-1 max-w-2xl">
              <h3 className="text-lg sm:text-xl font-black text-white">
                <span className="text-[#00A99D]">25% off</span> the first three months
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-300 mt-1 leading-relaxed">
                On Chemist Pro and Multi-site Pro platform subscriptions for eligible new pharmacy partners. Standard price applies from month four. Never applies to medicines.
              </p>
            </div>

            {/* Right Column: CTA Button */}
            <div className="shrink-0">
              <Link
                href="/join-the-network/"
                className="inline-flex items-center justify-center bg-[#00A99D] hover:bg-[#00baaE] text-[#002f34] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg whitespace-nowrap shadow-sm transition-colors"
              >
                Claim 25% off
              </Link>
            </div>
          </div>
        </div>

        {/* Billing Cycle Toggle & Savings Note */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7">
          <div className="inline-flex items-center rounded-full bg-white p-1 border border-[#E2E8F0] shadow-sm">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#16245A] text-white shadow-sm"
                  : "text-[#5A6B82] hover:text-[#16245A]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                billingCycle === "yearly"
                  ? "bg-[#16245A] text-white shadow-sm"
                  : "text-[#5A6B82] hover:text-[#16245A]"
              }`}
            >
              Yearly
            </button>
          </div>

          <span className="text-xs sm:text-[13px] font-bold text-[#00A99D]">
            Chemist Pro yearly saves $989 compared with 12 monthly payments.
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch mt-8">
          {/* Card 1: Network Core */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
            <div>
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#E6F6F4] flex items-center justify-center text-[#00A99D] mb-5">
                <Store className="w-5 h-5" />
              </div>

              {/* Title & Category */}
              <h3 className="text-lg font-bold text-[#16245A]">Network Core</h3>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8896A6] mt-1 mb-5">
                INDEPENDENT PHARMACY / CHEMIST
              </p>

              {/* Price */}
              <div className="mb-5">
                <div className="text-3xl font-black text-[#00A99D] tracking-tight">Free</div>
                <p className="text-xs text-[#8896A6] mt-0.5">Free permanently</p>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 text-xs text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Claimed and verified pharmacy profile</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Availability publishing and sync</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Confirmation controls</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Basic profile engagement</span>
                </li>
                <li className="flex items-start gap-2.5 text-[#8896A6]">
                  <Minus className="w-4 h-4 text-[#8896A6] shrink-0 mt-0.5" />
                  <span>No local demand intelligence</span>
                </li>
              </ul>

              {/* Pharmacy Illustration Box */}
              <div className="bg-[#E6F6F4] rounded-xl p-3.5 mt-5">
                <svg
                  className="w-full h-16"
                  viewBox="0 0 200 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Pharmacy Shelves */}
                  <rect x="10" y="8" width="56" height="36" rx="2" fill="#BFE8E3" />
                  <rect x="14" y="13" width="7" height="12" rx="1" fill="#75C7BC" />
                  <rect x="23" y="13" width="7" height="12" rx="1" fill="#75C7BC" />
                  <rect x="32" y="13" width="7" height="12" rx="1" fill="#75C7BC" />
                  <rect x="41" y="13" width="7" height="12" rx="1" fill="#75C7BC" />
                  <rect x="50" y="13" width="10" height="12" rx="1" fill="#75C7BC" />
                  <rect x="14" y="28" width="8" height="12" rx="1" fill="#75C7BC" />
                  <rect x="24" y="28" width="8" height="12" rx="1" fill="#75C7BC" />
                  <rect x="34" y="28" width="8" height="12" rx="1" fill="#75C7BC" />
                  <rect x="44" y="28" width="8" height="12" rx="1" fill="#75C7BC" />

                  {/* Pharmacist Figure */}
                  <circle cx="106" cy="22" r="7" fill="#00A99D" />
                  <path
                    d="M94 44 C94 34 118 34 118 44"
                    fill="#16245A"
                  />

                  {/* Pharmacy Counter & Laptop */}
                  <rect x="76" y="42" width="74" height="6" rx="1" fill="#0E2356" />
                  <rect x="114" y="32" width="16" height="11" rx="1" fill="#16245A" />
                  <rect x="116" y="34" width="12" height="7" rx="0.5" fill="#E6F6F4" />
                  <rect x="112" y="42" width="20" height="2" rx="0.5" fill="#4B5E8A" />

                  {/* Medical Cross Sign */}
                  <rect x="160" y="12" width="26" height="26" rx="6" fill="#FFFFFF" />
                  <rect x="171" y="17" width="4" height="16" rx="1" fill="#00A99D" />
                  <rect x="165" y="23" width="16" height="4" rx="1" fill="#00A99D" />
                </svg>
                <p className="text-[11px] text-[#2D5A54] font-medium leading-snug mt-2">
                  Join the network: claim your pharmacy profile and publish availability at no cost.
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6">
              <Link
                href="/join-the-network/"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-xl border border-[#00A99D] text-[#00A99D] font-bold text-xs sm:text-sm hover:bg-[#E6F6F4] transition-colors"
              >
                Join the Network
              </Link>
            </div>
          </div>

          {/* Card 2: Chemist Pro (Featured) */}
          <div className="relative bg-white rounded-2xl p-6 border-2 border-[#00A99D] shadow-[0_8px_30px_rgba(0,169,157,0.14)] flex flex-col justify-between">
            {/* Top Pill Highlight */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#00A99D] text-white text-[10px] font-black tracking-wider uppercase px-4 py-1 rounded-full shadow-sm">
              30-DAY FREE TRIAL
            </div>

            <div>
              {/* Header row with icon & badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#E6F6F4] flex items-center justify-center text-[#00A99D]">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <span className="bg-[#16245A] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  25% off · 3 months
                </span>
              </div>

              {/* Title & Category */}
              <h3 className="text-lg font-bold text-[#16245A]">Chemist Pro</h3>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8896A6] mt-1 mb-4">
                INDEPENDENT PHARMACY
              </p>

              {/* Price */}
              <div className="mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-[#8896A6] line-through">$499</span>
                  <span className="text-3xl font-black text-[#00A99D] tracking-tight">
                    {billingCycle === "yearly" ? "$312" : "$374"}
                  </span>
                </div>
                <p className="text-xs text-[#8896A6] mt-0.5">/ store / month</p>
              </div>

              {/* Promo Banner Box */}
              <div className="bg-[#E6F7F5] text-[#006E66] text-[11px] font-bold px-3 py-1.5 rounded-lg mb-2">
                25% off months 1–3, then $499 / store / month
              </div>

              <p className="text-xs font-semibold text-[#16245A] mb-5">
                or $4,999 / store / year
              </p>

              {/* Features Section */}
              <p className="text-xs font-bold text-[#16245A] mb-2.5">
                Everything in Network Core, plus:
              </p>
              <ul className="space-y-2 text-xs text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Demand bands</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Unmet-demand and shortage alerts</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>12-month trends</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Integration-health views</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Staff roles</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Reports</span>
                </li>
              </ul>
            </div>

            {/* Bottom CTA & Subtext */}
            <div className="pt-6">
              <Link
                href="/register?plan=chemist-pro"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-[#00A99D] hover:bg-[#00baaE] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
              >
                Start Free Trial
              </Link>
              <div className="text-[10px] text-[#718096] text-center space-y-0.5 mt-3 leading-tight">
                <p>30-day trial after verification</p>
                <p>No card required</p>
                <p className="pt-0.5">
                  Trial ends on Network Core: your listing and availability sync continue
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Multi-site Pro */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
            <div>
              {/* Header row with icon & badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#E6F6F4] flex items-center justify-center text-[#00A99D]">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="bg-[#16245A] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  25% off · 3 months
                </span>
              </div>

              {/* Title & Category */}
              <h3 className="text-lg font-bold text-[#16245A]">Multi-site Pro</h3>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8896A6] mt-1 mb-4">
                PHARMACY GROUPS
              </p>

              {/* Price */}
              <div className="mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-[#8896A6] line-through">$399</span>
                  <span className="text-3xl font-black text-[#00A99D] tracking-tight">
                    {billingCycle === "yearly" ? "$249" : "$299"}
                  </span>
                </div>
                <p className="text-xs text-[#8896A6] mt-0.5">/ store / month</p>
              </div>

              {/* Promo Banner Box */}
              <div className="bg-[#E6F7F5] text-[#006E66] text-[11px] font-bold px-3 py-1.5 rounded-lg mb-2">
                25% off months 1–3, then $399 / store / month
              </div>

              <div className="text-xs text-[#718096] mb-5 space-y-0.5">
                <p className="font-semibold text-[#16245A]">Annual commitment</p>
                <p>5–25 India locations</p>
              </div>

              {/* Features Section */}
              <p className="text-xs font-bold text-[#16245A] mb-2.5">
                Everything in Chemist Pro, plus:
              </p>
              <ul className="space-y-2 text-xs text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Group console</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Role delegation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#00A99D] shrink-0 mt-0.5" />
                  <span>Consolidated operational reporting</span>
                </li>
                <li className="flex items-start gap-2.5 text-[#8896A6]">
                  <Minus className="w-4 h-4 text-[#8896A6] shrink-0 mt-0.5" />
                  <span>No ranking benefit</span>
                </li>
              </ul>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6">
              <Link
                href="/create-account"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-xl border border-[#00A99D] text-[#00A99D] font-bold text-xs sm:text-sm hover:bg-[#E6F6F4] transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Card 4: Enterprise Network */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
            <div>
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#EEF2F6] flex items-center justify-center text-[#5A6B82] mb-5">
                <Building2 className="w-5 h-5" />
              </div>

              {/* Title & Category */}
              <h3 className="text-lg font-bold text-[#16245A]">Enterprise Network</h3>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8896A6] mt-1 mb-5">
                CHAINS / HOSPITALS
              </p>

              {/* Price */}
              <div className="mb-5">
                <div className="text-3xl font-black text-[#16245A] tracking-tight">Custom</div>
                <p className="text-xs text-[#718096] mt-0.5">Quoted annual contract</p>
                <p className="text-xs text-[#718096] mt-0.5">26+ India locations</p>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 text-xs text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16245A] shrink-0 mt-0.5" />
                  <span>SSO</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16245A] shrink-0 mt-0.5" />
                  <span>APIs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16245A] shrink-0 mt-0.5" />
                  <span>SLAs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16245A] shrink-0 mt-0.5" />
                  <span>Custom governance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16245A] shrink-0 mt-0.5" />
                  <span>Multi-entity administration</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#16245A] shrink-0 mt-0.5" />
                  <span>Service desk</span>
                </li>
              </ul>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6">
              <Link
                href="/talk-to-sales"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-xl border border-[#CBD5E1] text-[#16245A] font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
