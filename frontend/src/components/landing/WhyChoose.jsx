import {
  ShieldCheck,
  Brain,
  BadgeCheck,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Resume Intelligence",
    description:
      "Our AI instantly analyzes resumes, extracts skills, and identifies the best candidates.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Skill Assessment",
    description:
      "Candidates complete AI-powered assessments before recruiters review their profiles.",
  },
  {
    icon: ShieldCheck,
    title: "Trust Score™",
    description:
      "Every candidate receives a transparent verification score based on skills, assessments, and experience.",
  },
  {
    icon: Clock,
    title: "Hire 10x Faster",
    description:
      "Reduce screening time dramatically and interview only verified candidates.",
  },
];

function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-[#070B1A] py-20 sm:py-24 lg:py-32">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs sm:text-sm uppercase tracking-[3px] text-cyan-400 font-semibold">

            <Sparkles size={15} />

            Why SkillProof AI

          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">

            Built For

            <span className="block bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">

              Modern Hiring

            </span>

          </h2>

          <p className="mt-6 text-base sm:text-lg lg:text-xl leading-8 text-gray-400">

            We don't just collect resumes.

            We verify candidate skills before hiring decisions are made.

          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={index}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-3 hover:border-cyan-500/40 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(6,182,212,.15)]"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-300 group-hover:scale-110">

                  <Icon
                    size={30}
                    className="text-white"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">

                  {feature.title}

                </h3>

                <p className="mt-5 leading-8 text-gray-400">

                  {feature.description}

                </p>

                <button className="mt-6 inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition">

                  Learn More

                  <ArrowRight size={18} />

                </button>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;