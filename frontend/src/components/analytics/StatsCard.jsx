

export default function StatsCard({
  title,
  value,
  icon,
  color = "from-cyan-500 to-blue-600",
  suffix = "",
}) {
  return (
    <div
      className={`
        rounded-2xl
        bg-gradient-to-r
        ${color}
        p-6
        shadow-xl
        hover:scale-105
        transition
        duration-300
      `}
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-white/80 text-sm">
            {title}
          </p>

          <h2 className="mt-3 text-5xl font-bold text-white">
            {value}
            {suffix}
          </h2>

        </div>

        <div className="text-white opacity-90">
          {icon}
        </div>

      </div>
    </div>
  );
}