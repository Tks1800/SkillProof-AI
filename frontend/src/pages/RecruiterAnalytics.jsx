import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Briefcase,
  Users,
  CheckCircle,
  XCircle,
 Calendar,
  Award,
  RefreshCw,
} from "lucide-react";
import API from "../services/api";
import StatsCard from "../components/analytics/StatsCard";
import BarChartCard from "../components/analytics/BarChartCard";

export default function RecruiterAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadStats() {
    try {
      setLoading(true);

      const res = await API.get("/recruiter-dashboard/stats");

      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-xl">
          Loading Analytics...
        </div>
      </DashboardLayout>
    );
  }

  const cards = [
    {
      title: "Active Jobs",
      value: stats.active_jobs,
      color: "bg-blue-600",
      icon: <Briefcase size={28} />,
    },
    {
      title: "Applications",
      value: stats.applications,
      color: "bg-purple-600",
      icon: <Users size={28} />,
    },
    {
      title: "Accepted",
      value: stats.accepted,
      color: "bg-green-600",
      icon: <CheckCircle size={28} />,
    },
    {
      title: "Rejected",
      value: stats.rejected,
      color: "bg-red-600",
      icon: <XCircle size={28} />,
    },
    {
      title: "Interviews",
      value: stats.interviews,
      color: "bg-yellow-500",
      icon: <Calendar size={28} />,
    },
    {
      title: "Average Match",
      value: `${stats.average_match}%`,
      color: "bg-cyan-600",
      icon: <Award size={28} />,
    },
  ];

const chartData = [
  {
    name: "Applications",
    value: stats.applications,
  },
  {
    name: "Interviews",
    value: stats.interviews,
  },
  {
    name: "Accepted",
    value: stats.accepted,
  },
  {
    name: "Rejected",
    value: stats.rejected,
  },
];

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Recruiter Analytics
            </h1>

            <p className="text-gray-400 mt-2">
              AI Hiring Analytics
            </p>

          </div>

          <button
            onClick={loadStats}
            className="bg-cyan-600 hover:bg-cyan-700 rounded-xl px-5 py-3 flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            <StatsCard
            title="Active Jobs"
            value={stats.active_jobs}
            icon={<Briefcase size={32} />}
            color="from-blue-500 to-blue-700"
        />

            <StatsCard
            title="Applications"
            value={stats.applications}
            icon={<Users size={32} />}
            color="from-purple-500 to-fuchsia-700"
        />

            <StatsCard
            title="Accepted"
            value={stats.accepted}
            icon={<CheckCircle size={32} />}
            color="from-green-500 to-green-700"
        />

            <StatsCard
            title="Rejected"
            value={stats.rejected}
            icon={<XCircle size={32} />}
            color="from-red-500 to-red-700"
        />

            <StatsCard
            title="Interviews"
            value={stats.interviews}
            icon={<Calendar size={32} />}
            color="from-yellow-400 to-orange-500"
        />

            <StatsCard
            title="Average Match"
            value={stats.average_match}
            suffix="%"
            icon={<Award size={32} />}
            color="from-cyan-500 to-sky-700"
        />

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-slate-900 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Hiring Funnel
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Total Applications</span>
                <span>{stats.applications}</span>
              </div>

              <div className="flex justify-between">
                <span>Interviews</span>
                <span>{stats.interviews}</span>
              </div>

              <div className="flex justify-between">
                <span>Accepted</span>
                <span>{stats.accepted}</span>
              </div>

              <div className="flex justify-between">
                <span>Rejected</span>
                <span>{stats.rejected}</span>
              </div>

            </div>

          </div>

          <div className="bg-slate-900 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              AI Insights
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Excellent Candidates</span>
                <span>{stats.excellent_candidates}</span>
              </div>

              <div className="flex justify-between">
                <span>Average Match</span>
                <span>{stats.average_match}%</span>
              </div>

              <div className="flex justify-between">
                <span>Open Jobs</span>
                <span>{stats.active_jobs}</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}