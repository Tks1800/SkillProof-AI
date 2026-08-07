import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  CalendarDays,
  PlusCircle,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

export default function RecruiterSidebar() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const menu = [

    {
      title: "Dashboard",
      path: "/recruiter/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      title: "My Jobs",
      path: "/recruiter/jobs",
      icon: <Briefcase size={20} />,
    },

    {
      title: "Create Job",
      path: "/recruiter/create-job",
      icon: <PlusCircle size={20} />,
    },

    {
      title: "Applications",
      path: "/recruiter/applications",
      icon: <Users size={20} />,
    },

    {
      title: "Analytics",
      path: "/recruiter/analytics",
      icon: <BarChart3 size={20} />,
    },

    {
      title: "Interviews",
      path: "/recruiter/interviews",
      icon: <CalendarDays size={20} />,
    },

  ];

  return (

    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 text-white flex flex-col">

      <div className="p-6 border-b border-slate-800">

        <h1 className="text-2xl font-bold text-cyan-400">
          SkillProof AI
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Recruiter Portal
        </p>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >

            {item.icon}

            {item.title}

          </NavLink>

        ))}

      </nav>

      <div className="border-t border-slate-800 p-4">

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 hover:bg-red-700 transition"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>

  );

}