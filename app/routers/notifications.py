from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.routers.auth import verify_token
from app.services.notification_service import NotificationService

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_notifications(
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):
    return NotificationService.get_notifications(
        db,
        current_user.email,
    )


@router.put("/read/{notification_id}")
def mark_read(
    notification_id: int,
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):
    NotificationService.mark_as_read(
        db,
        notification_id,
        current_user.email,
    )

    return {"message": "Notification marked as read."}


@router.put("/read-all")
def mark_all_read(
    current_user=Depends(verify_token),
    db: Session = Depends(get_db),
):
    count = NotificationService.mark_all_as_read(
        db,
        current_user.email,
    )

    return {
        "message": f"{count} notifications updated."
    }