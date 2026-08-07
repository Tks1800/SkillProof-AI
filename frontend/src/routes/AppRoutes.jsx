import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

import CandidateDashboard from "../pages/CandidateDashboard";
import CandidateJobs from "../pages/CandidateJobs";
import CandidateInterviews from "../pages/CandidateInterviews";
import CandidateSkillTest from "../pages/CandidateSkillTest";
import ResumeUpload from "../pages/ResumeUpload";
import Profile from "../pages/Profile";

import RecruiterDashboard from "../pages/RecruiterDashboard";
import RecruiterJobs from "../pages/RecruiterJobs";
import RecruiterApplications from "../pages/RecruiterApplications";
import RecruiterInterviews from "../pages/RecruiterInterviews";
import RecruiterAnalytics from "../pages/RecruiterAnalytics";

import CreateJob from "../pages/CreateJob";
import CandidateProfile from "../pages/CandidateProfile";

import ProtectedRoute from "./ProtectedRoute";

import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================================================= */}
      {/* PUBLIC ROUTES */}
      {/* ================================================= */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ================================================= */}
      {/* CANDIDATE */}
      {/* ================================================= */}

      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/jobs"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/interviews"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateInterviews />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/skill-test"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateSkillTest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/resume"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <ResumeUpload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/profile"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================================================= */}
      {/* RECRUITER */}
      {/* ================================================= */}

      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/jobs"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/create-job"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <CreateJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/applications"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterApplications />
          </ProtectedRoute>
        }
      />

      {/* ================= NEW ANALYTICS PAGE ================= */}

      <Route
        path="/recruiter/analytics"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterAnalytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/interviews"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterInterviews />
          </ProtectedRoute>
        }
      />

      {/* ================================================= */}
      {/* CANDIDATE PROFILE */}
      {/* ================================================= */}

      <Route
        path="/candidate-profile/:email"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <CandidateProfile />
          </ProtectedRoute>
        }
      />

      {/* ================================================= */}
      {/* LEGACY ROUTES */}
      {/* ================================================= */}

      <Route
        path="/candidate-dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-upload"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <ResumeUpload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter-dashboard"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-job"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <CreateJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter-applications"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterApplications />
          </ProtectedRoute>
        }
      />

      {/* ================================================= */}
      {/* 404 */}
      {/* ================================================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}