from database import Base
from sqlalchemy import Integer, String, Boolean, Column


class Users(Base):
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, index=True)
    login = Column(String)
    hashed_pass = Column(String)
    name = Column(String)
    second_name = Column(String)
    third_name = Column(String)
    phonenumber = Column(Integer, unique=True)
    position = Column(String)
    
    
class Notes(Base):
    __tablename__ = "notes"
    
    user_id = Column(Integer, primary_key=True)
    note_name = Column(String)
    text = Column(String)
    date = Column(String)
    author = Column(String)
    was_checked = Column(Boolean)
