from database import Base
from sqlalchemy import Integer, String, Boolean, Column


class Users(Base):
    __tablename__ = "users"
    
    user_id = Column(String, primary_key=True)
    login = Column(String, unique=True)
    hashed_pass = Column(String)
    name = Column(String)
    second_name = Column(String)
    third_name = Column(String)
    phonenumber = Column(String, unique=True)
    position = Column(String)
    
    
class Notes(Base):
    __tablename__ = "notes"
    
    user_id = Column(String, primary_key=True)
    note_name = Column(String)
    text = Column(String)
    date = Column(String)
    author = Column(String)
    was_checked = Column(Boolean)
