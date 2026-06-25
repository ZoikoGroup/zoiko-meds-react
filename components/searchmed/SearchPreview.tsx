import Image from 'next/image'
export default function SearchPreview() {
  const signals = [
    {
      badge: { bg: "#E8F6F1", color: "#0F7A5A", label: "Strong", icon: { src: "/searchmed/signal.png", alt: "icon" } },
      title: "Strong signal",
      desc: "Recently updated. Confirm before traveling.",
    },
    {
      badge: { bg: "#FDF4E7", color: "#B45309", label: "Limited", icon: { src: "/searchmed/alert.png", alt: "Icon" } },
      title: "Limited signal",
      desc: "Information may be older or incomplete.",
    },
    {
      badge: { bg: "#EAF3FB", color: "#1F6FB2", label: "Confirmation", icon: { src: "/searchmed/call.png", alt: "icon" } },
      title: "Confirmation needed",
      desc: "Contact the pharmacy directly.",
    },
    {
      badge: { bg: "#F1F4F8", color: "#5B6B7E", label: "No signal", icon: { src: "/searchmed/scope.png", alt: "icon" } },
      title: "No current signal",
      desc: "No usable availability signal yet.",
    },
  ]

  return (
    <div className="bg-[#f6f9fc] py-12 px-6 font-sans">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#1A2B3C] mb-3">
          What you see <span className="text-[#0FAA87]">after searching.</span>
        </h1>
        <p className="text-[15px] text-[#566476] max-w-[595px] text-center mx-auto leading-relaxed">
          ZoikoMeds does not display exact public stock quantities. Results use confidence-based signals to help you decide what to confirm next.
        </p>
      </div>

      {/* Illustrative example card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl px-5 pt-11 pb-4 max-w-[700px] mx-auto mb-9">
        <p className="text-[10px] font-semibold tracking-widest text-[#9AA5B4] uppercase mb-3">
          Illustrative example
        </p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[16px] font-bold text-[#1A2B3C] mb-0.5">Riverside Community Pharmacy</p>
            <p className="text-[13px] text-[#566476] mb-3">About 2.4 miles away · Austin, TX</p>
            <p className="text-[13px] text-[#2B3A4F] mb-0.5">Recently updated. Confirm before traveling.</p>
            <p className="text-[12px] text-[#7C8A9B] mb-4">Signal freshness: recent</p>
            <div className="flex gap-2 flex-wrap">
              {["View pharmacy details", "Save this search", "Create alert"].map((label) => (
                <button
                  key={label}
                  className="text-[14px] px-3.5 py-1.5 border border-[#CDD7E3] cursor-pointer rounded-[7px] bg-white text-[#0D1B2E] font-semibold hover:bg-[#F8FAFC] transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-[#E1F5EE] text-[#085041] text-[12px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
              <Image src='/searchmed/signal.png' alt="tick" width={12} height={12} />
              Strong signal
            </span>
          </div>
        </div>
      </div>

      {/* Signal legend */}
      <div className="w-full max-w-5xl mx-auto">
        <p className="text-[15px] font-bold text-[#1A2B3C] mb-3">What each signal means</p>
        <div className="grid grid-cols-2 gap-2.5">
          {signals.map((s) => (
            <div
              key={s.title}
              className="bg-white md:h-[83px] border flex flex-col md:flex-row border-[#E2E8F0] rounded-xl p-3.5 flex items-start gap-3"
            >
              <span
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 mt-0.5"
                style={{ background: s.badge.bg, color: s.badge.color }}
              >
                <Image src={s.badge.icon.src} alt={s.badge.icon.alt} width={12} height={12} />
                {s.badge.label}
              </span>
              <div>
                <p className="text-[15px] font-bold text-[#1A2B3C] mb-0.5">{s.title}</p>
                <p className="text-[13px] text-[#566476]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}