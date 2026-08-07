from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models_new.job import Job
from app.models_new.resume import Resume
from app.models_new.user import User
from app.routers.auth import verify_token
from app.services.candidate_profile_service import CandidateProfileService
from app.schemas.candidate_profile import CandidateProfileUpdate
from app.services.ai_resume_service import generate_resume_analysis

router = APIRouter(
    prefix="/candidate-profile",
    tags=["Candidate Profile"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/me")
def get_my_profile(
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db),
):
    profile = CandidateProfileService.get_profile(
        db,
        current_user.email,
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found",
        )

    return profile


@router.put("/me")
def update_my_profile(
    data: CandidateProfileUpdate,
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db),
):
    CandidateProfileService.update_profile(
        db,
        current_user.email,
        data,
    )

    return {
        "message": "Profile Updated Successfully"
    }


@router.get("/{email}")
def get_candidate_profile(
    email: str,
    db: Session = Depends(get_db),
):
    profile = CandidateProfileService.get_profile(
        db,
        email,
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    return profile

@router.get("/{email}/analysis")
def get_candidate_analysis(
    email: str,
    jobId: int,
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):

    # -------------------------
    # Find Resume
    # -------------------------

    resume = (
        db.query(Resume)
        .filter(Resume.user_email == email)
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    # -------------------------
    # Find Job
    # -------------------------

    job = (
        db.query(Job)
        .filter(Job.id == jobId)
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found."
        )

    return generate_resume_analysis(
        job.required_skills,
        resume.extracted_skills,
    )