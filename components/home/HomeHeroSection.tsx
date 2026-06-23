"use client";

import { useEffect, useState } from "react";
import MedicineSearchWidget from "./MedicineSearchWidget";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative w-full min-h-[620px] overflow-hidden">
      <style>{`
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes widgetRise {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%,100% { opacity:1; } 50% { opacity:0.3; }
        }
        .hero-text  { animation: heroFade  0.8s cubic-bezier(.22,.68,0,1.1) 0.1s both; }
        .hero-badge { animation: heroFade  0.6s cubic-bezier(.22,.68,0,1.1) 0s   both; }
        .hero-body  { animation: heroFade  0.7s cubic-bezier(.22,.68,0,1.1) 0.25s both; }
        .widget-rise{ animation: widgetRise 0.9s cubic-bezier(.22,.68,0,1.1) 0.4s both; }
        .live-dot   { animation: dotPulse 1.8s ease-in-out infinite; }
      `}</style>

      {/* ── BG IMAGE ── */}
      <div className="absolute inset-0 z-0">
        {/* Replace with your actual pharmacy hero image */}
        <img
          src="/home/ZoikoMeds-bg.webp"
          alt="Pharmacists checking medicine availability"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
          }}
        />
        {/* Fallback gradient when image missing */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#062238] via-[#0a3352] to-[#0d4a6b]" />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061828]/85 via-[#061828]/60 to-transparent" />
        {/* Bottom fade into white for widget */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top copy */}
        <div className="pt-20 pb-10 lg:pt-24 lg:pb-12 max-w-xl">
          {/* Eyebrow */}
          <div className={`hero-badge inline-flex items-center gap-2 border border-white/25 rounded-full px-4 py-1.5 mb-7 backdrop-blur-sm bg-white/5 ${loaded ? "" : "opacity-0"}`}>
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-[#2DC9A0] flex-shrink-0" />
            <span className="text-[11px] font-semibold tracking-widest text-white/80 uppercase">
              Global Medicine Availability Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1 className={`hero-text text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.05] text-white mb-5 ${loaded ? "" : "opacity-0"}`}>
            The global search<br />
            layer for{" "}
            <span className="text-[#2DC9A0] italic">medicine</span>
            <br />
            <span className="text-[#2DC9A0] italic">availability.</span>
          </h1>

          {/* Body */}
          <p className={`hero-body text-white/60 text-base sm:text-lg leading-relaxed max-w-md ${loaded ? "" : "opacity-0"}`}>
            Search verified pharmacies, check availability confidence, save medicines, and monitor
            updates — without ZoikoMeds prescribing, dispensing, or guaranteeing medicine availability.
          </p>
        </div>

        {/* ── WIDGET CARD ── */}
        <div className={`widget-rise pb-16 ${loaded ? "" : "opacity-0"}`}>
          <MedicineSearchWidget />
        </div>
      </div>
    </section>
  );
}