from pydantic import BaseModel


class TestSubmission(BaseModel):
    skill: str
    answers: list[str]