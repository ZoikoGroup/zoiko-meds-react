"use client"

import { useRouter } from "next/navigation";

const buttons = [
  {
    label: "Create Availability Alert",
    primary: true,
    link:"/availability-alert",
  },
  {
    label: "Search Medicines",
    primary: false,
    link:"/searchmed"
  },
];

export default function AvailabilityHero() {
  const router = useRouter();
  return (
    <section className="bg-[#F9F9FF] px-6 py-18 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <p className="text-[16px] uppercase leading-6 tracking-[1.6px] text-[#006A65]">
            Availability Alerts
          </p>

          <h2 className="mt-5 max-w-[560px] text-4xl tracking-[-1.6px] font-bold leading-tight text-[#0D1B2E] md:text-[44px]">
            Get notified when medicine{" "}
            <span className="text-[#0FAA87]">
              availability signals change.
            </span>
          </h2>

          <p className="mt-6 max-w-[560px] text-[18px] leading-8 text-[#44474D]">
            Save a medicine search and choose how you want ZoikoMeds to
            notify you when availability signals change near your selected
            location.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {buttons.map(({ label, primary, link }) => (
              <button
                key={label}
                onClick={()=>router.push(link)}
                className={`h-14 rounded-xl px-12 cursor-pointer py-4 text-base font-medium transition ${
                  primary
                    ? "bg-gradient-to-r from-[#000615] to-[#006A65] text-white shadow-lg hover:bg-[#0B344E]"
                    : "border border-[#C4C6CE] bg-white text-[#0D1B2E] hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <div className="flex w-full max-w-[592px] items-center justify-center rounded-[28px] bg-[#5AD9D233] shadow-[0_0_20px_#5AD9D233]">
            <img
              src="/availability-alert/hero.png" // Replace with your image
              alt="Medicine Alert"
              className="h-auto w-full object-contain z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}