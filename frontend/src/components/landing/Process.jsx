import {
  Search,
  ClipboardList,
  PenTool,
  Code2,
  Bug,
  Rocket,
} from "lucide-react";

const process = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description:
      "We understand your business goals, challenges, users and project requirements.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Planning",
    description:
      "We prepare architecture, project roadmap, technology stack and development strategy.",
  },
  {
    icon: PenTool,
    step: "03",
    title: "UI / UX Design",
    description:
      "Our designers create intuitive, beautiful and responsive user experiences.",
  },
  {
    icon: Code2,
    step: "04",
    title: "Development",
    description:
      "Our engineers build secure, scalable and high-performance software solutions.",
  },
  {
    icon: Bug,
    step: "05",
    title: "Testing",
    description:
      "Every feature undergoes security testing, QA, optimization and performance checks.",
  },
  {
    icon: Rocket,
    step: "06",
    title: "Deployment",
    description:
      "We deploy, monitor, optimize and continuously improve your product.",
  },
];

export default function Process() {
  return (
    <section className="bg-[#030712] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.35em] text-cyan-400">
            Development Process
          </p>

          <h2 className="mt-5 text-5xl font-black">
            How We Build Successful Products
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Our agile software development lifecycle ensures quality,
            transparency, speed and scalable digital products.
          </p>
        </div>

        <div className="relative mt-20">

          {/* Vertical Line */}
          <div className="absolute left-7 top-0 hidden h-full w-px bg-cyan-500/30 md:block"></div>

          <div className="space-y-10">

            {process.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.step}
                  className="relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-cyan-500/40 hover:bg-white/10 md:flex-row md:items-center"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-black">
                    <Icon size={28} />
                  </div>

                  <div className="flex-1">
                    <span className="text-sm font-bold tracking-[0.3em] text-cyan-400">
                      STEP {item.step}
                    </span>

                    <h3 className="mt-2 text-3xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-4 max-w-3xl leading-7 text-gray-400">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-6xl font-black text-cyan-500/10">
                    {item.step}
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