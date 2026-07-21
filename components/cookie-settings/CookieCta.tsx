"use client"

import { useRouter } from "next/navigation"

export default function CookieCta() {
    const router = useRouter();
    return (
        <section className="bg-[#0C1B30] px-6 py-12 md:px-54">
            <div className="max-w-6xl mx-auto">
                <div className="border bg-[linear-gradient(180deg,_#102540_0%,_#0C1B30_100%)] flex flex-col gap-4 border-white/10 rounded-2xl mt-12 p-10 text-center">
                    <h3 className="text-2xl font-bold text-white">
                        Your choices stay{" "}
                        <span className="text-[#0FAA87]">under your control.</span>
                    </h3>
                    <p className="text-[#E7EEF6B2] text-center max-w-125 mx-auto">
                        Manage cookies now, revisit your settings at any time, and use the
                        Privacy Center for broader data rights and account privacy
                        controls.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                        <button onClick={()=>router.push("#")}
                        className="px-5 py-2.5 rounded-lg bg-[#13A594] cursor-pointer hover:bg-teal-600 transition text-white text-sm font-semibold">
                            Manage Cookie Settings
                        </button>
                        <button  onClick={()=>router.push("/privacy-center")}
                         className="px-5 py-2.5 rounded-lg cursor-pointer border border-white/25 hover:bg-white/5 transition text-white text-sm font-semibold">
                            Privacy Center
                        </button>
                    </div>
                    <a href="#" className="text-[#E7EEF6D9] font-medium text-center text-[15px] hover:underline">Contact Privacy Support →</a>
                </div>
            </div>
        </section>
    )
}