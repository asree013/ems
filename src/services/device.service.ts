
import { enviromentDev } from '../configs/enviroment.dev';
import { endpoint } from './endpoint.service';

export async function findDeviceAll() {
  try {
    const result = await endpoint<Device[]>(`${enviromentDev.device}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export function createDevice(item: Device) {
  console.log('item: ', item);

  try {
    return endpoint.post<Device>(`${enviromentDev.device}`, item);
  } catch (error) {
    throw error;
  }
}

export function validateDeviceId(device_id: string) {
  try {
    return endpoint.get<Device>(
      `${enviromentDev.device}/get-by-device-id/${device_id}`,
    );
  } catch (error) {
    throw error;
  }
}

export function findDeviceById(device_id: string) {
  try {
    return endpoint.get<Device>(`${enviromentDev.device}/${device_id}`);
  } catch (error) {
    throw error;
  }
}

export function editDeviceById(device_id: string, item: Device) {
  try {
    return endpoint.put<Device>(`${enviromentDev.device}/${device_id}`, item);
  } catch (error) {
    throw error;
  }
}
