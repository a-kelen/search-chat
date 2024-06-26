from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from utils.config import DATABASE_URL
engine = create_engine(DATABASE_URL, echo=True)

Session = sessionmaker(bind=engine)

session = Session()
