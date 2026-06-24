import Image from 'next/image';

const caregiverFeatures = [
  {
    title: "Search on their behalf:",
    desc: "Easily toggle between multiple locations and medicine lists for different family members.",
  },
  {
    title: "Save medicines separately:",
    desc: "Keep your prescriptions organized with separate profiles for children, partners, or parents.",
  },
  {
    title: "Receive alerts:",
    desc: "Get stock notifications directly to your phone so you can pick up refills on your way home.",
  },
];

export default function PatientCaregiver() {
  return (
    <section className="bg-[#F0F3FF] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-[#D8EDE6] aspect-[4/3]">
          <img
            src="/patient/caregiver.png"
            alt="Caregiver helping elderly patient"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <p className="text-3xl font-semibold text-[#151C27] mb-3">
            Built for Caregivers Too.
          </p>
          <p className="text-[16px] text-[#44474D] leading-relaxed mb-8">
            We know that managing health is often a family effort. ZoikoMeds includes features specifically for those looking after loved ones.
          </p>
          <div className="flex flex-col gap-5">
            {caregiverFeatures.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Image src='/patient/tick.png' alt='tick' height={16} width={16} />
                </div>
                <p className="text-[16px] font-bold text-[#151C27] leading-relaxed">
                  <span className="font-bold text-[#0A1628]">{f.title}</span>{" "}
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
