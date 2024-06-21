import { enviromentDev } from '@/configs/enviroment.dev';
import axios from 'axios';

export const endpoint = axios.create({
  baseURL: enviromentDev.baseUrl,
  timeout: 5000,
  withCredentials: true,
});
// endpoint.defaults.withCredentials = true

// ฟังก์ชันในการดึงค่า access_token จากคุกกี้
// function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//   return null;
// }

// endpoint.interceptors.request.use(config => {
//   const accessToken = getCookie('access_token');
//   if (accessToken) {
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//   }
//   config.headers['Content-Type'] = 'application/json';
//   return config;
// }, error => {
//   return Promise.reject(error);
// });
