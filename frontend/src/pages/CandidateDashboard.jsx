import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/dashboard/StatsCard";
import API from "../services/api";

export default function CandidateDashboard() {
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const token = localStorage.getItem("token");

    try {
      const profile = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(profile.data);

      const resumeRes = await API.get("/resume/my-resume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResume(resumeRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  const skills =
    resume?.skills
      ? resume.skills.split(",").filter((s) => s.trim())
      : [];

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Welcome */}

        <div>
          <h1 className="text-4xl font-bold text-white">
            Welcome {user?.full_name || "Candidate"} 👋
          </h1>

          <p className="text-gray-400 mt-2">
            {user?.email}
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <StatsCard
            title="Resume"
            value={resume?.file_name ? "Uploaded" : "Not Uploaded"}
            subtitle={resume?.file_name || "Upload your resume"}
          />

          <StatsCard
            title="Extracted Skills"
            value={skills.length}
            subtitle="AI Resume Parser"
          />

          <StatsCard
            title="Trust Score"
            value={resume?.file_name ? "85" : "--"}
            subtitle={resume?.file_name ? "Good" : "Upload Resume"}
          />

        </div>

        {/* Skills */}

        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold text-white mb-5">
            Extracted Skills
          </h2>

          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-600 px-4 py-2 rounded-full text-white"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              No resume uploaded yet.
            </p>
          )}
        </div>

        {/* Quick Actions */}

        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold text-white mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <Link to="/resume-upload">
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl py-4 font-semibold transition">
                📄 Upload Resume
              </button>
            </Link>

            <button className="bg-green-600 hover:bg-green-500 rounded-xl py-4 font-semibold transition">
              📝 Take Skill Test
            </button>

            <button className="bg-slate-700 hover:bg-slate-600 rounded-xl py-4 font-semibold transition">
              👤 View Profile
            </button>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold text-white mb-5">
            Recent Activity
          </h2>

          <div className="space-y-3 text-gray-300">

            {resume?.file_name ? (
              <>
                <div>✅ Resume Uploaded</div>
                <div>🧠 AI extracted {skills.length} skills</div>
                <div>🎯 Ready to take skill tests</div>
              </>
            ) : (
              <div>📄 Upload your resume to get started.</div>
            )}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}