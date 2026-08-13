"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function CaregiverHero() {
  const router = useRouter();
  return (
    <section className="bg-[#F8F6F7] px-4 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <span className="rounded-full bg-[#00B7A81A] px-3 py-1 text-[20px] leading-6 font-bold text-[#00B7A8]">
            Caregiver Access
          </span>

          <h1 className="mt-6 max-w-[540px] text-[44px] font-bold leading-tight text-[#081B33]">
            Help someone check medicine availability{" "}
            <span className="text-[#0FAA87]">
              without starting over every time.
            </span>
          </h1>

          <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-[#44474D]">
            Use ZoikoMeds to search, save, and monitor medicine availability
            signals for a parent, child, spouse, or someone you support. No
            prescription upload or medical record required.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => router.push("/register")}
              className="rounded-xl flex gap-2 cursor-pointer justify-center items-center bg-[#081B33] px-12 py-4 font text-white transition active:bg-[#15253D] hover:bg-[#15253D]"
            >
              <span>Create Free Account</span>
              <img
                src="/caregiver-access/arrow.png"
                alt="Image"
                width={16}
                height={16}
              />
            </button>

            <button
              onClick={() => router.push("/searchmed")}
              className="rounded-xl border cursor-pointer border-[#C4C6CE] bg-white px-12 py-4 font text-[#081B33] transition active:bg-gray-50 hover:bg-gray-50"
            >
              Search Medicines
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/caregiver-access/hero.png"
            alt="Caregiver Access Workspace"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
