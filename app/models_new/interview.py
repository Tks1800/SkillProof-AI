from sqlalchemy import Column, Integer, String
from app.database import Base

class InterviewInvitation(Base):
    __tablename__ = "interview_invitations"

    id = Column(Integer, primary_key=True, index=True)

    recruiter_email = Column(String)
    candidate_email = Column(String)
    job_title = Column(String)
    status = Column(String, default="Pending")