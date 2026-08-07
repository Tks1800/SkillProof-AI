from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class JobCreate(BaseModel):
    title: str
    company_name: str
    location: str
    salary: str
    experience: str
    job_type: str
    description: str
    required_skills: str


class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str
    role: str = "candidate"


class UserLogin(BaseModel):
    email: str
    password: str


class TestSubmission(BaseModel):
    skill: str
    answers: list[str]


class InterviewCreate(BaseModel):
    recruiter_email: str
    candidate_email: str

    job_id: int

    scheduled_at: datetime

    meeting_link: Optional[str] = None

    interview_type: str = "Online"

    notes: Optional[str] = None


class ApplyJob(BaseModel):
    job_id: int