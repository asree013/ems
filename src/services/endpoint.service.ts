import { enviromentDev } from '@/configs/enviroment.dev';
import axios from 'axios';

const isBrowser = typeof window !== 'undefined';

export const endpoint = axios.create({
  baseURL: isBrowser && window.location.protocol === 'http:'
    ? enviromentDev.localUrl
    : enviromentDev.baseUrl,
  timeout: 5000,
  withCredentials: true,
});
