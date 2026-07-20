import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

export default function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteJob(id) {
    if (!window.confirm("Delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`);

      setJobs((prev) => prev.filter((job) => job.id !== id));

      alert("Job deleted successfully.");
    } catch (err) {
      console.log(err);
      alert("Failed to delete job.");
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Manage Jobs
          </h1>

          <p className="text-gray-400 mt-2">
            View and manage all published jobs.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-[#111827] rounded-2xl p-10 text-center">
            No jobs available.
          </div>
        ) : (
          <div className="grid gap-6">

            {jobs.map((job) => (

              <div
                key={job.id}
                className="bg-[#111827] rounded-2xl border border-gray-800 p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {job.title}
                    </h2>

                    <p className="text-cyan-400 mt-2">
                      {job.company_name}
                    </p>

                    <p className="text-gray-400 mt-1">
                      📍 {job.location}
                    </p>

                    <p className="text-gray-400">
                      💰 {job.salary}
                    </p>

                    <p className="text-gray-400">
                      💼 {job.experience}
                    </p>

                    <p className="text-gray-400">
                      🏢 {job.job_type}
                    </p>

                    <div className="mt-4">
                      <strong>Skills:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.required_skills
                          .split(",")
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="bg-cyan-600 px-3 py-1 rounded-full text-sm"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>
                    </div>

                  </div>

                  <div className="flex flex-col gap-3">

                    <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg">
                      Edit
                    </button>

                    <button
                      onClick={() => deleteJob(job.id)}
                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                    <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg">
                      Applicants
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}