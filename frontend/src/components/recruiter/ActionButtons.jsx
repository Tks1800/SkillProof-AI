import {
  Eye,
  FileText,
  CheckCircle,
  XCircle,
  CalendarDays,
} from "lucide-react";

export default function ActionButtons({
  application,
  onViewProfile,
  onViewResume,
  onAccept,
  onReject,
  onInterview,
}) {
  const accepted = application?.status === "Accepted";
  const rejected = application?.status === "Rejected";

  return (
    <div className="w-full lg:w-72 flex flex-col gap-4">

      {/* View Candidate */}
      <button
        onClick={onViewProfile}
        className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 py-3 font-medium transition"
      >
        <Eye size={18} />
        View Candidate
      </button>

      {/* View Resume */}
      <button
        onClick={onViewResume}
        className="flex items-center justify-center gap-2 rounded-xl border border-cyan-700 bg-cyan-900/30 hover:bg-cyan-800 py-3 font-medium transition"
      >
        <FileText size={18} />
        View Resume
      </button>

      {/* Accept */}
      <button
        disabled={accepted}
        onClick={onAccept}
        className={`flex items-center justify-center gap-2 rounded-xl py-3 font-medium transition ${
          accepted
            ? "bg-green-900 text-green-300 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        <CheckCircle size={18} />
        {accepted ? "Accepted" : "Accept"}
      </button>

      {/* Reject */}
      <button
        disabled={rejected}
        onClick={onReject}
        className={`flex items-center justify-center gap-2 rounded-xl py-3 font-medium transition ${
          rejected
            ? "bg-red-900 text-red-300 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        <XCircle size={18} />
        {rejected ? "Rejected" : "Reject"}
      </button>

      {/* Interview */}
      <button
        onClick={onInterview}
        className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 py-3 font-medium transition"
      >
        <CalendarDays size={18} />
        Schedule Interview
      </button>

    </div>
  );
}