import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CtaBannerSection() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#172459]">
      {/* Background Image with Dark Blue / Navy Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Black-Friday-landing-page/bfl3.png"
          alt="Healthcare pharmacist reviewing availability data"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Navy Overlay */}
        <div className="absolute inset-0 bg-[#16245A]/85 backdrop-blur-[1px]" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Inner Border Box */}
        <div className="rounded-2xl border border-white/20 px-6 py-12 sm:px-12 sm:py-16 lg:py-20 flex flex-col items-center text-center">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.15] max-w-xl">
            Help make
            <br />
            medication
            <br />
            information easier
            <br />
            to find
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-200 mt-4 max-w-md leading-relaxed">
            If you run a pharmacy or work with an eligible healthcare partner, start with an enquiry.
          </p>

          {/* Button */}
          <div className="mt-7">
            <Link
              href="/join-the-network/"
              className="inline-flex items-center justify-center bg-[#00A99D] hover:bg-[#00baaE] text-[#002f34] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg shadow-md transition-colors"
            >
              Become a pharmacy partner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
