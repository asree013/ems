import { enviromentDev } from '@/configs/enviroment.dev';
import { endpoint } from './endpoint.service';
import { Historys } from '@/models/history.model';

export function findHistoryByPatientId(patientId: string) {
  try {
    return endpoint.get<Historys[]>(
      `${enviromentDev.patient}/${patientId}${enviromentDev.history}`,
    );
  } catch (error) {
    throw error;
  }
}

export function findHistoryByPatientIdById(
  patientId: string,
  history_id: string,
) {
  try {
    return endpoint.get<Historys>(
      `${enviromentDev.patient}/${patientId}${enviromentDev.history}/${history_id}`,
    );
  } catch (error) {
    throw error;
  }
}

export function createHistory(data: Historys) {
  try {
    return endpoint.post<Historys>(
      `${enviromentDev.patient}/${data.patient_id}${enviromentDev.history}`,
      data,
    );
  } catch (error) {
    throw error;
  }
}
