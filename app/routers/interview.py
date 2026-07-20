from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import InterviewInvitation
from app.schemas import InterviewCreate

router = APIRouter(
    tags=["Interview"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/invite-interview")
def invite_interview(
    interview: InterviewCreate,
    db: Session = Depends(get_db)
):
    new_invitation = InterviewInvitation(
        recruiter_email=interview.recruiter_email,
        candidate_email=interview.candidate_email,
        job_title=interview.job_title,
        status="Pending"
    )

    db.add(new_invitation)
    db.commit()

    return {
        "message": "Interview Invitation Sent Successfully"
    }



@router.get("/candidate-interviews/{email}")
def candidate_interviews(
    email: str,
    db: Session = Depends(get_db)
):
    interviews = db.query(
        InterviewInvitation
    ).filter(
        InterviewInvitation.candidate_email == email
    ).all()

    return [
        {
            "id": interview.id,
            "recruiter_email": interview.recruiter_email,
            "job_title": interview.job_title,
            "status": interview.status
        }
        for interview in interviews
    ]


@router.post("/accept-interview/{interview_id}")
def accept_interview(
    interview_id: int,
    db: Session = Depends(get_db)
):
    interview = db.query(
        InterviewInvitation
    ).filter(
        InterviewInvitation.id == interview_id
    ).first()

    if not interview:
        return {
            "message": "Interview not found"
        }

    interview.status = "Accepted"

    db.commit()

    return {
        "message": "Interview Accepted"
    }



@router.post("/reject-interview/{interview_id}")
def reject_interview(
    interview_id: int,
    db: Session = Depends(get_db)
):
    interview = db.query(
        InterviewInvitation
    ).filter(
        InterviewInvitation.id == interview_id
    ).first()

    if not interview:
        return {
            "message": "Interview not found"
        }

    interview.status = "Rejected"

    db.commit()

    return {
        "message": "Interview Rejected"
    }