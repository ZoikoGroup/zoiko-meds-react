"use client"
import { useRouter } from "next/navigation";
import React from "react";

export default function CTASection() {
  const router = useRouter();
  return (
    <section className="bg-[#0C1B30] pt-[90px] pb-[64px] px-4 sm:px-6 lg:px-[204px]">
      <div className="max-w-[1032px] mx-auto flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-[#102540] to-[#0C1B30] px-5 py-10 sm:px-7 sm:pt-11 sm:pb-17 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          Create an account when you want to save and monitor.
        </h2>
        <p className="text-[#E7EEF6B2]/70 text-[15px] max-w-[432px] text-center mb-6 leading-relaxed">
          Start with a free account, or search medicine availability now
          without signing in.
        </p>

        <div className="flex w-full flex-col sm:w-auto sm:flex-row items-center justify-center gap-3">
          <button
          onClick={()=>router.push("/create-account")}
            className="w-full sm:w-auto rounded-xl cursor-pointer bg-[#13A594] px-5 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Create Free Account
          </button>

          <button
            className="w-full sm:w-auto rounded-xl border cursor-pointer border-white/25 px-6 py-2.5 text-center text-[15px] font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Search Without an Account
          </button>
        </div>

        <p className="mt-6 text-[14px] text-[#E7EEF699]/70">
          Already have an account?{" "}
          <a href="#" className="text-[#39D7C4] hover:underline">
            Sign in to find it here
          </a>
        </p>
      </div>
    </section>

  );
};