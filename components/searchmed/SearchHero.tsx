"use client";
import { useRouter } from "next/navigation";
import MedicineSearchWidget from "@/components/home/MedicineSearchWidget";

export default function SearchHero() {
  const router = useRouter();

  return (
    <section id="search" className="bg-gradient-to-r from-[#F6F9FC] to-[#EEF2F7] py-16 font-sans">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-[12px] font-bold leading-[17px] tracking-[1.84px] uppercase text-[#13A594] mb-4">
          Search Medicines
        </p>

        {/* Heading */}
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#081A13] leading-tight tracking-tight mb-3">
          Check if your medicine may be{" "}
          <span className="text-[#0FAA87]">available near you.</span>
        </h1>

        <p className="text-center text-[16px] tracking-normal text-[#566476] mb-10 max-w-[500px] mx-auto leading-relaxed">
          Search availability signals from participating verified pharmacies. No
          account needed to start.
        </p>

        {/* Search card widget */}
        <div className="w-full mx-auto">
          <MedicineSearchWidget />
        </div>

        {/* Sub link */}
        <p
          onClick={() => router.push("/availability-signals")}
          className="cursor-pointer text-center mt-6 text-[14.4px] text-[#13A594] font-semibold hover:underline"
        >
          How availability signals work
        </p>
      </div>
    </section>
  );
}
