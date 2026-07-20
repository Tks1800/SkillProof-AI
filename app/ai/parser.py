import fitz

SKILLS = [
    "python",
    "java",
    "c++",
    "javascript",
    "react",
    "node",
    "sql",
    "mysql",
    "mongodb",
    "html",
    "css",
    "fastapi",
    "django",
    "flask",
    "git",
    "github",
    "linux",
    "aws",
    "docker",
    "kubernetes",
    "machine learning",
    "deep learning",
    "data science",
    "power bi",
    "tableau",
    "excel"
]


def extract_resume(file_path):

    doc = fitz.open(file_path)

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    lower = text.lower()

    found = []

    for skill in SKILLS:
        if skill in lower:
            found.append(skill)

    return text, list(set(found))