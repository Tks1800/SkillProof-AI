import { ArrowRight, PlayCircle } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070B1A]">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-24">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT */}
          <div className="text-center lg:text-left">

            <span className="inline-block text-cyan-400 uppercase tracking-[3px] text-xs sm:text-sm font-semibold">
              VAIVOAI Technologies Pvt. Ltd.
            </span>

            <h1 className="mt-6 font-extrabold leading-tight text-white">

              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Trust Skills.
              </span>

              <span className="block bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
                Hire Smarter.
              </span>

            </h1>

            <p className="mt-8 text-gray-400 text-base sm:text-lg lg:text-xl leading-8 max-w-xl mx-auto lg:mx-0">
              AI-powered hiring platform that verifies real-world skills,
              analyzes resumes, and helps companies hire with confidence.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              <button className="bg-gradient-to-r from-purple-600 to-cyan-500 px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition duration-300 shadow-lg">

                Get Started

                <ArrowRight size={20} />

              </button>

              <button className="border border-white/20 px-7 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition duration-300">

                <PlayCircle size={20} />

                Book Demo

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center">

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    Trust Score™
                  </p>

                  <h2 className="text-5xl sm:text-6xl font-bold text-cyan-400">
                    94
                  </h2>

                </div>

                <div className="text-right">

                  <p className="text-green-400 font-semibold">
                    Verified
                  </p>

                  <p className="text-gray-400 text-sm">
                    Candidate
                  </p>

                </div>

              </div>

              <div className="mt-8 space-y-3">

                {[
                  "Resume Verified",
                  "Python",
                  "React",
                  "SQL",
                  "AI Interview",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl bg-white/5 p-4 border border-white/5"
                  >
                    <span className="text-sm sm:text-base">
                      {item}
                    </span>

                    <span className="text-green-400 font-bold">
                      ✓
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;