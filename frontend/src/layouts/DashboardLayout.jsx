import { useEffect, useState } from "react";

import CandidateSidebar from "../components/dashboard/CandidateSidebar";
import RecruiterSidebar from "../components/dashboard/RecruiterSidebar";
import Navbar from "../components/dashboard/Navbar";

export default function DashboardLayout({ children }) {
  const [role, setRole] = useState("candidate");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role) {
      setRole(user.role.toLowerCase());
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <div className="flex">

        {/* Sidebar */}

        <aside className="hidden lg:block w-72 border-r border-white/10 bg-[#0B1120]">

          {role === "recruiter" ? (
            <RecruiterSidebar />
          ) : (
            <CandidateSidebar />
          )}

        </aside>

        {/* Main */}

        <div className="flex flex-1 flex-col">

          {/* Sticky Navbar */}

          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">

            <Navbar />

          </header>

          {/* Page */}

          <main className="flex-1 overflow-y-auto">

            <div className="mx-auto max-w-7xl px-6 py-8">

              {children}

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}