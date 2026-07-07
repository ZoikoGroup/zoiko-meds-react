interface Update {
  label: string;
  message: string;
  benefit: string;
}

const updates: Update[] = [
  {
    label: "Ready update",
    message:
      "Your pharmacy has marked your medication as ready for pickup. Please follow pharmacy instructions.",
    benefit: "Reduces inbound calls and improves pickup completion.",
  },
  {
    label: "Delay update",
    message:
      "Your pharmacy is still reviewing or preparing your medication. The pharmacy will update you when the status changes.",
    benefit: "Sets expectations without overpromising.",
  },
  {
    label: "Clarification request",
    message:
      "Your pharmacy needs additional information before continuing. Please contact the pharmacy or respond through the secure portal.",
    benefit: "Reduces staffed workflows.",
  },
  {
    label: "Pickup preference",
    message: "Allows the patient to confirm a preferred pickup window where supported.",
    benefit: "Improves staff planning.",
  },
];

export default function PatientCommunicationSection() {
  return (
    <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          06 · Patient communication layer
        </p>
        <h2 className="text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Safe, non-clinical{" "}
          <span className="text-[#0FAA87]">readiness updates. </span>
        </h2>

        <div className="mt-10 divide-y flex flex-col gap-4 divide-gray-200 rounded-xl border border-gray-200">
          {updates.map((update) => (
            <div
              key={update.label}
              className="flex flex-col rounded-xl bg-white py-4 px-5 sm:flex-row sm:items-center"
            >
              <p className="text-sm font-semibold text-gray-900 sm:w-44 sm:shrink-0">
                {update.label}
              </p>
              <p className="text-sm italic leading-relaxed text-gray-600 sm:flex-1">
                &ldquo;{update.message}&rdquo;
              </p>
              <p className="text-sm text-gray-400 sm:w-56 sm:shrink-0">{update.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
