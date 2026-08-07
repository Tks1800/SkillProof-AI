from sqlalchemy import Column, Integer, String
from app.database import Base


class CandidateSkill(Base):
    __tablename__ = "candidate_skills"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, index=True)
    skill = Column(String)
    verified = Column(String)