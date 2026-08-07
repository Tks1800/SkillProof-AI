import { Award, TrendingUp } from "lucide-react";
import scoreColor from "../../utils/scoreColor";

export default function MatchScore({
  score = 0,
  recommendation = "",
}) {

  return (

    <div className="mt-6 rounded-2xl border border-cyan-700/40 bg-gradient-to-r from-slate-900 to-slate-800 p-6">

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-2">

            <Award
              size={22}
              className="text-cyan-400"
            />

            <h3 className="font-semibold text-lg">
              AI Match Score
            </h3>

          </div>

          <p className="text-sm text-gray-400 mt-1">
            SkillProof AI Candidate Analysis
          </p>

        </div>

        <div
          className={`text-5xl font-extrabold ${scoreColor(score)}`}
        >
          {score}%
        </div>

      </div>

      <div className="mt-6">

        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">

          <div
            className={`h-full transition-all duration-700 ${score >= 80
              ? "bg-green-500"
              : score >= 60
              ? "bg-yellow-500"
              : "bg-red-500"
            }`}
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-5 flex items-center gap-2">

        <TrendingUp
          size={20}
          className="text-cyan-400"
        />

        <span className="font-medium text-gray-200">
          {recommendation || "No recommendation"}
        </span>

      </div>

    </div>

  );

}