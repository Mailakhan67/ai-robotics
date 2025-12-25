from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from app.database import get_db
from app.auth.schemas import UserCreate, UserResponse, LoginRequest, Token
from app.auth.crud import create_user, authenticate_user, get_user_by_email
from app.auth.utils import create_access_token
from app.config import settings
from app.auth.dependencies import get_current_user
from app.auth.models import User


router = APIRouter(tags=["auth"])


@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists"
        )

    # Create user
    db_user = create_user(db, user)

    # Return user response (password not included for security)
    return UserResponse(
        id=db_user.id,
        email=db_user.email,
        full_name=db_user.full_name,
        created_at=db_user.created_at,
        software_background=db_user.software_background,
        hardware_background=db_user.hardware_background,
        purpose_of_learning=db_user.purpose_of_learning
    )


@router.post("/signin", response_model=Token)
def signin(login_request: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, login_request.email, login_request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    # Return current user's information
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        created_at=current_user.created_at,
        software_background=current_user.software_background,
        hardware_background=current_user.hardware_background,
        purpose_of_learning=current_user.purpose_of_learning
    )


@router.post("/logout")
def logout():
    # In a stateless JWT system, logout is typically handled on the client side
    # by clearing the token from storage. This endpoint can be used for
    # additional cleanup if needed.
    return {"message": "Successfully logged out"}