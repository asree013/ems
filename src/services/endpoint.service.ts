import { enviromentDev } from '@/configs/enviroment.dev';
import axios from 'axios';

const isBrowser = typeof window !== 'undefined';

let Url: string | undefined = ''

function onCheckPath() {
  if(isBrowser){
    if(window.location.protocol === 'http:'){
      window.location.hostname === 'localhost'? Url = enviromentDev.baseUrl_base: Url = enviromentDev.localUrl
      console.log(process.env.NEXT_PUBLIC_KEY_VALUE);
      
    }
    else{
      Url = enviromentDev.baseUrl_base_onLine
      console.log(Url);

    }
    
  }
}

onCheckPath()

export const endpoint = axios.create({
  baseURL: Url,
  timeout: 25000,
  withCredentials: true,
});


