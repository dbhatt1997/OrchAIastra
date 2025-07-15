from sqlalchemy.orm import Session
from . import models, schemas
from .auth import hash_password

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
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
    return db.query(models.Tag).filter(models.Tag.user_email == user_email).all()

def update_tag(db: Session, tag_id: int, tag_data: schemas.TagUpdate, user_email: str):
    tag = db.query(models.Tag).filter(models.Tag.id == tag_id, models.Tag.user_email == user_email).first()
    if tag:
        if tag_data.tag_name is not None:
            tag.tag_name = tag_data.tag_name
        if tag_data.description is not None:
            tag.description = tag_data.description
        db.commit()
        db.refresh(tag)
    return tag
