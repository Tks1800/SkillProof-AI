import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API, {
  getAiMatch,
  getCandidateAnalysis,
} from "../services/api";

import {
  User,
  Phone,
  Linkedin,
  Github,
  Globe,
  FileText,
  Award,
  Brain,
  Sparkles,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function CandidateProfile() {
  const { email } = useParams();
  const [searchParams] = useSearchParams();

  const jobId = searchParams.get("jobId");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [aiMatch, setAiMatch] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const [analysis, setAnalysis] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (jobId && email) {
    loadAiMatch();
    loadAnalysis();
  }
  }, [jobId, email]);

  async function loadAnalysis() {
  try {
    setLoadingAnalysis(true);

    const res = await getCandidateAnalysis(
      email,
      jobId
    );

    setAnalysis(res.data);

  } catch (err) {
    console.error(err);
  } finally {
    setLoadingAnalysis(false);
  }
}

  async function loadProfile() {
    try {
      const res = await API.get(`/candidate-profile/${email}`);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadAiMatch() {
    try {
      setLoadingAi(true);

      const res = await getAiMatch(jobId, email);

      setAiMatch(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-xl">
          Loading Candidate Profile...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}

        <div className="bg-[#111827] rounded-2xl p-8">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-cyan-600 flex items-center justify-center">
              <User size={40} />
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {profile.user.full_name}
              </h1>

              <p className="text-gray-400 mt-2">
                {profile.user.email}
              </p>

              <span className="inline-block mt-4 bg-cyan-600 px-4 py-2 rounded-full">
                {profile.user.role}
              </span>

            </div>

          </div>

        </div>

        {/* Contact */}

        <div className="bg-[#111827] rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex items-center gap-3">
              <Phone />
              {profile.profile.phone || "-"}
            </div>

            <div className="flex items-center gap-3">
              <Linkedin />
              {profile.profile.linkedin || "-"}
            </div>

            <div className="flex items-center gap-3">
              <Github />
              {profile.profile.github || "-"}
            </div>

            <div className="flex items-center gap-3">
              <Globe />
              {profile.profile.portfolio || "-"}
            </div>

          </div>

        </div>


                {/* Resume */}

        <div className="bg-[#111827] rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Resume
          </h2>

          {profile.resume.file_name ? (

            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div className="flex items-center gap-3">

                  <FileText className="text-cyan-400" />

                  <div>

                    <p className="font-semibold">
                      {profile.resume.file_name}
                    </p>

                    <p className="text-sm text-gray-400">
                      Uploaded Resume
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <a
                    href={`http://127.0.0.1:8000/resume/view/${profile.user.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-600 hover:bg-cyan-500 px-5 py-2 rounded-lg transition"
                  >
                    👁 View Resume
                  </a>

                  <a
                    href={`http://127.0.0.1:8000/resume/download/${profile.user.email}`}
                    className="bg-green-600 hover:bg-green-500 px-5 py-2 rounded-lg transition"
                  >
                    ⬇ Download
                  </a>

                </div>

              </div>

              {profile.resume.extracted_text && (

                <div className="mt-6">

                  <h3 className="font-semibold mb-3">
                    Resume Preview
                  </h3>

                  <div className="bg-black/20 rounded-xl p-5 max-h-96 overflow-y-auto whitespace-pre-wrap text-gray-300">

                    {profile.resume.extracted_text}

                  </div>

                </div>

              )}

            </>

          ) : (

            <p className="text-gray-400">
              No Resume Uploaded
            </p>

          )}

        </div>

        {/* AI Match */}

        {jobId && (

          <div className="bg-[#111827] rounded-2xl p-8 border border-cyan-700">

            <div className="flex items-center gap-3 mb-6">

              <Sparkles className="text-cyan-400" />

              <h2 className="text-2xl font-bold">
                AI Candidate Match
              </h2>

            </div>

            {loadingAi ? (

              <div className="text-gray-400">
                Calculating AI Match...
              </div>

            ) : aiMatch ? (

              <>
                <div className="flex flex-col md:flex-row md:justify-between gap-8">

                  <div>

                    <p className="text-gray-400">
                      Job Position
                    </p>

                    <h3 className="text-xl font-bold">
                      {aiMatch.job_title}
                    </h3>

                  </div>

                  <div className="text-center">

                    <p className="text-gray-400">
                      Match Score
                    </p>

                    <div className="text-5xl font-bold text-cyan-400 mt-2">
                      {aiMatch.score}%
                    </div>

                  </div>

                </div>

                <div className="w-full bg-gray-700 rounded-full h-4 mt-8">

                  <div
                    className="bg-cyan-500 h-4 rounded-full transition-all duration-700"
                    style={{
                      width: `${aiMatch.score}%`,
                    }}
                  />

                </div>

                                <div className="grid md:grid-cols-2 gap-8 mt-8">

                  {/* Matched Skills */}

                  <div>

                    <h3 className="text-lg font-bold text-green-400 mb-4">
                      Matched Skills
                    </h3>

                    {aiMatch.matched_skills?.length > 0 ? (

                      <div className="flex flex-wrap gap-3">

                        {aiMatch.matched_skills.map((skill, index) => (

                          <span
                            key={index}
                            className="bg-green-600 px-4 py-2 rounded-lg flex items-center gap-2"
                          >
                            <CheckCircle size={16} />
                            {skill}
                          </span>

                        ))}

                      </div>

                    ) : (

                      <p className="text-gray-400">
                        No matched skills.
                      </p>

                    )}

                  </div>

                  {/* Missing Skills */}

                  <div>

                    <h3 className="text-lg font-bold text-red-400 mb-4">
                      Missing Skills
                    </h3>

                    {aiMatch.missing_skills?.length > 0 ? (

                      <div className="flex flex-wrap gap-3">

                        {aiMatch.missing_skills.map((skill, index) => (

                          <span
                            key={index}
                            className="bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
                          >
                            <AlertTriangle size={16} />
                            {skill}
                          </span>

                        ))}

                      </div>

                    ) : (

                      <p className="text-green-400">
                        No missing skills 🎉
                      </p>

                    )}

                  </div>

                </div>

                <div className="mt-8">

                  <h3 className="text-lg font-bold mb-3">
                    AI Recommendation
                  </h3>

                  <div
                    className={`inline-block px-6 py-3 rounded-xl font-semibold ${
                      aiMatch.recommendation === "Highly Recommended"
                        ? "bg-green-600"
                        : aiMatch.recommendation === "Recommended"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-600"
                    }`}
                  >
                    {aiMatch.recommendation}
                  </div>

                </div>

              </>

            ) : (

              <p className="text-gray-400">
                AI Match unavailable.
              </p>

            )}

          </div>

        )}


        {/* ================= AI ANALYSIS ================= */}

{jobId && (
  <div className="bg-[#111827] rounded-2xl p-8 border border-purple-600">

    <div className="flex items-center gap-3 mb-8">

      <Brain className="text-purple-400" size={28} />

      <h2 className="text-2xl font-bold">
        AI Candidate Analysis
      </h2>

    </div>

    {loadingAnalysis ? (

      <div className="text-center py-10 text-gray-400">
        Generating AI Analysis...
      </div>

    ) : analysis ? (

      <>

        {/* Overall Score */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <p className="text-gray-400">
              Overall Candidate Score
            </p>

            <h1 className="text-6xl font-bold text-cyan-400 mt-2">
              {analysis.overall_score}%
            </h1>

          </div>

          <Award
            size={70}
            className="text-cyan-400"
          />

        </div>

        {/* Summary */}

        <div className="mb-8">

          <h3 className="text-xl font-bold mb-3">
            Summary
          </h3>

          <p className="text-gray-300">
            {analysis.summary}
          </p>

        </div>

        {/* Strengths + Missing */}

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <h3 className="text-green-400 text-xl font-bold mb-4">
              Strengths
            </h3>

            <div className="flex flex-wrap gap-3">

              {analysis.strengths.map((skill, index) => (

                <span
                  key={index}
                  className="bg-green-600 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <CheckCircle size={16} />

                  {skill}

                </span>

              ))}

            </div>

          </div>

          <div>

            <h3 className="text-red-400 text-xl font-bold mb-4">
              Missing Skills
            </h3>

            <div className="flex flex-wrap gap-3">

              {analysis.missing_skills.map((skill, index) => (

                <span
                  key={index}
                  className="bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <AlertTriangle size={16} />

                  {skill}

                </span>

              ))}

            </div>

          </div>

        </div>

        {/* Recommendation */}

        <div className="mt-8">

          <h3 className="text-xl font-bold mb-4">
            Recommendation
          </h3>

          <div className="inline-block bg-cyan-600 px-6 py-3 rounded-xl font-bold">

            {analysis.recommendation}

          </div>

        </div>

        {/* Interview Questions */}

        <div className="mt-10">

          <h3 className="text-xl font-bold mb-5">
            Suggested Interview Questions
          </h3>

          <div className="space-y-3">

            {analysis.interview_questions.map((question, index) => (

              <div
                key={index}
                className="bg-black/20 rounded-xl p-4"
              >
                <span className="font-bold mr-2">
                  Q{index + 1}.
                </span>

                {question}

              </div>

            ))}

          </div>

        </div>

      </>

    ) : (

      <p className="text-gray-400">
        AI Analysis unavailable.
      </p>

    )}

  </div>
)}

                {/* Skills */}

        <div className="bg-[#111827] rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Verified Skills
          </h2>

          {profile.skills && profile.skills.length > 0 ? (

            <div className="flex flex-wrap gap-4">

              {profile.skills.map((skill, index) => (

                <div
                  key={index}
                  className="bg-cyan-600 px-5 py-3 rounded-xl font-medium"
                >
                  {skill.skill}
                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-400">
              No verified skills available.
            </p>

          )}

        </div>

        {/* Test Results */}

        <div className="bg-[#111827] rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Skill Test Results
          </h2>

          {profile.tests && profile.tests.length > 0 ? (

            <div className="space-y-4">

              {profile.tests.map((test, index) => (

                <div
                  key={index}
                  className="flex flex-col md:flex-row md:justify-between md:items-center bg-black/20 rounded-xl p-5 gap-4"
                >

                  <div className="flex items-center gap-3">

                    <Brain className="text-cyan-400" />

                    <div>

                      <p className="font-semibold">
                        {test.skill}
                      </p>

                      <p className="text-sm text-gray-400">
                        Skill Assessment
                      </p>

                    </div>

                  </div>

                  <div className="text-center">

                    <p className="text-gray-400 text-sm">
                      Score
                    </p>

                    <p className="text-2xl font-bold text-cyan-400">
                      {test.score}%
                    </p>

                  </div>

                  <div className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg">

                    <Award size={18} />

                    <span>{test.badge}</span>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-400">
              No test results available.
            </p>

          )}

        </div>

      </div>

    </DashboardLayout>

  );
}