import { useState } from "react";

function RecruiterDashboard() {
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");

  const createJob = async () => {
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

    alert(data.message || "Job Created");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🏢 Recruiter Dashboard</h2>

      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Required Skills (Python, SQL, FastAPI)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        rows="4"
        cols="40"
      />

      <br />
      <br />

      <button onClick={createJob}>
        Create Job
      </button>
    </div>
  );
}

export default RecruiterDashboard;