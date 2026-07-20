import {
  FileText,
  Brain,
  BadgeCheck,
  Award,
  Briefcase,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Upload Resume",
    desc: "Candidate uploads their resume securely.",
  },
  {
    icon: Brain,
    title: "AI Resume Analysis",
    desc: "AI extracts skills and experience instantly.",
  },
  {
    icon: BadgeCheck,
    title: "Skill Verification",
    desc: "Candidates complete role-specific assessments.",
  },
  {
    icon: Award,
    title: "Trust Score™",
    desc: "A verified score is generated for recruiters.",
  },
  {
    icon: Briefcase,
    title: "Recruiter Hiring",
    desc: "Recruiters hire verified candidates faster.",
  },
];

function Workflow() {
  return (
    <section className="bg-[#070B1A] py-28 px-8">

      <div className="max-w-5xl mx-auto text-center">

        <p className="uppercase tracking-[4px] text-cyan-400 font-semibold">
          HOW IT WORKS
        </p>

        <h2 className="text-5xl font-bold text-white mt-5">
          From Resume To Hiring
        </h2>

        <p className="text-gray-400 text-xl mt-6 max-w-3xl mx-auto">
          VAIVOAI verifies candidates before they reach recruiters,
          making hiring faster, smarter and more reliable.
        </p>

      </div>

      <div className="max-w-3xl mx-auto mt-20">

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={index}>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-6 hover:border-cyan-400 transition">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center">

                  <Icon className="text-white" size={30} />

                </div>

                <div className="text-left">

                  <h3 className="text-white text-2xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {step.desc}
                  </p>

                </div>

              </div>

              {index !== steps.length - 1 && (
                <div className="flex justify-center py-5">
                  <ArrowDown className="text-cyan-400" size={28} />
                </div>
              )}

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default Workflow;