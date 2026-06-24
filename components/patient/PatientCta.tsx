export default function PatientCta() {
  return (
    <section className="bg-[#F9F9FF] py-10 px-4 sm:px-8 md:px-16 lg:px-26">
      <div className="max-w-2xl mx-auto text-center bg-[#E7EEFE] p-8 sm:p-10 md:p-15 rounded-3xl">
        <h2 className="text-4xl font-semibold text-[#151C27] mb-3">
          Ready to find your medicine?
        </h2>
        <p className="text-[16px] text-[#151C27] mb-8">
          Save time and stress by checking local stock levels in seconds.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          <button className="bg-[#00B7A8] hover:bg-[#05a89a] cursor-pointer text-white leading-[28px] text-[16px] sm:text-[18px] px-8 sm:px-12 py-4 sm:py-5 rounded-full transition-colors duration-200 w-full sm:w-auto">
            Start with a search
          </button>
          <button className="text-[16px] sm:text-[18px] leading-[28px] cursor-pointer text-[#000615] border border-[#C4C6CE] bg-white px-8 sm:px-12 py-4 sm:py-5 rounded-full hover:bg-[#F4F6FA] transition-colors duration-200 w-full sm:w-auto">
            Create Free Account
          </button>
        </div>
      </div>
    </section>
  );
}
