from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models_new import (
    Application,
    Job,
    Resume,
    VerifiedSkill,
)
from app.routers.auth import verify_token
from app.services.ai_match_service import calculate_match
from app.services.notification_service import NotificationService

router = APIRouter(
    prefix="/applications",
    tags=["Applications"],
)


# ==========================================================
# Database
# ==========================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==========================================================
# APPLY FOR JOB
# ==========================================================

@router.post("/apply/{job_id}")
def apply_job(
    job_id: int,
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):

    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found."
        )

    existing_application = (
        db.query(Application)
        .filter(
            Application.job_id == job_id,
            Application.candidate_email == current_user.email,
        )
        .first()
    )

    if existing_application:
        raise HTTPException(
            status_code=400,
            detail="Already applied."
        )

    resume = (
        db.query(Resume)
        .filter(
            Resume.user_email == current_user.email
        )
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=400,
            detail="Please upload your resume first."
        )

    result = calculate_match(
        job.required_skills,
        resume.extracted_skills,
    )

    application = Application(
        job_id=job.id,
        candidate_email=current_user.email,
        recruiter_email=job.recruiter_email,
        resume_id=resume.id,
        status="Applied",
        match_score=result["score"],
        recommendation=result["recommendation"],
        matched_skills=", ".join(result["matched_skills"]),
        missing_skills=", ".join(result["missing_skills"]),
    )

    db.add(application)

    if job.applications_count is None:
        job.applications_count = 0

    job.applications_count += 1

    db.commit()
    db.refresh(application)

    NotificationService.create(
        db=db,
        user_email=job.recruiter_email,
        title="New Job Application",
        message=f"{current_user.email} applied for '{job.title}'.",
        notification_type="application",
    )

    return {
        "message": "Application submitted successfully.",
        "application_id": application.id,
        "status": application.status,
        "match_score": result["score"],
        "recommendation": result["recommendation"],
        "matched_skills": result["matched_skills"],
        "missing_skills": result["missing_skills"],
    }


# ==========================================================
# RECRUITER APPLICATIONS
# ==========================================================

@router.get("/recruiter")
def recruiter_applications(
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):

    applications = (
        db.query(Application)
        .filter(
            Application.recruiter_email == current_user.email
        )
        .order_by(
            Application.match_score.desc(),
            Application.created_at.desc(),
        )
        .all()
    )

    result = []

    for application in applications:

        resume = (
            db.query(Resume)
            .filter(
                Resume.id == application.resume_id
            )
            .first()
        )

        verified = (
            db.query(VerifiedSkill)
            .filter(
                VerifiedSkill.candidate_email ==
                application.candidate_email
            )
            .all()
        )

        result.append({

            "id": application.id,

            "recruiter_email": application.recruiter_email,

            "candidate_email": application.candidate_email,

            "job_id": application.job_id,

            "resume_id": application.resume_id,

            "status": application.status,

            "match_score": application.match_score,

            "recommendation": application.recommendation,

            "matched_skills": (
                application.matched_skills.split(", ")
                if application.matched_skills
                else []
            ),

            "missing_skills": (
                application.missing_skills.split(", ")
                if application.missing_skills
                else []
            ),

            "resume": (
                resume.file_name
                if resume
                else None
            ),

            "verified_skills": [
                {
                    "skill": skill.skill,
                    "score": skill.score,
                    "badge": skill.badge,
                }
                for skill in verified
            ]

        })

    return result


# ==========================================================
# ACCEPT APPLICATION
# ==========================================================

@router.put("/{application_id}/accept")
def accept_candidate(
    application_id: int,
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):

    application = (
        db.query(Application)
        .filter(
            Application.id == application_id,
            Application.recruiter_email == current_user.email,
        )
        .first()
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found."
        )

    application.status = "Accepted"

    db.commit()

    NotificationService.create(
        db=db,
        user_email=application.candidate_email,
        title="Application Accepted",
        message="Congratulations! Your application has been accepted.",
        notification_type="success",
    )

    return {
        "message": "Candidate accepted successfully."
    }


# ==========================================================
# REJECT APPLICATION
# ==========================================================

@router.put("/{application_id}/reject")
def reject_candidate(
    application_id: int,
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):

    application = (
        db.query(Application)
        .filter(
            Application.id == application_id,
            Application.recruiter_email == current_user.email,
        )
        .first()
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found."
        )

    application.status = "Rejected"

    db.commit()

    NotificationService.create(
        db=db,
        user_email=application.candidate_email,
        title="Application Rejected",
        message="Unfortunately your application was not selected.",
        notification_type="danger",
    )

    return {
        "message": "Candidate rejected successfully."
    }