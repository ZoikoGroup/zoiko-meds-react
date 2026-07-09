"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ─── GLOBAL REACH DATA ─────────────────────────────────── */
const markets = [
  {
    id: 1,
    flag: "🇺🇸",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    iconBg: "#f0fdf9",
    iconColor: "#2DC9A0",
    title: "United States",
    desc: "Beta launch · Active · Priority market with pharmacy network onboarding open.",
    accent: "#2DC9A0",
  },
  {
    id: 2,
    flag: "🇬🇧",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
      </svg>
    ),
    iconBg: "#eff6ff",
    iconColor: "#60a5fa",
    title: "United Kingdom",
    desc: "Launching next · Regulatory mapping and pharmacy network development underway.",
    accent: "#60a5fa",
  },
  {
    id: 3,
    flag: "🌍",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3.284 14.253A8.959 8.959 0 0 1 3 12c0-1.064.174-2.086.494-3.042" />
      </svg>
    ),
    iconBg: "#fffbeb",
    iconColor: "#f59e0b",
    title: "47+ Planned Markets",
    desc: "Readiness review underway across every major continent via Zoiko Group reach.",
    accent: "#f59e0b",
  },
  {
    id: 4,
    flag: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    iconBg: "#f0fdf9",
    iconColor: "#2DC9A0",
    title: "Jurisdiction-aware by design",
    desc: "Medicine names, privacy laws, and pharmacy rules vary by country. ZoikoMeds respects every difference.",
    accent: "#2DC9A0",
  },
];

/* ─── GLOBAL REACH SECTION ───────────────────────────────── */
function GlobalReach() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full bg-[#f0f4f8] py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* header row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="inline-flex items-center border border-[#2DC9A0] rounded-full px-4 py-1 mb-5">
              <span className="text-[11px] font-semibold tracking-widest text-[#1a3a3a] uppercase">
                Global Reach
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d2636] leading-tight">
              Built for local rules.<br />Designed for global scale.
            </h2>
          </div>

          <p
            className={`lg:max-w-xs text-[#4a6070] text-sm leading-relaxed lg:pt-14
              transition-all duration-700 delay-150
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            ZoikoMeds is designed as jurisdiction-aware infrastructure. Zoiko Group has stated global reach
            across 47+ countries. Each market is activated only after jurisdiction-specific controls are in place.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {markets.map((m, idx) => {
            const delay = `${120 + idx * 80}ms`;
            const isHov = hoveredId === m.id;

            if (!isVisible) {
              return (
                <div
                  key={m.id}
                  className="rounded-2xl h-44"
                  style={{
                    background: "linear-gradient(90deg,#dde5ef 25%,#eaf0f7 50%,#dde5ef 75%)",
                    backgroundSize: "200% 100%",
                    animation: `shimmerGR 1.4s ease-in-out infinite`,
                    animationDelay: delay,
                    borderRadius: "1rem",
                  }}
                />
              );
            }

            return (
              <div
                key={m.id}
                onMouseEnter={() => setHoveredId(m.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative rounded-2xl p-5 flex flex-col overflow-hidden cursor-default
                  transition-all duration-400 ease-out"
                style={{
                  animationDelay: delay,
                  background: "white",
                  border: isHov ? `1.5px solid ${m.accent}55` : "1.5px solid #e2e8f0",
                  boxShadow: isHov ? `0 12px 36px -8px ${m.accent}28` : "0 1px 8px rgba(0,0,0,0.05)",
                  transform: isHov ? "translateY(-5px)" : "translateY(0)",
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `riseGR 0.55s cubic-bezier(.22,.68,0,1.15) ${delay} both` : "none",
                }}
              >
                {/* glow blob */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-400"
                  style={{ backgroundColor: m.accent, opacity: isHov ? 0.12 : 0 }}
                />

                {/* top row: icon + dot */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: m.iconBg,
                      color: m.iconColor,
                      transform: isHov ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {m.icon}
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border-2 transition-all duration-300"
                    style={{
                      borderColor: isHov ? m.accent : "#e2e8f0",
                      backgroundColor: isHov ? `${m.accent}18` : "transparent",
                    }}
                  />
                </div>

                {/* flag + title */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  {m.flag && <span className="text-sm">{m.flag}</span>}
                  <h3
                    className="text-sm font-bold leading-snug transition-colors duration-300"
                    style={{ color: isHov ? m.accent : "#0d2636" }}
                  >
                    {m.title}
                  </h3>
                </div>

                <p className="text-xs text-[#64748b] leading-relaxed">{m.desc}</p>

                {/* bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-500"
                  style={{ width: isHov ? "100%" : "0%", backgroundColor: m.accent }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <button className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2DC9A0] text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_8px_28px_rgba(45,201,160,0.4)] hover:-translate-y-0.5">
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            Partner on Regional Expansion →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shimmerGR {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes riseGR {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </section>
  );
}

/* ─── CTA BANNER SECTION ─────────────────────────────────── */
function CtaBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full bg-[#f0f4f8] pb-16 lg:pb-24 overflow-hidden">
      <style>{`
        @keyframes ctaFade {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes shimmerBtn {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .cta-in { animation: ctaFade 0.7s cubic-bezier(.22,.68,0,1.1) both; }
        .img-float { animation: imgFloat 4s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-700
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ background: "#0d1f35" }}
        >
          {/* background radial glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-20"
              style={{ background: "radial-gradient(circle, #2DC9A0 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
              style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)" }} />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-0">

            {/* LEFT COPY */}
            <div className="flex-1 px-8 sm:px-12 py-12 lg:py-16 flex flex-col justify-center">

              {/* headline */}
              <h2
                className={`text-3xl sm:text-4xl lg:text-[34px] font-extrabold text-white leading-tight mb-4
                  ${isVisible ? "cta-in" : "opacity-0"}`}
                style={{ animationDelay: "100ms" }}
              >
                Search now, save what matters,<br />
                or{" "}
                <em className="not-italic text-[#2DC9A0] italic">connect your organisation.</em>
              </h2>

              {/* body */}
              <p
                className={`text-white/50 text-sm leading-relaxed mb-4 max-w-sm
                  ${isVisible ? "cta-in" : "opacity-0"}`}
                style={{ animationDelay: "220ms" }}
              >
                Availability intelligence for patients, pharmacies, health
                systems, and governments — from a single verified source of truth.
              </p>

              {/* text links */}
              <div
                className={`flex flex-wrap gap-x-4 gap-y-2 mb-8 ${isVisible ? "cta-in" : "opacity-0"}`}
                style={{ animationDelay: "320ms" }}
              >
                {["Join the Verified Pharmacy Network", "Request Enterprise Briefing", "View API & Integration Pathways"].map((l) => (
                  <a
                    key={l}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs text-white/40 underline underline-offset-2 hover:text-white/70 transition-colors duration-200"
                  >
                    {l}
                  </a>
                ))}
              </div>

              {/* buttons */}
              <div
                className={`flex flex-wrap gap-3 ${isVisible ? "cta-in" : "opacity-0"}`}
                style={{ animationDelay: "420ms" }}
              >
                <button className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2DC9A0] text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_8px_28px_rgba(45,201,160,0.45)] hover:-translate-y-0.5">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                  </svg>
                  Check Medicine Availability
                </button>

                <button
                onClick={()=>router.push("/create-account")}
                 className="group inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm transition-all duration-300 hover:border-white/50 hover:bg-white/5 hover:-translate-y-0.5">
                  Create Free Account
                </button>
              </div>
            </div>

            {/* RIGHT — vector illustration */}
            <div className="lg:w-[42%] relative flex items-end justify-center overflow-hidden">
              {/* dark circle bg accent */}
              <div className="absolute inset-0 flex items-center justify-end pr-0">
                <div
                  className="w-72 h-72 lg:w-96 lg:h-96 rounded-full opacity-20"
                  style={{ background: "radial-gradient(circle, #1a3a5c 0%, transparent 75%)" }}
                />
              </div>

              {/* Replace /images/cta-vector.png with your actual vector/illustration URL */}
              <div
                className={`relative z-10 w-full max-w-xs lg:max-w-sm xl:max-w-md px-4 pb-0
                  ${isVisible ? "img-float" : "opacity-0"}`}
                style={{ animationDelay: "300ms" }}
              >
                <img
                  src="/about/med-1.png"
                  alt="Doctor with medicine availability platform"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  onError={(e) => {
                    // placeholder when image missing
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                    const wrap = el.parentElement;
                    if (wrap) {
                      wrap.innerHTML = `
                        <div style="width:100%;height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;opacity:0.25">
                          <svg viewBox="0 0 64 64" fill="none" stroke="white" stroke-width="1.5" style="width:64px;height:64px">
                            <rect x="20" y="4" width="24" height="56" rx="4"/>
                            <line x1="32" y1="16" x2="32" y2="32"/>
                            <line x1="26" y1="24" x2="38" y2="24"/>
                          </svg>
                          <span style="color:white;font-size:11px;font-family:sans-serif;">Add your vector image at /images/cta-vector.png</span>
                        </div>`;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COMBINED EXPORT ────────────────────────────────────── */
export default function GlobalReachAndCta() {
  return (
    <>
      <GlobalReach />
      <CtaBanner />
    </>
  );
}

export { GlobalReach, CtaBanner };