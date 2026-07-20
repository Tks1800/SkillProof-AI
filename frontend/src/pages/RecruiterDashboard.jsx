import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  CalendarDays,
  Award,
} from "lucide-react";

const cards = [
  {
    title: "Jobs Posted",
    value: "12",
    icon: <Briefcase size={30} />,
  },
  {
    title: "Applications",
    value: "84",
    icon: <Users size={30} />,
  },
  {
    title: "Interviews",
    value: "18",
    icon: <CalendarDays size={30} />,
  },
  {
    title: "Verified Hires",
    value: "7",
    icon: <Award size={30} />,
  },
];

export default function RecruiterDashboard() {
    const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            Recruiter Dashboard 👋
          </h1>

          <p className="text-gray-400 mt-2">
            Manage jobs, candidates and hiring from one place.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-cyan-500 transition duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    {card.value}
                  </h2>
                </div>

                <div className="text-cyan-400">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}

        <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <button
            onClick={() => navigate("/create-job")}
            className="bg-cyan-600 hover:bg-cyan-500 rounded-xl py-4 font-semibold transition"
           >
            ➕ Create Job
            </button>

            <button className="bg-indigo-600 hover:bg-indigo-500 rounded-xl py-4 font-semibold transition">
              👥 View Candidates
            </button>

            <button className="bg-green-600 hover:bg-green-500 rounded-xl py-4 font-semibold transition">
              📨 Interview Invitations
            </button>

          </div>

        </div>

        {/* Recent Jobs */}

        <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Jobs
          </h2>

          <div className="space-y-5">

            <div className="flex items-center justify-between border-b border-gray-700 pb-4">

              <div>
                <h3 className="font-semibold text-lg">
                  Software Engineer
                </h3>

                <p className="text-gray-400 text-sm">
                  24 Applicants
                </p>
              </div>

              <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg">
                View
              </button>

            </div>

            <div className="flex items-center justify-between border-b border-gray-700 pb-4">

              <div>
                <h3 className="font-semibold text-lg">
                  Backend Developer
                </h3>

                <p className="text-gray-400 text-sm">
                  11 Applicants
                </p>
              </div>

              <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg">
                View
              </button>

            </div>

            <div className="flex items-center justify-between">

              <div>
                <h3 className="font-semibold text-lg">
                  Data Analyst
                </h3>

                <p className="text-gray-400 text-sm">
                  18 Applicants
                </p>
              </div>

              <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg">
                View
              </button>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}