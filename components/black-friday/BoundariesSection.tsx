import React from "react";
import Image from "next/image";
import { Check, Minus } from "lucide-react";

export default function BoundariesSection() {
  return (
    <section className="bg-white text-[#16245A] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#16245A] tracking-tight">
            What ZoikoMeds is, and what it isn&apos;t
          </h2>
          <p className="text-xs sm:text-[14px] text-[#5A6B82] mt-2 max-w-2xl leading-relaxed">
            Patients and pharmacies need clearer ways to navigate availability information. ZoikoMeds is built around that information.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-10 lg:mt-12">
          {/* Left: Section Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative rounded-[24px] overflow-hidden aspect-square w-full max-w-[510px] shadow-lg bg-[#F0F4F8]">
              <Image
                src="/Black-Friday-landing-page/bfl2.png"
                alt="Pharmacist consulting medicine information with patient"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 510px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: What ZoikoMeds is / isn't lists */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            {/* ZoikoMeds is */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-4 h-4 text-[#00A99D] stroke-[3]" />
                <h3 className="font-black text-sm sm:text-base text-[#16245A]">
                  ZoikoMeds is
                </h3>
              </div>
              <div className="space-y-2.5">
                <div className="bg-[#E6F7F5] text-[#134E48] text-xs sm:text-[13px] font-medium px-4 py-3 rounded-xl border border-[#D0F0EB] leading-relaxed">
                  Medication search and pharmacy-availability information
                </div>
                <div className="bg-[#E6F7F5] text-[#134E48] text-xs sm:text-[13px] font-medium px-4 py-3 rounded-xl border border-[#D0F0EB] leading-relaxed">
                  A way to make medication and pharmacy information easier to find
                </div>
                <div className="bg-[#E6F7F5] text-[#134E48] text-xs sm:text-[13px] font-medium px-4 py-3 rounded-xl border border-[#D0F0EB] leading-relaxed">
                  Partnerships with qualified pharmacies in permitted regions
                </div>
              </div>
            </div>

            {/* ZoikoMeds isn't */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Minus className="w-4 h-4 text-[#8896A6] stroke-[3]" />
                <h3 className="font-black text-sm sm:text-base text-[#16245A]">
                  ZoikoMeds isn&apos;t
                </h3>
              </div>
              <div className="space-y-2.5">
                <div className="bg-[#F3F4F6] text-[#475569] text-xs sm:text-[13px] font-medium px-4 py-3 rounded-xl border border-[#E5E7EB] leading-relaxed">
                  A prescription medicine shop or a source of medicine discounts
                </div>
                <div className="bg-[#F3F4F6] text-[#475569] text-xs sm:text-[13px] font-medium px-4 py-3 rounded-xl border border-[#E5E7EB] leading-relaxed">
                  Medical advice, diagnosis or treatment
                </div>
                <div className="bg-[#F3F4F6] text-[#475569] text-xs sm:text-[13px] font-medium px-4 py-3 rounded-xl border border-[#E5E7EB] leading-relaxed">
                  A guarantee that any medicine is in stock at any pharmacy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
