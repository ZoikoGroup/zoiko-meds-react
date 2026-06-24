import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-[#F9F9FF] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Headline + subtext + CTAs */}
        <div className="min-h-[420px]">
          <h1 className="text-4xl sm:text-[42px] md:min-w-[560px] font-bold text-[#0A1628] leading-[56px] mb-4">
            Find out if your medicine is in <span className="text-[#00B7A8]">stock before you make the trip.</span>
          </h1>
          <p className="text-[16px] text-[#44474D] md:min-w-[560px] leading-relaxed mb-8 max-w-[420px]">
            We connect directly to pharmacy inventory data to show you real-time
            signals of medicine availability in your area. No more wasted trips or
            unnecessary phone calls.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-[#00B7A8] hover:bg-[#028e83] text-white text-[14px] font-inter px-[32px] py-[17px] rounded-full transition-colors duration-200 cursor-pointer">
              Check Medicine Availability
              <img src="/patient/arrow.png" alt="image" height="16px" width="16px" />
            </button>
            <button className="text-[14px] cursor-pointer font-inter text-[#151C27] font-medium border border-[#C4C6CE] px-[32px] py-[16px] rounded-full hover:bg-[#F4F6FA] transition-colors duration-200">
              How It Works
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <Image src='/patient/hero.png' alt="hero" height={420} width={560} />
        </div>
      </div>
    </section>
  );
}
