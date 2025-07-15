from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi import Header, HTTPException, Depends
from .models import User
from .database import get_db
from sqlalchemy.orm import Session

SECRET_KEY = "supersecret"
ALGORITHM = "HS256"
EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    """
    Hash a plain text password using bcrypt.
    
    Args:
        password (str): Plain text password to hash
        
    Returns:
        str: Hashed password
    """
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str):
    """
    Verify a plain text password against a hashed password.
    
    Args:
        password (str): Plain text password to verify
        hashed (str): Hashed password to compare against
        
    Returns:
        bool: True if password matches, False otherwise
    """
    return pwd_context.verify(password, hashed)

def create_access_token(data: dict):
    """
    Create a JWT access token with expiration time.
    
    Args:
        data (dict): Payload data to encode in the token
        
    Returns:
        str: JWT access token
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(email: str = Header(...), db: Session = Depends(get_db)) -> User:
    """
    Get the current authenticated user from email header.
    
    Args:
        email (str): User email from request header
        db (Session): Database session dependency
        
    Returns:
        User: The authenticated user object
        
    Raises:
        HTTPException: 401 error if user not found
    """
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")
    return user
