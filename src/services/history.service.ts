
import { enviromentDev } from '@/configs/enviroment.dev';
import { endpoint } from './endpoint.service';
import { Historys } from '@/models/history.model';
import { dbDexie } from '@/configs/dexie.config';
import { AxiosResponse } from 'axios';
import { v4 } from 'uuid';

let isOnline = false

const isNavigator = typeof navigator !== 'undefined'
if (isNavigator) {
    isOnline = navigator.onLine
}

export async function findHistoryByPatientId(patientId: string) {
  try {
    if(isOnline){
      const result = await endpoint.get<Historys[]>(
        `${enviromentDev.patient}/${patientId}${enviromentDev.history}`,
      );
      return result
    } else {
      const findHistory = await dbDexie.historys.toArray()
      const data = findHistory.filter(r => r.patient_id === patientId)
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

export async function createHistory(item: Historys) {
  try {
    if(isOnline){
      const res = await endpoint.post<Historys>(
        `${enviromentDev.patient}/${item.patient_id}${enviromentDev.history}`,
        item,
      );
      return res
    }
    else {
      item.id = v4()
      const findP = await dbDexie.patients.where('id').equals(item.patient_id).toArray()
      item.Patient = findP[0]
      item.create_date = String(new Date())
      item.update_date = String(new Date())
      const data = await dbDexie.historys.add(item).catch(e => null)
      const fv = await dbDexie.currentVehicle.toArray()
      for (let index = 0; index < fv[0].car.Car.PatientBelongCar.length; index++) {
        const element = fv[0].car.Car.PatientBelongCar[index];
        
      }
      return {data} as AxiosResponse
    }
  } catch (error) {
    throw error;
  }
}
