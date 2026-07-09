"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CARDS = [
  {
    id: "zoikosignal",
    title: "ZoikoSignal™ Shortage Intelligence",
    tag: "Governments · Pharma",
    tagBg: "bg-blue-50",
    tagColor: "text-blue-700",
    description:
      "Detect emerging availability gaps weeks before national shortage registers — built for public health authorities, pharmaceutical manufacturers, and distributors who need early-warning infrastructure.",
    cta: "Request ZoikoSignal™ briefing",
  },
  {
    id: "zoikoavail-api",
    title: "ZoikoAvail™ API",
    tag: "Telehealth · Health systems",
    tagBg: "bg-emerald-50",
    tagColor: "text-emerald-700",
    description:
      "Embed verified availability confidence into telehealth platforms, e-prescribing tools, and care pathway routing — with confidence-tier language and no exact stock exposure preserved throughout.",
    cta: "Request API access",
  },
  {
    id: "medibase-data",
    title: "MediBase™ Data Services",
    tag: "Licensing · Analytics",
    tagBg: "bg-amber-50",
    tagColor: "text-amber-700",
    description:
      "Normalize medicine identity across jurisdictions, brands, strengths, and local product codes — for health platforms, analytics teams, and regional health authorities building medicine intelligence products.",
    cta: "Discuss data licensing",
  },
  {
    id: "verified-network",
    title: "Verified Pharmacy Network",
    tag: "Pharmacies · Chains",
    tagBg: "bg-blue-50",
    tagColor: "text-blue-700",
    description:
      "Convert medicine demand into managed confirmation workflows, demand intelligence, and verified availability signals — for independent pharmacies, regional chains, and national pharmacy groups.",
    cta: "Join the network",
  },
];

export default function HomeEnterpriseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

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
          <h2 className="text-[38px] font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Intelligence-grade data
            <br />
            for <span className="text-[#0A9B74]">institutional buyers.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            ZoikoMeds converts anonymized search behavior into verified shortage
            intelligence — available as governed data products and API
            integrations for health systems, governments, pharma, and
            developers.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {CARDS.map((card, index) => (
            <div
              key={card.id}
              className={`group relative overflow-hidden rounded-2xl border border-slate-100 bg-[#F7F9FC] p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#0A9B74]/30 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100" />

              <div className="relative z-10 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900">
                  {card.title}
                </h3>
                <span
                  className={`shrink-0 whitespace-nowrap rounded-full ${card.tagBg} ${card.tagColor} px-3 py-1 text-[10px] font-semibold uppercase tracking-wide`}
                >
                  {card.tag}
                </span>
              </div>

              <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-500">
                {card.description}
              </p>

              <a
                href="#"
                className="relative z-10 mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0A9B74]"
              >
                {card.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>

        <div
          className={`mt-6 flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#0B1B3A] px-8 py-9 transition-all delay-300 duration-700 ease-out sm:flex-row sm:items-center ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <h3 className="text-xl font-bold text-white">
              Talk directly to enterprise sales
            </h3>
            <p className="mt-2 max-w-md text-sm text-slate-400">
              HIPAA-aware · GDPR-aware · SOC 2-aligned · Region-aware
              infrastructure. Designed for healthcare procurement at scale.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => router.push("/enterprise")}
              type="button"
              className="group cursor-pointer relative overflow-hidden rounded-full bg-[#0A9B74] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#08825F] hover:shadow-lg hover:shadow-[#0A9B74]/30 active:scale-[0.98]"
            >
              <span className="relative z-10">Contact enterprise sales</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </button>

            <a
              href="tel:+18004845574"
              className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-slate-400 hover:bg-white/5"
            >
              +1-800-484-5574
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
