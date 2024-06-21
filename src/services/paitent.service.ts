import { Patients } from '@/models/patient';
import { endpoint } from './endpoint.service';
import { enviromentDev } from '@/configs/enviroment.dev';
import wretch from 'wretch';
import { AxiosResponse } from 'axios';

export async function findPatientAll(
  page: number = 0,
  limit: number = 10,
): Promise<AxiosResponse<Patients[]>> {
  try {
    const response = await endpoint.get<Patients[]>(
      `${enviromentDev.patient}?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function findPatientById(id: string) {
  try {
    return endpoint.get<Patients>(`${enviromentDev.patient}/${id}`);
  } catch (error) {
    throw error;
  }
}

export function createPatient(item: Patients) {
  try {
    return endpoint.post<Patients>(`${enviromentDev.patient}`, item, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
}

export function updatePatient(patient_id: string, item: Patients) {
  try {
    return endpoint.put<Patients>(
      `${enviromentDev.patient}/${patient_id}`,
      item,
      { withCredentials: true },
    );
  } catch (error) {
    throw error;
  }
}
