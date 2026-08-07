from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.routers.auth import verify_token
from app.services.recruiter_dashboard_service import RecruiterDashboardService

router = APIRouter(
    prefix="/recruiter-dashboard",
    tags=["Recruiter Dashboard"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/stats")
def recruiter_dashboard(
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):

    return RecruiterDashboardService.get_dashboard(
        db,
        current_user.email,
    )