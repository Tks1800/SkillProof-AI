from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class InterviewInvitation(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    recruiter_email = Column(String, nullable=False)

    candidate_email = Column(String, nullable=False)

    job_id = Column(Integer, nullable=False)

    scheduled_at = Column(DateTime)

    meeting_link = Column(String)

    interview_type = Column(String, default="Online")

    notes = Column(Text)

    status = Column(String, default="Pending")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )