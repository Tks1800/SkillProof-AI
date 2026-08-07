import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  CalendarDays,
  Clock,
  Video,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getCandidateInterviews,
  acceptInterview,
  rejectInterview,
} from "../services/api";

export default function CandidateInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    loadInterviews();
  }, []);

  async function loadInterviews() {
    try {
      setLoading(true);

      const res = await getCandidateInterviews();

      console.log("Candidate Interviews:", res.data);

      setInterviews(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load interviews.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(id) {
    try {
      setProcessingId(id);

      await acceptInterview(id);

      toast.success("Interview accepted.");

      loadInterviews();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.detail ||
          "Unable to accept interview."
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject(id) {
    try {
      setProcessingId(id);

      await rejectInterview(id);

      toast.success("Interview rejected.");

      loadInterviews();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.detail ||
          "Unable to reject interview."
      );
    } finally {
      setProcessingId(null);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center text-xl">
          Loading interviews...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            My Interviews
          </h1>

          <p className="text-gray-400 mt-2">
            Track all interview invitations from recruiters.
          </p>
        </div>

        {interviews.length === 0 ? (
          <div className="bg-[#111827] rounded-2xl p-10 text-center">

            <CalendarDays
              size={70}
              className="mx-auto text-cyan-500 mb-5"
            />

            <h2 className="text-2xl font-bold">
              No Interviews Scheduled
            </h2>

            <p className="text-gray-400 mt-3">
              Recruiters haven't scheduled an interview yet.
            </p>

          </div>
        ) : (
          <div className="space-y-6">

            {interviews.map((item) => (

              <div
                key={item.id}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-cyan-600 transition"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-8">

                  <div className="space-y-4 flex-1">

                    <h2 className="text-2xl font-bold">
                      Interview #{item.id}
                    </h2>

                    <div className="text-gray-400">
                      Recruiter :
                      <span className="text-white ml-2">
                        {item.recruiter_email}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={18} />

                      {item.scheduled_at
                        ? new Date(
                            item.scheduled_at
                          ).toLocaleString()
                        : "Not Scheduled"}
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <Video size={18} />

                      {item.interview_type || "Online"}
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <FileText size={18} />

                      {item.notes || "No Instructions"}
                    </div>

                    {item.meeting_link && (
                      <a
                        href={item.meeting_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-cyan-600 hover:bg-cyan-500 px-5 py-3 rounded-xl transition"
                      >
                        Join Meeting
                      </a>
                    )}

                    <div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          item.status === "Accepted"
                            ? "bg-green-600 text-white"
                            : item.status === "Rejected"
                            ? "bg-red-600 text-white"
                            : "bg-yellow-500 text-black"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                  </div>

                  {item.status === "Pending" && (

                    <div className="flex flex-col gap-4">

                      <button
                        disabled={processingId === item.id}
                        onClick={() =>
                          handleAccept(item.id)
                        }
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 px-6 py-3 rounded-xl"
                      >
                        <CheckCircle size={18} />

                        {processingId === item.id
                          ? "Processing..."
                          : "Accept"}
                      </button>

                      <button
                        disabled={processingId === item.id}
                        onClick={() =>
                          handleReject(item.id)
                        }
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-600 px-6 py-3 rounded-xl"
                      >
                        <XCircle size={18} />

                        {processingId === item.id
                          ? "Processing..."
                          : "Reject"}
                      </button>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}