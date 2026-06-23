import Image from 'next/image';
const signals = [
  {
    icon: '/patient/strong.png',
    iconBg: "bg-[#DCFCE7]",
    label: "Strong Signal",
    badge: "RELIABLE",
    badgeColor: "bg-[#DCFCE7] text-[#166534]",
    desc: "The pharmacy reported multiple stock updates today. There is a high probability this item is available for pickup now.",
  },
  {
    icon: "/patient/limited.png",
    iconBg: "bg-[#FEF9C3]",
    label: "Limited Signal",
    badge: "LOW STOCK",
    badgeColor: "bg-[#FEF9C3] text-[#854D0E]",
    desc: "Only a few units were reported. Inventory is moving quickly. We recommend visiting soon or checking back in an hour.",
  },
  {
    icon: "/patient/confirm.png",
    iconBg: "bg-[#FFEDD5]",
    label: "Confirmation Needed",
    badge: "DELAYED DATA",
    badgeColor: "bg-[#FEFDD5] text-[#9A3412]",
    desc: "The last report was over 24 hours ago. Please call the pharmacy to confirm availability before you travel.",
  },
  {
    icon: "/patient/outofstock.png",
    iconBg: "bg-[#F1F5F9]",
    label: "No Current Signal",
    badge: "OUT OF STOCK",
    badgeColor: "bg-[#F1F5F9] text-[#1E293B]",
    desc: "This pharmacy has not reported stock for several days. It is unlikely they have this medicine in inventory currently.",
  },
];

export default function PatientSignal() {
  return (
    <section className="bg-[#F9F9FF] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#151C27] mb-2">
            Confidence, not guesswork.
          </p>
          <p className="text-[13px] text-[#44474D] max-w-md mx-auto leading-relaxed">
            We translate complex supply chain data into simple signals so you can make informed decisions for your health.
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {signals.map((s) => (
            <div
              key={s.label}
              className="flex items-start gap-4 border border-[#E2E8F0] rounded-xl px-5 py-4 hover:border-[#1D9E75]/30 transition-colors"
            >
              <div className={`w-9 h-9 rounded-full ${s.iconBg} flex items-center justify-center text-[16px] flex-shrink-0 mt-0.5`}>
                <Image
                  src={s.icon}
                  alt={s.label}
                  width={16}
                  height={16}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[16px] font-semibold text-[#0A1628]">{s.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                </div>
                <p className="text-[16px] text-[#5A6A80] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Example result bar */}
        <div className="flex items-center justify-between border border-[#E2E8F0] rounded-xl px-5 py-3 bg-[#E7EEFE]">
          <span className="text-[13px] text-[#44474D]">
            Example Results: <span className="text-[#44474D]">Metformin 500mg</span>
          </span>
          <span className=" text-sm text-center md:text-[11px] bg-[#00A99D] text-[#ffffff] px-3 py-1 rounded-full">
            Updated 12m ago
          </span>
        </div>
      </div>
    </section>
  );
}
