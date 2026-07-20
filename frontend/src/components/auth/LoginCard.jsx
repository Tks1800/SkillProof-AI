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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await login(form.email, form.password);

      if (user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/candidate-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Login
      </h2>

      <form onSubmit={handleLogin} className="space-y-5">

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none"
          required
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

      </form>
    </div>
  );
}