"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AboutWhyZoikomeds() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── LEFT COPY ── */}
        <div className="flex-1 min-w-0">
          {/* eyebrow */}
          <div
            className={`inline-flex items-center border border-[#0FAA8738] bg-[#0FAA8738] rounded-full px-4 py-1 mb-6 transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "0ms" }}
          >
            <span className="text-xs font-semibold tracking-widest text-[#0B8A6D] uppercase">
              Why Zoikomeds Exists
            </span>
          </div>

          {/* headline */}
          <h2
            className={`text-4xl sm:text-5xl lg:text-[48px] font-extrabold leading-[1.4] text-[#0d2636] mb-6
              transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "120ms" }}
          >
            MEDICINE ACCESS
            <br />
            SHOULD NOT DEPEND
            <br />
            ON PHONE CALLS &amp;{" "}
            <span className="text-[#2DC9A0]">GUESSWORK.</span>
          </h2>

          {/* body */}
          <p
            className={`text-[#6A82A0] text-base sm:text-[14px] leading-relaxed max-w-md mb-10
              transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "240ms" }}
          >
            Every day, patients and caregivers lose time locating medicines.
            Pharmacies handle repeated availability calls. Clinicians prescribe
            without real-time local supply visibility. Governments see shortage
            patterns after patients already feel the impact.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "360ms" }}
          >
            <button onClick={()=>router.push("#")}
            className="group relative inline-flex cursor-pointer items-center justify-center px-7 py-3.5 rounded-full bg-[#2DC9A0] text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(45,201,160,0.45)] hover:-translate-y-0.5 active:translate-y-0">
              {/* shimmer on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              See How It Works
            </button>

            <button onClick={()=>router.push("/home")}
            className="group inline-flex items-center cursor-pointer gap-2 px-7 py-3.5 rounded-full border border-[#0d2636]/20 text-[#0d2636] font-semibold text-sm transition-all duration-300 hover:border-[#2DC9A0] hover:text-[#2DC9A0] hover:-translate-y-0.5 active:translate-y-0">
              Explore Platform
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* ── RIGHT VISUAL ── */}
        <div
          className={`flex-1 min-w-0 relative transition-all duration-1000 ease-out
            ${isVisible ? "opacity-100 translate-x-0" : "opacity-100 translate-x-10"}`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* card wrapper */}
          <div className="relative rounded-3xl overflow-hidden ">
            {/* pharmacy image — replace src with your actual image */}
            <img
              src="/about/About.webp"
              alt="Pharmacist checking medicine availability"
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback gradient when image is missing
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />

            {/* gradient overlay so cards stay legible */}
            <div/>
          </div>

          {/* subtle glow behind card */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-[#2DC9A0]/10 blur-2xl" />
        </div>
      </div>
    </section>
  );
}