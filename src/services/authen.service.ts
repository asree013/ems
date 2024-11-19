import { Logins } from '@/models/authen.model';
import { endpoint } from './endpoint.service';
import { enviromentDev } from '@/configs/enviroment.dev';
import axios from 'axios';
import { Users } from '@/models/users.model';

const isBrowser = typeof window !== 'undefined';

let Url: string | undefined = ''
if (isBrowser) {
  if (window.location.protocol === 'http:') {
    window.location.hostname === 'localhost' ? Url = enviromentDev.baseUrl_base : Url = enviromentDev.localUrl
  }
  else {
    Url = enviromentDev.baseUrl_base_onLine
  }

}

export function logins(value: Logins) {

  try {
    return axios.post(
      `${Url}${enviromentDev.auth}/sign-in`,
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
  return endpoint.get<Users>(`${enviromentDev.auth}/sign-out`);
}

export function FindUserMe() {
  return endpoint.get<Users>(`${enviromentDev.auth}/me`);
}
export function referfToken() {
  return endpoint.get(`${enviromentDev.auth}/refresh-token`);
}
