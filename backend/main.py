# Основные модули

from datetime import datetime, timedelta, timezone

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext

from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated, List
from sqlalchemy import text
from sqlalchemy.orm import Session
from pydantic import BaseModel
from pydantic_extra_types.phone_numbers import PhoneNumber
from database import LocalSession, engine
import models
from sqlalchemy import exc, select
from fastapi.responses import RedirectResponse

# Модули middleware
from fastapi.middleware.cors import CORSMiddleware

# Код

# openssl rand -hex 32
SECRET_KEY = "SECRET_KEY"

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


app = FastAPI()

origins = [
    "http://localhost:1234/register",
    "http://localhost:1234/login"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    user_id: str
    username: str
    name: str
    second_name: str
    third_name: str
    phonenumber: PhoneNumber
    position: str


class RegisterBase(User):
    hashed_pass: str


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
        raise HTTPException(status_code=409, detail="User exists")


@app.get("/get_users", response_model=List[RegisterModel])
async def get_users(db: db_dependency, skip: int = 0, limit: int = 100):
    # users = db.query(models.Users).offset(skip).limit(limit).all()
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
    raise HTTPException(status_code=200, detail="123")


@app.get('/delete_notes_table')
async def delete(db: db_dependency):
    sql = "DROP TABLE IF EXISTS Notes;"
    db.execute(text(sql))
    models.Base.metadata.create_all(bind=engine)
    raise HTTPException(status_code=200, detail="123")


# Auth

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_user(db: db_dependency, username: str):
    stmt = select(models.Users).where(models.Users.username == username)
    result = db.execute(stmt)
    for obj in result.scalars():
        user_dict = {
            "user_id": obj.user_id,
            "username": obj.username,
            "name": obj.name,
            "second_name": obj.second_name,
            "third_name": obj.third_name,
            "phonenumber": obj.phonenumber,
            "position": obj.position,
            "hashed_pass": obj.hashed_pass,
        }
        return RegisterBase(**user_dict)


def authenticate_user(db: db_dependency, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_pass):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(db: db_dependency, token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
        current_user: Annotated[User, Depends(get_current_user)]
):
    return current_user


@app.post("/token")
async def l_for_access_token(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        db: db_dependency
) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.get("/users/me/", response_model=User)
async def read_users_me(
        current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(
        current_user: Annotated[User, Depends(get_current_active_user)]
):
    return [{"item_id": "Foo", "owner": current_user.username}]
