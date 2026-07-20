from sqlalchemy import Column, Integer, String
from app.database import Base

class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String)
    skill = Column(String)
    score = Column(Integer)
    badge = Column(String)