import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  CalendarDays,
  FileText,
  User,
  LogOut,
} from "lucide-react";

export default function CandidateSidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/candidate/dashboard",
    },
    {
      title: "Available Jobs",
      icon: <Briefcase size={20} />,
      path: "/candidate/jobs",
    },
    {
      title: "My Interviews",
      icon: <CalendarDays size={20} />,
      path: "/candidate/interviews",
    },
    {
      title: "Resume",
      icon: <FileText size={20} />,
      path: "/candidate/resume",
    },
    {
      title: "Profile",
      icon: <User size={20} />,
      path: "/candidate/profile",
    },
  ];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className="w-72 bg-[#0F172A] border-r border-gray-800 flex flex-col">

      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-400">
          SkillProof AI
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Candidate Portal
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}