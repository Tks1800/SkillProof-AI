from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models_new import Job
from app.database import SessionLocal
from app.models_new import User, CandidateSkill, TestResult
from app.routers.auth import verify_token
from app.schemas import TestSubmission
from app.models_new import Application
from app.schemas import ApplyJob
from app.models_new import (
    User,
    CandidateSkill,
    TestResult,
    Job,
    Application,
)

router = APIRouter(
    tags=["Candidate"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


TEST_QUESTIONS = {
    "Python": [
        {
            "question": "Which keyword is used to define a function in Python?",
            "options": [
                "func",
                "define",
                "def",
                "function"
            ],
            "answer": "def"
        },
        {
            "question": "Which data type is mutable?",
            "options": [
                "tuple",
                "list",
                "string",
                "int"
            ],
            "answer": "list"
        }
    ],

    "SQL": [
        {
            "question": "Which SQL command retrieves data?",
            "options": [
                "INSERT",
                "UPDATE",
                "SELECT",
                "DELETE"
            ],
            "answer": "SELECT"
        }
    ],

    "FastAPI": [
        {
            "question": "Which decorator creates GET endpoints?",
            "options": [
                "@app.post",
                "@app.get",
                "@app.put",
                "@app.delete"
            ],
            "answer": "@app.get"
        }
    ]
}


@router.get("/test/{skill}")
def get_test(skill: str):

    skill = skill.capitalize()

    if skill not in TEST_QUESTIONS:
        return {
            "message": "No test available for this skill"
        }

    questions = []

    for q in TEST_QUESTIONS[skill]:
        questions.append({
            "question": q["question"],
            "options": q["options"]
        })

    return {
        "skill": skill,
        "questions": questions
    }


@router.post("/submit-test")
def submit_test(
    test: TestSubmission,
    db: Session = Depends(get_db),
    current_user: User = Depends(verify_token)
):

    skill = test.skill.capitalize()

    if skill not in TEST_QUESTIONS:
        return {
            "message": "No test found for this skill"
        }

    questions = TEST_QUESTIONS[skill]

    score = 0

    for i in range(len(questions)):
        if i < len(test.answers):
            if test.answers[i] == questions[i]["answer"]:
                score += 1

    total = len(questions)

    percentage = (score / total) * 100

    passed = percentage >= 70

    existing_skill = db.query(CandidateSkill).filter(
        CandidateSkill.candidate_email == current_user.email,
        CandidateSkill.skill_name == skill
    ).first()

    if existing_skill:

        existing_skill.verified = passed

    else:

        candidate_skill = CandidateSkill(
            candidate_email=current_user.email,
            skill_name=skill,
            verified=passed
        )

        db.add(candidate_skill)

    test_result = TestResult(
        candidate_email=current_user.email,
        skill_name=skill,
        score=percentage,
        passed=passed
    )

    db.add(test_result)

    db.commit()

    return {
        "skill": skill,
        "score": score,
        "total_questions": total,
        "percentage": percentage,
        "passed": passed,
        "message": "Test Submitted Successfully"
    }

@router.post("/apply-job")
def apply_job(
    data: ApplyJob,
    db: Session = Depends(get_db),
    current_user: User = Depends(verify_token)
):

    job = db.query(Job).filter(Job.id == data.job_id).first()

    if not job:
        return {"message": "Job not found"}

    application = Application(
        job_id=job.id,
        candidate_email=current_user.email,
        recruiter_email=job.recruiter_email,
    )

    db.add(application)
    db.commit()

    return {
        "message": "Application Submitted Successfully"
    }

@router.get("/available-jobs")
def available_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(verify_token)
):
    jobs = db.query(Job).all()
    return jobs