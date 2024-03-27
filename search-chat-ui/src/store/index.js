import { batch, signal } from "@preact/signals";
import { socket } from '../socket';
import { makeId } from "../utils";

export const query = signal('');

export function setQuery(value) {
    query.value = value;
}

export const history = signal([]);

export function setHistory(value) {
    history.value = value;
}

export function sendMessage() {
    socket.emit('query', query.value);
    query.value = '';
}

export function addToHistoryPersonalMessage(message) {
    history.value = [
        ...history.value, 
        {
            id: makeId(10),
            message,
            title: null,
            is_from_client: true
        }
    ];
} 

export function addToHistoryReceivedMessage(item) {
    history.value = [
        ...history.value, 
        item
    ];
} 

export const isConnected = signal(socket.connected);

export function setIsConnected(value) {
    isConnected.value = value;
}

export const currentId = signal('');

export function setCurrentId(value) {
    currentId.value = value;
}

export const persistantId = signal(localStorage.getItem('sessionId'));

export function setPersistantId(value) {
    persistantId.value = value;
}
