interface Row {
  level: string;
  access: string;
  canShow: string;
  mustNotShow: string;
}

const rows: Row[] = [
  {
    level: "Public Confidence",
    access: "Patients and general visitors where enabled.",
    canShow: "Directional availability signal, update freshness, contact/routing guidance.",
    mustNotShow: "Exact stock quantity, restricted procurement notes, internal comments.",
  },
  {
    level: "Verified Network",
    access: "Approved ZoikoMeds pharmacy network users.",
    canShow: "Enhanced signal status, confidence tier, network participation indicators.",
    mustNotShow: "Unauthorized supplier terms, sensitive counts, patient data.",
  },
  {
    level: "Pharmacy Internal",
    access: "Authorized pharmacy users.",
    canShow: "Operational notes, internal thresholds, update tasks, audit trail.",
    mustNotShow: "Data outside user permissions or other pharmacy confidential data.",
  },
  {
    level: "Enterprise Restricted",
    access: "Approved enterprise or network administrators.",
    canShow: "Aggregated reports, multi-location trends, role-based exports.",
    mustNotShow: "Patient-specific medical data or unauthorized location-level stock exposure.",
  },
];

export default function SignalPermissionModelSection() {
  return (
    <section className="bg-[#F6F9Fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
          05 · Signal & permission model
        </p>

        <h1 className="text-3xl max-w-160 font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
          What&apos;s public, restricted,{" "}
          <span className="text-[#0FAA87]"> internal, and
            enterprise-only.</span>
        </h1>

        <div className="mt-10 bg-white overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full mt-5 min-w-[900px] text-left text-sm">
            <thead>
              <tr className="bg-slate-900 text-xs font-medium uppercase tracking-wide text-slate-300">
                <th className="px-5 py-3">Visibility level</th>
                <th className="px-5 py-3">Who can access</th>
                <th className="px-5 py-3">What can be shown</th>
                <th className="px-5 py-3">What must not be shown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {rows.map((row) => (
                <tr key={row.level}>
                  <td className="px-5 py-4 text-[13.3px] md:min-w-45 font-semibold text-[#0D1B2E]">{row.level}</td>
                  <td className="px-5 py-4 text-[13.3px] text-[#2B3A4F]">{row.access}</td>
                  <td className="px-5 py-4 text-[13.3px] text-gray-500">{row.canShow}</td>
                  <td className="px-5 py-4 text-[12.8px] text-red-500">{row.mustNotShow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
