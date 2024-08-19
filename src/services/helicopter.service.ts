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