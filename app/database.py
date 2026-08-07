from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from pathlib import Path

# ==========================================================
# Database Path
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "skillproof_v2.db"

SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

print("=" * 70)
print("SkillProof AI Database")
print("Database Path :", DB_PATH)
print("Database URL  :", SQLALCHEMY_DATABASE_URL)
print("=" * 70)

# ==========================================================
# SQLAlchemy Engine
# ==========================================================

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={
        "check_same_thread": False,
        "timeout": 30
    },
    echo=False,
)

# ==========================================================
# Session
# ==========================================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# ==========================================================
# Base Model
# ==========================================================

Base = declarative_base()


# ==========================================================
# Dependency
# ==========================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()