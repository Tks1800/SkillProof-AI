from pydantic import BaseModel


class CandidateProfileUpdate(BaseModel):
    phone: str = ""
    location: str = ""
    college: str = ""
    degree: str = ""
    graduation_year: str = ""
    linkedin: str = ""
    github: str = ""
    portfolio: str = ""
    bio: str = ""


class CandidateProfileResponse(BaseModel):
    phone: str
    location: str
    college: str
    degree: str
    graduation_year: str
    linkedin: str
    github: str
    portfolio: str
    bio: str

    class Config:
        from_attributes = True