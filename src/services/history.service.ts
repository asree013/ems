import { enviromentDev } from '@/configs/enviroment.dev';
import { endpoint } from './endpoint.service';
import { Historys } from '@/models/history.model';
import { checkOnline } from './worker.service';
import { dbDexie } from '@/configs/dexie.config';
import { AxiosResponse } from 'axios';

export async function findHistoryByPatientId(patientId: string) {
  try {
    if(await checkOnline()){
      const result = await endpoint.get<Historys[]>(
        `${enviromentDev.patient}/${patientId}${enviromentDev.history}`,
      );
      await dbDexie.historys.bulkAdd(result.data)
      return result
    } else {
      const data = await dbDexie.historys.toArray()
      return {data} as AxiosResponse
    }
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
