"use client";

import { useEffect, useRef, useState } from "react";

const team = [
  {
    id: 1,
    name: "Lennox G. McLeod",
    role: "Founder & Exec. Chairman",
    tag: "Zoiko Group Inc.",
    tagColor: "#2DC9A0",
    bg: null, // real photo
    photo: "/about/lennox.png",
  },
  {
    id: 2,
    name: "Global CTO",
    role: "Technology & Architecture",
    tag: "Platform Lead",
    tagColor: "#2DC9A0",
    bg: "linear-gradient(135deg, #a8edcb 0%, #7dd3b0 100%)",
    photo: null,
  },
  {
    id: 3,
    name: "Chief Pharmacy Advisory",
    role: "Clinical Governance",
    tag: "Pharmacy Domain",
    tagColor: "#2DC9A0",
    bg: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)",
    photo: null,
  },
  {
    id: 4,
    name: "Compliance Lead",
    role: "Privacy & Regulatory",
    tag: "Risk & Compliance",
    tagColor: "#2DC9A0",
    bg: "linear-gradient(135deg, #fde68a 0%, #f6c06b 100%)",
    photo: null,
  },
  {
    id: 5,
    name: "Commercial Lead",
    role: "Enterprise & Partnerships",
    tag: "Global Growth",
    tagColor: "#2DC9A0",
    bg: "linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)",
    photo: null,
  },
  {
    id: 6,
    name: "Product Leadership",
    role: "Product & UX",
    tag: "Product Vision",
    tagColor: "#2DC9A0",
    bg: "linear-gradient(135deg, #bbf7d0 0%, #6ee7b7 100%)",
    photo: null,
  },
];

function PersonIcon({ color = "#fff" }: { color?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 opacity-60">
      <circle cx="32" cy="22" r="11" stroke={color} strokeWidth="2.5" />
      <path
        d="M10 54c0-12.15 9.85-22 22-22s22 9.85 22 22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AboutGovernance() {
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
    <section ref={sectionRef} className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes tagPop {
          0%   { transform: scale(0.8); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1);   opacity: 1; }
        }
        .skeleton-pulse {
          background: linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .card-animate {
          animation: cardReveal 0.55s cubic-bezier(.22,.68,0,1.2) both;
        }
        .tag-animate {
          animation: tagPop 0.4s cubic-bezier(.22,.68,0,1.2) both;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── HEADER ROW ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
          <div
            className={`transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="inline-flex items-center border border-[#2DC9A0] rounded-full px-4 py-1 mb-5">
              <span className="text-xs font-semibold tracking-widest text-[#1a3a3a] uppercase">
                Leadership &amp; Oversight
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#0d2636] leading-tight">
              Our Governance Team
            </h2>
          </div>

          <p
            className={`lg:max-w-sm text-[#4a6070] text-sm sm:text-base leading-relaxed lg:pt-16
              transition-all duration-700 ease-out delay-150
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            ZoikoMeds is led through a cross-functional governance model combining technology
            architecture, pharmacy-domain judgment, compliance discipline, and global
            commercialization.
          </p>
        </div>

        {/* ── TEAM CARDS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {team.map((member, idx) => {
            const isHovered = hoveredId === member.id;
            const delay = `${idx * 80}ms`;

            if (!isVisible) {
              return (
                <div key={member.id} className="flex flex-col gap-3">
                  <div className="skeleton-pulse rounded-2xl aspect-square" style={{ animationDelay: delay }} />
                  <div className="skeleton-pulse h-3 rounded-full w-3/4" style={{ animationDelay: delay }} />
                  <div className="skeleton-pulse h-2.5 rounded-full w-1/2" style={{ animationDelay: delay }} />
                </div>
              );
            }

            return (
              <div
                key={member.id}
                className="flex flex-col"
                style={{ animationDelay: delay }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* photo / avatar card */}
                <div
                  className={`card-animate relative rounded-2xl aspect-square overflow-hidden cursor-pointer
                    transition-all duration-400 ease-out
                    ${isHovered ? "-translate-y-2 shadow-xl" : "shadow-sm"}`}
                  style={{
                    animationDelay: delay,
                    background: member.bg ?? undefined,
                  }}
                >
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                        const parent = el.parentElement;
                        if (parent) {
                          parent.style.background = "linear-gradient(135deg,#d1d5db 0%,#9ca3af 100%)";
                          const svg = document.createElement("div");
                          svg.className = "absolute inset-0 flex items-center justify-center";
                          svg.innerHTML = `<svg viewBox="0 0 64 64" fill="none" class="w-14 h-14 opacity-50"><circle cx="32" cy="22" r="11" stroke="white" stroke-width="2.5"/><path d="M10 54c0-12.15 9.85-22 22-22s22 9.85 22 22" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>`;
                          parent.appendChild(svg);
                        }
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PersonIcon color="white" />
                    </div>
                  )}

                  {/* hover overlay */}
                  <div
                    className={`absolute inset-0 bg-[#0d2636]/20 transition-opacity duration-300
                      ${isHovered ? "opacity-100" : "opacity-0"}`}
                  />
                </div>

                {/* text below card */}
                <div className="mt-3 space-y-0.5">
                  <p
                    className={`text-sm font-bold text-[#0d2636] leading-snug transition-colors duration-300
                      ${isHovered ? "text-[#2DC9A0]" : ""}`}
                  >
                    {member.name}
                  </p>
                  <p className="text-xs text-[#64748b]">{member.role}</p>

                  {/* tag badge */}
                  <div
                    className={`inline-flex mt-2 items-center rounded-full px-3 py-0.5
                      transition-all duration-300
                      ${isHovered ? "tag-animate shadow-sm" : ""}`}
                    style={{
                      backgroundColor: `${member.tagColor}18`,
                      border: `1px solid ${member.tagColor}44`,
                    }}
                  >
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: member.tagColor }}
                    >
                      {member.tag}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}