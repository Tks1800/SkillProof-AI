from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models_new.job import Job
from app.models_new.application import Application
from app.models_new.interview import InterviewInvitation


class RecruiterDashboardService:

    @staticmethod
    def get_dashboard(db: Session, recruiter_email: str):

        total_jobs = (
            db.query(Job)
            .filter(Job.recruiter_email == recruiter_email)
            .count()
        )

        total_applications = (
            db.query(Application)
            .filter(Application.recruiter_email == recruiter_email)
            .count()
        )

        accepted = (
            db.query(Application)
            .filter(
                Application.recruiter_email == recruiter_email,
                Application.status == "Accepted",
            )
            .count()
        )

        rejected = (
            db.query(Application)
            .filter(
                Application.recruiter_email == recruiter_email,
                Application.status == "Rejected",
            )
            .count()
        )

        interviews = (
            db.query(InterviewInvitation)
            .filter(
                InterviewInvitation.recruiter_email == recruiter_email
            )
            .count()
        )

        avg_match = (
            db.query(func.avg(Application.match_score))
            .filter(
                Application.recruiter_email == recruiter_email
            )
            .scalar()
        )

        excellent = (
            db.query(Application)
            .filter(
                Application.recruiter_email == recruiter_email,
                Application.match_score >= 90,
            )
            .count()
        )

        return {

            "active_jobs": total_jobs,

            "applications": total_applications,

            "accepted": accepted,

            "rejected": rejected,

            "interviews": interviews,

            "average_match": round(avg_match or 0),

            "excellent_candidates": excellent,

        }