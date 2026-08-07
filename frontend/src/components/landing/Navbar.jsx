import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-[#070B1A]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-xl font-bold text-white">
            S
          </div>

          <div>
            <h1 className="text-white font-bold text-2xl">
              SkillProof
              <span className="text-cyan-400">AI</span>
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}

        <div className="hidden lg:flex items-center gap-10 text-gray-300">

          <button
            onClick={() => navigate("/")}
            className="hover:text-white transition"
          >
            Home
          </button>

          <button
            className="hover:text-white transition"
          >
            Features
          </button>

          <button
            className="hover:text-white transition"
          >
            Solutions
          </button>

          <button
            className="hover:text-white transition"
          >
            Pricing
          </button>

          <button
            className="hover:text-white transition"
          >
            About
          </button>

        </div>

        {/* Buttons */}

        <div className="hidden lg:flex items-center gap-4">

          <button
            onClick={() => navigate("/login")}
            className="border border-white/20 px-5 py-2 rounded-xl text-white hover:bg-white/5 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-2 rounded-xl text-white font-medium hover:scale-105 transition"
          >
            Get Started
          </button>

        </div>

        {/* Mobile */}

        <button className="lg:hidden text-white">
          <Menu size={28} />
        </button>

      </div>
    </nav>
  );
}

export default Navbar;