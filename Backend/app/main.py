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
    if crud.get_user_by_username(db, user_input.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    return crud.create_user(db, user_input)

@app.post("/login")
def login(user_input: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user_input.username)
    if not db_user or not auth.verify_password(user_input.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_access_token({"sub": db_user.username})
    return {"message": "Login Successfull!!","access_token": token}

@app.post("/tags", response_model=schemas.TagOut)
def create_tag(tag: schemas.TagCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.create_tag(db, tag, current_user.email)

@app.get("/tags", response_model=list[schemas.TagOut])
def get_tags(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.get_tags_for_user(db, current_user.email)

@app.put("/tags/{tag_id}", response_model=schemas.TagOut)
def update_tag(tag_id: int, tag: schemas.TagUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    updated_tag = crud.update_tag(db, tag_id, tag, current_user.email)
    if not updated_tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return updated_tag
