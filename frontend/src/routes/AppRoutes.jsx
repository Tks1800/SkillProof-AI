import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

import CandidateDashboard from "../pages/CandidateDashboard";
import RecruiterDashboard from "../pages/RecruiterDashboard";

import ResumeUpload from "../pages/ResumeUpload";
import Profile from "../pages/Profile";
import CreateJob from "../pages/CreateJob";

import ProtectedRoute from "./ProtectedRoute";
import RecruiterJobs from "../pages/RecruiterJobs";
import NotFound from "../pages/NotFound";
import CandidateJobs from "../pages/CandidateJobs";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Candidate */}

      <Route
        path="/candidate-dashboard"
        element={
          <ProtectedRoute>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-upload"
        element={
          <ProtectedRoute>
            <ResumeUpload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Recruiter */}

      <Route
        path="/recruiter-dashboard"
        element={
          <ProtectedRoute>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

     

      <Route
        path="/create-job"
        element={
            <ProtectedRoute>
            <CreateJob />
            </ProtectedRoute>
        }
      />


      <Route
        path="/recruiter/jobs"
        element={
            <ProtectedRoute>
            <RecruiterJobs />
            </ProtectedRoute>
        }
      />
    
      <Route
        path="/candidate/jobs"
        element={
            <ProtectedRoute>
            <CandidateJobs />
            </ProtectedRoute>
       }
     />

      {/* 404 */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}