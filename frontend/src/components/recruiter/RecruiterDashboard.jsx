import DashboardCards from "./DashboardCards";
import QuickActions from "./QuickActions";
import RecentJobs from "./RecentJobs";
import InterviewScheduleModal from "../interviews/InterviewScheduleModal";

export default function RecruiterDashboard() {
  return (
    <div className="min-h-screen bg-[#070B1A] text-white p-8">
      <h1 className="text-5xl font-bold mb-10">
        Recruiter Dashboard
      </h1>

      <DashboardCards />

      <QuickActions />

      <RecentJobs />
    </div>
  );
}