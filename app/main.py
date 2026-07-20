from app.routers import auth
from app.routers import candidate
from app.routers import recruiter
from app.routers import resume
from app.routers import interview
from app.routers import dashboard
from jose import jwt
from jose import JWTError
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
from app.auth import hash_password, verify_password
from app.routers import resume
from app.routers import jobs

SECRET_KEY = "skillproof_super_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()

import PyPDF2
from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session



from app.database import Base, engine, SessionLocal
from app.models_new import (
    User,
    Resume,
    Job,
    Company,
    CandidateProfile,
    CandidateSkill,
    Skill,
    Question,
    TestResult,
    InterviewInvitation,
    Application,
)
from app.schemas import (
    UserCreate,
    UserLogin,
    TestSubmission,
    JobCreate,
    InterviewCreate,
)
Base.metadata.create_all(bind=engine)

from fastapi.middleware.cors import CORSMiddleware

LAST_UPLOADED_FILE = None

app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://skill-proof-ai-ffy2.vercel.app",
        "http://localhost:5173",
        "http://localhost:5176",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(candidate.router)
app.include_router(recruiter.router)
app.include_router(resume.router)
app.include_router(interview.router)
app.include_router(dashboard.router)
app.include_router(jobs.router)

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


    
