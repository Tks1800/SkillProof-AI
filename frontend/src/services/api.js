import axios from "axios";

// ======================================
// API Configuration
// ======================================

const API = axios.create({
  baseURL: "https://api.vaivoai.com",
});

// ======================================
// JWT Authentication
// ======================================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

// ======================================
// Authentication
// ======================================

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const getProfile = () =>
  API.get("/auth/profile");

// ======================================
// Recruiter Jobs
// ======================================

export const createJob = (data) =>
  API.post("/jobs/", data);

export const getRecruiterJobs = () =>
  API.get("/jobs");

export const getJob = (id) =>
  API.get(`/jobs/${id}`);

export const updateJob = (id, data) =>
  API.put(`/jobs/${id}`, data);

export const deleteJob = (id) =>
  API.delete(`/jobs/${id}`);

// ======================================
// Candidate Jobs
// ======================================

export const getAvailableJobs = () =>
  API.get("/jobs");

export const applyJob = (jobId) =>
  API.post(`/applications/apply/${jobId}`);

// ======================================
// Resume
// ======================================

export const uploadResume = (formData) =>
  API.post("/upload-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const viewResume = (resumeId) =>
  API.get(`/resume/view/${resumeId}`, {
    responseType: "blob",
  });

// ======================================
// Skill Test
// ======================================

export const getSkillTest = (skill) =>
  API.get(`/test/${skill}`);

export const getDetectedSkills = () =>
  API.get("/skill-test/skills");

export const getSkillQuestions = (skill) =>
  API.get(`/skill-test/${skill}`);

export const submitSkillTest = (data) =>
  API.post("/skill-test/submit", data);

// ======================================
// Recruiter Applications
// ======================================

export const getRecruiterApplications = () =>
  API.get("/applications/recruiter");

export const acceptApplication = (id) =>
  API.put(`/applications/${id}/accept`);

export const rejectApplication = (id) =>
  API.put(`/applications/${id}/reject`);

export const getJobApplicants = (jobId) =>
  API.get(`/recruiter-dashboard/applicants/${jobId}`);

// ======================================
// Interviews
// ======================================

export const sendInterview = (data) =>
  API.post("/interviews/send", data);

export const getCandidateInterviews = () =>
  API.get("/interviews/candidate");

export const getRecruiterInterviews = () =>
  API.get("/interviews/recruiter");

export const acceptInterview = (id) =>
  API.put(`/interviews/${id}/accept`);

export const rejectInterview = (id) =>
  API.put(`/interviews/${id}/reject`);

// ======================================
// Dashboard
// ======================================

export const getRecruiterDashboard = () =>
  API.get("/dashboard/recruiter");

export const getCandidateDashboard = () =>
  API.get("/dashboard/stats");

export const getRecruiterStats = () =>
  API.get("/recruiter-dashboard/stats");

// ======================================
// AI Matching
// ======================================

export const getMatchedCandidates = (jobId) =>
  API.get(`/matched-candidates/${jobId}`);

export const getAiMatch = (jobId, email) =>
  API.get(`/ai-match/${jobId}/${encodeURIComponent(email)}`);

export const getCandidateAnalysis = (email, jobId) =>
  API.get(
    `/candidate-profile/${email}/analysis?jobId=${jobId}`
  );

// ======================================
// Notifications
// ======================================

export const getNotifications = () =>
  API.get("/notifications");

export const markNotificationRead = (id) =>
  API.put(`/notifications/read/${id}`);

export const markAllNotificationsRead = () =>
  API.put("/notifications/read-all");