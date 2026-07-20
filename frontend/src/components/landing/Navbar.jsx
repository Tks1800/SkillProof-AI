import { Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#070B1A]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-xl font-bold">
            V
          </div>

          <div>

            <h1 className="text-white font-bold text-2xl">
              VAIVO
              <span className="text-cyan-400">AI</span>
            </h1>

          </div>

        </div>

        {/* Desktop */}

        <div className="hidden lg:flex items-center gap-10 text-gray-300">

          <a href="#" className="hover:text-white transition">
            Features
          </a>

          <a href="#" className="hover:text-white transition">
            Solutions
          </a>

          <a href="#" className="hover:text-white transition">
            Pricing
          </a>

          <a href="#" className="hover:text-white transition">
            About
          </a>

        </div>

        {/* Buttons */}

        <div className="hidden lg:flex items-center gap-4">

          <button className="border border-white/20 px-5 py-2 rounded-xl text-white hover:bg-white/5 transition">
            Login
          </button>

          <button className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-2 rounded-xl text-white font-medium hover:scale-105 transition">
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