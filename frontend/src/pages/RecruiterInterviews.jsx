import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  CalendarDays,
  Clock,
  Video,
  FileText,
  Mail,
} from "lucide-react";
import { toast } from "react-toastify";

import { getRecruiterInterviews } from "../services/api";

export default function RecruiterInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterviews();
  }, []);

  async function loadInterviews() {
    try {
      setLoading(true);

      const res = await getRecruiterInterviews();

      console.log("Recruiter Interviews:", res.data);

      setInterviews(res.data || []);
    } catch (err) {
      console.error(err);

      toast.error("Unable to load interviews.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center text-xl">
          Loading Interviews...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Scheduled Interviews
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all candidate interviews.
          </p>
        </div>

        {interviews.length === 0 ? (

          <div className="bg-[#111827] rounded-2xl p-12 text-center">

            <CalendarDays
              size={70}
              className="mx-auto text-cyan-500 mb-5"
            />

            <h2 className="text-2xl font-bold">
              No Interviews Scheduled
            </h2>

            <p className="text-gray-400 mt-3">
              Interviews will appear here after scheduling.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-6">

            {interviews.map((item) => (

              <div
                key={item.id}
                className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-cyan-600 transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Candidate Interview
                    </h2>

                    <div className="flex items-center gap-2 mt-3 text-gray-400">
                      <Mail size={18} />
                      {item.candidate_email}
                    </div>

                    <p className="text-gray-400 mt-2">
                      Job #{item.job_id}
                    </p>

                  </div>

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

                <div className="space-y-4 mt-6">

                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock size={18} />

                    {item.scheduled_at
                      ? new Date(
                          item.scheduled_at
                        ).toLocaleString()
                      : "Not Scheduled"}
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <Video size={18} />

                    {item.interview_type || "Online"}
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <FileText size={18} />

                    {item.notes || "No interview notes"}
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

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}