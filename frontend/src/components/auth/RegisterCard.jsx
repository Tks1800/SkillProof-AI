import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import API from "../../services/api";

export default function RegisterCard() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        role: "candidate",
      });

      alert("Registration Successful!");

      navigate("/login");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.detail ||
        "Registration Failed"
      );
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
          placeholder="Enter your name"
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

        <PrimaryButton onClick={handleRegister}>
          Create Account
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