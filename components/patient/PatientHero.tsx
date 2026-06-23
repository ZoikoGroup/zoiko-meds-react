export default function HeroSection() {
  return (
    <section className="bg-[#F9F9FF] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Headline + subtext + CTAs */}
        <div>
          <h1 className="text-4xl sm:text-5xl md:min-w-[580px] font-bold text-[#0A1628] leading-tight mb-4">
            Find out if your medicine is in stock before you make the trip.
          </h1>
          <p className="text-[16px] text-[#44474D] md:min-w-[560px] leading-relaxed mb-8 max-w-[420px]">
            We connect directly to pharmacy inventory data to show you real-time
            signals of medicine availability in your area. No more wasted trips or
            unnecessary phone calls.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-[#00B7A8] hover:bg-[#028e83] text-white text-[14px] font-inter px-5 py-3 rounded-full transition-colors duration-200 cursor-pointer">
              Check Medicine Availability
              <img src="/patient/arrow.png" alt="image" height="16px" width="16px" />
            </button>
            <button className="text-[14px] cursor-pointer font-inter text-[#151C27] font-medium border border-[#C4C6CE] px-5 py-3 rounded-full hover:bg-[#F4F6FA] transition-colors duration-200">
              How It Works
            </button>
          </div>
        </div>

        {/* Right: Search card */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-6 md:max-w-lg">
          <h2 className="text-[15px] text-[#151C27] mb-5">
            Search Availability
          </h2>

          <div className="mb-4">
            <label className="block text-[15px] text-[#44474D] mb-1">
              Medicine Name
            </label>
            <input
              type="text"
              placeholder="e.g. Amoxicillin or Ozempic"
              className="w-full border bg-[#F0F3FF] border-[#D0D8E4] rounded-lg px-4 py-2.5 text-[14px] text-[#0A1628] placeholder-[#6B7280] focus:outline-none focus:border-[#1D9E75] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="block text-[15px] font-medium text-[#44474D] mb-1">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="City or ZIP"
                  className="w-full bg-[#F0F3FF] border border-[#D0D8E4] rounded-lg px-4 py-2.5 text-[14px] text-[#0A1628] placeholder-[#6B7280] focus:outline-none focus:border-[#1D9E75] transition-colors pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AFBF] text-sm">
                  <img src="/patient/location.png" alt="image" height="14px" width="14px" />
                </span>
              </div>
            </div>
            <div className="relative">
              <label className="block text-[15px] font-medium text-[#44474D] mb-1">
                Radius
              </label>
              <select className="w-full border border-[#D0D8E4] rounded-lg px-4 py-2.5 text-[14px] bg-[#F0F3FF] text-[#0A1628] focus:outline-none focus:border-[#1D9E75] transition-colors appearance-none">
                <option>5 miles</option>
                <option>10 miles</option>
                <option>25 miles</option>
                <option>50 miles</option>
              </select>
              <img
                src="patient/dropdown.png"
                alt="Dropdown"
                className="absolute right-2 top-2/3 -translate-y-1/2 pointer-events-none w-6 h-6"
              />
            </div>
          </div>

          <button className="w-full h-[76px] bg-[#00B7A8] hover:bg-[#0b8a7f] cursor-pointer text-white text-[14px] font-semibold py-3 rounded-xl transition-colors duration-200 mb-4">
            Search Availability
          </button>

          <p className="text-center text-[13px] text-[#44474D]">
            ZoikoMeds does not collect or store your prescription data.
          </p>
        </div>
      </div>
    </section>
  );
}
