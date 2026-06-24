import { useEffect, useState } from "react";

function Profile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://skillproof-ai-production.up.railway.app/dashboard"
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>{data.full_name}</h1>

      <p>{data.email}</p>

      <h2>🏆 Verified Skills</h2>

      <ul>
        {data.verified_skills?.map((skill, index) => (
          <li key={index}>
            {skill.skill} - {skill.score}%
          </li>
        ))}
      </ul>

      <h2>🏅 Badges</h2>

      <ul>
        {data.badges?.map((badge, index) => (
          <li key={index}>
            {badge.badge_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;