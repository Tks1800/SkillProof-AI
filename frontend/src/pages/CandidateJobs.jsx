import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

export default function CandidateJobs() {
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

  async function applyJob(jobId) {
    try {
      await API.post("/apply-job", {
        job_id: jobId,
      });

      alert("🎉 Application submitted successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to apply.");
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Available Jobs
          </h1>

          <p className="text-gray-400 mt-2">
            Explore opportunities that match your skills.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            Loading...
          </div>
        ) : (
          <div className="grid gap-6">

            {jobs.map((job) => (

              <div
                key={job.id}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6"
              >

                <h2 className="text-2xl font-bold">
                  {job.title}
                </h2>

                <p className="text-cyan-400 mt-2">
                  {job.company_name}
                </p>

                <p className="text-gray-400 mt-2">
                  📍 {job.location}
                </p>

                <p className="text-gray-400">
                  💰 {job.salary}
                </p>

                <p className="text-gray-400">
                  💼 {job.experience}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">

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

                <button
                  onClick={() => applyJob(job.id)}
                  className="mt-6 w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl font-semibold"
                >
                  Apply Now
                </button>

              </div>

            ))}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}