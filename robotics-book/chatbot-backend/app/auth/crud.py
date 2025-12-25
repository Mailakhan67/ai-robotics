from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.auth.models import User
from app.auth.schemas import UserCreate, UserUpdate
from app.auth.utils import get_password_hash


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: UserCreate):
    # Hash the password
    hashed_password = get_password_hash(user.password)

    # Create the user object
    db_user = User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
        software_background=user.software_background,
        hardware_background=user.hardware_background,
        purpose_of_learning=user.purpose_of_learning
    )

    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists"
        )


def update_user(db: Session, user_id: int, user_update: UserUpdate):
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Update fields that are provided
    if user_update.full_name is not None:
        db_user.full_name = user_update.full_name
    if user_update.software_background is not None:
        db_user.software_background = user_update.software_background
    if user_update.hardware_background is not None:
        db_user.hardware_background = user_update.hardware_background
    if user_update.purpose_of_learning is not None:
        db_user.purpose_of_learning = user_update.purpose_of_learning

    db.commit()
    db.refresh(db_user)
    return db_user


from app.auth.utils import verify_password


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user