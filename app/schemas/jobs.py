from pydantic import BaseModel


class JobCreate(BaseModel):
    title: str
    company_name: str
    location: str
    salary: str
    experience: str
    job_type: str
    description: str
    required_skills: str