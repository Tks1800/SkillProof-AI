from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models_new import Job, Resume
from app.services.ai_match_service import calculate_match

router = APIRouter(
    prefix="/ai-match",
    tags=["AI Match"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/{job_id}/{candidate_email}")
def ai_match(
    job_id: int,
    candidate_email: str,
    db: Session = Depends(get_db)
):

    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    resume = (
        db.query(Resume)
        .filter(Resume.user_email == candidate_email)
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    result = calculate_match(
        job.required_skills,
        resume.extracted_skills
    )

    return {
        "job_title": job.title,
        "candidate": candidate_email,
        **result
    }