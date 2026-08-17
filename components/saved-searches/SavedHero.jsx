"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function SavedHero() {
  const router = useRouter();
  return (
    <section className="bg-[#F4F7FB] px-4 py-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
              Saved Searches
            </p>

            <h1 className="max-w-[700px] text-4xl font-semibold leading-[45px] text-[#0D1B2E] md:text-[40px]">
              Save the medicine searches{" "}
              <span className="text-[#0FAA87]">you need to check again.</span>
            </h1>

            <p className="mt-6 max-w-lg text-[17px] leading-[26px] text-[#566476]">
              Create a free ZoikoMeds account to save medicine and location
              searches, run them again, and create alerts when availability
              signals change.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => router.push("/register")}
                className="rounded-xl bg-[#13A594] border border-[#13A594] px-6 cursor-pointer py-3 font-semibold text-white transition hover:bg-[#119485]"
              >
                Create Free Account
              </button>

              <button
                onClick={() => router.push("/searchmed")}
                className="rounded-xl border border-[#D0D5DD] bg-white px-6 cursor-pointer py-3 font-semibold text-[#0D1B2E] transition hover:bg-gray-50"
              >
                Search Medicines
              </button>
            </div>

            <div className="mt-6 flex items-start gap-2 text-sm text-[#98A2B3]">
              <img
                src="/saved-searches/lock.png"
                alt="lock"
                height={18}
                width={18}
              />
              <p className="max-w-[350px] text-[14px] leading-[19px] text-[#7C8A9B]">
                You can search without an account. Saving searches requires an
                account so you can manage, update, and delete them securely.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/saved-searches/hero.png"
              alt="Saved Searches Preview"
              className="w-full max-w-md h-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
