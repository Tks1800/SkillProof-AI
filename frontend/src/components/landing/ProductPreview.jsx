import {
  ShieldCheck,
  Brain,
  BarChart3,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

export default function ProductPreview() {
  return (
    <section className="relative overflow-hidden bg-[#070B1A] py-20 sm:py-24 lg:py-32">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center max-w-4xl mx-auto">

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs sm:text-sm uppercase tracking-[3px] text-cyan-400 font-semibold">

            <Sparkles size={16} />

            Product Preview

          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">

            Everything You Need

            <span className="block bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">

              To Hire With Confidence

            </span>

          </h2>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-400 leading-8">

            AI-powered resume intelligence, verified skills,
            Trust Score™, candidate analytics and recruiter insights —
            all inside one platform.

          </p>

        </div>

        {/* Dashboard */}

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,.45)]">

          {/* Header */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 sm:px-8 py-6 border-b border-white/10">

            <div>

              <h3 className="text-white text-2xl font-bold">

                Candidate Dashboard

              </h3>

              <p className="text-gray-400 mt-1">

                Real-time AI hiring intelligence

              </p>

            </div>

            <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-5 py-2 rounded-full font-semibold">

              <BadgeCheck size={18} />

              VERIFIED

            </span>

          </div>

          {/* Dashboard Grid */}

          <div className="grid gap-6 p-6 lg:grid-cols-3">

            {/* Trust Score */}

            <div className="rounded-2xl bg-[#111827] border border-white/5 p-6 hover:border-cyan-500/30 transition">

              <div className="flex justify-between items-center">

                <h4 className="text-gray-400">

                  Trust Score™

                </h4>

                <ShieldCheck className="text-cyan-400" />

              </div>

              <h2 className="text-6xl font-black text-cyan-400 mt-5">

                94

              </h2>

              <p className="text-green-400 mt-2">

                Excellent Candidate

              </p>

            </div>

            {/* Resume Analysis */}

            <div className="rounded-2xl bg-[#111827] border border-white/5 p-6 hover:border-cyan-500/30 transition">

              <div className="flex items-center gap-2">

                <Brain className="text-cyan-400" />

                <h4 className="font-semibold text-white">

                  Resume Analysis

                </h4>

              </div>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between">

                  <span className="text-gray-400">

                    ATS Score

                  </span>

                  <span className="text-cyan-400 font-semibold">

                    92%

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">

                    Skills Found

                  </span>

                  <span>

                    14

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">

                    Experience

                  </span>

                  <span>

                    3 Years

                  </span>

                </div>

              </div>

            </div>

            {/* Verification */}

            <div className="rounded-2xl bg-[#111827] border border-white/5 p-6 hover:border-cyan-500/30 transition">

              <div className="flex items-center gap-2">

                <BarChart3 className="text-cyan-400" />

                <h4 className="font-semibold">

                  Skill Verification

                </h4>

              </div>

              <div className="space-y-4 mt-6">

                {[
                  "Python",
                  "React",
                  "SQL",
                  "AI Interview",
                ].map((skill) => (

                  <div
                    key={skill}
                    className="flex justify-between"
                  >

                    <span className="text-gray-400">

                      {skill}

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