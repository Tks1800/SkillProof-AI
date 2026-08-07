import {
  ShieldCheck,
  Brain,
  Rocket,
  Clock3,
  Headset,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Expertise",
    description:
      "Build intelligent AI products powered by LLMs, Machine Learning, Automation, and modern cloud architecture.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Production-grade security, encrypted data, scalable infrastructure, and enterprise-ready deployment.",
  },
  {
    icon: Rocket,
    title: "Rapid Development",
    description:
      "Launch MVPs in weeks using agile development, modern technologies, and AI-assisted engineering.",
  },
  {
    icon: Clock3,
    title: "24/7 Reliability",
    description:
      "Reliable monitoring, automated deployments, backups, and continuous support around the clock.",
  },
  {
    icon: TrendingUp,
    title: "Business Growth",
    description:
      "Technology that improves hiring accuracy, reduces costs, and accelerates business growth.",
  },
  {
    icon: Headset,
    title: "Dedicated Experts",
    description:
      "Work with experienced AI engineers, product designers, and software architects focused on your success.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-20 sm:py-24 lg:py-32 text-white">

      {/* Background Glow */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs sm:text-sm uppercase tracking-[3px] text-cyan-400 font-semibold">

            Why Choose VAIVOAI

          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">

            Building The Future

            <span className="block bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">

              With Artificial Intelligence

            </span>

          </h2>

          <p className="mt-6 text-base sm:text-lg lg:text-xl leading-8 text-gray-400">

            We combine Artificial Intelligence, Cloud Computing,
            Data Engineering, Automation, and Modern Web Technologies
            to build scalable digital products for startups and enterprises.

          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-3 hover:border-cyan-400/40 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)]"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white">

                  <Icon size={30} />

                </div>

                <h3 className="mt-7 text-xl sm:text-2xl font-bold">

                  {item.title}

                </h3>

                <p className="mt-4 text-gray-400 leading-7">

                  {item.description}

                </p>

                <button className="mt-6 text-cyan-400 font-semibold hover:text-cyan-300 transition">

                  Learn More →

                </button>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}