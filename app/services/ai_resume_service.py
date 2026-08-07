from app.services.ai_match_service import calculate_match


def generate_resume_analysis(job_skills, candidate_skills):
    result = calculate_match(job_skills, candidate_skills)

    score = result["score"]

    if score >= 90:
        summary = (
            "Excellent candidate with a very strong skill match."
        )
    elif score >= 75:
        summary = (
            "Strong candidate with most required skills."
        )
    elif score >= 60:
        summary = (
            "Good candidate but requires minor upskilling."
        )
    elif score >= 40:
        summary = (
            "Average match. Candidate needs additional skills."
        )
    else:
        summary = (
            "Low skill match for this position."
        )

    interview_questions = []

    for skill in result["matched_skills"]:

        if skill == "python":
            interview_questions.append(
                "Explain Python decorators."
            )

        elif skill == "sql":
            interview_questions.append(
                "What is the difference between INNER JOIN and LEFT JOIN?"
            )

        elif skill == "git":
            interview_questions.append(
                "Explain Git branching strategy."
            )

        elif skill == "react":
            interview_questions.append(
                "Explain React Hooks."
            )

        elif skill == "fastapi":
            interview_questions.append(
                "Explain dependency injection in FastAPI."
            )

    if len(interview_questions) == 0:
        interview_questions.append(
            "Tell us about one technical project you are proud of."
        )

    return {
        "overall_score": score,
        "summary": summary,
        "strengths": result["matched_skills"],
        "missing_skills": result["missing_skills"],
        "recommendation": result["recommendation"],
        "interview_questions": interview_questions,
    }