import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

import { getRecruiterDashboard } from "../services/api";

export default function RecruiterDashboard() {
  const [dashboard, setDashboard] = useState({
    jobs: 0,
    applications: 0,
    interviews: 0,
    hired: 0,
    recent_applications: [],
    upcoming_interviews: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getRecruiterDashboard();

      setDashboard({
        jobs: res.data.jobs ?? 0,
        applications: res.data.applications ?? 0,
        interviews: res.data.interviews ?? 0,
        hired: res.data.hired ?? 0,
        recent_applications: res.data.recent_applications ?? [],
        upcoming_interviews: res.data.upcoming_interviews ?? [],
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Active Jobs",
      value: dashboard.jobs,
      color: "bg-blue-600",
      icon: <Briefcase size={30} />,
    },
    {
      title: "Applicants",
      value: dashboard.applications,
      color: "bg-purple-600",
      icon: <Users size={30} />,
    },
    {
      title: "Interviews",
      value: dashboard.interviews,
      color: "bg-yellow-500",
      icon: <Calendar size={30} />,
    },
    {
      title: "Hired",
      value: dashboard.hired,
      color: "bg-green-600",
      icon: <CheckCircle size={30} />,
    },
  ];

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-xl font-semibold animate-pulse">
            Loading Dashboard...
          </div>
        </div>
      ) : (
        <div className="space-y-8">

          {/* Header */}

          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-4xl font-bold">
                Recruiter Dashboard
              </h1>

              <p className="text-gray-400 mt-2">
                Manage jobs, applications and interviews.
              </p>
            </div>

            <button
              onClick={loadDashboard}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl transition"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

          </div>

          {error && (
            <div className="bg-red-600/20 border border-red-500 rounded-xl p-4">
              {error}
            </div>
          )}

          {/* Statistics */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => (
              <div
                key={card.title}
                className={`${card.color} rounded-2xl shadow-xl p-6`}
              >
                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-white/80">
                      {card.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                      {card.value}
                    </h2>

                  </div>

                  {card.icon}

                </div>
              </div>
            ))}

          </div>

          {/* Recent Applications */}

          <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-6">
              Recent Applications
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="text-left text-gray-400 border-b border-slate-700">

                    <th className="py-3">
                      Candidate
                    </th>

                    <th>
                      Job
                    </th>

                    <th>
                      Match
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {dashboard.recent_applications.length === 0 ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center py-8 text-gray-500"
                      >
                        No applications available.
                      </td>

                    </tr>

                  ) : (

                    dashboard.recent_applications.map((app) => (

                      <tr
                        key={app.id}
                        className="border-b border-slate-800"
                      >

                        <td className="py-4">
                          {app.candidate_email}
                        </td>

                        <td>
                          Job #{app.job_id}
                        </td>

                        <td className="font-bold text-green-400">
                          --
                        </td>

                        <td>
                          <span className="bg-blue-600 px-3 py-1 rounded-full">
                            {app.status}
                          </span>
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

                    {/* Upcoming Interviews */}

          <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-6">
              Upcoming Interviews
            </h2>

            <div className="space-y-4">

              {dashboard.upcoming_interviews.length === 0 ? (

                <div className="text-center text-gray-500 py-8">
                  No interviews scheduled.
                </div>

              ) : (

                dashboard.upcoming_interviews.map((item) => (

                  <div
                    key={item.id}
                    className="bg-slate-800 rounded-xl p-5 flex justify-between items-center"
                  >

                    <div>

                      <h3 className="text-xl font-semibold">
                        Candidate #{item.candidate_id}
                      </h3>

                      <p className="text-gray-400 mt-1">
                        Job #{item.job_id}
                      </p>

                      <p className="text-cyan-400 mt-2">
                        {new Date(item.scheduled_at).toLocaleString()}
                      </p>

                    </div>

                    <div className="flex gap-3">

                      {item.meeting_link && (
                        <a
                          href={item.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition"
                        >
                          Join Meeting
                        </a>
                      )}

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

          {/* Quick Summary */}

          <div className="grid lg:grid-cols-2 gap-6">

            <div className="bg-slate-900 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-4">
                Hiring Overview
              </h2>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Total Jobs</span>
                  <span className="font-bold">
                    {dashboard.jobs}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Applications</span>
                  <span className="font-bold">
                    {dashboard.applications}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Interviews</span>
                  <span className="font-bold">
                    {dashboard.interviews}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Hired</span>
                  <span className="font-bold text-green-400">
                    {dashboard.hired}
                  </span>
                </div>

              </div>

            </div>

            <div className="bg-slate-900 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-4">
                Startup Progress
              </h2>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Open Positions</span>
                  <span>{dashboard.jobs}</span>
                </div>

                <div className="flex justify-between">
                  <span>Interview Pipeline</span>
                  <span>{dashboard.interviews}</span>
                </div>

                <div className="flex justify-between">
                  <span>Hiring Completed</span>
                  <span>{dashboard.hired}</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}
    </DashboardLayout>
  );
}