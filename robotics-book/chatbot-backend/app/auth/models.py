from typing import Optional
from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Profile fields
    software_background = Column(String, nullable=True)  # Beginner / Intermediate / Advanced
    hardware_background = Column(String, nullable=True)  # None / Basic / Advanced
    purpose_of_learning = Column(String, nullable=True)  # Student / Teacher / Professional / Researcher