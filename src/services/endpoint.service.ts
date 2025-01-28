import { enviromentDev } from '@/configs/enviroment.dev';
import axios from 'axios';

export const getUrl = (): string | undefined => {
  return enviromentDev.baseUrl_base_v1
};

export const getUrlFroFindMe = (): string | undefined => {
  if (window) {
    console.log('hostname ', window.location.protocol);
    return window.location.protocol === 'http:' ?
      enviromentDev.baseUrl_base_v2 :
      enviromentDev.baseUrl_base_v1

  }
};

export const getIsOnline = (): boolean => {
  return typeof navigator !== 'undefined' && navigator.onLine;
};

export function getJwt(): string | null {
  if (typeof window !== 'undefined') {
    const jwt = localStorage.getItem('jwt');
    return jwt
  }
  else {
    return ''
  }
}

export const endpoint = axios.create({
  baseURL: getUrl(),
  timeout: 25000,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getJwt()}`
  }
});


