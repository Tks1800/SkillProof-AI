from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models_new import VerifiedSkill
from app.routers.auth import verify_token

router = APIRouter(
    prefix="/verified-skills",
    tags=["Verified Skills"],
)


# =====================================================
# Database Dependency
# =====================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =====================================================
# Get My Verified Skills
# =====================================================

@router.get("/me")
def my_verified_skills(
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):
    print("\n========== VERIFIED SKILLS ==========")
    print("Logged in email:", current_user.email)

    skills = (
        db.query(VerifiedSkill)
        .filter(
            VerifiedSkill.candidate_email == current_user.email
        )
        .all()
    )

    print("Skills found:", len(skills))

    for skill in skills:
        print(
            f"Email: {skill.candidate_email} | "
            f"Skill: {skill.skill} | "
            f"Score: {skill.score} | "
            f"Badge: {skill.badge}"
        )

    print("=====================================\n")

    return skills