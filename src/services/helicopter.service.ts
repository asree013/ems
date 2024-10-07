import { Helicopters } from "@/models/vehicle.model"
import { endpoint } from "./endpoint.service"
import { enviromentDev } from "@/configs/enviroment.dev"

export function createHelicopter(data: Helicopters) {
    try {
        return endpoint.post<Helicopters>(enviromentDev.helicopter, data)
    } catch (error) {
        throw error
    }
}

export function findHalecopterAll() {
    try {
        return endpoint.get<Helicopters[]>(enviromentDev.helicopter)
    } catch (error) {
        throw error
    }
}

export function findHelicopterById(ho_id: string) {
    try {
        return endpoint.get<Helicopters>(enviromentDev.helicopter+ `/${ho_id}`)
    } catch (error) {
        throw error
    }
}

export function tranformPatientHelicopterToCar(helicopter_id: string, data: {patient_id: string, car_id: string}) {

    try {
        return endpoint.put(enviromentDev.helicopter + `/${helicopter_id}/tranform_patient_to_car`, data)
    } catch (error) {
        throw error
    }
}

export function updateDriverInHelicopter(ho_id: string, user_id: string){
    try {
        return endpoint.put<Helicopters>(enviromentDev.helicopter+ `/${ho_id}/assign_driver/${user_id}`)
    } catch (error) {
        throw error
    }
}

export function updateUserInHelicpter(ho_id: string) {
    try {
        return endpoint.put<Helicopters>(enviromentDev.helicopter + `/${ho_id}/belong_helicopter`)
    } catch (error) {
        throw error
    }
}

export function assingPatientInHelicopter(helicopter_id: string, patient_id: string) {
    try {
        return endpoint.put<Helicopters>(enviromentDev.helicopter + `/${helicopter_id}/assign_user_belong_in_helicopter/${patient_id}`)
    } catch (error) {
        throw error
    }
}