import { useEffect, useState } from "react";

import CandidateSidebar from "../components/dashboard/CandidateSidebar";
import RecruiterSidebar from "../components/dashboard/RecruiterSidebar";
import Navbar from "../components/dashboard/Navbar";

export default function DashboardLayout({ children }) {
  const [role, setRole] = useState("candidate");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role) {
      setRole(user.role);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#070B1A] text-white">

      {role === "recruiter" ? (
        <RecruiterSidebar />
      ) : (
        <CandidateSidebar />
      )}

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}