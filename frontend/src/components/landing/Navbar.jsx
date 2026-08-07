import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#070B1A]/90 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">

        {/* Logo */}

        <div
          onClick={() => goTo("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-white text-lg shadow-lg">
            S
          </div>

          <div>
            <h1 className="text-white font-bold text-xl sm:text-2xl">
              SkillProof
              <span className="text-cyan-400">AI</span>
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}

        <div className="hidden lg:flex items-center gap-8 text-gray-300">

          <button
            onClick={() => goTo("/")}
            className="hover:text-cyan-400 transition"
          >
            Home
          </button>

          <button className="hover:text-cyan-400 transition">
            Features
          </button>

          <button className="hover:text-cyan-400 transition">
            Solutions
          </button>

          <button className="hover:text-cyan-400 transition">
            Pricing
          </button>

          <button className="hover:text-cyan-400 transition">
            About
          </button>

        </div>

        {/* Desktop Buttons */}

        <div className="hidden lg:flex items-center gap-4">

          <button
            onClick={() => goTo("/login")}
            className="border border-white/20 px-5 py-2 rounded-xl text-white hover:bg-white/5 transition"
          >
            Login
          </button>

          <button
            onClick={() => goTo("/register")}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-2 rounded-xl text-white font-semibold hover:scale-105 transition"
          >
            Get Started
          </button>

        </div>

        {/* Mobile Toggle */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 flex flex-col gap-5 bg-[#070B1A] border-t border-white/10">

          <button
            onClick={() => goTo("/")}
            className="text-left text-white hover:text-cyan-400"
          >
            Home
          </button>

          <button className="text-left text-white hover:text-cyan-400">
            Features
          </button>

          <button className="text-left text-white hover:text-cyan-400">
            Solutions
          </button>

          <button className="text-left text-white hover:text-cyan-400">
            Pricing
          </button>

          <button className="text-left text-white hover:text-cyan-400">
            About
          </button>

          <div className="flex flex-col gap-3 pt-3">

            <button
              onClick={() => goTo("/login")}
              className="border border-white/20 py-3 rounded-xl text-white"
            >
              Login
            </button>

            <button
              onClick={() => goTo("/register")}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 py-3 rounded-xl text-white font-semibold"
            >
              Get Started
            </button>

          </div>

        </div>
      </div>

    </nav>
  );
}

export default Navbar;