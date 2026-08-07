import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] =useState(false);

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    college: "",
    degree: "",
    graduation_year: "",
    linkedin: "",
    github: "",
    portfolio: "",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await API.get("/candidate-profile/me");

      setProfile({
        full_name: res.data.user.full_name || "",
        email: res.data.user.email || "",
        phone: res.data.profile.phone || "",
        location: res.data.profile.location || "",
        college: res.data.profile.college || "",
        degree: res.data.profile.degree || "",
        graduation_year: res.data.profile.graduation_year || "",
        linkedin: res.data.profile.linkedin || "",
        github: res.data.profile.github || "",
        portfolio: res.data.profile.portfolio || "",
        bio: res.data.profile.bio || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile(e) {
    e.preventDefault();

    try {
      setSaving(true);

      await API.put("/candidate-profile/me", profile);

      alert("Profile updated successfully.");
    } catch (err) {
      alert("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  }

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  if (loading)
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#070B1A] text-white p-10">

      <div className="max-w-4xl mx-auto bg-[#111827] rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <form
          onSubmit={saveProfile}
          className="grid grid-cols-2 gap-6"
        >

          <input
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 rounded bg-gray-800"
          />

          <input
            name="email"
            value={profile.email}
            disabled
            className="p-3 rounded bg-gray-700"
          />

          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-3 rounded bg-gray-800"
          />

          <input
            name="location"
            value={profile.location}
            onChange={handleChange}
            placeholder="Location"
            className="p-3 rounded bg-gray-800"
          />

          <input
            name="college"
            value={profile.college}
            onChange={handleChange}
            placeholder="College"
            className="p-3 rounded bg-gray-800"
          />

          <input
            name="degree"
            value={profile.degree}
            onChange={handleChange}
            placeholder="Degree"
            className="p-3 rounded bg-gray-800"
          />

          <input
            name="graduation_year"
            value={profile.graduation_year}
            onChange={handleChange}
            placeholder="Graduation Year"
            className="p-3 rounded bg-gray-800"
          />

          <input
            name="linkedin"
            value={profile.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn"
            className="p-3 rounded bg-gray-800"
          />

          <input
            name="github"
            value={profile.github}
            onChange={handleChange}
            placeholder="GitHub"
            className="p-3 rounded bg-gray-800"
          />

          <input
            name="portfolio"
            value={profile.portfolio}
            onChange={handleChange}
            placeholder="Portfolio"
            className="p-3 rounded bg-gray-800"
          />

          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Bio"
            rows="5"
            className="col-span-2 p-3 rounded bg-gray-800"
          />

          <button
            className="col-span-2 bg-blue-600 hover:bg-blue-700 rounded p-3 font-semibold"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

        </form>

      </div>

    </div>
  );
}