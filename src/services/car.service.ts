import { CarByCarId, Cars } from "@/models/vehicle.model";
import { endpoint } from "./endpoint.service";
import { enviromentDev } from "@/configs/enviroment.dev";

export function createCar(data: Cars){
    try {
        return endpoint.post<Cars>(enviromentDev.car, data)
    } catch (error) {
        throw error
    }
}

export function findCarAll(page?:number, limit?: number){
    try {
        return endpoint.get<Cars[]>(enviromentDev.car+ `?page=${page?? 0}&limit=${limit?? 10}`)
    } catch (error) {
        throw error
    }
}

export function findCarByCarId(car_id: string){
    try {
        return endpoint.get<CarByCarId>(enviromentDev.car+ `/${car_id}`)
    } catch (error) {
        throw error
    }
}

export function updateDriverInCar(car_id: string, user_id: string){
    try {
        return endpoint.put<Cars>(enviromentDev.car+ `/${car_id}/assign_driver/${user_id}`)
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

export function assingPatinetToCarByCarIdAndPatientId(car_id: string, patient_id: string) {
    
    const data = {
        patient_id: patient_id
    }
    try {
        return endpoint.put<Cars>(enviromentDev.car + `/${car_id}/assign_patient_belong_car/${car_id}`, data)
    } catch (error) {
        throw error
    }
}

export function unAssingPatinetToCarByCarIdAndPatientId(car_id: string, patient_id: string) {
    const data = {
        patient_id: patient_id
    }
    try {
        return endpoint.put<Cars>(enviromentDev.car + `/${car_id}/un_assign_patient_belong_car/${car_id}`, data)
    } catch (error) {
        throw error
    }
}

export function tranfromPatientCarToHelicopter(car_id: string, data: {patient_id: string, helicopter_id: string}) {
    try {
        return endpoint.put(`${enviromentDev.car}/${car_id}/tranform_patient_to_helicopter`, data)
    } catch (error) {
        throw error
    }
}
