from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class CandidateProfile(Base):
    __tablename__ = "candidate_profiles"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, index=True)

    phone = Column(String)
    location = Column(String)

    college = Column(String)
    degree = Column(String)
    graduation_year = Column(String)

    linkedin = Column(String)
    github = Column(String)
    portfolio = Column(String)

    bio = Column(Text)