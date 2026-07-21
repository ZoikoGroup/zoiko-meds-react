"use client"

import { useRouter } from "next/navigation"

export default function CookieHero() {
    const router = useRouter();
    return (
        <section className="bg-gradient-to-b from-[#F6F9FC] to-[#EEF2F7] px-6 md:px-54 py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-25 items-center">
                {/* Left Part */}
                <div>
                    <div className="text-xs flex flex-wrap gap-2 md:gap-3 leading-4 tracking-[0.45px] text-[#566476]">
                        <span>Home</span>
                        <span className="text-[#CDD7E3]">/</span>
                        <span>Legal</span>
                        <span>&</span>
                        <span>Trust</span>
                        <span className="text-[#CDD7E3]">/</span>
                        <span className="text-[#7C8A9B]">Cookie Settings</span>
                    </div>

                    <p className="text-xs mt-4 font-medium tracking-[2px] text-[#13A594] mb-2">
                        COOKIE SETTINGS
                    </p>

                    <h1 className="text-3xl sm:text-4xl max-w-full md:max-w-125 font-bold text-slate-900 leading-tight">
                        Manage your cookie and{" "}
                        <span className="text-[#0FAA87]">tracking choices.</span>
                    </h1>

                    <p className="text-[#566476] max-w-full md:max-w-135 mt-4 leading-6">
                        Choose how ZoikoMeds uses essential, functional, analytics, and optional
                        personalization technologies across our website and digital services. You
                        can change your choices at any time.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button 
                        onClick={()=>router.push("#")}
                        className="bg-[#13A594] cursor-pointer border border-[#13A594] hover:bg-[#13A594]/90 text-white text-sm font-semibold rounded-md px-5 py-2.5">
                            Manage cookie settings
                        </button>

                        <button 
                        onClick={()=>router.push("/privacy-center")}
                        className="bg-white border font-semibold cursor-pointer border-[#CDD7E3] text-[#0D1B2E] hover:bg-white/10 text-sm rounded-md px-5 py-2.5">
                            Privacy Center
                        </button>
                    </div>

                    <a
                        href="#"
                        className="mt-4 inline-block text-sm font-medium text-[#13A594] hover:underline"
                    >
                        Learn about ZoikoMeds Trust Center →
                    </a>

                    <p className="mt-4 flex max-w-full md:max-w-[450px] items-start gap-2 text-sm leading-6 text-[#566476]">
                        <img
                            src="/cookie-settings/view.png"
                            alt="image"
                            height={15}
                            width={15}
                            className="mt-1 shrink-0"
                        />
                        <span>
                            Essential cookies keep the site working. Non-essential cookies
                            are used only according to your choices and applicable law.
                        </span>
                    </p>

                </div>

                {/* Right part */}

                <div className="flex justify-center">
                    <img src="/cookie-settings/hero.png" alt="Image" width={440} height={330} />
                </div>
            </div>
        </section>
    )
}