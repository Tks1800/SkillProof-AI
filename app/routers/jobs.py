from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models_new import Job
from app.schemas import JobCreate

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db)
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
        recruiter_email="demo@vaivoai.com"   # Temporary, we'll replace with JWT later
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return {
        "message": "Job created successfully",
        "job": new_job
    }


@router.get("/")
def get_jobs(
    db: Session = Depends(get_db)
):
    jobs = db.query(Job).order_by(Job.created_at.desc()).all()

    return jobs


@router.get("/{job_id}")
def get_job(
    job_id: int,
    db: Session = Depends(get_db)
):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return job


@router.put("/{job_id}")
def update_job(
    job_id: int,
    updated_job: JobCreate,
    db: Session = Depends(get_db)
):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    job.title = updated_job.title
    job.company_name = updated_job.company_name
    job.location = updated_job.location
    job.salary = updated_job.salary
    job.experience = updated_job.experience
    job.job_type = updated_job.job_type
    job.description = updated_job.description
    job.required_skills = updated_job.required_skills

    db.commit()
    db.refresh(job)

    return {
        "message": "Job updated successfully",
        "job": job
    }


@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db)
):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    db.delete(job)
    db.commit()

    return {
        "message": "Job deleted successfully"
    }