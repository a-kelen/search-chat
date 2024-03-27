from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from database.instance import engine

Base = declarative_base()

class Session(Base):
    __tablename__ = 'sessions'

    id = Column(Integer, primary_key=True)
    session_id = Column(String, unique=True, nullable=False)

    history_entries = relationship("History", back_populates="session")


class History(Base):
    __tablename__ = 'history'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    message = Column(String, nullable=False)
    is_from_client = Column(Boolean, nullable=False)
    timestamp = Column(DateTime, nullable=False)
    
    session_id = Column(Integer, ForeignKey('sessions.session_id'))
    session = relationship("Session", back_populates="history_entries")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'message': self.message,
            'isFromClient': self.is_from_client,
            'sessionId': self.session_id,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }

Base.metadata.create_all(engine)
