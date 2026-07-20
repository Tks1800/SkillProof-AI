import {
  ShieldCheck,
  Brain,
  BadgeCheck,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Resume Intelligence",
    description:
      "Automatically analyzes resumes and identifies verified technical skills.",
  },
  {
    icon: BadgeCheck,
    title: "Skill Verification",
    description:
      "Candidates complete assessments before recruiters review profiles.",
  },
  {
    icon: ShieldCheck,
    title: "Trust Score™",
    description:
      "Every candidate receives a transparent verification score.",
  },
  {
    icon: Clock,
    title: "Hire Faster",
    description:
      "Reduce screening time and shortlist only verified candidates.",
  },
];

function WhyChoose() {
  return (
    <section className="bg-[#070B1A] py-28 px-8">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-cyan-400 font-semibold">
            WHY VAIVOAI
          </p>

          <h2 className="text-5xl font-bold text-white mt-6">
            Built For Modern Hiring
          </h2>

          <p className="text-gray-400 text-xl mt-6 max-w-3xl mx-auto">
            We don't just collect resumes.
            We verify skills before hiring decisions are made.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-20">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={index}
                className="rounded-3xl bg-white/5 border border-white/10 p-8 hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center">

                  <Icon className="text-white" size={30} />

                </div>

                <h3 className="text-2xl font-bold text-white mt-8">

                  {feature.title}

                </h3>

                <p className="text-gray-400 mt-4 leading-8">

                  {feature.description}

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;