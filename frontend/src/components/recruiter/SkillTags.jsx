import {
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function SkillTags({
  title,
  skills = [],
  color = "green",
}) {

  const items = Array.isArray(skills)
    ? skills
    : (skills || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  const isRed = color === "red";

  return (

    <div className="mt-6">

      <h3
        className={`mb-4 flex items-center gap-2 text-lg font-semibold ${
          isRed
            ? "text-red-400"
            : "text-green-400"
        }`}
      >

        {isRed ? (
          <AlertTriangle size={18} />
        ) : (
          <CheckCircle2 size={18} />
        )}

        {title}

      </h3>

      {items.length === 0 ? (

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-gray-400">

          None

        </div>

      ) : (

        <div className="flex flex-wrap gap-3">

          {items.map((skill) => (

            <span
              key={skill}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all hover:scale-105 ${
                isRed
                  ? "border border-red-600 bg-red-500/10 text-red-300"
                  : "border border-green-600 bg-green-500/10 text-green-300"
              }`}
            >
              {skill}
            </span>

          ))}

        </div>

      )}

    </div>

  );

}