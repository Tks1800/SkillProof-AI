from sqlalchemy.orm import Session

from app.models_new.user import User
from app.models_new.resume import Resume
from app.models_new.candidate_profile import CandidateProfile
from app.models_new.candidate_skill import CandidateSkill
from app.models_new.verified_skill import VerifiedSkill


class CandidateProfileService:

    # ==========================================================
    # GET PROFILE
    # ==========================================================

    @staticmethod
    def get_profile(db: Session, email: str):

        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if not user:
            return None

        profile = (
            db.query(CandidateProfile)
            .filter(CandidateProfile.email == email)
            .first()
        )

        if not profile:

            profile = CandidateProfile(
                email=email,
                phone="",
                location="",
                college="",
                degree="",
                graduation_year="",
                linkedin="",
                github="",
                portfolio="",
                bio="",
            )

            db.add(profile)
            db.commit()
            db.refresh(profile)

        resume = (
            db.query(Resume)
            .filter(Resume.user_email == email)
            .first()
        )

        skills = (
            db.query(CandidateSkill)
            .filter(CandidateSkill.email == email)
            .all()
        )

        verified = (
            db.query(VerifiedSkill)
            .filter(
                VerifiedSkill.candidate_email == email
            )
            .all()
        )

        return {

            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
            },

            "profile": {
                "phone": profile.phone,
                "location": profile.location,
                "college": profile.college,
                "degree": profile.degree,
                "graduation_year": profile.graduation_year,
                "linkedin": profile.linkedin,
                "github": profile.github,
                "portfolio": profile.portfolio,
                "bio": profile.bio,
            },

            "resume": {
                "file_name": resume.file_name if resume else "",
                "extracted_text": resume.extracted_text if resume else "",
                "extracted_skills": resume.extracted_skills if resume else "",
            },

            "skills": [
                {
                    "skill": skill.skill,
                    "verified": skill.verified,
                }
                for skill in skills
            ],

            "verified_skills": [
                {
                    "skill": item.skill,
                    "score": item.score,
                    "badge": item.badge,
                    "verified_at": item.verified_at,
                }
                for item in verified
            ],

        }

    # ==========================================================
    # UPDATE PROFILE
    # ==========================================================

    @staticmethod
    def update_profile(
        db: Session,
        email: str,
        data,
    ):

        profile = (
            db.query(CandidateProfile)
            .filter(CandidateProfile.email == email)
            .first()
        )

        if not profile:
            profile = CandidateProfile(email=email)
            db.add(profile)

        profile.phone = data.phone
        profile.location = data.location
        profile.college = data.college
        profile.degree = data.degree
        profile.graduation_year = data.graduation_year
        profile.linkedin = data.linkedin
        profile.github = data.github
        profile.portfolio = data.portfolio
        profile.bio = data.bio

        db.commit()
        db.refresh(profile)

        return profile