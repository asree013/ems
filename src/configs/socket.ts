import { io, Socket } from 'socket.io-client';

let socket: Socket;

if (typeof window !== 'undefined') {
  const protocol = window.location.protocol;
  socket = io(protocol === 'http:' ? 'http://localhost:3333' : 'https://api-ems.m-mert.com/', {
    autoConnect: true
  });
}

export { socket };