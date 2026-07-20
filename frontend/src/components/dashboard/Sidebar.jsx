import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Brain,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/candidate-dashboard",
  },
  {
    name: "Jobs",
    icon: <Briefcase size={20} />,
    path: "/jobs",
  },
  {
    name: "Resume",
    icon: <FileText size={20} />,
    path: "/resume-upload",
  },
  {
    name: "Skill Test",
    icon: <Brain size={20} />,
    path: "/skill-test",
  },
  {
    name: "Profile",
    icon: <User size={20} />,
    path: "/profile",
  },
  {
    name: "Settings",
    icon: <Settings size={20} />,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#111827] border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-2xl font-bold text-cyan-400">
          SkillProof AI
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-cyan-500 text-black font-semibold"
                  : "text-gray-300 hover:bg-[#1F2937]"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-800 p-4">
        <button
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}