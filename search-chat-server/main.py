from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.socketio import socket_app
import uvicorn
from database.instance import Session
from services import session_service, history_service
from utils.config import CLIENT_URL
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/history/{session_id}")
async def get_history(session_id: str):
    session_exists = session_service.session_exists(session_id)
    if (session_exists):
        history_entries = history_service.get_history_by_session_id(session_id)
        return history_entries
    else:
        session_service.save_session(session_id)
        return []

    return history_entries

app.mount("/", socket_app)
