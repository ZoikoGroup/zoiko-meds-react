import Image from 'next/image';

export default function PatientTrust() {
  return (
    <section className="bg-[#F9F9FF] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Privacy */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image
              src='/patient/privacy.png' alt='privacy' height={16} width={20}
            />
            <h2 className="text-xl font-semibold text-[#151C27]">Your Privacy</h2>
          </div>
          <p className="text-[16px] text-[#44474D] leading-relaxed mb-6">
            We prioritize your data security and anonymity above all else. Our platform is designed to be helpful without being intrusive.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "No account required for basic searches",
              "We never ask for or store prescription numbers",
              "Your search history is never sold to third parties",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text[16px] text[#151C27]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Boundaries */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image
              src='/patient/boundary.png' alt='privacy' height={18} width={19}
            />
            <h2 className="text-xl font-semibold text-[#151C27] font-Inter">Our Boundaries</h2>
          </div>
          <p className="text-[16px] text-[#44474D] leading-relaxed mb-6">
            ZoikoMeds is an information platform, not a healthcare provider. It is important to understand our role in your care journey.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "We are not a pharmacy and do not sell medicine",
              "We cannot issue or verify prescriptions",
              "Availability signals are estimates and can change quickly",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text[16px] text[#151C27]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
