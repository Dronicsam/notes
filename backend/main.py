# Основные модули

from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy import text
from sqlalchemy.orm import Session
from pydantic import BaseModel
from pydantic_extra_types.phone_numbers import PhoneNumber
from database import LocalSession, engine
import models
from sqlalchemy import exc
from fastapi.responses import RedirectResponse
import auth

# Модули middleware
from fastapi.middleware.cors import CORSMiddleware

# Код

app = FastAPI()

app.include_router(auth.router)

origins = [
    "http://localhost:1234/register"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class RegisterBase(BaseModel):
    user_id: int
    login: str
    hashed_pass: str
    name: str
    second_name: str
    third_name: str
    phonenumber: PhoneNumber
    position: str


class RegisterModel(RegisterBase):
    class Config:
        from_attributes = True


class NoteBase(BaseModel):
    user_id: int
    note_name: str
    text: str
    date: str
    author: str
    was_checked: bool


class NoteModel(NoteBase):
    class Config:
        from_attributes = True


def get_db():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)


@app.get("/")
def docs():
    return RedirectResponse("http://127.0.0.1:8000/docs")


@app.post("/upload_note", response_model=NoteModel)
async def upload_note(note: NoteBase, db: db_dependency):
    db_upload = models.Notes(**note.model_dump())
    db.add(db_upload)
    db.commit()
    db.refresh(db_upload)
    return db_upload


@app.post("/register_complete", response_model=RegisterModel)
async def create_user(data: RegisterBase, db: db_dependency):
    try:
        db_upload = models.Users(**data.model_dump())
        db.add(db_upload)
        db.commit()
        db.refresh(db_upload)
        return db_upload
    except exc.IntegrityError:
        raise HTTPException(status_code=200, detail="User exists")
    


@app.get("/get_users", response_model=List[RegisterModel])
async def get_user(db: db_dependency, skip: int = 0, limit: int = 100):
    users = db.query(models.Users).offset(skip).limit(limit).all()
    return users


@app.get("/get_notes", response_model=List[NoteModel])
async def get_notes(db: db_dependency, skip: int = 0, limit: int = 100):
    notes = db.query(models.Notes).offset(skip).limit(limit).all()
    return notes


@app.get('/delete_users_table')
async def delete(db: db_dependency):
    sql = "DROP TABLE IF EXISTS Users;"
    db.execute(text(sql))
    models.Base.metadata.create_all(bind=engine)
    raise HTTPException(state_code=200, detail="123")


@app.get('/delete_notes_table')
async def delete(db: db_dependency):
    sql = "DROP TABLE IF EXISTS Notes;"
    db.execute(text(sql))
    models.Base.metadata.create_all(bind=engine)
    raise HTTPException(status_code=200, detail="123")
