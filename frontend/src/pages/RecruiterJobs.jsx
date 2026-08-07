import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { toast } from "react-toastify";
import {
  getRecruiterJobs,
  deleteJob,
} from "../services/api";

import JobFormModal from "../components/jobs/JobFormModal";
import DeleteJobModal from "../components/jobs/DeleteJobModal";

import {
  Plus,
  Search,
  Briefcase,
  MapPin,
  IndianRupee,
  Clock3,
  Building2,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

export default function RecruiterJobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingJob, setEditingJob] = useState(null);

  const [showDelete, setShowDelete] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      setLoading(true);

      const res = await getRecruiterJobs();

      setJobs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditingJob(null);
    setShowForm(true);
  }

  function openEdit(job) {
    setEditingJob(job);
    setShowForm(true);
  }

  function openDelete(job) {
    setSelectedJob(job);
    setShowDelete(true);
  }

  async function confirmDelete() {
    try {
      setDeleteLoading(true);

      await deleteJob(selectedJob.id);

      setJobs((prev) =>
        prev.filter((j) => j.id !== selectedJob.id)
      );

      setShowDelete(false);
      setSelectedJob(null);
    } catch (err) {
      console.log(err);
      alert("Unable to delete job.");
    } finally {
      setDeleteLoading(false);
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

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

          <div>

            <h1 className="text-4xl font-bold">
              Recruiter Jobs
            </h1>

            <p className="text-gray-400 mt-2">
              Create and manage job openings.
            </p>

          </div>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl"
          >
            <Plus size={20} />

            Create Job
          </button>

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
            Loading jobs...
          </div>

        ) : filteredJobs.length === 0 ? (

          <div className="bg-[#111827] rounded-2xl p-12 text-center">

            <Briefcase
              size={55}
              className="mx-auto mb-5 text-cyan-500"
            />

            <h2 className="text-2xl font-bold">
              No Jobs Found
            </h2>

            <p className="text-gray-400 mt-3">
              Create your first job posting.
            </p>

          </div>

        ) : (

          <div className="grid xl:grid-cols-2 gap-6">

                        {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-cyan-600 transition"
              >
                <div className="flex justify-between items-start">

                  <div className="space-y-3 flex-1">

                    <h2 className="text-2xl font-bold">
                      {job.title}
                    </h2>

                    <div className="flex flex-wrap gap-5 text-gray-400">

                      <div className="flex items-center gap-2">
                        <Building2 size={18} />
                        {job.company_name}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        {job.location}
                      </div>

                    </div>

                    <div className="flex flex-wrap gap-5 text-gray-400">

                      <div className="flex items-center gap-2">
                        <IndianRupee size={18} />
                        {job.salary}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 size={18} />
                        {job.experience}
                      </div>

                      <div className="bg-cyan-700 px-3 py-1 rounded-full text-sm">
                        {job.job_type}
                      </div>

                    </div>

                    <p className="text-gray-300 leading-7">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
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

                  </div>

                  <div className="flex flex-col gap-3 ml-6">

                    <button
                      onClick={() => openEdit(job)}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() => openDelete(job)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>

                    <button
                        onClick={() => navigate("/recruiter/applications")}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
                    >
                        <Users size={18} />
                        Applicants
                    </button>

                  </div>

                </div>

                <div className="border-t border-gray-800 mt-6 pt-4 flex justify-between text-sm text-gray-500">

                  <span>
                    Job ID: #{job.id}
                  </span>

                  <span>
                    Created:
                    {" "}
                    {job.created_at
                      ? new Date(job.created_at).toLocaleDateString()
                      : "-"}
                  </span>

                </div>

              </div>
            ))}

          </div>

        )}

      </div>

      <JobFormModal
        open={showForm}
        editJob={editingJob}
        onClose={() => {
          setShowForm(false);
          setEditingJob(null);
        }}
        onSuccess={loadJobs}
      />

      <DeleteJobModal
        open={showDelete}
        job={selectedJob}
        loading={deleteLoading}
        onClose={() => {
          setShowDelete(false);
          setSelectedJob(null);
        }}
        onConfirm={confirmDelete}
      />

    </DashboardLayout>
  );
}