import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import SkillTest from "./SkillTest";
import ResumeUpload from "./ResumeUpload";

function App() {
  const token = localStorage.getItem("token");

  const [selectedSkill, setSelectedSkill] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2>🏆 SkillProof AI</h2>

        <div>
          <button style={{ marginRight: "10px" }}>
            Login
          </button>

          <button>
            Register
          </button>
        </div>
      </nav>

      <div
        style={{
          textAlign: "center",
          padding: "60px",
        }}
      >
        <h1>Verify Your Skills.</h1>

        <h1>Earn Trusted Badges.</h1>

        <p>
          SkillProof AI helps candidates prove their abilities
          through verification tests.
        </p>

        <button
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          Get Started
        </button>
      </div>

      <div style={{ padding: "40px" }}>
        <h2>Features</h2>

        <ul>
          <li>✅ User Registration</li>
          <li>✅ Login with JWT</li>
          <li>✅ Resume Upload</li>
          <li>✅ Skill Verification Tests</li>
          <li>✅ Verified Skill Badges</li>
          <li>✅ Dashboard</li>
        </ul>
      </div>

      <Register />

      <Login />

      {token ? (
        <>
          <button onClick={logout}>
            Logout
          </button>

          <Dashboard />

          <SkillTest selectedSkill={selectedSkill} />

          <ResumeUpload
            setSelectedSkill={setSelectedSkill}
          />
        </>
      ) : (
        <p>Please login to view dashboard.</p>
      )}
    </div>
  );
}

export default App;