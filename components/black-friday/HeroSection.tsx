import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-[#172459] text-white overflow-hidden py-16 md:py-20 lg:py-24">
      {/* Background Watermark Outline Typography */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full min-w-[1100px] opacity-70"
          viewBox="0 0 1440 640"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <text
            x="-10"
            y="200"
            fontFamily="var(--font-jakarta), sans-serif"
            fontSize="160"
            fontWeight="900"
            fill="none"
            stroke="rgba(255, 255, 255, 0.045)"
            strokeWidth="1.5"
            letterSpacing="4"
          >
            BLACK FRIDAY
          </text>
          <text
            x="-10"
            y="470"
            fontFamily="var(--font-jakarta), sans-serif"
            fontSize="160"
            fontWeight="900"
            fill="none"
            stroke="rgba(255, 255, 255, 0.045)"
            strokeWidth="1.5"
            letterSpacing="4"
          >
            CYBER DAY
          </text>
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Black Friday Badge */}
            <div className="inline-flex items-center rounded bg-[#273673]/80 border border-white/15 p-1 mb-8 shadow-sm">
              <span className="bg-white text-[#172459] font-black text-[11px] sm:text-[12px] uppercase tracking-wider px-2.5 py-1 rounded-[2px] leading-tight">
                BLACK FRIDAY
              </span>
              <span className="text-white text-xs sm:text-[13px] font-medium px-3 py-1 tracking-normal leading-tight">
                27 Nov - Cyber Monday 30 Nov 2026
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-white font-extrabold sm:font-black text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] leading-[1.08] tracking-tight">
              Better medication
              <br />
              discovery starts
              <br />
              with information.
            </h1>

            {/* Paragraphs */}
            <div className="mt-7 space-y-4 max-w-xl">
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Helping make medication and pharmacy information easier to find.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Explore eligible ZoikoMeds pharmacy-partner terms for{" "}
                <span className="text-[#01A89E] font-medium">
                  independent pharmacies, pharmacy groups, chains and hospitals
                </span>{" "}
                in India.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/join-the-network/"
                className="inline-flex items-center justify-center bg-[#01A89E] hover:bg-[#00baaE] text-[#002f35] font-bold text-sm sm:text-[15px] px-6 py-3.5 rounded-lg transition-colors shadow-sm"
              >
                Become a pharmacy partner
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white font-medium text-sm sm:text-[15px] px-6 py-3.5 rounded-lg border border-white/30 transition-colors"
              >
                Compare plans
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              {/* Overhanging Teal Badge */}
              <div className="absolute -top-3.5 right-0 z-20 bg-[#09A49E] text-[#003036] px-3.5 sm:px-4 py-1.5 sm:py-2 shadow-md">
                <span className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-center leading-none">
                  BF / CM
                </span>
                <span className="block text-sm sm:text-base font-black tracking-tight text-center leading-tight mt-0.5">
                  27-30.11
                </span>
              </div>

              {/* Doctor Image Container */}
              <div className="relative rounded-[28px] overflow-hidden aspect-square w-full shadow-2xl bg-[#1d2b63]">
                <Image
                  src="/Black-Friday-landing-page/bfl1.png"
                  alt="Pharmacist accessing medicine information on digital tablet"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
