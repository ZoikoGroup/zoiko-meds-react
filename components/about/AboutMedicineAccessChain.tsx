"use client";

import { useEffect, useRef, useState } from "react";

const roles = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    iconBg: "#e6faf5",
    iconColor: "#2DC9A0",
    title: "Patients & Caregivers",
    desc: "Search confidently, reduce unnecessary calls, manage alerts and saved searches.",
    link: "Search now →",
    linkColor: "#2DC9A0",
    hoverBorder: "#2DC9A0",
    hoverBg: "linear-gradient(145deg, #f0fdf9 0%, #e6faf5 100%)",
    active: true,
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    iconBg: "#eff6ff",
    iconColor: "#60a5fa",
    title: "Pharmacies",
    desc: "Join a verified network, reduce repetitive calls, manage confirmation workflows.",
    link: "Join network →",
    linkColor: "#60a5fa",
    hoverBorder: "#60a5fa",
    hoverBg: "linear-gradient(145deg, #f0f7ff 0%, #e8f2ff 100%)",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    iconBg: "#fdf4ff",
    iconColor: "#a78bfa",
    title: "Clinicians & Telehealth",
    desc: "Support care continuity with availability visibility after prescribing.",
    link: "Request integration →",
    linkColor: "#a78bfa",
    hoverBorder: "#a78bfa",
    hoverBg: "linear-gradient(145deg, #fdf4ff 0%, #f5eeff 100%)",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    iconBg: "#fffbeb",
    iconColor: "#f59e0b",
    title: "Manufacturers & Distributors",
    desc: "Understand anonymized demand and shortage signals at a local level.",
    link: "Request briefing →",
    linkColor: "#f59e0b",
    hoverBorder: "#f59e0b",
    hoverBg: "linear-gradient(145deg, #fffbeb 0%, #fef3c7 100%)",
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3.284 14.253A8.959 8.959 0 0 1 3 12c0-1.064.174-2.086.494-3.042" />
      </svg>
    ),
    iconBg: "#eff6ff",
    iconColor: "#3b82f6",
    title: "Health Systems & Governments",
    desc: "Monitor community access patterns through governed data infrastructure.",
    link: "Partner with us →",
    linkColor: "#3b82f6",
    hoverBorder: "#3b82f6",
    hoverBg: "linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)",
  },
];

export default function MedicineAccessChain() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeId, setActiveId] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f0f4f8] py-16 lg:py-24 overflow-hidden">
      <style>{`
        /* shimmer skeleton */
        @keyframes shimmerLight {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        /* cards slide up staggered */
        @keyframes riseUp {
          from { opacity: 0; transform: translateY(36px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        /* headline words fade in */
        @keyframes wordFade {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* link arrow bounce on hover */
        @keyframes arrowBounce {
          0%,100% { transform: translateX(0); }
          50%      { transform: translateX(4px); }
        }
        /* icon gentle float */
        @keyframes iconFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        /* skeleton pulse */
        .skel {
          background: linear-gradient(90deg,#dde5ef 25%,#eaf0f7 50%,#dde5ef 75%);
          background-size: 200% 100%;
          animation: shimmerLight 1.4s ease-in-out infinite;
          border-radius: 1rem;
        }
        .card-rise {
          animation: riseUp 0.55s cubic-bezier(.22,.68,0,1.15) both;
        }
        .word-fade {
          animation: wordFade 0.6s ease-out both;
        }
        .icon-float {
          animation: iconFloat 2.6s ease-in-out infinite;
        }
        .link-hover:hover span {
          animation: arrowBounce 0.5s ease-in-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── HEADER ── */}
        <div className="text-center mb-12">
          {/* eyebrow */}
          <div
            className={`inline-flex items-center border border-[#2DC9A0] rounded-full px-4 py-1 mb-6
              transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="text-[11px] font-semibold tracking-widest text-[#1a3a3a] uppercase">
              Who Zoikomeds Serves
            </span>
          </div>

          {/* headline */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-[#0d2636] leading-tight
              transition-all duration-700 delay-100
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            Built for every role in the{" "}
            <em className="not-italic text-[#2DC9A0]">medicine access chain.</em>
          </h2>
        </div>

        {/* ── CARDS ROW ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {roles.map((role, idx) => {
            const delay = `${160 + idx * 90}ms`;
            const isHovered = hoveredId === role.id;
            const isActive = activeId === role.id;
            const highlighted = isHovered || isActive;

            /* skeleton before visible */
            if (!isVisible) {
              return (
                <div key={role.id} className="flex flex-col gap-3" style={{ animationDelay: delay }}>
                  <div className="skel h-52" style={{ animationDelay: delay }} />
                </div>
              );
            }

            return (
              <div
                key={role.id}
                onMouseEnter={() => { setHoveredId(role.id); setActiveId(role.id); }}
                onMouseLeave={() => setHoveredId(null)}
                className="card-rise relative rounded-2xl p-5 flex flex-col overflow-hidden cursor-pointer
                  transition-all duration-400 ease-out"
                style={{
                  animationDelay: delay,
                  background: highlighted ? role.hoverBg : "white",
                  border: highlighted
                    ? `1.5px solid ${role.hoverBorder}55`
                    : "1.5px solid #e2e8f0",
                  boxShadow: highlighted
                    ? `0 12px 40px -8px ${role.hoverBorder}30, 0 0 0 1px ${role.hoverBorder}22`
                    : "0 1px 8px rgba(0,0,0,0.06)",
                  transform: highlighted ? "translateY(-5px)" : "translateY(0)",
                }}
              >
                {/* subtle top-right glow */}
                <div
                  className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
                  style={{
                    backgroundColor: role.hoverBorder,
                    opacity: highlighted ? 0.12 : 0,
                  }}
                />

                {/* icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300
                    ${highlighted ? "icon-float" : ""}`}
                  style={{
                    backgroundColor: highlighted ? role.iconBg : "#f1f5f9",
                    color: highlighted ? role.iconColor : "#94a3b8",
                    transform: highlighted ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  {role.icon}
                </div>

                {/* title */}
                <h3
                  className="text-sm font-bold leading-snug mb-2 transition-colors duration-300"
                  style={{ color: highlighted ? "#0d2636" : "#1e293b" }}
                >
                  {role.title}
                </h3>

                {/* desc */}
                <p
                  className="text-xs leading-relaxed flex-1 mb-4 transition-colors duration-300"
                  style={{ color: highlighted ? "#475569" : "#64748b" }}
                >
                  {role.desc}
                </p>

                {/* link */}
                <a
                  href="#"
                  className="link-hover inline-flex items-center gap-1 text-xs font-semibold transition-all duration-300"
                  style={{ color: role.linkColor }}
                  onClick={(e) => e.preventDefault()}
                >
                  {role.link}
                </a>

                {/* bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-500"
                  style={{
                    width: highlighted ? "100%" : "0%",
                    backgroundColor: role.hoverBorder,
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