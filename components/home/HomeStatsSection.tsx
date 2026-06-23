"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { id: "markets", value: 47, suffix: "+", label: "Target Markets" },
  { id: "engines", value: 3, label: "Proprietary Platform Engines" },
  { id: "exposed", value: 0, label: "Exact Stock Quantities Exposed" },
  { id: "verified", value: 100, suffix: "%", label: "Verified Pharmacies Only" },
  { id: "gdpr", value: 0, label: "GDPR", isText: true } as Stat & { isText?: boolean },
];

const DURATION = 1500;

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let rafId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target]);

  return value;
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const isGdpr = stat.id === "gdpr";
  const count = useCountUp(isGdpr ? 0 : stat.value, start);

  return (
    <div
      className={`group relative flex flex-col items-center justify-center px-6 py-10 text-center transition-all duration-500 ease-out ${
        start ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="relative text-3xl font-bold text-[#0A9B74] transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
        {isGdpr ? (
          "GDPR"
        ) : (
          <>
            {stat.prefix}
            {count}
            {stat.suffix}
          </>
        )}
        {start && (
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:translate-x-full" />
        )}
      </div>
      <p className="mt-2 text-xs font-medium text-slate-500 sm:text-sm">
        {isGdpr ? "+ HIPAA-Aware Architecture" : stat.label}
      </p>
    </div>
  );
}

export default function HomeStatsSection() {
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
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="mx-auto bg-[#EEF3FB]">
        <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
          {STATS.map((stat, index) => (
            <div
              key={stat.id}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <StatItem stat={stat} start={isVisible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}