from sqlalchemy.orm import Session

from app.models_new.interview import InterviewInvitation
from app.schemas import InterviewCreate



from app.services.notification_service import NotificationService
from app.services.email_service import EmailService


class InterviewService:

    @staticmethod
    def create_interview(db: Session, data: InterviewCreate):

        interview = InterviewInvitation(
            recruiter_email=data.recruiter_email,
            candidate_email=data.candidate_email,
            job_id=data.job_id,
            scheduled_at=data.scheduled_at,
            meeting_link=data.meeting_link,
            interview_type=data.interview_type,
            notes=data.notes,
            status="Pending"
        )

        db.add(interview)
        db.commit()
        db.refresh(interview)

        # -----------------------------
        # Create Notification
        # -----------------------------
        NotificationService.create(
            db=db,
            user_email=data.candidate_email,
            title="Interview Invitation",
            message=f"You have been invited for an interview for Job #{data.job_id}.",
            notification_type="interview",
        )

        # -----------------------------
        # Send Email
        # -----------------------------
        body = f"""
        <html>
        <body style="font-family:Arial">

        <h2>🎉 Interview Invitation</h2>

        <p>Hello,</p>

        <p>
        Congratulations!
        </p>

        <p>
        You have been shortlisted for the next round.
        </p>

        <table cellpadding="8">
            <tr>
                <td><b>Job ID</b></td>
                <td>{data.job_id}</td>
            </tr>

            <tr>
                <td><b>Date & Time</b></td>
                <td>{data.scheduled_at}</td>
            </tr>

            <tr>
                <td><b>Interview Type</b></td>
                <td>{data.interview_type}</td>
            </tr>
        </table>

        <br>

        <a
            href="{data.meeting_link}"
            style="
                background:#06b6d4;
                color:white;
                padding:12px 25px;
                text-decoration:none;
                border-radius:8px;
            "
        >
            Join Interview
        </a>

        <br><br>

        <b>Notes</b>

        <p>{data.notes}</p>

        <br>

        <hr>

        <p>
        Regards,<br>
        <b>VaivoAI Recruitment Team</b>
        </p>

        </body>
        </html>
        """

        EmailService.send_email(
            to_email=data.candidate_email,
            subject="Interview Invitation | VaivoAI",
            body=body,
        )

        return interview

    @staticmethod
    def get_candidate_interviews(
        db: Session,
        candidate_email: str
    ):
        return (
            db.query(InterviewInvitation)
            .filter(
                InterviewInvitation.candidate_email
                == candidate_email
            )
            .all()
        )

    @staticmethod
    def get_recruiter_interviews(
        db: Session,
        recruiter_email: str
    ):
        return (
            db.query(InterviewInvitation)
            .filter(
                InterviewInvitation.recruiter_email
                == recruiter_email
            )
            .all()
        )
@staticmethod
def create_interview(db: Session, data: InterviewCreate):

    print("\n==============================")
    print("🚀 create_interview() CALLED")
    print("==============================")

    interview = InterviewInvitation(
        recruiter_email=data.recruiter_email,
        candidate_email=data.candidate_email,
        job_id=data.job_id,
        scheduled_at=data.scheduled_at,
        meeting_link=data.meeting_link,
        interview_type=data.interview_type,
        notes=data.notes,
        status="Pending"
    )

    print("✅ Interview object created")

    db.add(interview)
    db.commit()
    db.refresh(interview)

    print("✅ Interview saved to database")

    NotificationService.create(
        db=db,
        user_email=data.candidate_email,
        title="Interview Invitation",
        message=f"You have been invited for an interview for Job #{data.job_id}.",
        notification_type="interview",
    )

    print("✅ Notification created")

    body = f"""
    <html>
    <body style="font-family:Arial">

    <h2>🎉 Interview Invitation</h2>

    <p>Hello,</p>

    <p>Congratulations!</p>

    <p>You have been shortlisted for the next round.</p>

    <table cellpadding="8">
        <tr>
            <td><b>Job ID</b></td>
            <td>{data.job_id}</td>
        </tr>

        <tr>
            <td><b>Date & Time</b></td>
            <td>{data.scheduled_at}</td>
        </tr>

        <tr>
            <td><b>Interview Type</b></td>
            <td>{data.interview_type}</td>
        </tr>
    </table>

    <br>

    <a href="{data.meeting_link}">
        Join Interview
    </a>

    <br><br>

    <b>Notes</b>

    <p>{data.notes}</p>

    <hr>

    Regards,<br>
    <b>VaivoAI Recruitment Team</b>

    </body>
    </html>
    """

    print("📧 About to send email...")

    result = EmailService.send_email(
        to_email=data.candidate_email,
        subject="Interview Invitation | VaivoAI",
        body=body,
    )

    print("📧 EmailService returned:", result)

    print("==============================")
    print("✅ create_interview() FINISHED")
    print("==============================")

    return interview