from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    job_id = Column(Integer, nullable=False)

    candidate_email = Column(String, nullable=False, index=True)

    recruiter_email = Column(String, nullable=False, index=True)

    resume_id = Column(Integer)

    status = Column(String, default="Applied")

    match_score = Column(Integer, default=0)

    recommendation = Column(String)

    matched_skills = Column(String)

    missing_skills = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)