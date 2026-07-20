export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="space-y-2">
      <label className="text-gray-300 text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          bg-[#111827]
          border
          border-white/10
          text-white
          placeholder:text-gray-500
          outline-none
          focus:border-cyan-400
          focus:ring-2
          focus:ring-cyan-500/30
          transition-all
        "
      />
    </div>
  );
}