"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const items = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.93 4.93l14.14 14.14" />
      </svg>
    ),
    iconBg: "#fef2f2",
    iconColor: "#ef4444",
    title: "No prescribing",
    desc: "ZoikoMeds does not prescribe medicines, recommend treatment, or replace a licensed healthcare professional.",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    iconBg: "#fef2f2",
    iconColor: "#ef4444",
    title: "No dispensing",
    desc: "ZoikoMeds does not dispense, package, or supply medicines. Fulfilment remains with licensed pharmacies.",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
    iconBg: "#fef2f2",
    iconColor: "#ef4444",
    title: "No medicine sales",
    desc: "ZoikoMeds is not a medicine marketplace and does not sell medicines directly to users.",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    iconBg: "#f0fdf9",
    iconColor: "#2DC9A0",
    title: "No exact public stock quantities",
    desc: "Exact inventory quantities are not publicly exposed. Confidence signals protect pharmacy and supply integrity.",
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    iconBg: "#fffbeb",
    iconColor: "#f59e0b",
    title: "Controlled medicine safeguards",
    desc: "Controlled medicines are handled through jurisdiction-specific rules and may require pharmacist-gated workflows.",
  },
  {
    id: 6,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    iconBg: "#f0fdf9",
    iconColor: "#2DC9A0",
    title: "Privacy by design",
    desc: "Data minimization, user control, and strict access governance from architecture upwards.",
  },
];

export default function AboutWhatZoikomedsDoesNot() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <style>{`
        @keyframes shimmerW {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes riseCard {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes bannerSlide {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes iconPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.18); }
          100% { transform: scale(1.08); }
        }
        .skel-w {
          background: linear-gradient(90deg,#f1f5f9 25%,#f8fafc 50%,#f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmerW 1.4s ease-in-out infinite;
          border-radius: 1rem;
        }
        .card-up {
          animation: riseCard 0.55s cubic-bezier(.22,.68,0,1.15) both;
        }
        .banner-in {
          animation: bannerSlide 0.6s ease-out both;
        }
        .icon-pop {
          animation: iconPop 0.3s ease-out both;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">

        {/* ── HEADER ── */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center border border-[#2DC9A0] rounded-full px-4 py-1 mb-6
              transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="text-[11px] font-semibold tracking-widest text-[#1a3a3a] uppercase">
              Safety &amp; Governance
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#0d2636] leading-tight
              transition-all duration-700 delay-100
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            What ZoikoMeds does{" "}
            <span className="text-[#ef4444] italic">not</span>{" "}
            do.
          </h2>
        </div>

        {/* ── CARDS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {items.map((item, idx) => {
            const delay = `${140 + idx * 80}ms`;
            const isHovered = hoveredId === item.id;

            if (!isVisible) {
              return (
                <div
                  key={item.id}
                  className="skel-w h-44"
                  style={{ animationDelay: delay }}
                />
              );
            }

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="card-up relative rounded-2xl p-6 flex flex-col overflow-hidden cursor-default
                  transition-all duration-350 ease-out"
                style={{
                  animationDelay: delay,
                  background: isHovered ? "#f8fafc" : "#f8fafc",
                  border: isHovered
                    ? `1.5px solid ${item.iconColor}50`
                    : "1.5px solid #e8edf3",
                  boxShadow: isHovered
                    ? `0 10px 36px -8px ${item.iconColor}25`
                    : "0 1px 6px rgba(0,0,0,0.04)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {/* top-right glow */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-400"
                  style={{
                    backgroundColor: item.iconColor,
                    opacity: isHovered ? 0.1 : 0,
                  }}
                />

                {/* icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-all duration-300
                    ${isHovered ? "icon-pop" : ""}`}
                  style={{
                    backgroundColor: item.iconBg,
                    color: item.iconColor,
                  }}
                >
                  {item.icon}
                </div>

                {/* title */}
                <h3
                  className="text-sm font-bold text-[#0d2636] mb-2 leading-snug transition-colors duration-300"
                  style={{ color: isHovered ? item.iconColor : "#0d2636" }}
                >
                  {item.title}
                </h3>

                {/* desc */}
                <p className="text-xs text-[#64748b] leading-relaxed">
                  {item.desc}
                </p>

                {/* bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-500"
                  style={{
                    width: isHovered ? "100%" : "0%",
                    backgroundColor: item.iconColor,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── EMERGENCY BANNER ── */}
        {isVisible && (
          <div
            className="banner-in flex items-start gap-3 rounded-2xl px-5 py-4 mb-10"
            style={{
              animationDelay: "700ms",
              background: "#fffbeb",
              border: "1.5px solid #fde68a",
            }}
          >
            {/* warning icon */}
            <div className="flex-shrink-0 mt-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <p className="text-xs text-[#78350f] leading-relaxed">
              <strong className="font-bold text-[#92400e]">ZoikoMeds is not an emergency service.</strong>{" "}
              In a medical emergency, contact local emergency services or an appropriate healthcare professional immediately.
              Do not use this platform for urgent medical needs.
            </p>
          </div>
        )}

        {/* ── CTA BUTTON ── */}
        {isVisible && (
          <div
            className="banner-in"
            style={{ animationDelay: "820ms" }}
          >
            <button 
            onClick={()=>router.push("/trust-center")}
            className="group relative inline-flex items-center cursor-pointer gap-2 px-7 py-3.5 rounded-full bg-[#2DC9A0] text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(45,201,160,0.4)] hover:-translate-y-0.5 active:translate-y-0">
              {/* shimmer */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              Review Trust, Safety &amp; Governance Center →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}