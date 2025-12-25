from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    email: str
    full_name: str


class UserCreate(UserBase):
    password: str
    software_background: Optional[str] = None
    hardware_background: Optional[str] = None
    purpose_of_learning: Optional[str] = None


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    software_background: Optional[str] = None
    hardware_background: Optional[str] = None
    purpose_of_learning: Optional[str] = None


class UserResponse(UserBase):
    id: int
    created_at: datetime
    software_background: Optional[str] = None
    hardware_background: Optional[str] = None
    purpose_of_learning: Optional[str] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class LoginRequest(BaseModel):
    email: str
    password: str