from app.database import Base, engine

# Import all models so SQLAlchemy knows about them
from app.models_new import *

print("Creating tables...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")