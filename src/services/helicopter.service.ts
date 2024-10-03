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

export function tranformPatientHelicopterToCar(helicopter_id: string, data: {patient_id: string, car_id: string}) {

    try {
        return endpoint.put(enviromentDev.helicopter + `/${helicopter_id}/tranform_patient_to_car`, data)
    } catch (error) {
        throw error
    }
}