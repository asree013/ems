import { enviromentDev } from "@/configs/enviroment.dev";
import { endpoint } from "./endpoint.service";
import { Ships, TypeShips } from "@/models/vehicle.model";

export function findShipAll(page: number, limit: number) {
    try {
        return endpoint.get(enviromentDev.ship + `?page=${page}&limit=${limit}`)
    } catch (error) {
        throw error
    }
}

export function findShipById(ship_id: string) {
    try {
        return endpoint.get(enviromentDev.ship + `/${ship_id}`)
    } catch (error) {
        throw error
    }
}

export function creaetShip(data: Ships){
    try {
        return endpoint.post<Ships>(enviromentDev.ship, data)
    } catch (error) {
        throw error
    }
}

export function findTypeShipAll(page: number, limit: number){
    try {
        return endpoint.get<TypeShips[]>(enviromentDev.typeShip + `?page=${page}&limit=${limit}`)
    } catch (error) {
        throw error
    }
}
