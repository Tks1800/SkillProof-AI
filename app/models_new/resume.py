from sqlalchemy import Column, Integer, String
from app.database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    user_email = Column(String)
    file_name = Column(String)
    extracted_text = Column(String)
    extracted_skills = Column(String)