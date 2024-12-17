import { Logins } from '@/models/authen.model';
import { endpoint, getIsOnline, getUrl } from './endpoint.service';
import { enviromentDev } from '@/configs/enviroment.dev';
import axios, { AxiosResponse } from 'axios';
import { Users } from '@/models/users.model';
import { dbDexie } from '@/configs/dexie.config';

export function logins(value: Logins) {

  try {
    return axios.post(
      `${getUrl()}${enviromentDev.auth}/sign-in`,
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

export async function FindUserMe() {

  if (getIsOnline()) {
    const jwt = localStorage.getItem('jwt')

    if (!jwt) alert('is not jwt')
    const result = await axios.get<Users>(`${getUrl()}${enviromentDev.auth}/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`, 
      },
    });
    dbDexie.userFindMe.add(result.data).catch(e => null)
    return result
  } else {
    const newData = await dbDexie.userFindMe.toArray()
    const data = newData[0]
    return { data } as AxiosResponse
  }
}
export function referfToken() {
  return endpoint.get(`${enviromentDev.auth}/refresh-token`);
}
