import { useState } from "react";

function Dashboard() {
  const [profile, setProfile] = useState(null);

  const loadProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:8000/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setProfile(data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Dashboard</h2>

      <button onClick={loadProfile}>
        Load Profile
      </button>

      {profile && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Message:</strong> {profile.message}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;