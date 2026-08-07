import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

import DashboardLayout from "../layouts/DashboardLayout";
import InterviewScheduleModal from "../components/interviews/InterviewScheduleModal";
import ApplicationCard from "../components/recruiter/ApplicationCard";

import {
  getRecruiterApplications,
  acceptApplication,
  rejectApplication,
} from "../services/api";

export default function RecruiterApplications() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [recommendation, setRecommendation] = useState("");

  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {

      setLoading(true);

      const res = await getRecruiterApplications();

      setApplications(res.data);

    } catch (err) {

      console.error(err);

      toast.error("Unable to load applications");

    } finally {

      setLoading(false);

    }
  }

  async function handleAccept(id) {

    try {

      await acceptApplication(id);

      toast.success("Candidate accepted successfully.");

      loadApplications();

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.detail ||
        "Unable to accept candidate."
      );

    }

  }

  async function handleReject(id) {

    try {

      await rejectApplication(id);

      toast.success("Candidate rejected successfully.");

      loadApplications();

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.detail ||
        "Unable to reject candidate."
      );

    }

  }

  function handleInterview(application) {

    setSelectedApplication(application);

    setShowInterviewModal(true);

  }

  // ==========================
  // Filters
  // ==========================

  const filteredApplications = applications.filter((item) => {

    const matchesSearch =
      (item.candidate_email || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesScore =
      (item.match_score || 0) >= minScore;

    const matchesRecommendation =
      recommendation === "" ||
      item.recommendation === recommendation;

    return (
      matchesSearch &&
      matchesScore &&
      matchesRecommendation
    );

  });

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Recruiter Applications
          </h1>

          <p className="text-gray-400 mt-2">
            Review and manage candidate applications.
          </p>

        </div>

        {/* Search */}

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search candidate..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-gray-700 bg-[#111827] py-3 pl-12 pr-4 outline-none focus:border-cyan-500"
          />

        </div>

        {/* Filters */}

        <div className="grid md:grid-cols-2 gap-4">

          <select
            value={minScore}
            onChange={(e) =>
              setMinScore(Number(e.target.value))
            }
            className="rounded-xl border border-gray-700 bg-[#111827] p-3"
          >

            <option value={0}>
              All Scores
            </option>

            <option value={40}>
              40%+
            </option>

            <option value={60}>
              60%+
            </option>

            <option value={80}>
              80%+
            </option>

            <option value={90}>
              90%+
            </option>

          </select>

          <select
            value={recommendation}
            onChange={(e) =>
              setRecommendation(e.target.value)
            }
            className="rounded-xl border border-gray-700 bg-[#111827] p-3"
          >

            <option value="">
              All Recommendations
            </option>

            <option>
              Excellent Match
            </option>

            <option>
              Highly Recommended
            </option>

            <option>
              Recommended
            </option>

            <option>
              Average Match
            </option>

            <option>
              Low Match
            </option>

          </select>

        </div>

        {/* Applications */}

        {loading ? (

          <div className="rounded-xl bg-[#111827] p-8 text-center">
            Loading...
          </div>

        ) : filteredApplications.length === 0 ? (

          <div className="rounded-xl bg-[#111827] p-8 text-center">
            No applications found.
          </div>

        ) : (

          <div className="grid gap-6">

            {filteredApplications.map((application, index) => (

              <ApplicationCard
                key={application.id}
                index={index}
                application={application}
                onAccept={handleAccept}
                onReject={handleReject}
                onInterview={handleInterview}
              />

            ))}

          </div>

        )}

      </div>

      <InterviewScheduleModal
        open={showInterviewModal}
        application={selectedApplication}
        onClose={() => {

          setShowInterviewModal(false);

          setSelectedApplication(null);

        }}
        onSuccess={loadApplications}
      />

    </DashboardLayout>

  );

}