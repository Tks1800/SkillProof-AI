import { ArrowUpRight } from "lucide-react";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color = "cyan",
}) {
  const gradients = {
    cyan: "from-cyan-500 to-sky-500",
    purple: "from-purple-600 to-pink-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-yellow-500",
  };

  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-cyan-500/40
      hover:shadow-[0_20px_50px_rgba(6,182,212,.15)]
    "
    >
      {/* Glow */}

      <div
        className={`
        absolute
        -right-10
        -top-10
        h-40
        w-40
        rounded-full
        bg-gradient-to-r
        ${gradients[color]}
        opacity-10
        blur-3xl
      `}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm uppercase tracking-[2px] text-gray-400">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-black text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-3 text-sm text-green-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          ${gradients[color]}
          text-white
          shadow-lg
        `}
        >
          {icon}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">

        <span className="text-sm text-gray-400">
          Updated just now
        </span>

        <ArrowUpRight
          size={18}
          className="text-cyan-400 transition group-hover:translate-x-1 group-hover:-translate-y-1"
        />

      </div>
    </div>
  );
}