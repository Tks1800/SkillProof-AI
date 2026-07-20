import { ArrowRight, PlayCircle } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070B1A]">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-8 py-24">

        {/* Left */}

        <div>

          <span className="text-cyan-400 uppercase tracking-[4px] font-semibold">
            VAIVOAI Technologies Pvt. Ltd.
          </span>

          <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight text-white mt-6">

            Trust Skills.

            <br />

            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Hire Smarter.
            </span>

          </h1>

          <p className="text-gray-400 text-xl mt-8 leading-9 max-w-xl">

            AI-powered hiring platform that verifies real-world skills,
            analyzes resumes, and helps companies hire with confidence.

          </p>

          <div className="flex gap-5 mt-10">

            <button className="bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 rounded-2xl flex items-center gap-2 text-lg hover:scale-105 transition">

              Get Started

              <ArrowRight size={20} />

            </button>

            <button className="border border-white/20 px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-white/5 transition">

              <PlayCircle />

              Book Demo

            </button>

          </div>

        </div>

        {/* Right */}

        <div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

            <div className="flex justify-between">

              <div>

                <p className="text-gray-400">
                  Trust Score™
                </p>

                <h2 className="text-6xl font-bold text-cyan-400">
                  94
                </h2>

              </div>

              <div className="text-right">

                <p className="text-green-400">
                  Verified
                </p>

                <p className="text-gray-400">
                  Candidate
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-10">

              {[
                "Resume Verified",
                "Python",
                "React",
                "SQL",
                "AI Interview",
              ].map((item) => (
                <div
                  key={item}
                  className="flex justify-between bg-white/5 rounded-xl p-4"
                >
                  <span>{item}</span>

                  <span className="text-green-400">
                    ✓
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;