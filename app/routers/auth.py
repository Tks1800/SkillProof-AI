from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.auth import hash_password, verify_password
from app.database import SessionLocal
from app.models_new import User
from app.schemas import UserCreate, UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

SECRET_KEY = "skillproof_super_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    print("TOKEN:", token)

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("PAYLOAD:", payload)

        email = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        user = db.query(User).filter(
            User.email == email
        ).first()

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        return user

    except Exception as e:
        print("JWT ERROR:", e)
        raise HTTPException(
        status_code=401,
        detail=str(e)
    )
    
@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    print("STEP 1")

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    print("STEP 2")

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    print("STEP 3")

    hashed = hash_password(user.password)

    print("STEP 4")

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hashed,
        role=user.role
    )

    print("STEP 5")

    db.add(new_user)

    print("STEP 6")

    db.commit()

    print("STEP 7")

    db.refresh(new_user)

    print("STEP 8")

    return {
        "message": "User Registered Successfully"
    }

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        existing_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token(
        {"sub": existing_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "email": existing_user.email,
        "full_name": existing_user.full_name,
        "role": existing_user.role
    }

@router.get("/profile")
def profile(
    current_user: User = Depends(verify_token)
):
    return {
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role
    }