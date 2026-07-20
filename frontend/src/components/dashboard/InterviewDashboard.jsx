import { useEffect, useState } from "react";

function InterviewDashboard() {
  const [interviews, setInterviews] = useState([]);

  const email = localStorage.getItem("email");

  const loadInterviews = async () => {
    try {
      const response = await fetch(
        `https://skillproof-ai-production.up.railway.app/candidate-interviews/${email}`
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setInterviews(data);
      } else {
        setInterviews([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (email) {
      loadInterviews();
    }
  }, []);

  const acceptInterview = async (id) => {
    const response = await fetch(
      `https://skillproof-ai-production.up.railway.app/accept-interview/${id}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    alert(data.message);

    loadInterviews();
  };

  const rejectInterview = async (id) => {
    const response = await fetch(
      `https://skillproof-ai-production.up.railway.app/reject-interview/${id}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    alert(data.message);

    loadInterviews();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>📨 Interview Invitations</h2>

      {interviews.length === 0 ? (
        <p>No interview invitations.</p>
      ) : (
        interviews.map((interview) => (
          <div
            key={interview.id}
            style={{
              border: "2px solid #4CAF50",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <p>
              <b>Job:</b> {interview.job_title}
            </p>

            <p>
              <b>Recruiter:</b> {interview.recruiter_email}
            </p>

            <p>
              <b>Status:</b> {interview.status}
            </p>

            {interview.status === "Pending" && (
              <>
                <button
                  onClick={() =>
                    acceptInterview(interview.id)
                  }
                  style={{ marginRight: "10px" }}
                >
                  ✅ Accept
                </button>

                <button
                  onClick={() =>
                    rejectInterview(interview.id)
                  }
                >
                  ❌ Reject
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default InterviewDashboard;