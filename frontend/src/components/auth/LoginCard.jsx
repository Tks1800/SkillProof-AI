import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginCard() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const user = await login(form.email, form.password);

      console.log("Logged In User:", user);

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
      console.error(err);

      setError(
        err.response?.data?.detail ||
          err.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-8">
        Login
      </h2>

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
          required
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}