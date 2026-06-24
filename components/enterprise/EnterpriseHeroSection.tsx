"use client";

import { useEffect, useState } from "react";

export default function EnterpriseHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full bg-[#F9F9FF] overflow-hidden">
      <style>{`
        @keyframes enterpriseFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ent-fade-up { animation: enterpriseFadeUp 0.65s cubic-bezier(.22,.68,0,1.1) both; }

        @keyframes enterpriseImgRise {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .ent-img-rise { animation: enterpriseImgRise 0.7s cubic-bezier(.22,.68,0,1.1) both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* LEFT COPY */}
          <div className="flex-1 min-w-0">
            <div
              className="ent-fade-up inline-flex items-center border bg-[#00A99D] border-[#00A99D] rounded-full px-4 py-1 mb-6"
              style={{ animationDelay: "0ms" }}
            >
              <span className="text-[11px] font-bold tracking-widest text-[#fff] uppercase">
                ZoikoMeds for Enterprise
              </span>
            </div>

            <h1
              className="ent-fade-up text-[2.6rem] sm:text-5xl lg:text-[3.4rem] font-extrabold text-[#000615] leading-[1.06] mb-6"
              style={{ animationDelay: "100ms" }}
            >
              The institutional <br />
              infrastructure <br />
              for{" "}
              <span className="text-[#006A65]">medicine</span>
              <br />
              <span className="text-[#006A65]">availability</span>
              <br />
              <span className="text-[#006A65]">intelligence.</span>
            </h1>

            <p
              className="ent-fade-up text-[#44474D] text-base sm:text-[18px] leading-relaxed max-w-full mb-10"
              style={{ animationDelay: "220ms" }}
            >
              Health systems, governments, and digital-health platforms use
              ZoikoMeds to convert fragmented pharmacy data into governed,
              jurisdiction-aware intelligence through institutional-grade
              APIs.
            </p>

            <div
              className="ent-fade-up flex flex-wrap gap-4"
              style={{ animationDelay: "340ms" }}
            >
              <button className="group relative inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-[#000615] text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:bg-[#1a3a50] hover:shadow-[0_8px_28px_rgba(13,38,54,0.3)] hover:-translate-y-0.5 active:translate-y-0">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                Request a Briefing
              </button>
              <button className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md border border-[#0d2636]/25 text-[#0d2636] font-semibold text-sm bg-white transition-all duration-300 hover:border-[#2DC9A0] hover:text-[#2DC9A0] hover:-translate-y-0.5 active:translate-y-0">
                Explore the Stack
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: single complete image, no recreated UI/text */}
          <div className="flex-1 min-w-0 flex justify-center lg:justify-end w-full">
            <div
              className={`ent-img-rise relative w-full max-w-[620px] overflow-hidden ${
                isVisible ? "" : "opacity-0"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              {/* Replace src with your actual exported console/dashboard image */}
              <img
                src="/enterprise/global-intelligence-console.png"
                alt="Global Intelligence Console dashboard"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}