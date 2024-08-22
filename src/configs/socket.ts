import { io, Socket } from 'socket.io-client';
export const socket: Socket = io('https://api-ems.m-mert.com');
