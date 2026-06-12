import { useState } from "react";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const loadDashboard = async () => {
    const response = await fetch("https://skillproof-ai-production.up.railway.app/profile");

    const data = await response.json();

    setDashboard(data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Dashboard</h2>

      <button onClick={loadDashboard}>
        Load Dashboard
      </button>

      {dashboard && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Name:</strong> {dashboard.full_name}
          </p>

          <p>
            <strong>Email:</strong> {dashboard.email}
          </p>

          <h3>Verified Skills</h3>

          {dashboard.verified_skills.map((skill, index) => (
            <div key={index}>
              ✔ {skill.skill} – {skill.score}%
            </div>
          ))}

          <h3 style={{ marginTop: "20px" }}>
            Badges Earned
          </h3>

          {dashboard.badges.map((badge, index) => (
            <div key={index}>
              🏅 {badge.badge_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;