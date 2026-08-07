import { Award } from "lucide-react";

export default function VerifiedSkills({
  skills = [],
}) {

  if (!skills.length) {
    return null;
  }

  return (

    <div className="mt-6">

      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-yellow-400">

        <Award size={20} />

        Verified Skills

      </h3>

      <div className="space-y-3">

        {skills.map((skill) => (

          <div
            key={skill.skill}
            className="flex items-center justify-between rounded-xl border border-yellow-700/30 bg-yellow-500/10 px-4 py-3"
          >

            <div>

              <div className="font-medium">

                🏆 {skill.badge}

              </div>

              <div className="text-sm text-gray-400">

                {skill.skill}

              </div>

            </div>

            <div className="text-2xl font-bold text-yellow-400">

              {skill.score}%

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}