import { useState, useEffect } from "react";

function RecruiterDashboard() {
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const loadJobs = async () => {
    try {
      const response = await fetch(
        "https://skillproof-ai-production.up.railway.app/jobs"
      );

      const data = await response.json();

      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const createJob = async () => {
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

      loadJobs();
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

      setCandidates(data);
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
        onChange={(e) =>
          setJobTitle(e.target.value)
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Required Skills (Python, SQL, FastAPI)"
        value={skills}
        onChange={(e) =>
          setSkills(e.target.value)
        }
        rows="4"
        cols="40"
      />

      <br />
      <br />

      <button onClick={createJob}>
        Create Job
      </button>

      <hr />

      <h3>Posted Jobs</h3>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <h4>{job.title}</h4>

            <p>
              <b>Required Skills:</b>{" "}
              {job.required_skills}
            </p>

            <button
              onClick={() =>
                loadCandidates(job.id)
              }
            >
              View Matches
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
              border: "1px solid green",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <b>Email:</b>{" "}
              {candidate.email}
            </p>

            <p>
              <b>Verified Skill:</b>{" "}
              {candidate.skill}
            </p>

            <p>
              <b>Badge:</b>{" "}
              {candidate.badge}
            </p>

            <p>
              <b>Match Score:</b>{" "}
              {candidate.match_score}
            </p>

            <button>
              Invite To Interview
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default RecruiterDashboard;