import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import Button from "../ui/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginCard() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const user = await login(
        form.email,
        form.password
      );

      if (user?.role?.toLowerCase() === "recruiter") {
        navigate("/recruiter/dashboard", {
          replace: true,
        });
      } else {
        navigate("/candidate/dashboard", {
          replace: true,
        });
      }

    } catch (err) {

      setError(
        err.response?.data?.detail ||
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0F172A] p-8 shadow-[0_20px_60px_rgba(0,0,0,.45)] backdrop-blur-xl">

      <div className="text-center">

        <h2 className="text-4xl font-bold text-white">

          Welcome Back

        </h2>

        <p className="text-gray-400 mt-3">

          Login to continue to SkillProof AI

        </p>

      </div>

      <form
        onSubmit={handleLogin}
        className="mt-8 space-y-5"
      >

        {/* Email */}

        <div>

          <label className="text-sm text-gray-300">

            Email Address

          </label>

          <div className="relative mt-2">

            <Mail
              size={18}
              className="absolute left-4 top-4 text-gray-500"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none transition focus:border-cyan-500"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="text-sm text-gray-300">

            Password

          </label>

          <div className="relative mt-2">

            <Lock
              size={18}
              className="absolute left-4 top-4 text-gray-500"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-12 text-white outline-none transition focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-3 text-gray-400"
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

        </div>

        {/* Remember */}

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm text-gray-300">

            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="text-cyan-400 hover:text-cyan-300 text-sm"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Error */}

        {error && (

          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-400">

            {error}

          </div>

        )}

        {/* Login */}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >

          {loading
            ? "Signing In..."
            : "Login"}

        </Button>

      </form>

      <p className="mt-8 text-center text-gray-400">

        Don't have an account?

        <Link
          to="/register"
          className="ml-2 text-cyan-400 hover:text-cyan-300"
        >
          Create Account
        </Link>

      </p>

    </div>

  );
}