from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    job_id = Column(Integer)

    candidate_email = Column(String)

    recruiter_email = Column(String)

    status = Column(String, default="Pending")

    created_at = Column(DateTime, default=datetime.utcnow)