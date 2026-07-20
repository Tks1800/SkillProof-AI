export default function DashboardHeader({ user }) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold text-white">
        Welcome, {user?.full_name || "Candidate"} 👋
      </h1>

      <p className="text-gray-400 mt-2">
        Build your Trust Score and get hired faster.
      </p>
    </div>
  );
}