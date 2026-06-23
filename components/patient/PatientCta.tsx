export default function PatientCta() {
  return (
    <section className="bg-[#F9F9FF] py-20 px-6">
      <div className="max-w-2xl mx-auto text-center bg-[#E7EEFE] p-15 rounded-3xl ">
        <h2 className="text-sm font-semibold text-[#151C27] mb-3">
          Ready to find your medicine?
        </h2>
        <p className="text-sm text-[#151C27] mb-8">
          Save time and stress by checking local stock levels in seconds.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="bg-[#00B7A8] hover:bg-[#05a89a] cursor-pointer text-white text-[14px] px-7 py-3 rounded-full transition-colors duration-200">
            Start with a search
          </button>
          <button className="text-[14px] cursor-pointer text-[#0A1628] border border-[#D0D8E4] bg-white px-7 py-3 rounded-full hover:bg-[#F4F6FA] transition-colors duration-200">
            Create Free Account
          </button>
        </div>
      </div>
    </section>
  );
}
