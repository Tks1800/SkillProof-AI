function Button({
  children,
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 font-semibold ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;