from sqlalchemy.orm import Session

from app.models_new.user import User
from app.models_new.application import Application
from app.models_new.resume import Resume
from app.models_new.verified_skill import VerifiedSkill
from app.models_new.job import Job

from app.services.ai_match_service import calculate_match


class RecruiterService:

    @staticmethod
    def get_job_applicants(db: Session, job_id: int):

        job = (
            db.query(Job)
            .filter(Job.id == job_id)
            .first()
        )

        if not job:
            return []

        applications = (
            db.query(Application)
            .filter(Application.job_id == job_id)
            .all()
        )

        result = []

        for application in applications:

            user = (
                db.query(User)
                .filter(
                    User.email == application.candidate_email
                )
                .first()
            )

            if not user:
                continue

            resume = (
                db.query(Resume)
                .filter(
                    Resume.user_email == application.candidate_email
                )
                .first()
            )

            verified = (
                db.query(VerifiedSkill)
                .filter(
                    VerifiedSkill.candidate_email ==
                    application.candidate_email
                )
                .all()
            )

            # ============================================
            # Resume Skills
            # ============================================

            resume_skills = ""

            if resume:
                resume_skills = (
                    resume.extracted_skills or ""
                )

            # ============================================
            # Verified Skills
            # ============================================

            verified_skill_names = ", ".join(
                [s.skill for s in verified]
            )

            # ============================================
            # Combine Skills
            # ============================================

            candidate_skills = ", ".join(
                filter(
                    None,
                    [
                        resume_skills,
                        verified_skill_names,
                    ],
                )
            )

            # ============================================
            # AI Match
            # ============================================

            match = calculate_match(
                job.required_skills,
                candidate_skills,
            )

            result.append({

                "name": user.full_name,

                "email": user.email,

                "resume": (
                    resume.file_name
                    if resume
                    else None
                ),

                "verified_skills": [

                    {
                        "skill": s.skill,
                        "score": s.score,
                        "badge": s.badge,
                    }

                    for s in verified

                ],

                "match_score": match["score"],

                "matched_skills": match["matched_skills"],

                "missing_skills": match["missing_skills"],

                "recommendation": match["recommendation"],

            })

        return result