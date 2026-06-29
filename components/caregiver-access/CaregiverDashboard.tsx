"use client"
import { useState } from "react";

const IconPerson = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
);

const IconChild = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" />
        <path d="M12 14c-5 0-8 2.5-8 4v2h16v-2c0-1.5-3-4-8-4z" />
        <circle cx="17" cy="6" r="2" fill="currentColor" opacity="0.6" />
    </svg>
);

const IconPlane = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
);

const IconPin = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const IconEdit = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const IconGear = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

const IconShield = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

type AlertStatus = "active" | "paused" | "expired";

interface CaregiverLabel {
    id: string;
    name: string;
    searches: number | "Expired";
    status: AlertStatus;
}

interface SearchCard {
    id: string;
    labelId: string;
    icon: "person" | "child" | "plane";
    iconBg: string;
    labelName: string;
    alertStatus: AlertStatus;
    medicine: string;
    radius?: string;
    primaryAction?: string;
    isTemporary?: boolean;
    expiredDate?: string;
    note?: string;
    primary: boolean;
    src: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const labels: CaregiverLabel[] = [
    { id: "mom", name: "Mom", searches: 1, status: "active" },
    { id: "child", name: "Child", searches: 2, status: "paused" },
    { id: "travel", name: "Travel (Temporary)", searches: "Expired", status: "expired" },
];

const cards: SearchCard[] = [
    {
        id: "1",
        labelId: "mom",
        icon: "person",
        iconBg: "bg-[#00B7A8]",
        labelName: "Mom",
        alertStatus: "active",
        medicine: "Metformin 500mg",
        radius: "Downtown (10mi)",
        primary: true,
        src: "/caregiver-access/mom.png"
    },
    {
        id: "2",
        labelId: "child",
        icon: "child",
        iconBg: "bg-[#F4B942]",
        labelName: "Child",
        alertStatus: "paused",
        medicine: "Amoxicillin Susp.",
        primaryAction: "Resume Monitoring",
        primary: false,
        src: "/caregiver-access/child.png"
    },
    {
        id: "3",
        labelId: "travel",
        icon: "plane",
        iconBg: "bg-[#081B33]",
        labelName: "Travel Search (San Francisco)",
        alertStatus: "expired",
        medicine: "",
        note: "Created for temporary trip monitoring",
        expiredDate: "Dec 15, 2023",
        isTemporary: true,
        primary: false,
        src: "/caregiver-access/plane.png"
    },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: AlertStatus }) => {
    if (status === "active")
        return (
            <span className="flex items-center gap-1 text-xs font-bold tracking-widest text-teal-500 uppercase">
                <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
                Alert Active
            </span>
        );
    if (status === "paused")
        return (
            <span className="flex items-center gap-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                Alert Paused
            </span>
        );
    return null;
};

const AvatarIcon = ({
    type,
    bg,
}: {
    type: "person" | "child" | "plane";
    bg: string;
}) => (
    <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center text-white shrink-0`}>
        {type === "person" && <IconPerson />}
        {type === "child" && <IconChild />}
        {type === "plane" && <IconPlane />}
    </div>
);


export default function CaregiverDashboard() {
    const [selectedLabel, setSelectedLabel] = useState<string>("mom");

    const activeCards = cards.filter((c) => !c.isTemporary);
    const expiredCards = cards.filter((c) => c.isTemporary);

    return (
        <section className="bg-[#F9F8FC] px-4 py-16">
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <div className="flex flex-col gap-6 lg:flex-row md:items-end lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold text-[#0D1B2E]">
                            Organizational{" "}
                            <span className="text-[#0FAA87]">Dashboard</span>
                        </h2>

                        <p className="max-w-[523px] text-[16px] leading-6 text-[#44474D]">
                            A streamlined interface designed for clarity and rapid
                            response. Keep everyone's needs in view without clinical
                            clutter.
                        </p>
                    </div>

                    <button className="rounded-xl cursor-pointer hover:bg-[#e2e8f897] flex items-center gap-2 border border-[#CDD7E3] bg-[#E2E8F8] px-6 py-3">
                        <img src="/caregiver-access/add.png" alt="add" width={20} height={20} />
                        <span className="text-[#081B33] text-base">New Label</span>
                    </button>
                </div>

                <div className="max-w-6xl mt-12 mx-auto grid grid-cols-[280px_1fr] gap-5">

                    {/* ── Left column ── */}
                    <div className="flex flex-col gap-4">
                        {/* Caregiver Labels */}
                        <div className="bg-white border w-[360px] border-[#C4C6CE] rounded-2xl shadow-sm p-4">
                            <h2 className="flex items-center gap-2 text-[16px] font-bold text-[#081B33] mb-3">
                                <img src="/caregiver-access/label.png" alt="label" width={10} height={10} />
                                <span>Caregiver Labels</span>
                            </h2>
                            <ul className="space-y-1">
                                {labels.map((label) => (
                                    <li key={label.id}>
                                        <button
                                            onClick={() => setSelectedLabel(label.id)}
                                            className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm transition-colors ${selectedLabel === label.id
                                                ? "bg-[#F0F3FF] font-medium text-[#151C27]"
                                                : "text-[#151C27] hover:bg-slate-50"
                                                }`}
                                        >
                                            <span>{label.name}</span>
                                            <span
                                                className={`text-xs ${label.searches === "Expired"
                                                    ? "text-[#75777E]"
                                                    : "text-[#75777E]"
                                                    }`}
                                            >
                                                {label.searches === "Expired"
                                                    ? "Expired"
                                                    : `${label.searches} Search${label.searches !== 1 ? "es" : ""}`}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Preferred Locations */}
                        <div className="bg-white border w-[360px] border-[#C4C6CE] rounded-2xl shadow-sm p-4">
                            <h2 className="text-sm font-semibold text-[#081B33] mb-3">Preferred Locations</h2>
                            <ul className="space-y-2">
                                {[
                                    {
                                        text: "Main St. Pharmacy Network",
                                        src: "/caregiver-access/yellow.png"
                                    },
                                    {
                                        text: "Regional Medical Center Hub",
                                        src: "/caregiver-access/gray.png"
                                    }
                                ].map((loc) => (
                                    <li key={loc.text} className="flex items-center gap-2 text-sm text-[#44474D]">
                                        <img src={loc.src} alt="Image" />
                                        {loc.text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Privacy Controls */}
                        <div className="bg-[#E7EEFE] w-[360px] border border-[#00B7A833] rounded-2xl p-4">
                            <h2 className="flex items-center gap-2 text-sm font-bold text-[#081B33] mb-2">
                                <img src="/caregiver-access/control.png" alt="Image" width={16} height={20} />
                                <span>Privacy Controls</span>
                            </h2>
                            <span className="text-[16px] leading-6 text-[#081B33]">
                                You have full control over your organization data.
                            </span>
                            <ul className="space-y-2">
                                {["Delete All Labels", "Export Search History", "Manage Notification Opt-out"].map((action) => (
                                    <li key={action}>
                                        <button className="text-sm text-[#081B33] mt-3 font-semibold hover:text-slate-900 hover:underline transition-colors text-left">
                                            {action}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ── Right column ── */}
                    <div className="flex flex-col ml-22 gap-4">

                        {/* Active search cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {activeCards.map((card) => (
                                <div key={card.id} className="bg-white min-h-[320px] rounded-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] p-5 flex flex-col gap-4 relative overflow-hidden">
                                    {/* Decorative circle */}
                                    <div className={`absolute -top-6 -right-6 w-30 h-30 rounded-bl-full opacity-60 ${card.primary && "bg-[#00B7A80D]"}`} />

                                    <div className="flex items-start justify-between relative">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-11.5 w-10 ${card.iconBg} rounded-2xl p-3 pb-5`}>
                                                <img src={card.src} alt="Image" height={18} width={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{card.labelName}</p>
                                                <StatusBadge status={card.alertStatus} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <p className="text-[16px] font-bold tracking-[1.6px] text-[#75777E] uppercase mb-0.5">
                                                Saved Medicine Search
                                            </p>
                                            <p className="text-base text-[#081B33]">{card.medicine}</p>
                                        </div>

                                        {card.radius && (
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-bold tracking-widest text-[#75777E] uppercase mb-0.5">
                                                        Radius
                                                    </p>
                                                    <p className="text-sm text-[#44474D]">{card.radius}</p>
                                                </div>
                                                <button className="w-8 h-8 rounded-full border border-[#C4C6CE] flex items-center justify-center text-slate-400 hover:text-teal-500 hover:border-teal-300 transition-colors">
                                                    <img src="/caregiver-access/edit.png" alt="edit" width={18} height={18} />
                                                </button>
                                            </div>
                                        )}

                                        {card.primaryAction && (
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-bold tracking-widest text-[#75777E] uppercase mb-0.5">
                                                        Primary Action
                                                    </p>
                                                    <button className="text-sm font-semibold text-[#00B7A8] hover:text-teal-600 transition-colors">
                                                        {card.primaryAction}
                                                    </button>
                                                </div>
                                                <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                                                    <img src="/caregiver-access/settings.png" alt="edit" width={18} height={18} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Expired / temporary card */}
                        {expiredCards.map((card) => (
                            <div
                                key={card.id}
                                className="bg-white rounded-2xl shadow-sm p-5 border border-dashed min-h-[220px] border-slate-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-11.5 w-10 ${card.iconBg} rounded-2xl p-3 pb-5`}>
                                            <img src={card.src} alt="Image" height={18} width={18} />
                                        </div>
                                        <div>
                                            <p className="text-base text-[#081B33">{card.labelName}</p>
                                            {card.note && (
                                                <p className="text-xs text-[#75777E] italic">{card.note}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[16px] font-extrabold tracking-widest text-[#BA1A1A] uppercase">
                                            Expired Date
                                        </p>
                                        <p className="text-[15px] font-medium text-[#081B33]">{card.expiredDate}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end items-center gap-4 border-t border-slate-100 pt-3">
                                    <button className="text-sm text-[#75777E] hover:text-slate-700 transition-colors">
                                        Delete Temporary Label
                                    </button>
                                    <button className="text-sm font-bold text-[#00B7A8] hover:text-teal-600 transition-colors">
                                        Renew Search
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}