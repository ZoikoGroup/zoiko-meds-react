interface RoleRow {
  title: string;
  subtitle: string;
  details: string;
  action: string;
  primary?: boolean;
}

const rows: RoleRow[] = [
  {
    title: "Independent pharmacy visibility",
    subtitle: "Wants stronger local visibility for medicine access inquiries.",
    details:
      "Profile, service area, and confidence signals improve responsible discoverability.",
    action: "Join Pharmacy Network",
    primary: true,
  },
  {
    title: "Multi-location oversight",
    subtitle: "A pharmacy group wants location-level participation control.",
    details:
      "Network admin view shows activity, role permissions, and location health.",
    action: "Request Group Demo",
  },
  {
    title: "Access signal reporting",
    subtitle:
      "Leadership needs visibility into demand, response, and access patterns.",
    details:
      "Reports summarize pharmacy contribution and access intelligence.",
    action: "Request Sample Report",
  },
  {
    title: "Controlled visibility",
    subtitle:
      "Wants participation without unsafe public stock exposure.",
    details:
      "Role-based controls and confidence tiers protect sensitive information.",
    action: "Review Trust Controls",
  },
];

export default function DashboardValueSection() {
  return (
    <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 uppercase text-sm font-semibold tracking-[2px] text-[#13A594]">
          05 · Pharmacy operations use cases
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Dashboard value, mapped to{" "}
          <span className="text-[#0FAA87]">pharmacy
            roles.</span>
        </h2>

        <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {rows.map((row, index) => (
            <div
              key={row.title}
              className={`grid gap-6 p-6 md:grid-cols-[1.2fr_2fr_auto] md:items-center ${index !== rows.length - 1 ? "border-b border-gray-200" : ""
                }`}
            >
              {/* Left */}
              <div>
                <h3 className="text-[22px] font-semibold text-[#0D1526]">
                  {row.title}
                </h3>
                <p className="mt-2 max-w-xs text-base leading-7 text-[#5A6E87]">
                  {row.subtitle}
                </p>
              </div>

              {/* Middle */}
              <p className="max-w-lg text-lg leading-8 text-[#0D1526]">
                {row.details}
              </p>

              {/* Right */}
              <button
                className={`h-12 rounded-xl px-8 text-base font-semibold transition ${row.primary
                    ? "bg-[#1AA89C] text-white hover:bg-[#16988D]"
                    : "border border-[#D8E2EC] bg-white text-[#0D1526] hover:bg-gray-50"
                  }`}
              >
                {row.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
