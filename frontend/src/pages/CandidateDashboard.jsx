import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getCandidateDashboard } from "../services/api";
import { toast } from "react-toastify";
import ResumeCard from "../components/dashboard/ResumeCard";

import {
  ShieldCheck,
  Award,
  Briefcase,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import StatsCard from "../components/dashboard/StatsCard";

export default function CandidateDashboard() {

  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    trust_score: 0,
    verified_skills: 0,
    skills: [],
    applications: 0,
    interviews: 0,
    profile_completion: 0,
    recent_applications: [],
    upcoming_interviews: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const res = await getCandidateDashboard();

      setDashboard(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh] text-xl">
          Loading Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold">
            Candidate Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome back. Here's your latest career progress.
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatsCard
            title="Trust Score"
            value={`${dashboard.trust_score}%`}
            subtitle="AI Verified"
            icon={<ShieldCheck size={24} />}
          />

          <StatsCard
            title="Verified Skills"
            value={dashboard.verified_skills}
            subtitle="Skills Confirmed"
            icon={<Award size={24} />}
          />

          <StatsCard
            title="Applications"
            value={dashboard.applications}
            subtitle="Jobs Applied"
            icon={<Briefcase size={24} />}
          />

          <StatsCard
            title="Interviews"
            value={dashboard.interviews}
            subtitle="Upcoming"
            icon={<CalendarDays size={24} />}
          />

        </div>

        {/* Profile Completion */}

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

          <div className="flex justify-between mb-3">

            <h2 className="text-xl font-semibold">
              Profile Completion
            </h2>

            <span className="text-cyan-400 font-bold">
              {dashboard.profile_completion}%
            </span>

          </div>

          <div className="w-full bg-gray-700 rounded-full h-3">

            <div
              className="bg-cyan-500 h-3 rounded-full transition-all duration-700"
              style={{
                width: `${dashboard.profile_completion}%`,
              }}
            />

          </div>

        </div>

        {/* Verified Skills */}

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

          <div className="flex items-center gap-3 mb-5">

            <TrendingUp />

            <h2 className="text-2xl font-bold">
              Verified Skills
            </h2>

          </div>

          {dashboard.skills.length === 0 ? (

            <p className="text-gray-400">
              Upload your resume and complete skill tests to verify your skills.
            </p>

          ) : (

            <div className="flex flex-wrap gap-3">

              {dashboard.skills.map((skill, index) => (

                <span
                  key={index}
                  className="bg-cyan-600 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>

              ))}

            </div>

          )}

        </div>

        {/* Resume */}

        <ResumeCard />

        <div className="grid lg:grid-cols-2 gap-6">

                    {/* Recent Applications */}

          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

            <h2 className="text-2xl font-bold mb-5">
              Recent Applications
            </h2>

            {dashboard.recent_applications.length === 0 ? (

              <p className="text-gray-400">
                No applications yet.
              </p>

            ) : (

              <div className="space-y-4">

                {dashboard.recent_applications.map((application) => (

                  <div
                    key={application.id}
                    className="flex justify-between items-center border-b border-gray-800 pb-3"
                  >

                    <div>

                      <p className="font-semibold">
                        Job ID #{application.job_id}
                      </p>

                      <p className="text-sm text-gray-400">
                        {application.created_at
                          ? new Date(
                              application.created_at
                            ).toLocaleDateString()
                          : "-"}
                      </p>

                    </div>

                    <span className="bg-cyan-600 px-3 py-1 rounded-full text-sm">
                      {application.status}
                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* Upcoming Interviews */}

          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

            <h2 className="text-2xl font-bold mb-5">
              Upcoming Interviews
            </h2>

            {dashboard.upcoming_interviews.length === 0 ? (

              <p className="text-gray-400">
                No interviews scheduled.
              </p>

            ) : (

              <div className="space-y-4">

                {dashboard.upcoming_interviews.map((interview) => (

                  <div
                    key={interview.id}
                    className="border-b border-gray-800 pb-3"
                  >

                    <p className="font-semibold">
                      Job #{interview.job_id}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      {interview.scheduled_at
                        ? new Date(
                            interview.scheduled_at
                          ).toLocaleString()
                        : "-"}
                    </p>

                    <a
                      href={interview.meeting_link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-3 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition"
                    >
                      Join Meeting
                    </a>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

        {/* Quick Actions */}

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <button
              className="bg-cyan-600 hover:bg-cyan-500 py-4 rounded-xl font-semibold transition"
            >
              Upload Resume
            </button>

            <button
              onClick={() => navigate("/candidate/skill-test")}
              className="bg-green-600 hover:bg-green-500 py-4 rounded-xl font-semibold transition"
            >
              Take Skill Test
            </button>

            <button
              className="bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-semibold transition"
            >
              Browse Jobs
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}