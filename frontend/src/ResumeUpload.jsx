import { useState } from "react";

function ResumeUpload({ setSelectedSkill }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [skills, setSkills] = useState([]);
  const [recommendedTests, setRecommendedTests] = useState([]);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "https://skillproof-ai-production.up.railway.app/upload-resume",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setMessage(data.message);

    const skillResponse = await fetch(
      "https://skillproof-ai-production.up.railway.app/extract-skills",
      {
        method: "POST",
      }
    );

    const skillData = await skillResponse.json();

    if (skillData.skills) {
      setSkills(skillData.skills);

      const availableTests = [
        "Python",
        "SQL",
        "FastAPI",
      ];

      const matchedTests =
        skillData.skills.filter((skill) =>
          availableTests.includes(skill)
        );

      setRecommendedTests(matchedTests);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Resume Upload</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadResume}>
        Upload Resume
      </button>

      {message && (
        <p style={{ marginTop: "20px" }}>
          {message}
        </p>
      )}

      {skills.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Detected Skills</h3>

          <ul>
            {skills.map((skill, index) => (
              <li key={index}>
                ✅ {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendedTests.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Recommended Tests</h3>

          <ul>
            {recommendedTests.map((test, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    alert(`Selected: ${test}`);
                    console.log(
                      "SETTING SKILL:",
                      test
                    );
                    setSelectedSkill(test);
                  }}
                  style={{
                    padding: "8px 12px",
                    margin: "5px",
                    cursor: "pointer",
                  }}
                >
                  📝 Take {test} Test
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;