from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class InterviewCreate(BaseModel):
    recruiter_id: int
    candidate_id: int
    job_id: int

    scheduled_at: datetime

    meeting_link: Optional[str] = None

    interview_type: str = "Online"

    notes: Optional[str] = None


class InterviewResponse(BaseModel):
    id: int

    recruiter_id: int

    candidate_id: int

    job_id: int

    scheduled_at: datetime

    meeting_link: Optional[str]

    interview_type: str

    status: str

    class Config:
        from_attributes = True