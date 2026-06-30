type NotCard = { title: string; body: string };

const notCards: NotCard[] = [
    {
        title: "No prescribing",
        body: "ZoikoMeds does not prescribe, change prescriptions, or validate clinical suitability.",
    },
    {
        title: "No dispensing",
        body: "Dispensing decisions remain with licensed pharmacies and pharmacists.",
    },
    {
        title: "No sales or delivery",
        body: "ZoikoMeds does not sell, ship, deliver, reserve, or allocate medicines.",
    },
    {
        title: "No stock guarantees",
        body: "Availability is confidence-based and must be confirmed directly with the pharmacy.",
    },
    {
        title: "No exact public stock",
        body: "Public pages do not disclose exact pharmacy-level quantities.",
    },
    {
        title: "No patient data sales",
        body: "Enterprise intelligence must not expose identifiable patient-level behavior.",
    },
];

export default function TrustDoctrine() {
    return (
        <section className="bg-[#f6f9fc] px-6 md:px-54 py-12">
            <div className="max-w-6xl mx-auto">
                <p className="text-xs text-[#13A594] tracking-[2px] font-semibold mb-4">
                    01 · Trust Doctrine
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10">
                    What ZoikoMeds is — and{" "}
                    <span className="text-[#0FAA87]">what it is not.</span>
                </h2>
                <p className="text-[#2B3A4F] max-w-[780px] leading-7 mb-8">
                    ZoikoMeds is governed medicine availability infrastructure. It helps users understand availability signals
                    from participating verified pharmacies and helps institutions evaluate medicine access patterns under
                    approved governance. ZoikoMeds is not a pharmacy, prescriber, dispenser, delivery provider,
                    marketplace, clinical decision-support system, or emergency service.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notCards.map((c) => (
                        <div key={c.title} className="bg-white rounded-xl p-5 shadow-sm">
                            <div className="flex items-start gap-2">
                               <div className="bg-[#FEF3F2] flex justify-center items-center h-8 w-8 rounded-[8px]">
                                    <img src="/trust-center/cross.png" alt="image" />
                               </div>
                                <div>
                                    <p className="font-semibold text-sm text-slate-900">
                                        {c.title}
                                    </p>
                                    <p className="text-[13.2px] max-w-65 text-[#566476] mt-1 leading-5">
                                        {c.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
