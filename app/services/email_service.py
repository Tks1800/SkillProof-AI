import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class EmailService:

    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587

    @classmethod
    def send_email(
        cls,
        to_email: str,
        subject: str,
        body: str,
    ):

        email = os.getenv("EMAIL_ADDRESS")
        password = os.getenv("EMAIL_PASSWORD")

        print("=" * 60)
        print("EMAIL SERVICE STARTED")
        print("FROM:", email)
        print("TO:", to_email)
        print("PASSWORD LOADED:", bool(password))
        print("=" * 60)

        if not email or not password:
            print("❌ Email credentials not found")
            return False

        try:

            print("Connecting to Gmail SMTP...")

            server = smtplib.SMTP(
                cls.SMTP_SERVER,
                cls.SMTP_PORT
            )

            server.starttls()

            print("Logging into Gmail...")

            server.login(email, password)

            print("Preparing email...")

            message = MIMEMultipart()
            message["From"] = email
            message["To"] = to_email
            message["Subject"] = subject

            message.attach(MIMEText(body, "html"))

            print("Sending email...")

            server.sendmail(
                email,
                to_email,
                message.as_string()
            )

            server.quit()

            print("✅ EMAIL SENT SUCCESSFULLY")
            print("=" * 60)

            return True

        except Exception as e:

            print("=" * 60)
            print("❌ EMAIL ERROR")
            print(type(e).__name__)
            print(str(e))
            print("=" * 60)

            return False