import { HelicopterById, Helicopters } from "@/models/vehicle.model"
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
        return endpoint.get<HelicopterById>(enviromentDev.helicopter + `/${ho_id}`)
    } catch (error) {
        throw error
    }
}

export function tranformPatientHelicopterToCar(helicopter_id: string, data: { patient_id: string, car_id: string }) {

    try {
        return endpoint.put(enviromentDev.helicopter + `/${helicopter_id}/tranform_patient_to_car`, data)
    } catch (error) {
        throw error
    }
}

export function updateDriverInHelicopter(ho_id: string, user_id: string) {
    try {
        return endpoint.put<Helicopters>(enviromentDev.helicopter + `/${ho_id}/assign_driver/${user_id}`)
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
    const data = {
        patient_id: patient_id
    }
    try {
        return endpoint.put<Helicopters>(enviromentDev.helicopter + `/${helicopter_id}/assign_patient_belong_helicopter/${helicopter_id}`, data)
    } catch (error) {
        throw error
    }
}

export function unAssingPatientInHelicopter(helicopter_id: string, patient_id: string) {
    const data = {
        patient_id: patient_id
    }
    try {
        return endpoint.put<Helicopters>(enviromentDev.helicopter + `/${helicopter_id}/un_assign_patient_belong_helicopter/${helicopter_id}`, data)
    } catch (error) {
        throw error
    }
}

export function unJiontHelicopter(helicopter_id: string) {
    try {
        return endpoint.put<Helicopters>(enviromentDev.helicopter + `/${helicopter_id}/un_belong_helicopter`)
    } catch (error) {
        throw error
    }
}

export function addHelicopterInMission(mission_id: string, helicopter_id: string) {
    return endpoint.put(`${enviromentDev.mission}/${mission_id}/assign-helicopter-to-mission/${helicopter_id}`)
}

export function unAddHelicopterInMission(mission_id: string, helicopter_id: string) {
    return endpoint.put(`${enviromentDev.mission}/${mission_id}/un-assign-helicopter-to-mission/${helicopter_id}`)
}

