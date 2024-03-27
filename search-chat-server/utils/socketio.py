import socketio
import json
from services import history_service, search_service, session_service
from utils.search_response import SearchResponse

sio = socketio.AsyncServer(cors_allowed_origins=[], async_mode="asgi")
socket_app = socketio.ASGIApp(sio)

@sio.on("connect")
async def connect(sid: str, env, auth):
    persistent_sid = auth['sid']
    if (persistent_sid is None):
        await sio.enter_room(sid, sid)
        await sio.save_session(sid, {'persistent': sid})
        session_service.save_session(sid)
    else:
        await sio.enter_room(sid, persistent_sid)
        await sio.save_session(sid, {'persistent': persistent_sid})

    print(f"Client Connected: {sid}. Persistent ID: {persistent_sid}")

@sio.on("disconnect")
async def disconnect(sid):
    session = await sio.get_session(sid)
    await sio.leave_room(sid, session['persistent'])
    
    print(f"Client Disconnected: {sid}")

@sio.on("query")
async def handle_query(sid: str, message: str):
    session = await sio.get_session(sid)
    persistent_sid = session['persistent']
    
    await sio.emit("query-reverse", message, room=persistent_sid)
    
    if message is not None and message.strip() != "":
        history_service.add_to_history(session_id=persistent_sid, message=message, title=None, is_from_client=True)
        result = search_service.get_result(message)
        # uncomment this if you want to not address to API 
        # result = SearchResponse(title="Lorem title", message="Lorem message")
        added_hitory_item = history_service.add_to_history(session_id=persistent_sid, message=result.message, title=result.title, is_from_client=False)
        
        json_string = json.dumps(added_hitory_item)
        await sio.emit("result", json_string, room=persistent_sid)
