"use client";

import { useEffect, useRef, useState } from "react";

const engines = [
  {
    id: 1,
    eyebrow: "IDENTITY LAYER",
    eyebrowColor: "#60a5fa",
    name: "MediBase™",
    desc: "The medicine identity layer that normalizes medicines across names, brands, strengths, routes, and jurisdictions — making cross-border medicine identity tractable.",
    link: "Learn about MediBase™ →",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    iconBg: "rgba(96,165,250,0.18)",
    iconColor: "#93c5fd",
    /* deep navy base + blue radial glow top-right */
    cardBg: "radial-gradient(ellipse 70% 60% at 90% 0%, rgba(59,93,190,0.55) 0%, transparent 70%), #0e1e35",
    linkColor: "#60a5fa",
    border: "rgba(96,165,250,0.18)",
  },
  {
    id: 2,
    eyebrow: "CONFIDENCE ENGINE",
    eyebrowColor: "#2DC9A0",
    name: "ZoikoAvail™",
    desc: "The availability confidence engine that determines when a medicine signal is current, verified, indicative, stale, or suppressed — protecting patients and supply integrity.",
    link: "Learn about ZoikoAvail™ →",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    iconBg: "rgba(45,201,160,0.18)",
    iconColor: "#2DC9A0",
    /* dark teal base + teal radial glow top-right */
    cardBg: "radial-gradient(ellipse 65% 60% at 88% 0%, rgba(20,140,100,0.7) 0%, transparent 65%), #061f18",
    linkColor: "#2DC9A0",
    border: "rgba(45,201,160,0.2)",
  },
  {
    id: 3,
    eyebrow: "SHORTAGE INTELLIGENCE",
    eyebrowColor: "#a78bfa",
    name: "ZoikoSignal™",
    desc: "The intelligence engine identifying aggregated shortage, demand, zero-result, and restock patterns for enterprise and public-sector insight — anonymized and governed.",
    link: "Learn about ZoikoSignal™ →",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
    iconBg: "rgba(167,139,250,0.18)",
    iconColor: "#c4b5fd",
    /* deep purple base + violet radial glow top-right */
    cardBg: "radial-gradient(ellipse 65% 60% at 88% 0%, rgba(109,40,217,0.65) 0%, transparent 65%), #12082a",
    linkColor: "#a78bfa",
    border: "rgba(167,139,250,0.2)",
  },
];

export default function AboutThreeEngines() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#080f1c] py-16 lg:py-24 overflow-hidden"
    >
      <style>{`
        @keyframes shimmerDark {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.85; }
        }
        @keyframes linkSlide {
          from { letter-spacing: 0; }
          to   { letter-spacing: 0.02em; }
        }
        .skeleton-dark {
          background: linear-gradient(90deg,#1a2540 25%,#243050 50%,#1a2540 75%);
          background-size: 200% 100%;
          animation: shimmerDark 1.5s infinite;
          border-radius: 1.25rem;
        }
        .card-reveal {
          animation: fadeSlideUp 0.6s cubic-bezier(.22,.68,0,1.1) both;
        }
        .glow-blob {
          animation: glowPulse 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── HEADER ── */}
        <div className="mb-14 max-w-xl">
          <div
            className={`inline-flex items-center rounded-full px-4 py-1 mb-7 border border-white/15
              transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <span className="text-[11px] font-semibold tracking-widest text-white/60 uppercase">
              Proprietary Infrastructure
            </span>
          </div>

          <h2
            className={`text-4xl sm:text-5xl font-extrabold leading-tight mb-5
              transition-all duration-700 delay-100
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <span className="text-white">Three engines.</span>
            <br />
            <span className="text-[#2DC9A0] italic">One availability layer.</span>
          </h2>

          <p
            className={`text-white/50 text-sm sm:text-base leading-relaxed
              transition-all duration-700 delay-200
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            Purpose-built infrastructure that no generic database or search product replicates.
            Each engine is governed, commercially licensed, and audit-ready.
          </p>
        </div>

        {/* ── CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {engines.map((eng, idx) => {
            const delay = `${idx * 110}ms`;
            const isHovered = hoveredId === eng.id;

            if (!isVisible) {
              return (
                <div
                  key={eng.id}
                  className="skeleton-dark h-72"
                  style={{ animationDelay: delay }}
                />
              );
            }

            return (
              <div
                key={eng.id}
                onMouseEnter={() => setHoveredId(eng.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="card-reveal relative rounded-2xl p-6 flex flex-col overflow-hidden cursor-pointer
                  transition-all duration-500 ease-out"
                style={{
                  animationDelay: delay,
                  background: eng.cardBg,
                  border: `1px solid ${eng.border}`,
                  transform: isHovered ? "translateY(-6px) scale(1.015)" : "translateY(0) scale(1)",
                  boxShadow: isHovered
                    ? `0 24px 60px -10px ${eng.linkColor}33, 0 0 0 1px ${eng.border}`
                    : "0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                {/* animated glow blob top-right (always present, pulses) */}
                <div
                  className="glow-blob absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
                  style={{
                    background: eng.linkColor,
                    opacity: isHovered ? 0.22 : 0.12,
                    animationDelay: `${idx * 0.7}s`,
                  }}
                />

                {/* eyebrow tag */}
                <div
                  className="inline-flex self-start items-center rounded-full px-3 py-1 mb-6"
                  style={{
                    backgroundColor: `${eng.eyebrowColor}18`,
                    border: `1px solid ${eng.eyebrowColor}40`,
                  }}
                >
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: eng.eyebrowColor }}
                  >
                    {eng.eyebrow}
                  </span>
                </div>

                {/* icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300"
                  style={{
                    backgroundColor: eng.iconBg,
                    color: eng.iconColor,
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {eng.icon}
                </div>

                {/* name */}
                <h3
                  className="text-2xl font-extrabold text-white mb-3 transition-colors duration-300"
                  style={{ color: isHovered ? eng.linkColor : "white" }}
                >
                  {eng.name}
                </h3>

                {/* desc */}
                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-6">
                  {eng.desc}
                </p>

                {/* link */}
                <span
                  className="text-sm font-semibold transition-all duration-300"
                  style={{
                    color: eng.linkColor,
                    letterSpacing: isHovered ? "0.03em" : "0",
                  }}
                >
                  {eng.link}
                </span>

                {/* bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 rounded-full"
                  style={{
                    width: isHovered ? "100%" : "0%",
                    backgroundColor: eng.linkColor,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}