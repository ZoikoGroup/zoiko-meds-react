"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, Layers, Phone } from "lucide-react";

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // ── Trigger entrance animation when section scrolls into view ──────────
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white max-w-7xl mx-auto px-6 py-16  grid grid-cols-1 lg:grid-cols-[minmax(0,660px)_1fr] gap-12 lg:gap-14 items-center"
    >
      {/* ── LEFT: full-bleed image, no text overlay ── */}
      <div
        className={`relative transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-7 scale-[0.97]"
        }`}
      >
        <div className="group overflow-hidden">
          <Image
            src="/about/pharmacy-consultation.webp"
            alt="Pharmacist assisting a patient with medicine availability"
            width={760}
            height={560}
            priority
            className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:saturate-[1.08]"
          />
        </div>
      </div>

      {/* ── RIGHT: copy block ── */}
      <div className="font-[var(--font-jakarta),sans-serif]">
        <span
          className={`inline-block bg-[#E1F7F2]/10 text-[#0B8A6D] text-[11px] border-[1] border-[#0FAA8738]/10 font-bold tracking-wide px-3.5 py-1.5 rounded-full mb-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isVisible ? "50ms" : "0ms" }}
        >
          ABOUT ZOIKOMEDS
        </span>

        <h1
          className={`text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.18] font-extrabold text-[#0F1F4E] mb-4 tracking-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
        >
          The Global Intelligence
          <br />
          Layer for <span className="text-[#0FAA87] italic">Medicine</span>
          <br />
          <span className="text-[#0FAA87] italic">Availability.</span>
        </h1>

        <p
          className={`text-[15px] leading-[1.7] text-[#5B6478] max-w-[480px] mb-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isVisible ? "280ms" : "0ms" }}
        >
          ZoikoMeds helps make medicine availability visible, verifiable, and
          actionable — connecting verified pharmacy inventory signals with
          patient search, pharmacy workflows, health system visibility, and
          shortage intelligence.
        </p>

        <div
          className={`flex items-center gap-3.5 flex-wrap mb-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#0FAA87] text-white text-sm font-semibold rounded-full px-6 py-3.5 shadow-[0_10px_24px_-8px_rgba(0,169,157,0.5)] transition-all duration-200 hover:bg-[#00978D] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-8px_rgba(0,169,157,0.55)] active:translate-y-0"
          >
            <Search size={16} strokeWidth={2.4} />
            Check Medicine Availability
          </a>
          <a
            href="/enterprise-solutions"
            className="inline-flex items-center bg-white text-[#0F1F4E] text-sm font-semibold rounded-full px-6 py-3.5 border-[1.5px] border-[#0F1F4E]/10 transition-all duration-200 hover:border-[#0F1F4E]/30 hover:bg-[#0F1F4E]/[0.03] hover:-translate-y-0.5"
          >
            Enterprise Solutions
          </a>
        </div>

        <div
          className={`group flex items-center gap-3 pb-5 mb-4 border-b border-[#0F1F4E]/[0.08] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
        >
          <span className="flex-shrink-0 w-[34px] h-[34px] rounded-full bg-[#0F1F4E]/[0.06] flex items-center justify-center transition-all duration-200 group-hover:bg-[#00A99D]/[0.14] group-hover:scale-110">
            <Phone size={15} className="text-[#0F1F4E]" strokeWidth={2} />
          </span>
          <div>
            <div className="text-[11.5px] text-[#8A91A3]">Enterprise inquiries</div>
            <a href="tel:+18004845574" className="block text-sm font-bold text-[#0F1F4E] no-underline">
              +1-800-484-5574
            </a>
          </div>
        </div>

        <p
          className={`text-[11.5px] leading-[1.6] text-[#A3AAB8] max-w-[460px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
        >
          ZoikoMeds does not prescribe, dispense, sell, or deliver medicines.
          Availability results are informational and must be confirmed by the
          pharmacy or appropriate healthcare professional.
        </p>
      </div>
    </section>
  );
}