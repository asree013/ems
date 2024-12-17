import { enviromentDev } from '@/configs/enviroment.dev';
import axios from 'axios';

export const getUrl = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;

  if (window.location.protocol === 'http:') {
    return window.location.hostname === 'localhost'
      ? enviromentDev.baseUrl_base
      : enviromentDev.localUrl;
  } else {
    return enviromentDev.baseUrl_base_onLine;
  }
};

export const getIsOnline = (): boolean => {
  return typeof navigator !== 'undefined' && navigator.onLine;
};

// const jwt = localStorage.getItem('jwt')

// if(!jwt) alert('is not jwt')

export const endpoint = axios.create({
  baseURL: getUrl(),
  timeout: 25000,
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${String(jwt)}`
  // }
});


