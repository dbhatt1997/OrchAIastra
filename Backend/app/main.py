from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import schemas, models, auth
from . import crud
from .database import engine, get_db
from .auth import get_current_user 

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/signup", response_model=schemas.UserOut)
def signup(user_input: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user account.
    
    Args:
        user_input (schemas.UserCreate): User registration data including username, email, and password
        db (Session): Database session dependency
        
    Returns:
        schemas.UserOut: Created user information without sensitive data
        
    Raises:
        HTTPException: 400 error if username already exists
    """
    if crud.get_user_by_username(db, user_input.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    return crud.create_user(db, user_input)

@app.post("/login")
def login(user_input: schemas.UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate user and return access token.
    
    Args:
        user_input (schemas.UserLogin): User login credentials (username and password)
        db (Session): Database session dependency
        
    Returns:
        dict: Success message and JWT access token
        
    Raises:
        HTTPException: 401 error if credentials are invalid
    """
    db_user = crud.get_user_by_username(db, user_input.username)
    if not db_user or not auth.verify_password(user_input.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_access_token({"sub": db_user.username})
    return {"message": "Login Successfull!!","access_token": token}

@app.get("/profile", response_model=schemas.UserProfile)
def get_profile(current_user: models.User = Depends(get_current_user)):
    """Retrieve the profile of the currently authenticated user.
    Args:
        current_user (models.User): Currently authenticated user object
    Returns:
        schemas.UserProfile: User profile information including username and email
    """
    return current_user

@app.post("/tags", response_model=schemas.TagOut)
def create_tag(tag: schemas.TagCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """
    Create a new tag for the authenticated user.
    
    Args:
        tag (schemas.TagCreate): Tag data including name and description
        db (Session): Database session dependency
        current_user (models.User): Currently authenticated user
        
    Returns:
        schemas.TagOut: Created tag information
    """
    return crud.create_tag(db, tag, current_user.email)

@app.get("/tags", response_model=list[schemas.TagOut])
def get_tags(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """
    Retrieve all tags belonging to the authenticated user.
    
    Args:
        db (Session): Database session dependency
        current_user (models.User): Currently authenticated user
        
    Returns:
        list[schemas.TagOut]: List of user's tags
    """
    return crud.get_tags_for_user(db, current_user.email)

@app.put("/tags/{tag_id}", response_model=schemas.TagOut)
def update_tag(tag_id: int, tag: schemas.TagUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """
    Update an existing tag owned by the authenticated user.
    
    Args:
        tag_id (int): ID of the tag to update
        tag (schemas.TagUpdate): Updated tag data
        db (Session): Database session dependency
        current_user (models.User): Currently authenticated user
        
    Returns:
        schemas.TagOut: Updated tag information
        
    Raises:
        HTTPException: 404 error if tag not found or doesn't belong to user
    """
    updated_tag = crud.update_tag(db, tag_id, tag, current_user.email)
    if not updated_tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return updated_tag
