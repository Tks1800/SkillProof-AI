import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-24 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[40px] border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-indigo-500/10 p-12 text-center backdrop-blur-xl lg:p-20">
          
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
            <Sparkles size={16} />
            Let's Build the Future Together
          </div>

          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Ready to Transform Your Business
            <span className="block text-cyan-400">
              With Artificial Intelligence?
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            Whether you're launching a startup, scaling an enterprise, or
            integrating AI into your business, VAIVOAI Technologies is your
            trusted technology partner.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:scale-105 hover:bg-cyan-400">
              Start Your Project
              <ArrowRight size={18} />
            </button>

            <button className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:border-cyan-400 hover:bg-white/5">
              Schedule a Consultation
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-4xl font-black text-cyan-400">250+</h3>
              <p className="mt-2 text-gray-400">Projects</p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-cyan-400">180+</h3>
              <p className="mt-2 text-gray-400">Clients</p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-cyan-400">25+</h3>
              <p className="mt-2 text-gray-400">Countries</p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-cyan-400">99.9%</h3>
              <p className="mt-2 text-gray-400">Uptime</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}