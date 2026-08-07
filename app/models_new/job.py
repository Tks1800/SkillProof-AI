from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    company_name = Column(String, nullable=False)
    location = Column(String)
    salary = Column(String)
    experience = Column(String)
    job_type = Column(String)

    description = Column(String, nullable=False)

    required_skills = Column(String)

    recruiter_email = Column(String, nullable=False, index=True)

    status = Column(String, default="Open")

    applications_count = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)