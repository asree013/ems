import { Logins } from '@/models/authen.model';
import { endpoint } from './endpoint.service';
import { enviromentDev } from '@/configs/enviroment.dev';
import axios, { AxiosResponse } from 'axios';
import { Users } from '@/models/users.model';
import { dbDexie } from '@/configs/dexie.config';

const isBrowser = typeof window !== 'undefined';

let Url: string | undefined = ''
let isOnline = false
const isNavigator = typeof navigator !== 'undefined'
if (isNavigator) {
    isOnline = navigator.onLine
}


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

export async function FindUserMe() {
  const online = navigator.onLine
  if(online){
    const result = await endpoint.get<Users>(`${enviromentDev.auth}/me`);
    dbDexie.userFindMe.add(result.data).catch(e => null)
    return result
  } else{
    const newData = await dbDexie.userFindMe.toArray()
    const data = newData[0]
    return {data} as AxiosResponse  
  }
}
export function referfToken() {
  return endpoint.get(`${enviromentDev.auth}/refresh-token`);
}
