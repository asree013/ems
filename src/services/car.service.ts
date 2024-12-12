import { CarByCarId, Cars, Vehicles } from "@/models/vehicle.model";
import { endpoint } from "./endpoint.service";
import { enviromentDev } from "@/configs/enviroment.dev";
import { checkOnline } from "./worker.service";
import { dbDexie } from "@/configs/dexie.config";
import { HistoryInVehicle, PatientBelongCar, Patients } from "@/models/patient";
import { AxiosResponse } from "axios";

export function createCar(data: Cars) {
    try {
        return endpoint.post<Cars>(enviromentDev.car, data)
    } catch (error) {
        throw error
    }
}

export function findCarAll(page?: number, limit?: number) {
    try {
        return endpoint.get<Cars[]>(enviromentDev.car + `?page=${page ?? 0}&limit=${limit ?? 10}`)
    } catch (error) {
        throw error
    }
}

export function findCarByCarId(car_id: string) {
    try {
        return endpoint.get<CarByCarId>(enviromentDev.car + `/${car_id}`)
    } catch (error) {
        throw error
    }
}

export function updateDriverInCar(car_id: string, user_id: string) {
    try {
        return endpoint.put<Cars>(enviromentDev.car + `/${car_id}/assign_driver/${user_id}`)
    } catch (error) {
        throw error
    }
}

export function updateUserInCar(car_id: string) {
    try {
        return endpoint.put<Cars>(enviromentDev.car + `/${car_id}/belong_car`)
    } catch (error) {
        throw error
    }
}

export async function assingPatinetToCarByCarIdAndPatientId(car_id: string, patient_id: string) {

    const data = {
        patient_id: patient_id
    }
    try {
        if (await checkOnline()) {
            const res = await endpoint.put<Cars>(enviromentDev.car + `/${car_id}/assign_patient_belong_car/${car_id}`, data)
            return res
        } else {
            const findP = await dbDexie.patients.where('id').equals(patient_id).toArray()
            const findCV = await dbDexie.currentVehicle.toArray()
            if (!findP[0]) {
                console.error("Patient not found");
                return;
            }

            if (!findCV[0] || !findCV[0].car || !findCV[0].car.Car || !findCV[0].car.Car.PatientBelongCar) {
                console.error("Vehicle structure is incorrect or not found");
                return;
            }

            const pbc = {} as PatientBelongCar;
            pbc.Patient = findP[0];
            pbc.car_id = findCV[0].car.car_id
            pbc.Patient.History = {} as HistoryInVehicle[]

            findCV[0].car.Car.PatientBelongCar.push(pbc);

            await dbDexie.currentVehicle.clear().catch(e => null)
            await dbDexie.currentVehicle.add(findCV[0])
            const data = findCV[0]
            return {data} as AxiosResponse
        }
    } catch (error) {
        throw error
    }
}

export async function unAssingPatinetToCarByCarIdAndPatientId(car_id: string, patient_id: string) {
    const data = {
        patient_id: patient_id
    }
    try {
        if (await checkOnline()) {
            const response = await endpoint.put<Cars>(enviromentDev.car + `/${car_id}/un_assign_patient_belong_car/${car_id}`, data)
            return response
        }
        else {
            const findP = await dbDexie.patients.where('id').equals(patient_id).toArray()
            const findCV = await dbDexie.currentVehicle.toArray()
            if (!findP[0]) {
                console.error("Patient not found");
                return;
            }

            if (!findCV[0] || !findCV[0].car || !findCV[0].car.Car || !findCV[0].car.Car.PatientBelongCar) {
                console.error("Vehicle structure is incorrect or not found");
                return;
            }
            
            const newdata = findCV[0].car.Car.PatientBelongCar.filter(r => r.Patient.id !== patient_id);
            findCV[0].car.Car.PatientBelongCar = newdata            
            
            await dbDexie.currentVehicle.clear().catch(e => null)
            await dbDexie.currentVehicle.add(findCV[0])
            const data = findCV[0]
            return {data} as AxiosResponse
        }
    } catch (error) {
        throw error
    }
}

export function tranfromPatientCarToHelicopter(car_id: string, data: { patient_id: string, helicopter_id: string }) {
    try {
        return endpoint.put(`${enviromentDev.car}/${car_id}/tranform_patient_to_helicopter`, data)
    } catch (error) {
        throw error
    }
}

export function unJoinCar(car_id: string) {
    try {
        return endpoint.put(`${enviromentDev.car}/${car_id}/un_belong_car`)
    } catch (error) {
        throw error
    }
}


