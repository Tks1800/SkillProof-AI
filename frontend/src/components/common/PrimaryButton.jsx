export default function PrimaryButton({
  children,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        w-full
        py-3
        rounded-xl
        font-semibold
        text-white
        bg-gradient-to-r
        from-cyan-500
        to-purple-600
        hover:scale-[1.02]
        transition-all
        duration-300
        shadow-lg
        shadow-cyan-500/20
        ${className}
      `}
    >
      {children}
    </button>
  );
}