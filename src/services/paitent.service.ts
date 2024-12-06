import { Patients } from '@/models/patient';
import { endpoint } from './endpoint.service';
import { enviromentDev } from '@/configs/enviroment.dev';
import { AxiosResponse } from 'axios';
import { checkOnline } from './worker.service';
import { dbDexie } from '@/configs/dexie.config';
import { v4 } from 'uuid';

export async function findPatientAll(
  page: number = 0,
  limit: number = 10,
): Promise<AxiosResponse<Patients[]>> {
  try {

    if (await checkOnline()) {
      const response = await endpoint.get<Patients[]>(
        `${enviromentDev.patient}?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        },
      );
      const allPatients = await response.data;
      const uniquePatients = new Map<string, Patients>();

      allPatients.forEach(patient => {
        uniquePatients.set(patient.id, patient);
      });
      const data = Array.from(uniquePatients.values());
      console.log(data);
      
      dbDexie.patients.bulkAdd(data).catch(e => console.log(e)
      )

      return response;
    }
    else {
      const allPatients = await dbDexie.patients.toArray();
      const uniquePatients = new Map<string, Patients>();

      allPatients.forEach(patient => {
        uniquePatients.set(patient.id, patient);
      });

      const data = Array.from(uniquePatients.values());

      return { data } as AxiosResponse
    }
  } catch (error) {
    throw error;
  }
}

export async function findPatientById(id: string) {
  try {
    if (await checkOnline()) {
      return endpoint.get<Patients>(`${enviromentDev.patient}/${id}`);
    } else {
      const data = await dbDexie.patients.where('id').equals(id)
      return { data } as AxiosResponse
    }

  } catch (error) {
    throw error;
  }
}

export async function findPatientByQrNumber(qrNumber: string) {
  try {
    if (await checkOnline()) {
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
    if (await checkOnline()) {
      const create = await endpoint.post<Patients>(`${enviromentDev.patient}`, item, {
        withCredentials: true,
      });
      await dbDexie.patients.add(create.data)
      return create
    } else {
      item.id = v4()
      const data = await dbDexie.patients.add(item)
      return { data } as AxiosResponse
    }
  } catch (error) {
    throw error;
  }
}

export async function updatePatient(patient_id: string, item: Patients) {
  try {
    if (await checkOnline()) {
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
