import {
  Search,
  ClipboardList,
  PenTool,
  Code2,
  Bug,
  Rocket,
  ArrowRight,
} from "lucide-react";

const process = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description:
      "We understand your business goals, users, and project requirements before writing a single line of code.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Planning",
    description:
      "Architecture, timelines, milestones, technology selection and execution strategy.",
  },
  {
    icon: PenTool,
    step: "03",
    title: "UI / UX Design",
    description:
      "Modern interfaces focused on user experience, branding and conversion.",
  },
  {
    icon: Code2,
    step: "04",
    title: "Development",
    description:
      "Scalable software engineered using modern frameworks, AI and cloud technologies.",
  },
  {
    icon: Bug,
    step: "05",
    title: "Testing",
    description:
      "Security testing, quality assurance, performance optimization and production readiness.",
  },
  {
    icon: Rocket,
    step: "06",
    title: "Launch",
    description:
      "Deployment, monitoring, analytics and continuous improvements after release.",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 sm:py-24 lg:py-32 text-white">

      {/* Background Glow */}

      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs sm:text-sm uppercase tracking-[3px] text-cyan-400 font-semibold">

            Development Process

          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">

            From Idea

            <span className="block bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">

              To Production

            </span>

          </h2>

          <p className="mt-6 text-base sm:text-lg lg:text-xl leading-8 text-gray-400">

            Every project follows a structured workflow ensuring
            quality, transparency and faster delivery.

          </p>

        </div>

        {/* Timeline */}

        <div className="relative mt-20">

          {/* Center Line */}

          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 to-purple-500" />

          <div className="space-y-8">

            {process.map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.step}
                  className="group relative flex flex-col lg:flex-row lg:items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)]"
                >

                  {/* Icon */}

                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-500 text-black group-hover:scale-110 transition">

                    <Icon size={28} />

                  </div>

                  {/* Content */}

                  <div className="flex-1">

                    <span className="text-xs sm:text-sm tracking-[4px] font-bold text-cyan-400">

                      STEP {item.step}

                    </span>

                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold">

                      {item.title}

                    </h3>

                    <p className="mt-4 text-gray-400 leading-7 max-w-3xl">

                      {item.description}

                    </p>

                  </div>

                  {/* Step Number */}

                  <div className="hidden lg:flex flex-col items-center">

                    <div className="text-7xl font-black text-white/5">

                      {item.step}

                    </div>

                    <ArrowRight
                      size={22}
                      className="text-cyan-400 mt-2"
                    />

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
}