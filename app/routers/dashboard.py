from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models_new import (
    Resume,
    Job,
    Application,
    InterviewInvitation,
)

from app.routers.auth import verify_token

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ============================
# Candidate Dashboard
# ============================

@router.get("/stats")
def dashboard_stats(
    current_user=Depends(verify_token),
    db: Session = Depends(get_db)
):

    resume = (
        db.query(Resume)
        .filter(Resume.user_email == current_user.email)
        .order_by(Resume.id.desc())
        .first()
    )

    skills = []
    trust_score = 0

    if resume and resume.extracted_skills:
        skills = [
            skill.strip()
            for skill in resume.extracted_skills.split(",")
            if skill.strip()
        ]

        trust_score = min(20 + len(skills) * 5, 100)

    applications = (
        db.query(Application)
        .filter(Application.candidate_email == current_user.email)
        .count()
    )

    interviews = (
        db.query(InterviewInvitation)
        .filter(
            InterviewInvitation.candidate_email == current_user.email
        )
        .count()
    )

    profile_completion = 30

    if resume:
        profile_completion += 20

    if skills:
        profile_completion += 20

    if applications:
        profile_completion += 15

    if interviews:
        profile_completion += 15

    profile_completion = min(profile_completion, 100)

    recent_applications = (
        db.query(Application)
        .filter(Application.candidate_email == current_user.email)
        .order_by(Application.created_at.desc())
        .limit(5)
        .all()
    )

    upcoming_interviews = (
        db.query(InterviewInvitation)
        .filter(
            InterviewInvitation.candidate_email == current_user.email
        )
        .order_by(InterviewInvitation.scheduled_at.asc())
        .limit(5)
        .all()
    )

    return {
        "trust_score": trust_score,
        "verified_skills": len(skills),
        "skills": skills,
        "applications": applications,
        "interviews": interviews,
        "profile_completion": profile_completion,
        "recent_applications": recent_applications,
        "upcoming_interviews": upcoming_interviews,
    }


# ============================
# Recruiter Dashboard
# ============================

@router.get("/recruiter")
def recruiter_dashboard(
    current_user=Depends(verify_token),
    db: Session = Depends(get_db)
):

    jobs = db.query(Job).count()

    applications = db.query(Application).count()

    interviews = db.query(InterviewInvitation).count()

    hired = (
        db.query(Application)
        .filter(Application.status == "Accepted")
        .count()
    )

    recent_applications = (
        db.query(Application)
        .order_by(Application.created_at.desc())
        .limit(5)
        .all()
    )

    upcoming_interviews = (
        db.query(InterviewInvitation)
        .order_by(InterviewInvitation.scheduled_at.asc())
        .limit(5)
        .all()
    )

    return {
        "jobs": jobs,
        "applications": applications,
        "interviews": interviews,
        "hired": hired,
        "recent_applications": recent_applications,
        "upcoming_interviews": upcoming_interviews,
    }