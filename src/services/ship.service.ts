import { enviromentDev } from "@/configs/enviroment.dev";
import { endpoint } from "./endpoint.service";
import { ShipById, Ships, TypeShips } from "@/models/vehicle.model";

export function findShipAll(page: number, limit: number) {
    try {
        return endpoint.get(enviromentDev.ship + `?page=${page}&limit=${limit}`)
    } catch (error) {
        throw error
    }
}

export function findShipById(ship_id: string) {
    try {
        return endpoint.get<ShipById>(enviromentDev.ship + `/${ship_id}`)
    } catch (error) {
        throw error
    }
}

export function creaetShip(data: Ships) {
    try {
        return endpoint.post<Ships>(enviromentDev.ship, data)
    } catch (error) {
        throw error
    }
}

export function findTypeShipAll(page: number, limit: number) {
    try {
        return endpoint.get<TypeShips[]>(enviromentDev.typeShip + `?page=${page}&limit=${limit}`)
    } catch (error) {
        throw error
    }
}

export function assingBelongShip(ship_id: string) {
    return endpoint.put(enviromentDev.ship + `/${ship_id}/belong_ship`)
}

export function assingDriverBelongShip(ship_id: string, user_id: string) {
    return endpoint.put(enviromentDev.ship + `/${ship_id}/assign_driver/${user_id}`)
}

export function assingPatientInShip(ship_id: string, patient_id: string) {
    const data = {
        patient_id: patient_id
    }
    return endpoint.put(enviromentDev.ship + `/${ship_id}/assign_patient_belong_ship/${ship_id}`, data)
}

export function unAssingPatientInShip(ship_id: string, patient_id: string) {
    const data = {
        patient_id: patient_id
    }
    return endpoint.put(enviromentDev.ship + `/${ship_id}/un_assign_patient_belong_ship/${ship_id}`, data)
}

export function unJoinShip(ship_id: string) {
    return endpoint.put(enviromentDev.ship + `/${ship_id}/un_belong_ship`)
}

export function addShipInMission(mission_id: string, ship_id: string) {
    return endpoint.put(enviromentDev.mission + `/${mission_id}/assign-ship-to-mission/${ship_id}`)
}

export function unAddShipInMission(mission_id: string, ship_id: string) {
    return endpoint.put(enviromentDev.mission + `/${mission_id}/un-assign-ship-to-mission/${ship_id}`)
}
