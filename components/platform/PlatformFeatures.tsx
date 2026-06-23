const platformFeatures = [
  {
    id: "avail",
    name: "ZoikoAvail™",
    desc: "The edge delivery layer providing sub-second availability verification for over 45,000 SKUs across verified institutional nodes.",
    tags: ["LATENCY: <50ms", "THROUGHPUT: 120k req/s"],
    icon: (
      <svg width="22" height="22" fill="none" stroke="#1D9E75" strokeWidth="1.7" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    accent: "#1D9E75",
  },
  {
    id: "signal",
    name: "ZoikoSignal™",
    desc: "Predictive routing engine that anticipates supply chain disruptions using institutional-grade machine learning models trained on decade-long datasets.",
    tags: ["ACCURACY: 99.4%", "MODELS: Ensemble LTSM"],
    icon: (
      <svg width="22" height="22" fill="none" stroke="#0F6E56" strokeWidth="1.7" viewBox="0 0 24 24">
        <rect x="3" y="3" width="4" height="18" rx="1" />
        <rect x="10" y="8" width="4" height="13" rx="1" />
        <rect x="17" y="13" width="4" height="8" rx="1" />
      </svg>
    ),
    accent: "#0F6E56",
  },
  {
    id: "medibase",
    name: "MediBase™",
    desc: "The global medicine ledger. A normalized, immutable data substrate that harmonizes disparate pharmacy inventory systems into a single source of truth.",
    tags: ["FORMAT: FHIR R4 Compliant", "UPTIME: 99.999%"],
    icon: (
      <svg width="22" height="22" fill="none" stroke="#0D1B2A" strokeWidth="1.7" viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.657 4.03 3 9 3s9-1.343 9-3V5" strokeLinecap="round" />
        <path d="M3 11v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6" strokeLinecap="round" />
      </svg>
    ),
    accent: "#0D1B2A",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="relative bg-white py-20 overflow-hidden font-sans">

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1D9E75]/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">

        {/* Main layout: sidebar label + cards */}
        <div className="flex gap-8 lg:gap-12 items-start">

          {/* Vertical sidebar label — hidden on mobile */}
          <div className="hidden lg:flex flex-col items-center flex-shrink-0">
            <div className="bg-[#0D1B2A] rounded-full px-3 py-8 flex items-center justify-center">
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase text-white whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Governance Plane & Security Boundary
              </span>
            </div>
            {/* Vertical line */}
            <div className="w-px flex-1 mt-3 bg-[#D1D5E0] min-h-[200px]" />
          </div>

          {/* Cards */}
          <div className="flex-1 flex flex-col gap-5">
            {platformFeatures.map((feature) => (
              <div
                key={feature.id}
                className="relative bg-white rounded-xl border border-[#E8EAF0] p-6 lg:p-8 transition-shadow duration-200 hover:shadow-md"
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
                  style={{ backgroundColor: feature.accent }}
                />

                {/* Card header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl lg:text-2xl font-bold text-[#081A13] tracking-tight">
                    {feature.name}
                  </h3>
                  <span className="flex-shrink-0 mt-0.5">{feature.icon}</span>
                </div>

                {/* Description */}
                <p className="text-[15px] leading-relaxed text-[#4A5568] mb-5">
                  {feature.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#151C27] bg-[#EBF2FF] px-3 py-1.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}