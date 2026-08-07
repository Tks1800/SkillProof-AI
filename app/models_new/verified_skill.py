from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base


class VerifiedSkill(Base):
    __tablename__ = "verified_skills"

    id = Column(Integer, primary_key=True, index=True)

    candidate_email = Column(String, index=True)

    skill = Column(String)

    score = Column(Integer)

    badge = Column(String)

    verified_at = Column(
        DateTime,
        server_default=func.now()
    )