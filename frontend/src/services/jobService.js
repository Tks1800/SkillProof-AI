const API = "http://127.0.0.1:8000";

export async function createJob(jobData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/create-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });

  return await response.json();
}