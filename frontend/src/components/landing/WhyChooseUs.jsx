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
      "We build intelligent AI systems powered by Machine Learning, LLMs, Computer Vision and Automation.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Industry-standard security practices with scalable cloud infrastructure for startups and enterprises.",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    description:
      "Agile development process allowing rapid delivery without compromising quality.",
  },
  {
    icon: Clock3,
    title: "24/7 Support",
    description:
      "Continuous monitoring and technical support to keep your systems running smoothly.",
  },
  {
    icon: TrendingUp,
    title: "Business Growth",
    description:
      "Technology solutions designed to increase revenue, reduce costs and improve efficiency.",
  },
  {
    icon: Headset,
    title: "Dedicated Team",
    description:
      "Experienced engineers, designers and AI specialists working as an extension of your company.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#030712] py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="text-cyan-400 font-semibold tracking-[6px] uppercase">
            Why Choose Us
          </p>

          <h2 className="mt-5 text-5xl font-bold">
            Building The Future With AI
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            We combine Artificial Intelligence, Cloud Computing, Modern Web
            Technologies and Automation to build digital products that help
            businesses scale faster.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/[0.05]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition group-hover:bg-cyan-500 group-hover:text-white">
                  <Icon size={32} />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-gray-400">
                  {item.description}
                </p>

                <button className="mt-8 font-semibold text-cyan-400 transition hover:text-cyan-300">
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