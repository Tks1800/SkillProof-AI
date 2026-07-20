import { useState, useEffect } from "react";

function RecruiterDashboard() {
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  // ---------------- LOAD JOBS ----------------
  const loadJobs = async () => {
    try {
      const response = await fetch(
        "https://skillproof-ai-production.up.railway.app/jobs"
      );

      const data = await response.json();

      console.log("Jobs:", data);

      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // ---------------- CREATE JOB ----------------
  const createJob = async () => {
    if (!jobTitle || !skills) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://skillproof-ai-production.up.railway.app/create-job",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: jobTitle,
            required_skills: skills,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      setJobTitle("");
      setSkills("");

      // wait for database commit
      setTimeout(async () => {
        await loadJobs();
      }, 1000);

    } catch (error) {
      console.log(error);
    }
  };

 
  const loadCandidates = async (jobId) => {
    try {
      const response = await fetch(
        `https://skillproof-ai-production.up.railway.app/matched-candidates/${jobId}`
      );

      const data = await response.json();

      console.log("Candidates:", data);

      if (Array.isArray(data)) {
        setCandidates(data);
      } else {
        setCandidates([]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const inviteCandidate = async (candidate) => {
    alert("Invite button clicked");
  try {
    const response = await fetch(
      "https://skillproof-ai-production.up.railway.app/invite-interview",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recruiter_email: "hr@skillproof.ai",
          candidate_email: candidate.email,
          job_title: "Python Backend Developer",
        }),
      }
    );

    const data = await response.json();

    alert(data.message);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={{ padding: "30px" }}>

      <h2>🏢 Recruiter Dashboard</h2>

      <h3>Create Job</h3>

      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        style={{
          width: "300px",
          padding: "10px"
        }}
      />

      <br />
      <br />

      <textarea
        rows="4"
        cols="40"
        placeholder="Required Skills (Python, SQL, FastAPI)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createJob}>
        Create Job
      </button>

      <hr />

      <h3>Posted Jobs</h3>

      <button
        onClick={loadJobs}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        🔄 Refresh Jobs
      </button>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h4>{job.title}</h4>

            <p>
              <b>Required Skills:</b> {job.required_skills}
            </p>

            <button
              onClick={() => loadCandidates(job.id)}
            >
              View Matched Candidates
            </button>
          </div>
        ))
      )}

      <hr />

      <h3>🎯 Matched Candidates</h3>

      {candidates.length === 0 ? (
        <p>No candidates loaded.</p>
      ) : (
        candidates.map((candidate, index) => (
          <div
            key={index}
            style={{
              border: "2px solid green",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <p>
              <b>Email:</b> {candidate.email}
            </p>

            <p>
              <b>Verified Skill:</b> {candidate.skill}
            </p>

            <p>
              <b>Badge:</b> {candidate.badge}
            </p>

            <p>
              <b>Match Score:</b> {candidate.match_score}
            </p>

   <button
  onClick={() => {
    alert("BUTTON CLICKED");
    inviteCandidate(candidate);
  }}
>
  🚀 TEST BUTTON
</button>
          </div>
        ))
      )}

    </div>
  );
}

export default RecruiterDashboard;