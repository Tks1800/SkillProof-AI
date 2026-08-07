import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  CalendarDays,
  FileText,
  User,
  ShieldCheck,
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
      title: "Jobs",
      icon: <Briefcase size={20} />,
      path: "/candidate/jobs",
    },
    {
      title: "Interviews",
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
    <aside className="w-72 min-h-screen bg-[#050816] border-r border-white/10 flex flex-col">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-white/10">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">

            S

          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">

              SkillProof

              <span className="text-cyan-400">
                AI
              </span>

            </h1>

            <p className="text-sm text-gray-400">

              Candidate Portal

            </p>

          </div>

        </div>

      </div>

      {/* Trust Score */}

      <div className="mx-6 mt-8 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 p-5">

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-cyan-400" />

          <div>

            <p className="text-sm text-gray-400">

              Trust Score™

            </p>

            <h2 className="text-3xl font-bold text-white">

              94%

            </h2>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 mt-10 px-5 space-y-3">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-xl"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >

            {item.icon}

            <span className="font-medium">

              {item.title}

            </span>

          </NavLink>

        ))}

      </nav>

      {/* Bottom */}

      <div className="p-6 border-t border-white/10">

        <button
          onClick={logout}
          className="w-full rounded-2xl bg-red-500/10 border border-red-500/20 py-4 flex items-center justify-center gap-3 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}