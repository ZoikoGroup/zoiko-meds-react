import React from "react";
import Image from 'next/image'
const controls = [
  {
    src: "/create-account/search.png",
    alt: "Search",
    title: "Search without an account",
    desc: "You can start a medicine availability search without signing in.",
  },
  {
    src: "/create-account/prescription.png",
    alt: "prescription",
    title: "No prescription upload required",
    desc: "No prescription images, diagnosis, symptoms, clinical records, insurance, or medical history.",
  },
  {
    src: "/create-account/data.png",
    alt: "data",
    title: "Manage saved data",
    desc: "Saved searches, alerts, preferred locations, caregiver labels, and notification settings.",
  },
  {
    src: "/create-account/delete.png",
    alt: "Delete",
    title: "Delete your account",
    desc: "Request or complete deletion through the account privacy area, subject to lawful retention.",
  },
  {
    src: "/create-account/notification.png",
    alt: "Notification",
    title: "Notification choice",
    desc: "Choose approved channels — email, SMS, push, or in-account — where available.",
  },
  {
    src: "/create-account/lock.png",
    alt: "lock",
    title: "Data-minimized by design",
    desc: "Collect only what’s needed for searches, alerts, preferences, security, and control.",
  },
];

export default function ControlsSection() {
  return (
    <section className="bg-[#f6f9fc] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Your account. <span className="text-[#0FAA87]">Your controls.</span>
          </h2>
          <p className="mt-3 text-[#566476] text-[16px] max-w-[630px] tracking-normal leading-[24.8px] mx-auto">
            ZoikoMeds accounts are designed around data minimization, clear preferences, and user control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {controls.map((item, i) => (
            <div key={i} className="flex items-start gap-3 border border-[#E2E8F0] bg-white p-4 rounded-xl">
              <span className="mt-1 w-8 h-8 rounded-xl bg-[#13A5941A] p-[7.5px] flex items-center justify-center">
                <Image src={item.src} alt={item.alt} height={17} width={17} />
              </span>
              <div>
                <p className="text-[14px] font-bold text-[#566476]">{item.title}</p>
                <p className="text-[13px] text-[#566476] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-center md:justify-start items-center gap-3">
          <button
            className="text-[15px] py-3 px-5 bg-white border border-[#CDD7E3] rounded-xl font-semibold text-[#0D1B2E] hover:bg-gray-50 cursor-pointer"
          >
            View Privacy Center
          </button>
        </div>

        <div className="flex gap-4 bg-[#EEF2F7] border border-l-3 border-[#E2E8F0] border-l-black rounded-xl px-4.5 py-4 text-[13px] text-[#2B3A4F] leading-relaxed mt-6">
          <div className="bg-white p-[7px] rounded-xl w-[32px] h-[32px] flex items-center justify-center">
            <Image src="/create-account/verify.png" alt="tick" height={11} width={11} />
          </div>
          <div className="text-[#2B3A4F] text-[14px]">
            <span>A ZoikoMeds account does not create a prescription, reserve medicine, guarantee stock, validate a prescription, or replace pharmacy confirmation.</span>
          </div>
        </div>
      </div>
    </section>
  );
};