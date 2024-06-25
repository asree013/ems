import { Logins } from '@/models/authen.model';
import { endpoint } from './endpoint.service';
import { enviromentDev } from '@/configs/enviroment.dev';
import axios, { AxiosError } from 'axios';
import { Users } from '@/models/users.model';

export function logins(value: Logins) {
  try {
    return axios.post(
      `${enviromentDev.baseUrl}${enviromentDev.auth}/sign-in`,
      {
        username: value.username,
        password: value.password,
      },
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    throw error;
  }
}

export function logout() {
  return endpoint.get(`${enviromentDev.auth}/sign-out`);
}

export function FindUserMe() {
  return endpoint.get<Users>(`${enviromentDev.auth}/me`);
}
export function referfToken() {
  return endpoint.get(`${enviromentDev.auth}/refresh-token`);
}
