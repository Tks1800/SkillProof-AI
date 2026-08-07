from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class InterviewCreate(BaseModel):
    recruiter_email: str
    candidate_email: str
    job_id: int
    scheduled_at: datetime
    meeting_link: Optional[str] = None
    interview_type: str = "Online"
    notes: Optional[str] = None