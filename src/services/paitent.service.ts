import { Patients } from "@/models/patient";
import { endpoint } from "./endpoint.service";
import { enviromentDev } from "@/interfaces/enviroment.dev";

export function findPatientAll(page?: number, limit?: number) {
  if (!page) page = 0;
  if (!limit) limit = 10;
  try {
    return endpoint.get<Patients[]>(
      `${enviromentDev.patient}?page=${page}&limit=${limit}`, {
        withCredentials: true, 
    }
    );
  } catch (error) {
    throw error;
  }
}

export function findPatientById(patient_id: string) {

  try {
    return endpoint.get<Patients>(`${enviromentDev.patient}/${patient_id}`, { 
      withCredentials: true,
    })
  } catch (error) {
    throw error
  }
}

export function createPatient(item: Patients) {
  try {
    return endpoint.post<Patients>(`${enviromentDev.patient}`, item, { 
      withCredentials: true,
    })
  } catch (error) {
    throw error
  }
}

export function updatePatient(patient_id: string, item: Patients) {
  try {
    return endpoint.put<Patients>(`${enviromentDev.patient}/${patient_id}`, item, { withCredentials: true })
  } catch (error) {
    throw error
  }
}