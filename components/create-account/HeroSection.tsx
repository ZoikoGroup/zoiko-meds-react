"use client";

import React, { useState } from "react";

export default function HeroSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F6F9FC] to-[#EEF2F7] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row md:gap-16 items-start">

          {/* ── Left Column ── */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            {/* Eyebrow */}
            <p className="text-xs font-semibold tracking-[0.18em] text-[#13A594] uppercase mb-4">
              Create Account
            </p>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0D1B2E] leading-tight mb-5">
              Create a free account to save and monitor{" "}
              <span className="text-[#0FAA87]">medicine availability.</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-[#566476] text-[16px] leading-relaxed mb-8 max-w-[470px]">
              Search without an account. Create one when you want saved
              searches, availability alerts, caregiver organization, and privacy
              controls.
            </p>

            {/* What you get card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 mb-0">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#7C8A9B] uppercase mb-5">
                What you get
              </p>

              <ul className="space-y-5">
                {[
                  {
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z"
                        />
                      </svg>
                    ),
                    title: "Save searches & locations",
                    desc: "Return to the medicines you care about without starting over.",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                      </svg>
                    ),
                    title: "Availability alerts",
                    desc: "Get notified when signals change near your location.",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    ),
                    title: "Caregiver organization",
                    desc: "Keep searches labeled for someone you support.",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    ),
                    title: "Privacy controls",
                    desc: "Manage notifications, preferences, and deletion.",
                  },
                ].map(({ icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-9 h-9 rounded-xl p-[7px] bg-[#13A5941A] text-teal-600 flex items-center justify-center">
                      {icon}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-[#0D1B2E]">{title}</p>
                      <p className="text-[12px] text-[#566476]">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <hr className="my-6 border-[#E2E8F0]" />

              {/* Privacy by design */}
              <p className="text-[11px] font-semibold tracking-[1.12px] leading-[17px] text-[#7C8A9B] uppercase mb-4">
                Privacy by Design
              </p>
              <ul className="space-y-2">
                {[
                  "No prescription, diagnosis, or insurance needed",
                  "Data-minimized — only what you need",
                  "Delete your account anytime",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#566476]">
                    <svg className="w-3 h-3 text-[#13A594] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right Column – Sign-up card ── */}
          <div className="w-full lg:w-1/2 lg:max-w-md">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-7 shadow-sm">

              {/* Email field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-[14px] font-semibold text-[#2B3A4F] mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-[#CDD7E3] rounded-lg placeholder-[#7C8A9B] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                />
              </div>

              {/* Primary CTA */}
              <button className="w-full bg-[#13A594] hover:bg-[#168b7e] cursor-pointer active:bg-bg-[#168b7e] text-white font-semibold text-[15px] py-3 rounded-lg transition-colors duration-150 mb-4">
                Create Free Account
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-4">
                <hr className="flex-1 border-[#E2E8F0]" />
                <span className="text-xs text-[#7C8A9B]">or</span>
                <hr className="flex-1 border-[#E2E8F0]" />
              </div>

              {/* Alt auth buttons */}
              <div className="space-y-3 mb-5">
                {/* Passkey */}
                <button className="w-full flex cursor-pointer items-center justify-center gap-2 border border-slate-300 rounded-lg py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  <img src="/create-account/key.png" alt="Key" className="w-4 h-4 text-[#0D1B2E] font-semibold" />Sign up with a passkey
                </button>

                {/* Google */}
                <button className="w-full flex cursor-pointer items-center justify-center gap-2 border border-slate-300 rounded-lg py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                {/* Apple */}
                <button className="w-full cursor-pointer flex items-center justify-center gap-2 border border-slate-300 rounded-lg py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Continue with Apple
                </button>
              </div>

              {/* Skip link */}
              <div className="text-center mb-4">
                <button className="text-[14px] text-[#13A594] font-medium cursor-pointer hover:underline font-medium">
                  Search Without an Account
                </button>
              </div>

              {/* Sign in / Privacy Center */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-1 text-center text-sm text-[#0D1B2E] mb-5">
                <div className="flex items-center gap-1">
                  <span>Already have an account?</span>
                  <button className="font-medium cursor-pointer text-[#13A594] hover:underline">
                    Sign In
                  </button>
                </div>

                <div className="hidden sm:block text-[#CDD7E3]">•</div>

                <button className="font-medium cursor-pointer text-[#13A594] hover:underline">
                  Privacy Center
                </button>
              </div>

              {/* No Rx note */}
              <div className="flex items-start gap-2 mb-5">
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="#13A594" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[13px] md:max-w-[370px] text-[#7C8A9B] leading-relaxed">
                  No prescription upload. No diagnosis. No insurance details required
                  to create a patient or caregiver account.
                </p>
              </div>

              {/* Partner links */}
              <p className="text-[13px] text-[#566476] font-medium leading-relaxed pt-4 border-t border-t-[#E2E8F0]">
                Pharmacy, enterprise, or wholesale partner? Those use verified
                access:{" "}
                <button className="text-[#13A594] cursor-pointer font-medium hover:underline">Pharmacy access</button>
                {" · "}
                <button className="text-[#13A594] cursor-pointer font-medium hover:underline">Enterprise</button>
                {" · "}
                <button className="text-[#13A594] cursor-pointer font-medium hover:underline">Wholesale Portal</button>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
