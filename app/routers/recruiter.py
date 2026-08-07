from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models_new import User, Job, CandidateSkill
from app.routers.auth import verify_token
from app.schemas import JobCreate
from app.models_new import (
    User,
    Job,
    CandidateSkill,
    Application,
)

router = APIRouter(
    tags=["Recruiter"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create-job")
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(verify_token)
):

    new_job = Job(
        title=job.title,
        company_name=job.company_name,
        location=job.location,
        salary=job.salary,
        experience=job.experience,
        job_type=job.job_type,
        description=job.description,
        required_skills=job.required_skills,
        recruiter_email=current_user.email
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return {
        "message": "Job Created Successfully",
        "job_id": new_job.id
    }


@router.get("/recruiter/jobs")
def get_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(verify_token)
):

    jobs = db.query(Job).filter(
        Job.recruiter_email == current_user.email
    ).all()

    return jobs


@router.get("/matched-candidates/{job_id}")
def matched_candidates(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(verify_token)
):

    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if not job:
        return {
            "message": "Job not found"
        }

    required_skills = [
        skill.strip().lower()
        for skill in job.required_skills.split(",")
    ]

    candidate_skills = db.query(CandidateSkill).all()

    matched = []

    for candidate in candidate_skills:

        if (
            candidate.skill.lower() in required_skills
            and str(candidate.verified).lower() == "true"
        ):

            matched.append({
                "email": candidate.email,
                "skill": candidate.skill,
                "verified": candidate.verified
            })

    return matched

@router.get("/applications")
def get_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(verify_token)
):

    applications = db.query(Application).filter(
        Application.recruiter_email == current_user.email
    ).all()

    result = []

    for app in applications:

        job = db.query(Job).filter(
            Job.id == app.job_id
        ).first()

        result.append({
            "application_id": app.id,
            "candidate_email": app.candidate_email,
            "job_title": job.title if job else "Unknown",
            "status": app.status
        })

    return result

@router.put("/application/{application_id}/accept")
def accept_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(verify_token)
):

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:
        return {
            "message": "Application not found"
        }

    application.status = "Accepted"

    db.commit()

    return {
        "message": "Candidate Accepted"
    }

@router.put("/application/{application_id}/reject")
def reject_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(verify_token)
):

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:
        return {
            "message": "Application not found"
        }

    application.status = "Rejected"

    db.commit()

    return {
        "message": "Candidate Rejected"
    }