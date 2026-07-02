import { io } from 'socket.io-client';

let socket = null;

const socketUrl = () => (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

export const connectSocket = (token) => {
  if (socket) socket.disconnect();
  socket = io(socketUrl(), { auth: { token }, transports: ['websocket', 'polling'] });
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
  socket = null;
};