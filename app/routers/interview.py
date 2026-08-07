from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.interview import InterviewCreate
from app.services.interview_service import InterviewService
from app.routers.auth import verify_token
from app.models_new.user import User

router = APIRouter(
    prefix="/interviews",
    tags=["Interview"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==========================
# Schedule Interview
# ==========================

@router.post("/send")
def send_interview(
    interview: InterviewCreate,
    db: Session = Depends(get_db)
):
    return InterviewService.create_interview(
        db,
        interview
    )


# ==========================
# Candidate Interviews
# ==========================

@router.get("/candidate")
def get_candidate_interviews(
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    return InterviewService.get_candidate_interviews(
        db,
        current_user.email
    )


# ==========================
# Recruiter Interviews
# ==========================

@router.get("/recruiter")
def get_recruiter_interviews(
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    return InterviewService.get_recruiter_interviews(
        db,
        current_user.email
    )


# ==========================
# Accept Interview
# ==========================

@router.put("/{interview_id}/accept")
def accept_interview(
    interview_id: int,
    db: Session = Depends(get_db)
):
    return InterviewService.accept_interview(
        db,
        interview_id
    )


# ==========================
# Reject Interview
# ==========================

@router.put("/{interview_id}/reject")
def reject_interview(
    interview_id: int,
    db: Session = Depends(get_db)
):
    return InterviewService.reject_interview(
        db,
        interview_id
    )