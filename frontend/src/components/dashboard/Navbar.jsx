import {
  Search,
  UserCircle,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import NotificationDropdown from "../NotificationDropdown";

export default function Navbar() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="flex h-24 items-center justify-between border-b border-white/10 bg-[#050816]/80 px-8 backdrop-blur-xl">

      {/* Left */}

      <div>

        <div className="flex items-center gap-2">

          <Sparkles
            size={22}
            className="text-cyan-400"
          />

          <span className="text-cyan-400 font-semibold uppercase tracking-[3px]">

            SkillProof AI

          </span>

        </div>

        <h1 className="mt-2 text-3xl font-bold text-white">

          {greeting},

          <span className="text-cyan-400">

            {" "}
            {user?.full_name?.split(" ")[0] || "User"}

          </span>

        </h1>

        <p className="mt-1 text-gray-400">

          Let's continue building your career today.

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="hidden lg:flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search jobs, skills..."
            className="ml-3 w-64 bg-transparent text-white outline-none placeholder:text-gray-500"
          />

        </div>

        {/* Notifications */}

        <NotificationDropdown />

        {/* Profile */}

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">

          <UserCircle
            size={44}
            className="text-cyan-400"
          />

          <div className="hidden md:block">

            <p className="font-semibold">

              {user?.full_name || "Guest"}

            </p>

            <p className="text-sm text-gray-400">

              {user?.role}

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}