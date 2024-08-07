import { io, Socket } from 'socket.io-client';
export const socket: Socket = io('https://ems.monitor-test.cloud');
