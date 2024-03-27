import { useEffect } from 'preact/hooks';
import { socket } from './socket';
import { setIsConnected, setCurrentId, persistantId, setPersistantId, addToHistoryReceivedMessage, addToHistoryPersonalMessage } from './store';

export const useSocket = () => {
    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
          if (!persistantId.value) {
            const sid = socket.id;
            socket.auth = { sid };
            localStorage.setItem('sessionId', sid);
            setCurrentId(sid);
            setPersistantId(sid);
          } else {
            setCurrentId(socket.id);
          }
          socket.on(persistantId.value, (e) => {});
        }

        function onDisconnect() {
          setIsConnected(false);
        }

        function onResultEvent(value) {
          const historyItem = JSON.parse(value);
          addToHistoryReceivedMessage(historyItem);
        }

        function onQueryReverseEvent(value) {
          addToHistoryPersonalMessage(value);
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('result', onResultEvent);
        socket.on('query-reverse', onQueryReverseEvent);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('result', onResultEvent);
          socket.off('query-reverse', onQueryReverseEvent);
        };
      }, []);
}