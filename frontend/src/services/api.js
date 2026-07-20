import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
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

/* ===========================
   Authentication
=========================== */

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const getProfile = () =>
  API.get("/auth/profile");

/* ===========================
   Recruiter
=========================== */

export const createJob = (data) =>
  API.post("/create-job", data);

export const getRecruiterJobs = () =>
  API.get("/jobs");

export const getApplications = () =>
  API.get("/applications");

export const getMatchedCandidates = (jobId) =>
  API.get(`/matched-candidates/${jobId}`);

export const acceptApplication = (id) =>
  API.put(`/application/${id}/accept`);

export const rejectApplication = (id) =>
  API.put(`/application/${id}/reject`);

/* ===========================
   Candidate
=========================== */

export const getAvailableJobs = () =>
  API.get("/jobs");

export const applyJob = (jobId) =>
  API.post("/apply-job", {
    job_id: jobId,
  });

export const uploadResume = (formData) =>
  API.post("/upload-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getSkillTest = (skill) =>
  API.get(`/test/${skill}`);

export const submitSkillTest = (data) =>
  API.post("/submit-test", data);

/* ===========================
   Interview
=========================== */

export const sendInterviewInvitation = (data) =>
  API.post("/invite-interview", data);