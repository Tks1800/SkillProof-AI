from jose import jwt
from jose import JWTError
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta

SECRET_KEY = "skillproof_super_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()

import PyPDF2
from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session



from app.database import Base, engine, SessionLocal
from app.models import User, Verification, Badge
from app.schemas import UserCreate, UserLogin, TestSubmission
Base.metadata.create_all(bind=engine)

from fastapi.middleware.cors import CORSMiddleware

LAST_UPLOADED_FILE = None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://skill-proof-ai-ffy2.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEST_QUESTIONS = {
    "Python": [
        {
            "question": "Which keyword is used to define a function in Python?",
            "options": ["func", "define", "def", "function"],
            "answer": "def"
        },
        {
            "question": "Which data type is mutable?",
            "options": ["tuple", "list", "string", "int"],
            "answer": "list"
        }
    ],

    "SQL": [
        {
            "question": "Which SQL command retrieves data?",
            "options": ["INSERT", "UPDATE", "SELECT", "DELETE"],
            "answer": "SELECT"
        }
    ],

    "FastAPI": [
        {
            "question": "Which decorator creates GET endpoints?",
            "options": ["@app.post", "@app.get", "@app.put", "@app.delete"],
            "answer": "@app.get"
        }
    ]
}

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt
def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
          token,
          SECRET_KEY,
          algorithms=[ALGORITHM]
        )

        print("PAYLOAD:", payload)

        email = payload.get("sub")

        return email

    except Exception as e:
       print("JWT ERROR:", str(e))
       raise HTTPException(
        status_code=401,
        detail="Invalid token"
    )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "SkillProof AI Running"}


@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=user.password
    )

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        return {"message": "Email already registered"}

    db.add(new_user)
    db.commit()

    return {"message": "User Registered Successfully"}

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user:
        return {"message": "User not found"}

    if existing_user.password != user.password:
        return {"message": "Invalid password"}

    token = create_access_token(
    data={"sub": existing_user.email}
)

    return {
    "access_token": token,
    "token_type": "bearer"
}

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    global LAST_UPLOADED_FILE

    contents = await file.read()

    with open(file.filename, "wb") as f:
        f.write(contents)

    LAST_UPLOADED_FILE = file.filename

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename
    }

@app.post("/extract-skills")
def extract_skills():

    global LAST_UPLOADED_FILE

    if not LAST_UPLOADED_FILE:
        return {"error": "No resume uploaded"}

    skills = [
        "Python",
        "SQL",
        "FastAPI",
        "Machine Learning",
        "React",
        "Git",
        "Java",
        "C++"
    ]

    extracted_skills = []

    try:
        with open(LAST_UPLOADED_FILE, "rb") as file:

            pdf_reader = PyPDF2.PdfReader(file)

            text = ""

            for page in pdf_reader.pages:
                text += page.extract_text() or ""

        for skill in skills:
            if skill.lower() in text.lower():
                extracted_skills.append(skill)

        return {
            "skills": extracted_skills
        }

    except Exception as e:
        return {
            "error": str(e)
        }
    

@app.get("/profile")
def profile(current_user: str = Depends(verify_token)):

    return {
        "message": "Welcome to SkillProof AI",
        "email": current_user
    }

@app.get("/test/{skill}")
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
   

@app.post("/submit-test")
def submit_test(test: TestSubmission, db: Session = Depends(get_db)):

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

    badge = None

    if passed:
        badge = f"{skill} Verified"

    verification = Verification(
        email="tushar@gmail.com",
        skill=skill,
        score=percentage,
        badge=badge
    )

    db.add(verification)
    db.commit()

    global VERIFIED_RESULTS

    VERIFIED_RESULTS = {
    "full_name": "Tushar Kumar",
    "email": "tushar@gmail.com",
    "verified_skills": [
        {
            "skill": skill,
            "score": percentage,
            "badge": badge
        }
    ]
}

    return {
        "skill": skill,
        "score": score,
        "total_questions": total,
        "percentage": percentage,
        "passed": passed,
        "badge": badge
    }

@app.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):

    verifications = db.query(Verification).all()

    if not verifications:
        return {
            "message": "No verified skills yet"
        }

    verified_skills = []

    for v in verifications:
        verified_skills.append({
            "skill": v.skill,
            "score": v.score,
            "badge": v.badge
        })

        badges = db.query(Badge).all()

        saved_badges = []

        for b in badges:
         saved_badges.append({
        "badge_name": b.badge_name
    })

    return { 
        "full_name": "Tushar Kumar",
        "email": "tushar@gmail.com",
        "verified_skills": verified_skills,
        "badges": saved_badges,
 
    }

@app.post("/save-badge")
def save_badge(
    email: str,
    badge_name: str,
    db: Session = Depends(get_db)
):
    badge = Badge(
        email=email,
        badge_name=badge_name
    )

    db.add(badge)
    db.commit()

    return {
        "message": "Badge Saved Successfully"
    }