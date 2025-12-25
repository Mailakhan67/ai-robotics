# from datetime import datetime, timedelta
# from typing import Optional
# from jose import JWTError, jwt
# from passlib.context import CryptContext
# from fastapi import HTTPException, status
# from app.config import settings


# # Password hashing
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)


# def get_password_hash(password: str) -> str:
#     return pwd_context.hash(password)


# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
#     return encoded_jwt


# def verify_token(token: str) -> Optional[dict]:
#     try:
#         payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
#         email: str = payload.get("sub")
#         if email is None:
#             return None
#         return payload
#     except JWTError:
#         return None























from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from app.config import settings

# Password hashing - using bcrypt with proper configuration
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
pwd_context = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify the password against the hashed password.
    Truncate to 72 characters to comply with bcrypt limitations.
    """
    # Truncate password to 72 characters to comply with bcrypt limitations
    truncated_password = plain_password[:72] if len(plain_password) > 72 else plain_password
    return pwd_context.verify(truncated_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Hash the password using bcrypt.
    Truncate to 72 characters to comply with bcrypt limitations.
    """
    # Truncate password to 72 characters to comply with bcrypt limitations
    truncated_password = password[:72] if len(password) > 72 else password
    return pwd_context.hash(truncated_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Create a JWT access token.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    """
    Decode and verify a JWT token. Returns payload dict or None if invalid.
    """
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        if email is None:
            return None
        return payload
    except JWTError:
        return None
