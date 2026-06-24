import Image from 'next/image'
const trustCards = [
  {
    title: "Verified Participation",
    desc: "Every node in our network undergoes rigorous institutional vetting.",
    icon: '/platform/verified.png',
  },
  {
    title: "Infrastructure Engines",
    desc: "Built on resilient cloud architecture with multi-region redundancy.",
    icon: '/platform/infrastructure.png',
  },
  {
    title: "Stock Protection",
    desc: "End-to-end encryption for all inventory telemetry data.",
    icon: '/platform/stock.png',
  },
  {
    title: "Compliance",
    desc: "Full HIPAA, GDPR, and SOC2 Type II audit compliance.",
    icon: '/platform/compliance.png',
  },
];

const pillars = [
  { label: "Neutrality", desc: "Zero-bias routing engine." },
  { label: "Audit", desc: "Full traceability for every call." },
  { label: "Scale", desc: "Built for global deployment." },
  { label: "Control", desc: "Enterprise governance tools." },
];

export default function PlatformManifesto() {
  return (
    <section className="bg-[#070D1A] py-20 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Trust cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {trustCards.map((card) => (
            <div
              key={card.title}
              className="bg-[#0E1623] border border-[#1E2A3A] rounded-2xl p-6 flex flex-col gap-2 hover:border-[#1D9E75]/40 transition-colors duration-200"
            >
              <span>
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={16}
                  height={20}
                /></span>
              <h3 className="text-[15px] font-bold text-white leading-snug">
                {card.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#7A8EA8]">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Manifesto quote block */}
        <div className="flex gap-6 md:max-w-[768px] lg:gap-10 items-start mb-16">
          {/* Teal vertical bar */}
          <div className="flex-shrink-0 w-[3px] self-stretch bg-[#006A65] rounded-full min-h-[248px]" />

          <div className='md:min-w-[1097px]'>
            <blockquote className="text-2xl md:text-4xl font-bold text-white leading-snug tracking-tight mb-0">
              "ZoikoMeds is medicine availability infrastructure. We provide the protocol and the substrate; we do not manufacture, we enable."
            </blockquote>
            {/* Pillars row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 md:max-w-[718px]">
              {pillars.map((p) => (
                <div key={p.label} className="flex flex-col gap-2">
                  <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#7AF6EE]">
                    {p.label}
                  </span>
                  <p className="text-[12px] text-[#7587A7]">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>



      </div>
    </section>
  );
}
