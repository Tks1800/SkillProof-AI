from pydantic import BaseModel


class ApplyJob(BaseModel):
    job_id: int