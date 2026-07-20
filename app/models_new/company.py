from sqlalchemy import Column, Integer, String
from app.database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    recruiter_email = Column(String)
    company_name = Column(String)
    website = Column(String)
    location = Column(String)
    description = Column(String)