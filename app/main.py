from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models_new import (
    User,
    Resume,
    Job,
    Company,
    CandidateProfile,
    CandidateSkill,
    Skill,
    Question,
    TestResult,
    InterviewInvitation,
    Application,
)

from app.routers import (
    auth,
    candidate,
    recruiter,
    resume,
    interview,
    dashboard,
    jobs,
    application,
    candidate_profile,
    ai_match,
    skill_test,
    verified_skills,
    recruiter_dashboard,
)

from app.routers.notifications import router as notifications_router

from dotenv import load_dotenv
from pathlib import Path
import os

# ==========================================================
# Load Environment Variables
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_FILE = BASE_DIR / ".env"

print("Loading:", ENV_FILE)

load_dotenv(dotenv_path=ENV_FILE)

print("=" * 50)
print("EMAIL:", os.getenv("EMAIL_ADDRESS"))
print("PASSWORD LOADED:", bool(os.getenv("EMAIL_PASSWORD")))
print("=" * 50)

# ==========================================================
# Database
# ==========================================================

Base.metadata.create_all(bind=engine)

# ==========================================================
# FastAPI
# ==========================================================

app = FastAPI(debug=True)

# ==========================================================
# CORS
# ==========================================================

origins = [
    # Production
    "https://vaivoai.com",
    "https://www.vaivoai.com",

    # Vercel Preview
    "https://skill-proof-ai-ffy2.vercel.app",

    # Local Development
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "http://localhost:5176",
    "http://127.0.0.1:5176",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================================
# Routers
# ==========================================================

app.include_router(auth.router)
app.include_router(candidate.router)
app.include_router(recruiter.router)
app.include_router(resume.router)
app.include_router(interview.router)
app.include_router(dashboard.router)
app.include_router(jobs.router)
app.include_router(application.router)
app.include_router(candidate_profile.router)
app.include_router(ai_match.router)
app.include_router(skill_test.router)
app.include_router(verified_skills.router)
app.include_router(recruiter_dashboard.router)
app.include_router(notifications_router)

# ==========================================================
# Root
# ==========================================================

@app.get("/")
def home():
    return {
        "message": "SkillProof AI Running"
    }