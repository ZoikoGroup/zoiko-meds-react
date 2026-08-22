import {
    ChevronDown,
    Check,
} from "lucide-react";

const notificationOptions = [
    { label: "Email Digest", active: true, src: "/availability-alert/email.png", height: 16, width: 20 },
    { label: "SMS Text", active: false, src: "/availability-alert/sms.png", height: 20, width: 20 },
    { label: "Mobile Push", active: true, src: "/availability-alert/push.png", height: 20, width: 16 },
];

const Fatigue = [
    {
        title: "Deduplication",
        description:
            "We merge identical signals from multiple providers into a single notification.",
        src: "/availability-alert/sparkels.png",
        height: 22,
        width: 22
    },
    {
        title: "Frequency Caps",
        description:
            "Never receive more than one alert every 4 hours for the same medicine.",
        src: "/availability-alert/freq.png",
        height: 16,
        width: 20
    },
];

export default function AvailabilityControl() {
    return (
        <section className="bg-[#F9F9FF] px-6 py-16 lg:px-12">
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <div>
                    <p className="text-[32px] font-semibold leading-[40px] tracking-[.32px] text-[#000615]">
                        Alert <span className="text-[#0FAA87]">Controls & Logic</span>
                    </p>

                    <p className="mt-1 text-[16px] leading-6 text-[#44474D]">
                        Configure the precision and timing of your availability signals.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_340px]">
                    {/* LEFT */}
                    <div className="space-y-6">
                        {/* Required Inputs */}
                        <div className="rounded-2xl border border-[#E5E7EB80] bg-[#FFFFFFCC] p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-2">
                                <img src="/availability-alert/required.png" alt="Required" width={20} height={15} />
                                <h3 className="font-semibold text-[#000615]">
                                    Required Inputs
                                </h3>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#344054]">
                                        Medicine
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Start typing medicine name..."
                                        className="h-12 p-4 w-full rounded-xl border border-[#CBD5E1] bg-white text-[#000615] font-medium placeholder:text-[#64748B] outline-none focus:border-[#0FAA87]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#344054]">
                                        Location
                                    </label>

                                    <div className="relative">

                                        <input
                                            type="text"
                                            placeholder="ZIP code or City"
                                            className="h-12 p-4 w-full rounded-xl border border-[#CBD5E1] bg-white text-[#000615] font-medium placeholder:text-[#64748B] outline-none focus:border-[#0FAA87]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 max-w-sm">
                                <label className="mb-2 block text-sm font-medium text-[#344054]">
                                    Search Radius
                                </label>

                                <div className="relative">
                                    <select className="h-12 w-full appearance-none rounded-xl border text-[#000615] bg-white border-[#CBD5E1] font-medium px-4 outline-none focus:border-[#0FAA87]">
                                        <option>10 Miles</option>
                                        <option>25 Miles</option>
                                        <option>50 Miles</option>
                                    </select>

                                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Controls */}
                        <div className="rounded-[20px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
                            {/* Heading */}
                            <div className="flex items-center gap-2">
                                <img
                                    src="/availability-alert/controls.png"
                                    alt="Optional Controls"
                                    width={20}
                                    height={20}
                                />

                                <h3 className="font-medium text-[#000615]">
                                    Optional Controls
                                </h3>
                            </div>

                            {/* Inputs */}
                            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                                {/* Strength */}
                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-[#000615]">
                                        Strength / Form
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. 50mg Tablets"
                                        className="h-12 w-full rounded-xl border border-[#CBD5E1] bg-white px-4 text-[#000615] font-medium outline-none transition placeholder:text-[#64748B] focus:border-[#0FAA87]"
                                    />
                                </div>

                                {/* Quiet Hours */}
                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-[#000615]">
                                        Quiet Hours
                                    </label>

                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            value="10:00 PM"
                                            readOnly
                                            className="h-12 rounded-xl border border-[#CBD5E1] bg-white p-3 text-[#000615] font-medium outline-none"
                                        />

                                        <input
                                            type="text"
                                            value="08:00 AM"
                                            readOnly
                                            className="h-12 rounded-xl border border-[#CBD5E1] bg-white p-3 text-[#000615] font-medium outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Signal Threshold */}
                            <div className="mt-8">
                                <p className="mb-4 text-sm font-medium text-[#000615]">
                                    Signal Threshold Sensitivity
                                </p>

                                <div className="grid gap-4 md:grid-cols-2">
                                    {/* Active */}
                                    <button className="rounded-xl border-2 cursor-pointer border-[#006A65] bg-[#006A650D] p-4 text-left transition hover:bg-[#EDF8F6]">
                                        <h4 className="text-xl font-bold text-[#000615]">
                                            Strong Signal Only
                                        </h4>

                                        <p className="text-sm leading-6 font-semibold text-[#44474D]">
                                            Minimizes noise, alerts only for high-confidence data.
                                        </p>
                                    </button>

                                    {/* Normal */}
                                    <button className="rounded-xl border cursor-pointer border-[#C4C6CE4D] bg-white p-4 text-left transition hover:border-[#0FAA87]">
                                        <h4 className="text-xl font-bold text-[#000615]">
                                            Any Availability Shift
                                        </h4>

                                        <p className="text-sm leading-6 font-semibold text-[#44474D]">
                                            Alerts for any change, including low-signal movements.
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">
                        {/* Notifications */}

                        <div className="rounded-[20px] bg-[#0B1F3A] p-6 pt-15 flex flex-col gap-6 shadow-lg">

                            <div className="space-y-4">
                                {notificationOptions.map(({ label, active, src, height, width }) => (
                                    <div
                                        key={label}
                                        className="flex items-center justify-between rounded-[12px] border border-[#FFFFFF1A] bg-[#00061533] p-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img src={src} alt={label} height={height} width={width} />
                                            <span className="text-[16px] font-medium text-[#7587A7]">
                                                {label}
                                            </span>
                                        </div>

                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-[6px] transition-colors ${active
                                                ? "bg-[#0FAA87] border border-[#0FAA87]"
                                                : "border border-[#6B7280] bg-white"
                                                }`}
                                        >
                                            {active && (
                                                <Check className="h-3.5 w-3.5 text-white stroke-[3]" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fatigue */}

                        <div className="rounded-2xl bg-[#FFFFFFCC] border border-[#E5E7EB80] border-l-3 p-6 shadow-sm">
                            <h3 className="mb-4 font-semibold text-[#000615]">
                                Alert Fatigue Protection
                            </h3>

                            <div className="space-y-5">
                                {Fatigue.map((item) => (
                                    <div key={item.title} className="flex items-start justify-center gap-3">
                                        <img src={item.src} alt={item.title} height={item.height} width={item.width} />

                                        <div>
                                            <h4 className="font-bold text-sm tracking-[0.14px] text-[#151C27]">
                                                {item.title}
                                            </h4>

                                            <p className="mt-1 text-sm leading-6 font-semibold text-[#44474D]">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}