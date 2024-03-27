from sqlalchemy.orm import Session
from database.instance import engine
from database.models import History
from datetime import datetime

def get_history_by_session_id(session_id: str):
    with Session(engine) as session:
        return session.query(History).filter_by(session_id=session_id).all()

def add_to_history(session_id: str, message: str, title: str, is_from_client: bool):
    with Session(engine) as session:
        new_history_item = History(
            message=message,
            title=title, 
            timestamp=datetime.now(), 
            session_id=session_id,
            is_from_client=is_from_client
        )
        session.add(new_history_item)
        session.commit()

        return new_history_item.to_dict()
