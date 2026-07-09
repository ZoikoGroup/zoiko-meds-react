"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Globe2 } from "lucide-react";

const MARKETS = [
  {
    id: "us",
    flagCode: "us",
    dotColor: "bg-emerald-500",
    name: "United States",
    sub: "Beta launch · Active",
    statusLabel: "Live",
    statusBg: "bg-emerald-50",
    statusColor: "text-emerald-700",
  },
  {
    id: "uk",
    flagCode: "gb",
    dotColor: "bg-blue-500",
    name: "United Kingdom",
    sub: "Launching next",
    statusLabel: "Coming soon",
    statusBg: "bg-amber-50",
    statusColor: "text-amber-700",
  },
  {
    id: "global",
    flagCode: null,
    dotColor: "bg-slate-400",
    name: "45+ Markets",
    sub: "Readiness review underway",
    statusLabel: "Future expansion",
    statusBg: "bg-blue-50",
    statusColor: "text-blue-700",
  },
];

export default function HomeGlobalExpansionSection() {
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
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            Global expansion
          </span>

          <h2 className="mt-5 text-[38px] font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Scaling market by market,
            <br />
            jurisdiction by{" "}
            <span className="text-[#0A9B74]">jurisdiction.</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            USA first, UK second — each market activated only after pharmacy
            network density, regulatory clearance, and infrastructure readiness
            are confirmed.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {MARKETS.map((market, index) => (
            <div
              key={market.id}
              className={`group flex items-center justify-between gap-3 rounded-2xl bg-[#F7F9FC] px-5 py-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-slate-200/70 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${market.dotColor} transition-transform duration-300 group-hover:scale-125`}
                />
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                    {market.flagCode ? (
                      <img
                        src={`https://flagcdn.com/24x18/${market.flagCode}.png`}
                        alt={`${market.name} flag`}
                        width={20}
                        height={15}
                        className="rounded-[2px]"
                      />
                    ) : (
                      <Globe2 className="h-3.5 w-3.5 text-slate-500" />
                    )}
                    {market.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{market.sub}</p>
                </div>
              </div>

              <span
                className={`shrink-0 whitespace-nowrap rounded-full ${market.statusBg} ${market.statusColor} px-3 py-1 text-[10px] font-semibold uppercase tracking-wide`}
              >
                {market.statusLabel}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`mt-6 overflow-hidden rounded-3xl bg-[#0B1B3A] bg-gradient-to-br from-[#0B1B3A] via-[#0E2B52] to-[#0F4C5C] px-8 py-12 transition-all delay-300 duration-700 ease-out sm:px-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h3 className="max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl">
            Search now, save what matters, or{" "}
            <span className="text-emerald-400">connect your organization.</span>
          </h3>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
            Availability intelligence for patients, pharmacies, health systems,
            and governments — from a single verified source of truth.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="/searchmed"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#0A9B74] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#08825F] hover:shadow-lg hover:shadow-[#0A9B74]/30 active:scale-[0.98]"
            >
              <Search className="relative z-10 h-4 w-4" strokeWidth={2.5} />
              <span className="relative z-10">Check a medicine now</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </a>

            <a
              href="/create-account"
              className="rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-slate-300 hover:bg-white/5"
            >
              Create free account
            </a>

            <a
              href="/enterprise"
              className="rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-slate-300 hover:bg-white/5"
            >
              Enterprise sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
