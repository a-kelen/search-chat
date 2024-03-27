import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SERVER_URL;

export const socket = io(URL, {
    withCredentials: true,
    auth: {
        sid: localStorage.getItem('sessionId')
    },
});
