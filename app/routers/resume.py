import os

from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Resume
from app.routers.auth import verify_token
from app.ai.parser import extract_resume

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    text, skills = extract_resume(file_path)

    resume = Resume(
        user_email=current_user.email,
        file_name=file.filename,
        extracted_text=text,
        extracted_skills=", ".join(skills)
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume Uploaded",
        "file": file.filename
    }

@router.get("/my-resume")
def get_resume(
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
            "message": "No resume uploaded"
        }

    return {
        "file_name": resume.file_name,
        "skills": resume.extracted_skills,
        "text": resume.extracted_text
    }