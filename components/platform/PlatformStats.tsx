export default function PlatformStats() {
    return (
        <section className="bg-[#005C55] py-24 font-sans">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-10">

                <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                    Search starts here.
                    <span className="block">Infrastructure scales from here.</span>
                </h2>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="#"
                        className="bg-white text-[#005C55] font-semibold text-[15px] px-10 py-4 rounded-sm hover:bg-gray-50 transition-colors duration-150 whitespace-nowrap"
                    >
                        Check Medicine Availability
                    </a>
                    <a
                        href="#"
                        className="border border-white text-white text-[15px] px-10 py-4 rounded-sm hover:bg-white/10 transition-colors duration-150 whitespace-nowrap"
                    >
                        Request a Briefing
                    </a>
                </div>

            </div>
        </section>
    );
}
