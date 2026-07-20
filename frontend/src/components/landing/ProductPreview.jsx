function ProductPreview() {
  return (
    <section className="bg-[#070B1A] py-32 px-8">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-cyan-400 font-semibold">
            PRODUCT
          </p>

          <h2 className="text-5xl font-bold text-white mt-6">
            Everything You Need
            <br />
            To Hire With Confidence
          </h2>

          <p className="text-gray-400 text-xl mt-8 max-w-3xl mx-auto">
            One platform for resume intelligence, AI assessments,
            Trust Score™, skill verification and recruiter insights.
          </p>

        </div>

        {/* Dashboard */}

        <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">

          {/* Header */}

          <div className="flex justify-between items-center px-8 py-5 border-b border-white/10">

            <h3 className="text-white text-xl font-semibold">
              Candidate Dashboard
            </h3>

            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
              VERIFIED
            </div>

          </div>

          {/* Content */}

          <div className="grid lg:grid-cols-3 gap-8 p-8">

            <div className="bg-[#111827] rounded-2xl p-6">

              <h4 className="text-gray-400">
                Trust Score™
              </h4>

              <h1 className="text-6xl font-bold text-cyan-400 mt-3">
                94
              </h1>

              <p className="text-green-400 mt-2">
                Excellent Candidate
              </p>

            </div>

            <div className="bg-[#111827] rounded-2xl p-6">

              <h4 className="text-white font-semibold">
                Resume Analysis
              </h4>

              <div className="space-y-4 mt-6">

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    ATS Score
                  </span>

                  <span className="text-cyan-400">
                    92%
                  </span>

                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Skills Found
                  </span>

                  <span className="text-white">
                    14
                  </span>

                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Experience
                  </span>

                  <span className="text-white">
                    3 Years
                  </span>

                </div>

              </div>

            </div>

            <div className="bg-[#111827] rounded-2xl p-6">

              <h4 className="text-white font-semibold">
                Verification
              </h4>

              <div className="space-y-4 mt-6">

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    Python
                  </span>

                  <span className="text-green-400">
                    ✓
                  </span>

                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    React
                  </span>

                  <span className="text-green-400">
                    ✓
                  </span>

                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    SQL
                  </span>

                  <span className="text-green-400">
                    ✓
                  </span>

                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">
                    AI Interview
                  </span>

                  <span className="text-green-400">
                    Passed
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductPreview;