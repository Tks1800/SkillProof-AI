import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  getAvailableJobs,
  applyJob,
} from "../services/api";

import { toast } from "react-toastify";

import {
  Search,
  Building2,
  MapPin,
  IndianRupee,
  Clock3,
  Briefcase,
  Send,
} from "lucide-react";

export default function CandidateJobs() {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [applyingId, setApplyingId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      setLoading(true);

      const res = await getAvailableJobs();

      setJobs(res.data);
    } catch (err) {
      console.error(err);

      toast.error("Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  async function handleApply(jobId) {
  try {
    setApplyingId(jobId);

    const res = await applyJob(jobId);

    toast.success(
      res.data.message || "Application submitted successfully!"
    );
  
  } finally {
    setApplyingId(null);
  }
}
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keyword = search.toLowerCase();

      return (
        job.title.toLowerCase().includes(keyword) ||
        job.company_name.toLowerCase().includes(keyword) ||
        job.location.toLowerCase().includes(keyword)
      );
    });
  }, [jobs, search]);

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold">
            Available Jobs
          </h1>

          <p className="text-gray-400 mt-2">
            Discover opportunities that match your skills.
          </p>

        </div>

        {/* Search */}

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search jobs..."
            className="w-full bg-[#111827] rounded-xl py-4 pl-12 pr-5 outline-none border border-gray-800"
          />

        </div>

        {/* Loading */}

        {loading ? (

          <div className="text-center py-20 text-gray-400">
            Loading Jobs...
          </div>

        ) : filteredJobs.length === 0 ? (

          <div className="bg-[#111827] rounded-2xl p-12 text-center">

            <Briefcase
              size={60}
              className="mx-auto text-cyan-500 mb-5"
            />

            <h2 className="text-2xl font-bold">
              No Jobs Available
            </h2>

            <p className="text-gray-400 mt-3">
              Please check again later.
            </p>

          </div>

        ) : (

          <div className="grid xl:grid-cols-2 gap-6">

                        {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-cyan-600 transition"
              >

                <div className="space-y-4">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {job.title}
                    </h2>

                    <div className="flex items-center gap-2 text-cyan-400 mt-2">
                      <Building2 size={18} />
                      {job.company_name}
                    </div>

                  </div>

                  <div className="flex flex-wrap gap-5 text-gray-400">

                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      {job.location}
                    </div>

                    <div className="flex items-center gap-2">
                      <IndianRupee size={18} />
                      {job.salary}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 size={18} />
                      {job.experience}
                    </div>

                  </div>

                  <div className="inline-flex bg-cyan-700 px-4 py-2 rounded-full text-sm font-medium w-fit">
                    {job.job_type}
                  </div>

                  <p className="text-gray-300 leading-7">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {job.required_skills
                      ?.split(",")
                      .map((skill, index) => (
                        <span
                          key={index}
                          className="bg-slate-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill.trim()}
                        </span>
                      ))}

                  </div>

                  <div className="border-t border-gray-800 pt-4 mt-2 flex justify-between items-center">

                    <span className="text-sm text-gray-500">
                      Posted:
                      {" "}
                      {job.created_at
                        ? new Date(job.created_at).toLocaleDateString()
                        : "-"}
                    </span>

                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={applyingId === job.id}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 px-5 py-3 rounded-xl font-semibold transition"
                    >
                      <Send size={18} />

                      {applyingId === job.id
                        ? "Applying..."
                        : "Apply Now"}
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