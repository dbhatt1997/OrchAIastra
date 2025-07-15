from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import schemas, models, auth
from . import crud
from .database import engine, get_db

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
    return {"message": "Login Successfull!!","access_token": token, "token_type": "bearer"}
