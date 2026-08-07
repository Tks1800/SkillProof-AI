from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.auth import hash_password, verify_password
from app.database import SessionLocal
from app.models_new import User
from app.schemas.auth import UserCreate, UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

SECRET_KEY = "skillproof_super_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()


# ==========================================================
# Database
# ==========================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==========================================================
# JWT
# ==========================================================

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    print("\n================ JWT CREATED ================")
    print("Payload :", to_encode)
    print("Token   :", token)
    print("=============================================\n")

    return token


# ==========================================================
# Verify Token
# ==========================================================

def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    print("\n================ VERIFY TOKEN ================")
    print("Incoming Token:")
    print(token)

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("Decoded Payload:")
        print(payload)

        email = payload.get("sub")

        print("Email:", email)

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token (No subject)"
            )

        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        print("Authenticated User:", user.email)
        print("=============================================\n")

        return user

    except JWTError as e:
        print("\n============= JWT ERROR =================")
        print(type(e).__name__)
        print(str(e))
        print("=========================================\n")

        raise HTTPException(
            status_code=401,
            detail=f"JWT Error: {str(e)}"
        )

    except Exception as e:
        print("\n============= GENERAL ERROR =============")
        print(type(e).__name__)
        print(str(e))
        print("=========================================\n")

        raise HTTPException(
            status_code=401,
            detail=f"Error: {str(e)}"
        )


# ==========================================================
# Register
# ==========================================================

@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully"
    }


# ==========================================================
# Login
# ==========================================================

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        existing_user.password,
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
        "role": existing_user.role,
    }


# ==========================================================
# Profile
# ==========================================================

@router.get("/profile")
def profile(
    current_user: User = Depends(verify_token),
):
    return {
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role,
    }