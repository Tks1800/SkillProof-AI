from pydantic import BaseModel

class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class TestSubmission(BaseModel):
    skill: str
    answers: list[str]