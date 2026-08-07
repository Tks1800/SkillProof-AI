export default function DashboardCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:border-cyan-500/40
        hover:shadow-cyan-500/10
        hover:-translate-y-1
        ${className}
      `}
    >
      {children}
    </div>
  );
}