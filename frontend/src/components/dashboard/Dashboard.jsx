import { useEffect, useState } from "react";
import API from "../../services/api";

import DashboardHeader from "./DashboardHeader";
import StatsCard from "./StatsCard";
import ResumeCard from "./ResumeCard";
import ActivityCard from "./ActivityCard";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-[#070B1A] p-10">

      <DashboardHeader user={user} />

      <div className="grid md:grid-cols-3 gap-6">

        <StatsCard
        title="Trust Score"
        value={stats ? stats.trust_score : "--"}
        />

        <StatsCard
        title="Verified Skills"
        value={stats ? stats.verified_skills : 0}
        />

        <StatsCard
        title="Resume"
        value="Uploaded"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <ResumeCard />

        <ActivityCard />

      </div>

    </div>
  );
}