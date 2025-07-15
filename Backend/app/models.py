from sqlalchemy import Column, Integer, String
from .database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    tags = relationship("Tag", back_populates="owner")
    
class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    tag_name = Column(String, nullable=False)
    description = Column(String)
    user_email = Column(String, ForeignKey("users.email"))

    owner = relationship("User", back_populates="tags")
