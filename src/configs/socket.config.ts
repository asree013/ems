import { io, Socket } from 'socket.io-client';
import { enviromentDev } from './enviroment.dev';

let socket: Socket;

const isBrowser = typeof window !== 'undefined';

const Url = 'http://157.245.146.67:3333'


if (typeof window !== 'undefined') {
  socket = io(Url, {
    autoConnect: true
  });
}

export { socket };