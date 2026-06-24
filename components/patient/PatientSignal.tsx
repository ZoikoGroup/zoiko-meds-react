import Image from 'next/image';
const signals = [
  {
    icon: '/patient/strong.png',
    iconBg: "bg-[#DCFCE7]",
    label: "Strong Signal",
    badge: "RELIABLE",
    badgeColor: "bg-[#DCFCE7] text-[#166534]",
    height:20,
    width:20,
    desc: "The pharmacy reported multiple stock updates today. There is a high probability this item is available for pickup now.",
  },
  {
    icon: "/patient/limited.png",
    iconBg: "bg-[#FEF9C3]",
    label: "Limited Signal",
    badge: "LOW STOCK",
    badgeColor: "bg-[#FEF9C3] text-[#854D0E]",
    height:19,
    width:22,
    desc: "Only a few units were reported. Inventory is moving quickly. We recommend visiting soon or checking back in an hour.",
  },
  {
    icon: "/patient/confirm.png",
    iconBg: "bg-[#FFEDD5]",
    label: "Confirmation Needed",
    badge: "DELAYED DATA",
    badgeColor: "bg-[#FFEDD5] text-[#9A3412]",
    height:18,
    width:18,
    desc: "The last report was over 24 hours ago. Please call the pharmacy to confirm availability before you travel.",
  },
  {
    icon: "/patient/outofstock.png",
    iconBg: "bg-[#F1F5F9]",
    label: "No Current Signal",
    badge: "OUT OF STOCK",
    badgeColor: "bg-[#F1F5F9] text-[#1E293B]",
    height:20,
    width:20,
    desc: "This pharmacy has not reported stock for several days. It is unlikely they have this medicine in inventory currently.",
  },
];

export default function PatientSignal() {
  return (
    <section className="bg-[#F9F9FF] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xl font-semibold text-[#151C27] mb-2">
            Confidence, not guesswork.
          </p>
          <p className="text-[16px] text-[#44474D] max-w-[672px] mx-auto leading-relaxed">
            We translate complex supply chain data into simple signals so you can make informed decisions for your health.
          </p>
        </div>

        <div className="flex flex-col mb-6 bg-white border border-[#E2E8F0] rounded-3xl">
          {signals.map((s) => (
            <div
              key={s.label}
              style={{ borderBottom: "1px solid #E2E8F0" }}
              className="flex items-start gap-4 px-5 py-4 hover:border-[#1D9E75]/30 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${s.iconBg} flex items-center justify-center text-[16px] flex-shrink-0 mt-0.5`}>
                <Image
                  src={s.icon}
                  alt={s.label}
                  width={s.width}
                  height={s.height}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="text-[16px] text-[#151C27]">{s.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-xl ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                </div>
                <p className="text-[16px] text-[#44474D] leading-relaxed">{s.desc}</p>
              </div>
            </div>

          ))}
          <div className="flex items-center justify-between border-l border-r border-b border-[#E2E8F0] rounded-bl-3xl rounded-br-3xl px-5 py-4 bg-[#E7EEFE]">
          <span className="text-[16px] text-[#44474D]">
            Example Results: <span className="text-[#44474D]">Metformin 500mg</span>
          </span>
          <span className=" text-[16px] text-center bg-[#00A99D] text-[#ffffff] px-3 py-1 rounded-full">
            Updated 12m ago
          </span>
        </div>
      </div>
    </div>
    </section >
  );
}
