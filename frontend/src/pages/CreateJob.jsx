import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

export default function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company_name: "",
    location: "",
    salary: "",
    experience: "",
    job_type: "",
    required_skills: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const publishJob = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.post("/create-job", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("🎉 Job published successfully!");

      navigate("/recruiter-dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to publish job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-[#111827] border border-gray-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-white mb-8">
          Create New Job
        </h1>

        <form
          onSubmit={publishJob}
          className="space-y-6"
        >

          <input
            name="title"
            placeholder="Job Title"
            className="w-full bg-[#1F2937] p-4 rounded-xl text-white"
            onChange={handleChange}
            required
          />

          <input
            name="company_name"
            placeholder="Company Name"
            className="w-full bg-[#1F2937] p-4 rounded-xl text-white"
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            className="w-full bg-[#1F2937] p-4 rounded-xl text-white"
            onChange={handleChange}
            required
          />

          <div className="grid md:grid-cols-2 gap-6">

            <input
              name="salary"
              placeholder="Salary"
              className="bg-[#1F2937] p-4 rounded-xl text-white"
              onChange={handleChange}
              required
            />

            <input
              name="experience"
              placeholder="Experience"
              className="bg-[#1F2937] p-4 rounded-xl text-white"
              onChange={handleChange}
              required
            />

          </div>

          <input
            name="job_type"
            placeholder="Job Type (Full-Time, Remote...)"
            className="w-full bg-[#1F2937] p-4 rounded-xl text-white"
            onChange={handleChange}
            required
          />

          <input
            name="required_skills"
            placeholder="Required Skills (Python, React, SQL)"
            className="w-full bg-[#1F2937] p-4 rounded-xl text-white"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            rows="6"
            placeholder="Job Description"
            className="w-full bg-[#1F2937] p-4 rounded-xl text-white"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-xl font-semibold transition"
          >
            {loading ? "Publishing..." : "Publish Job"}
          </button>

        </form>

      </div>
    </DashboardLayout>
  );
}