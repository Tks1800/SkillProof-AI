from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Resume
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


@router.get("/stats")
def dashboard_stats(
    current_user=Depends(verify_token),
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.user_email == current_user.email
    ).order_by(
        Resume.id.desc()
    ).first()

    if not resume:
        return {
            "trust_score": 0,
            "skills": [],
            "verified_skills": 0
        }

    skills = []

    if resume.extracted_skills:
        skills = [
            s.strip()
            for s in resume.extracted_skills.split(",")
            if s.strip()
        ]

    trust_score = 20 + (len(skills) * 5)

    if trust_score > 70:
        trust_score = 70

    return {
        "trust_score": trust_score,
        "skills": skills,
        "verified_skills": len(skills)
    }