import re


def clean_skill(skill: str):
    return skill.strip().lower()


def split_skills(skill_string: str):
    if not skill_string:
        return []

    return [
        clean_skill(skill)
        for skill in re.split(",|\\n|;", skill_string)
        if skill.strip()
    ]


def calculate_match(job_skills, candidate_skills):

    job = set(split_skills(job_skills))
    candidate = set(split_skills(candidate_skills))

    matched = sorted(job & candidate)
    missing = sorted(job - candidate)

    if len(job) == 0:
        score = 0
    else:
        score = round(len(matched) / len(job) * 100)

    if score >= 90:
        recommendation = "Excellent Match"

    elif score >= 75:
        recommendation = "Highly Recommended"

    elif score >= 60:
        recommendation = "Recommended"

    elif score >= 40:
        recommendation = "Average Match"

    else:
        recommendation = "Low Match"

    return {

        "score": score,

        "matched_skills": matched,

        "missing_skills": missing,

        "recommendation": recommendation,

    }