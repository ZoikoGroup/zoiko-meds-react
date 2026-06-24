"use client";

import { useEffect, useRef, useState } from "react";

function IconBank() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 21h18M4 21V10.5M20 21V10.5M2.25 10.5 12 3l9.75 7.5M6 21v-6M9.75 21v-6M14.25 21v-6M18 21v-6" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 21h18M5 21V8l5-3.5V21M10 21V4.5L15 8v13M9 9h0M9 13h0M9 17h0M19 21V11h-4v10" />
    </svg>
  );
}

function IconPulse() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 12h3l2.5-6 4 12L15 9l2 3h4" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 flex-shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

const SECTORS = [
  {
    id: "health-systems",
    icon: <IconBank />,
    title: "Health Systems & Public Sector",
    description:
      "Enable real-time medication visibility across regional clinical networks to prevent care disruption.",
    points: [
      "Regional shortage monitoring",
      "Strategic stockpile optimization",
      "Public health alert systems",
    ],
  },
  {
    id: "life-sciences",
    icon: <IconBuilding />,
    title: "Life Sciences & Supply",
    description:
      "Optimize production and distribution based on downstream demand signals and emerging shortages.",
    points: [
      "Inventory velocity analytics",
      "Channel partner visibility",
      "Demand forecasting APIs",
    ],
  },
  {
    id: "payers-digital-health",
    icon: <IconPulse />,
    title: "Payers & Digital Health",
    description:
      "Integrate availability into pharmacy benefits and telemedicine platforms to ensure patient fulfillment.",
    points: [
      "Member fulfillment routing",
      "Network tier optimization",
      "API-driven search tools",
    ],
  },
];

export default function EnterpriseSectorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F0F3FF] px-6 py-16 lg:py-24 lg:px-12">
      <style>{`
        @keyframes sectorFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sectorShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .sector-fade { animation: sectorFadeUp 0.6s cubic-bezier(.22,.68,0,1.1) both; }
        .sector-skel {
          background: linear-gradient(90deg,#dde5ef 25%,#eaf0f7 50%,#dde5ef 75%);
          background-size: 200% 100%;
          animation: sectorShimmer 1.4s ease-in-out infinite;
          border-radius: 1rem;
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {SECTORS.map((sector, index) => {
            const delay = `${index * 110}ms`;

            if (!isVisible) {
              return (
                <div key={sector.id} className="sector-skel h-[260px]" style={{ animationDelay: delay }} />
              );
            }

            return (
              <div
                key={sector.id}
                className="sector-fade group cursor-default"
                style={{ animationDelay: delay }}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#0A9B74] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  {sector.icon}
                </div>

                <h3 className="mt-3 text-lg font-bold leading-snug text-[#0d2636] transition-colors duration-300 group-hover:text-[#0A9B74]">
                  {sector.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
                  {sector.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {sector.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm font-medium text-[#0d2636] transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <span className="text-[#0A9B74]">
                        <IconCheckCircle />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 h-[2px] rounded-full bg-[#0A9B74] transition-all duration-500 group-hover:w-full w-0" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}