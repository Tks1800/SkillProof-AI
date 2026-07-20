export default function StatsCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">
      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white mt-2">
        {value}
      </h2>

      {subtitle && (
        <p className="text-green-400 mt-3 text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}