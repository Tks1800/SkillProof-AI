import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createJob, updateJob } from "../../services/api";

const initialForm = {
  title: "",
  company_name: "",
  location: "",
  salary: "",
  experience: "",
  job_type: "",
  description: "",
  required_skills: "",
};

export default function JobFormModal({
  open,
  onClose,
  onSuccess,
  editJob,
}) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editJob) {
      setForm({
        title: editJob.title || "",
        company_name: editJob.company_name || "",
        location: editJob.location || "",
        salary: editJob.salary || "",
        experience: editJob.experience || "",
        job_type: editJob.job_type || "",
        description: editJob.description || "",
        required_skills: editJob.required_skills || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [editJob]);

  if (!open) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      if (editJob) {
        await updateJob(editJob.id, form);
      } else {
        await createJob(form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to save job.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-[#111827] w-full max-w-3xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-white">
            {editJob ? "Edit Job" : "Create New Job"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2">
              Job Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-[#1F2937] p-3 outline-none"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2">
                Company
              </label>

              <input
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#1F2937] p-3 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2">
                Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#1F2937] p-3 outline-none"
              />

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <div>

              <label className="block mb-2">
                Salary
              </label>

              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#1F2937] p-3 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2">
                Experience
              </label>

              <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#1F2937] p-3 outline-none"
              />

            </div>

            <div>

              <label className="block mb-2">
                Job Type
              </label>

              <select
                name="job_type"
                value={form.job_type}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#1F2937] p-3 outline-none"
              >
                <option value="">
                  Select
                </option>

                <option>
                  Full Time
                </option>

                <option>
                  Part Time
                </option>

                <option>
                  Internship
                </option>

                <option>
                  Contract
                </option>

                <option>
                  Remote
                </option>

              </select>

            </div>

          </div>

          <div>

            <label className="block mb-2">
              Required Skills
            </label>

            <input
              name="required_skills"
              value={form.required_skills}
              onChange={handleChange}
              placeholder="Python, SQL, FastAPI"
              required
              className="w-full rounded-xl bg-[#1F2937] p-3 outline-none"
            />

          </div>

          <div>

            <label className="block mb-2">
              Job Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-[#1F2937] p-3 outline-none resize-none"
            />

          </div>

          <div className="flex justify-end gap-4 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500"
            >
              {loading
                ? "Saving..."
                : editJob
                ? "Update Job"
                : "Create Job"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}