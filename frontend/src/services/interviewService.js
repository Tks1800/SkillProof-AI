import api from "./api";

const InterviewService = {
  sendInterview: async (data) => {
    const response = await api.post("/interviews/send", data);
    return response.data;
  },

  getCandidateInterviews: async (candidateId) => {
    const response = await api.get(
      `/interviews/candidate/${candidateId}`
    );
    return response.data;
  },

  getRecruiterInterviews: async (recruiterId) => {
    const response = await api.get(
      `/interviews/recruiter/${recruiterId}`
    );
    return response.data;
  },

  acceptInterview: async (interviewId) => {
    const response = await api.put(
      `/interviews/${interviewId}/accept`
    );
    return response.data;
  },

  rejectInterview: async (interviewId) => {
    const response = await api.put(
      `/interviews/${interviewId}/reject`
    );
    return response.data;
  },
};

export default InterviewService;