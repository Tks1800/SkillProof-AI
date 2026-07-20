import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function ResumeUpload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  async function uploadResume() {
    if (!file) {
      alert("Please select a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      await API.post("/resume/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const resumeData = await API.get("/resume/my-resume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResume(resumeData.data);

      alert("Resume Uploaded Successfully!");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/candidate-dashboard");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Upload Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070B1A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "550px",
          background: "#151927",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 0 30px rgba(0,194,255,0.15)",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          📄 Upload Resume
        </h1>

        <p
          style={{
            color: "#94A3B8",
            marginBottom: "30px",
          }}
        >
          Upload your latest resume in PDF format.
        </p>

        <div
          style={{
            border: "2px dashed #00C2FF",
            borderRadius: "15px",
            padding: "35px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
          />

          <p
            style={{
              color: "#CBD5E1",
              marginTop: "15px",
            }}
          >
            Drag & Drop or Choose a PDF Resume
          </p>
        </div>

        {file && (
          <div
            style={{
              background: "#1E293B",
              color: "white",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <strong>Selected File</strong>

            <p>{file.name}</p>

            <p
              style={{
                color: "#94A3B8",
              }}
            >
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <button
          disabled={loading}
          onClick={uploadResume}
          style={{
            width: "100%",
            padding: "15px",
            background: loading ? "#64748B" : "#00C2FF",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Uploading Resume..." : "Upload Resume"}
        </button>

        {resume && (
          <div
            style={{
              marginTop: "30px",
              background: "#0F172A",
              padding: "20px",
              borderRadius: "15px",
              color: "white",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              ✅ Resume Uploaded
            </h2>

            <p>
              <strong>File Name:</strong>
            </p>

            <p
              style={{
                color: "#38BDF8",
              }}
            >
              {resume.file_name}
            </p>

            <br />

            <p>
              <strong>Extracted Skills:</strong>
            </p>

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {resume.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  style={{
                    background: "#1E40AF",
                    padding: "8px 14px",
                    borderRadius: "20px",
                    fontSize: "14px",
                  }}
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}