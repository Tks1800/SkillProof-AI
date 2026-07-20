import DashboardCards from "../components/recruiter/DashboardCards";
import RecentJobs from "../components/recruiter/RecentJobs";
import QuickActions from "../components/recruiter/QuickActions";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#070B1A] text-white p-8">
      <h1 className="text-5xl font-bold mb-10">
        Dashboard
      </h1>

      <DashboardCards />

      <QuickActions />

      <RecentJobs />
    </div>
  );
}