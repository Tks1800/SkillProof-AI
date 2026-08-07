import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import { registerUser } from "../../services/api";

export default function RegisterCard() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    if (
      !form.full_name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      console.log("REGISTER SUCCESS:", response.data);

      alert("Registration Successful!");

      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      if (err.response) {
        console.error(err.response.data);

        alert(
          err.response.data.detail ||
            JSON.stringify(err.response.data)
        );
      } else {
        alert(
          "Cannot connect to backend.\n\n" +
            err.message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-white">
        Create Account
      </h2>

      <p className="text-gray-400 mt-2 mb-8">
        Verify Skills. Build Trust. Get Hired.
      </p>

      <div className="space-y-5">
        <InputField
          label="Full Name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />

        <div>
          <label className="text-gray-300 block mb-2">
            Register As
          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 p-3 text-white"
          >
            <option value="candidate">
              Candidate
            </option>

            <option value="recruiter">
              Recruiter
            </option>
          </select>
        </div>

        <PrimaryButton
          onClick={handleRegister}
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </PrimaryButton>
      </div>

            <p className="text-center text-gray-400 mt-8">
        Already have an account?

        <Link
          to="/login"
          className="text-cyan-400 ml-2"
        >
          Login
        </Link>
      </p>
    </>
  );
}