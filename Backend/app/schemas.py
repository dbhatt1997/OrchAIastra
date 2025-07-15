from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str
    
class UserProfile(BaseModel):
    username: str
    email: str

    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True

class TagBase(BaseModel):
    tag_name: str
    description: str | None = None

class TagCreate(TagBase):
    pass

class TagUpdate(BaseModel):
    tag_name: str | None = None
    description: str | None = None

class TagOut(TagBase):
    id: int

    class Config:
        from_attributes = True
