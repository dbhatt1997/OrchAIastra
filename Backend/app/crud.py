from sqlalchemy.orm import Session
from . import models, schemas
from .auth import hash_password

def get_user_by_username(db: Session, username: str):
    """
    Retrieve a user by their username.
    
    Args:
        db (Session): Database session
        username (str): Username to search for
        
    Returns:
        models.User or None: User object if found, None otherwise
    """
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    """
    Create a new user in the database.
    
    Args:
        db (Session): Database session
        user (schemas.UserCreate): User creation data with username, email, and password
        
    Returns:
        models.User: The created user object
    """
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_tag(db: Session, tag: schemas.TagCreate, user_email: str):
    """
    Create a new tag for a user.
    
    Args:
        db (Session): Database session
        tag (schemas.TagCreate): Tag creation data with name and description
        user_email (str): Email of the user who owns the tag
        
    Returns:
        models.Tag: The created tag object
    """
    db_tag = models.Tag(
        tag_name=tag.tag_name,
        description=tag.description,
        user_email=user_email
    )
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag

def get_tags_for_user(db: Session, user_email: str):
    """
    Retrieve all tags belonging to a specific user.
    
    Args:
        db (Session): Database session
        user_email (str): Email of the user whose tags to retrieve
        
    Returns:
        list[models.Tag]: List of tag objects belonging to the user
    """
    return db.query(models.Tag).filter(models.Tag.user_email == user_email).all()

def update_tag(db: Session, tag_id: int, tag_data: schemas.TagUpdate, user_email: str):
    """
    Update an existing tag owned by a specific user.
    
    Args:
        db (Session): Database session
        tag_id (int): ID of the tag to update
        tag_data (schemas.TagUpdate): Updated tag data
        user_email (str): Email of the user who owns the tag
        
    Returns:
        models.Tag or None: Updated tag object if found and updated, None otherwise
    """
    tag = db.query(models.Tag).filter(models.Tag.id == tag_id, models.Tag.user_email == user_email).first()
    if tag:
        if tag_data.tag_name is not None:
            tag.tag_name = tag_data.tag_name
        if tag_data.description is not None:
            tag.description = tag_data.description
        db.commit()
        db.refresh(tag)
    return tag
