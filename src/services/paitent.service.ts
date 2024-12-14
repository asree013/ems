
import { Patients } from '@/models/patient';
import { endpoint } from './endpoint.service';
import { enviromentDev } from '@/configs/enviroment.dev';
import { AxiosResponse } from 'axios';
import { dbDexie } from '@/configs/dexie.config';
import { v4 } from 'uuid';


let isOnline = false

const isNavigator = typeof navigator !== 'undefined'
if (isNavigator) {
    isOnline = navigator.onLine
}

export async function findPatientAll(
  page: number = 0,
  limit: number = 10,
): Promise<AxiosResponse<Patients[]>> {
  try {

    if (isOnline) {
      const response = await endpoint.get<Patients[]>(
        `${enviromentDev.patient}?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        },
      )
      return response;
    }
    else {
      const allPatients = await dbDexie.patients.toArray().catch(e => null);
      const data = allPatients
      return { data } as AxiosResponse
    }
  } catch (error) {
    throw error;
  }
}

export async function findPatientById(id: string): Promise<AxiosResponse<Patients>> {
  try {
    if (isOnline) {
      return endpoint.get<Patients>(`${enviromentDev.patient}/${id}`);
    } else {
      const p = await dbDexie.patients.where('id').equals(id).toArray()
      const data = p[0]
      return { data } as AxiosResponse
    }

  } catch (error) {
    throw error;
  }
}

export async function findPatientByQrNumber(qrNumber: string) {
  try {
    if (isOnline) {
      return endpoint.get<Patients>(`${enviromentDev.patient}/get-by-qr-number/${qrNumber}`);
    } else {
      const data = await dbDexie.patients.where('qr_number').equals(qrNumber)
      return { data } as AxiosResponse
    }

  } catch (error) {
    throw error;
  }
}

export async function createPatient(item: Patients) {
  try {
    if (isOnline) {
      const create = await endpoint.post<Patients>(`${enviromentDev.patient}`, item, {
        withCredentials: true,
      });
      return create
    } else {
      item.id = v4()
      const data = await dbDexie.patients.add(item)
      console.log(data);

      return { data } as AxiosResponse
    }
  } catch (error) {
    throw error;
  }
}

export async function updatePatient(patient_id: string, item: Patients) {
  try {
    if (isOnline) {
      const update = await endpoint.put<Patients>(
        `${enviromentDev.patient}/${patient_id}`,
        item,
        { withCredentials: true },
      );
      await dbDexie.patients.update('id', { ...update.data })
      return update
    } else {
      item.id = v4()
      const data = await dbDexie.patients.add(item)
      return { data } as AxiosResponse
    }
  } catch (error) {
    throw error;
  }
}
