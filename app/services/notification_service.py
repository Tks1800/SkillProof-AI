from sqlalchemy.orm import Session

from app.models_new.notification import Notification


class NotificationService:

    @staticmethod
    def create(
        db: Session,
        user_email: str,
        title: str,
        message: str,
        notification_type: str = "general",
    ):

        notification = Notification(
            user_email=user_email,
            title=title,
            message=message,
            type=notification_type,
        )

        db.add(notification)
        db.commit()

        return notification

    @staticmethod
    def get_notifications(
        db: Session,
        user_email: str,
    ):

        return (
            db.query(Notification)
            .filter(Notification.user_email == user_email)
            .order_by(Notification.created_at.desc())
            .all()
        )

    @staticmethod
    def mark_as_read(
        db: Session,
        notification_id: int,
        user_email: str,
    ):

        notification = (
            db.query(Notification)
            .filter(
                Notification.id == notification_id,
                Notification.user_email == user_email,
            )
            .first()
        )

        if notification:
            notification.is_read = True
            db.commit()

        return notification

    @staticmethod
    def mark_all_as_read(
        db: Session,
        user_email: str,
    ):

        notifications = (
            db.query(Notification)
            .filter(
                Notification.user_email == user_email,
                Notification.is_read == False,
            )
            .all()
        )

        for notification in notifications:
            notification.is_read = True

        db.commit()

        return len(notifications)