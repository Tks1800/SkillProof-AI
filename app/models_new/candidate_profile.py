from sqlalchemy import Column, Integer, String
from app.database import Base

class CandidateProfile(Base):
    __tablename__ = "candidate_profiles"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String)
    phone = Column(String)
    linkedin = Column(String)
    github = Column(String)
    portfolio = Column(String)