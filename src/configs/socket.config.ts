import { io, Socket } from 'socket.io-client';
import { enviromentDev } from './enviroment.dev';

let socket: Socket;

const isBrowser = typeof window !== 'undefined';

let Url: string | undefined = ''

function onCheckPath() {
  if(isBrowser){
    if(window.location.protocol === 'http:'){
      window.location.hostname === 'localhost'? Url = enviromentDev.baseUrl_base: Url = enviromentDev.localUrl
      
    }
    else{
      Url = enviromentDev.baseUrl_base_onLine
      console.log(Url);

    }
  }
}

onCheckPath()

if (typeof window !== 'undefined') {
  socket = io(Url, {
    autoConnect: true
  });
}

export { socket };