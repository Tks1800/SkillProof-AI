import { useState } from "react";
import { toast } from "react-toastify";
import { sendInterview } from "../../services/api";

export default function InterviewScheduleModal({
  open,
  onClose,
  onSuccess,
  application,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    scheduled_at: "",
    meeting_link: "",
    interview_type: "Online",
    notes: "",
  });

  if (!open) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      recruiter_email: application?.recruiter_email,
      candidate_email: application?.candidate_email,
      job_id: Number(application?.job_id),
      scheduled_at: form.scheduled_at,
      meeting_link: form.meeting_link || null,
      interview_type: form.interview_type,
      notes: form.notes || null,
    };

    console.log("========== PAYLOAD ==========");
    console.log(JSON.stringify(payload, null, 2));

    try {
      setLoading(true);

      const response = await sendInterview(payload);

      console.log("========== SUCCESS ==========");
      console.log(response.data);

      toast.success("Interview scheduled successfully.");

      if (onSuccess) onSuccess();
      onClose();

    } catch (err) {

      console.log("========== ERROR ==========");
      console.log("STATUS:", err.response?.status);

      console.log("FULL RESPONSE:");
      console.log(err.response);

      console.log("DATA:");
      console.log(err.response?.data);

      console.log("DETAIL:");
      console.log(
        JSON.stringify(err.response?.data?.detail, null, 2)
      );

      toast.error("Unable to schedule interview.");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-[#111827] rounded-2xl p-8 w-full max-w-xl">

        <h2 className="text-3xl font-bold mb-6">
          Schedule Interview
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Date & Time
            </label>

            <input
              type="datetime-local"
              name="scheduled_at"
              value={form.scheduled_at}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Meeting Link
            </label>

            <input
              type="text"
              name="meeting_link"
              value={form.meeting_link}
              onChange={handleChange}
              placeholder="https://meet.google.com/..."
              className="w-full bg-slate-800 border border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Interview Type
            </label>

            <select
              name="interview_type"
              value={form.interview_type}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-gray-700 rounded-xl px-4 py-3 outline-none"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Notes
            </label>

            <textarea
              rows={4}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Interview instructions..."
              className="w-full bg-slate-800 border border-gray-700 rounded-xl px-4 py-3 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-3">

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
              {loading ? "Scheduling..." : "Schedule Interview"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}