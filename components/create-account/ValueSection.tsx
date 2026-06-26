import Image from 'next/image'
import React from "react";

const cards = [
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
    title: "Saved searches",
    desc: "Save a medicine, strength, location, and search radius so you can run the same search again quickly.",
    cta: "Create free account",
    primary: true
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    title: "Availability alerts",
    desc: "Get notified when availability signals change near your selected location, subject to notification settings and platform rules.",
    cta: "Learn how alerts work",
    primary: false
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Caregiver organization",
    desc: "Keep searches labeled when helping a parent, child, or someone living with a chronic condition.",
    cta: "Caregiver access",
    primary: false
  },
];

export default function ValueSection() {
  return (
    <section className="bg-[#EEF2F7] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Save what matters. Return when you
            <br />
            <span className="text-[#0FAA87]">need to.</span>
          </h2>
          <p className="mt-4 text-[#566476] text-[16px] max-w-[630px] mx-auto leading-relaxed">
            A ZoikoMeds account helps you come back to the searches you care about,
            set alerts when availability changes, and keep caregiver searches organized.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 transition-shadow flex flex-col"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-xl p-[7px] bg-[#13A5941A] mb-4 text-[#13A594] flex items-center justify-center">
                {card.icon}
              </span>
              <h3 className="text-sm font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-[14px] md:max-w-[290px] text-[#566476] leading-relaxed mb-5">{card.desc}</p>
              <button
                className={`text-[15px] font-semibold border cursor-pointer rounded-xl px-5 py-3 transition-colors inline-block ${card.primary ? "border-[#13A594] bg-[#13A594] text-white hover:bg-[#118e80]" : "text-black bg-white border-[#CDD7E3] hover:bg-gray-50"}`}
              >
                {card.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 bg-white border border-l-3 border-[#E2E8F0] border-l-[#1F6FB2] rounded-xl px-4.5 py-4 text-[13px] text-[#2B3A4F] leading-relaxed mt-6">
          <div className="bg-[#EAF3FB] p-[7px] rounded-xl w-[32px] h-[32px] flex items-center justify-center">
            <Image src="/create-account/tick.png" alt="tick" height={20} width={20} />
          </div>
          <div className="text-[#2B3A4F] text-[15px]">
            <span>An account doesn’t improve medical priority, reserve stock, validate prescriptions, or guarantee availability.<span className='text-[#2B3A4F] font-semibold'> Account value is persistence,
              notification, organization, and control.</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};