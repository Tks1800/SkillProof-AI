import { Search, UserCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import NotificationDropdown from "../NotificationDropdown";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-[#111827] border-b border-gray-800 flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-gray-400 text-sm">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="hidden md:flex items-center bg-[#1F2937] rounded-xl px-4 py-2">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 text-sm text-white placeholder-gray-500"
          />

        </div>

        {/* Notifications */}
        <NotificationDropdown />

        {/* User */}
        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-cyan-400"
          />

          <div className="hidden md:block">

            <p className="font-semibold">
              {user?.full_name || "Guest"}
            </p>

            <p className="text-sm text-gray-400">
              {user?.email || ""}
            </p>

            <p className="text-xs text-cyan-400 capitalize">
              {user?.role || ""}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}