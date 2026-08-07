import { useNavigate } from "react-router-dom";
import { User, Clock } from "lucide-react";
import VerifiedSkills from "./VerifiedSkills";

import MatchScore from "./MatchScore";
import SkillTags from "./SkillTags";
import ActionButtons from "./ActionButtons";

export default function ApplicationCard({
  application,
  index,
  onAccept,
  onReject,
  onInterview,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6">

      <div className="flex flex-col lg:flex-row gap-8 justify-between">

        <div className="flex-1">

          <div className="flex items-center gap-3 mb-3">

              {index === 0 && (
              <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
              🥇 Rank #1
              </span>
        )}

              {index === 1 && (
              <span className="rounded-full bg-gray-300 px-3 py-1 text-sm font-bold text-black">
              🥈 Rank #2
              </span>
        )}

              {index === 2 && (
              <span className="rounded-full bg-amber-700 px-3 py-1 text-sm font-bold text-white">
              🥉 Rank #3
              </span>
        )}

            </div>

              <h2 className="text-2xl font-bold">
              {application.candidate_email}
              </h2>

            <div className="flex flex-wrap gap-4 mt-3 text-gray-400">

            <div className="flex items-center gap-2">
              <Clock size={18} />
              Job #{application.job_id}
            </div>

            <div className="flex items-center gap-2">
              <User size={18} />
              {application.status}
            </div>

          </div>

          <MatchScore
            score={application.match_score}
            recommendation={application.recommendation}
          />

          <SkillTags
            title="Matched Skills"
            color="green"
            skills={application.matched_skills}
          />

          <SkillTags
            title="Missing Skills"
            color="red"
            skills={application.missing_skills}
          />

          <VerifiedSkills
            skills={application.verified_skills}
          />

        </div>

        <ActionButtons
          application={application}
          onViewProfile={() =>
          navigate(
            `/candidate-profile/${application.candidate_email}?jobId=${application.job_id}`
      )
    }
        onViewResume={() =>
        window.open(
          `http://127.0.0.1:8000/resume/view/${application.candidate_email}`,
          "_blank"
      )
    }
          onAccept={() => onAccept(application.id)}
          onReject={() => onReject(application.id)}
          onInterview={() => onInterview(application)}
        />

      </div>

    </div>
  );
}