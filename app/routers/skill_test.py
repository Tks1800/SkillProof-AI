from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.routers.auth import verify_token
from app.models_new import Resume, VerifiedSkill

router = APIRouter(
    prefix="/skill-test",
    tags=["Skill Test"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =====================================================
# Sample Questions
# =====================================================

QUESTIONS = {

    "python": [

        {
            "id": 1,
            "question": "Python is a ______ ?",
            "options": [
                "Programming Language",
                "Database",
                "Operating System",
                "Browser"
            ],
            "answer": 0
        },

        {
            "id": 2,
            "question": "Which keyword defines a function?",
            "options": [
                "fun",
                "define",
                "def",
                "function"
            ],
            "answer": 2
        }

    ],

    "sql": [

        {
            "id": 1,
            "question": "Which command retrieves data?",
            "options": [
                "GET",
                "SELECT",
                "SHOW",
                "READ"
            ],
            "answer": 1
        }

    ],

    "git": [

        {
            "id": 1,
            "question": "Clone repository command?",
            "options": [
                "git copy",
                "git clone",
                "git download",
                "git fork"
            ],
            "answer": 1
        }

    ]

}


# =====================================================
# Get Skills From Resume
# =====================================================

@router.get("/skills")
def detected_skills(
    current_user=Depends(verify_token),
    db: Session = Depends(get_db)
):

    resume = (
        db.query(Resume)
        .filter(
            Resume.user_email == current_user.email
        )
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        return []

    if not resume.extracted_skills:
        return []

    return [
        s.strip().lower()
        for s in resume.extracted_skills.split(",")
    ]


# =====================================================
# Questions
# =====================================================

@router.get("/{skill}")
def get_questions(skill: str):

    skill = skill.lower()

    if skill not in QUESTIONS:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    questions = []

    for q in QUESTIONS[skill]:

        questions.append({
            "id": q["id"],
            "question": q["question"],
            "options": q["options"]
        })

    return questions


# =====================================================
# Submit Test
# =====================================================

@router.post("/submit")
def submit_test(
    data: dict,
    current_user=Depends(verify_token),
    db: Session = Depends(get_db)
):

    skill = data["skill"].lower()
    answers = data["answers"]

    if skill not in QUESTIONS:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    questions = QUESTIONS[skill]

    score = 0

    for i, q in enumerate(questions):
        if i < len(answers):
            if answers[i] == q["answer"]:
                score += 1

    percentage = int(score / len(questions) * 100)

    passed = percentage >= 70

    badge = f"{skill.title()} Verified" if passed else None

    # ============================================
    # Save Verified Skill
    # ============================================

    if passed:

        existing = (
            db.query(VerifiedSkill)
            .filter(
            VerifiedSkill.candidate_email == current_user.email,
            VerifiedSkill.skill == skill
        )
        .first()
    )

        if not existing:

            verified = VerifiedSkill(
                candidate_email=current_user.email,
                skill=skill,
                score=percentage,
                badge=badge
            )

            print("Saving verified skill...")

            db.add(verified)
            
            db.commit()

            print("Verified skill saved successfully!")

    return {
        "score": percentage,
        "passed": passed,
        "badge": badge
    }