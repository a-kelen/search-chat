from sqlalchemy.orm import Session as DbSession
from database.instance import engine
from database.models import Session

def session_exists(session_id: str):
    session = get_session(session_id)
    return session is not None

def get_session(session_id: str):
    with DbSession(engine) as db_session:
        return db_session.query(Session).filter_by(session_id=session_id).first()

def save_session(session_id: str):
    with DbSession(engine) as db_session:
        new_session = Session(session_id=session_id)
        db_session.add(new_session)
        db_session.commit()

        return new_session
