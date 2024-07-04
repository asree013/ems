import { enviromentDev } from "@/configs/enviroment.dev"
import { endpoint } from "./endpoint.service"
import { Locations } from "@/models/location.model"
import { Users } from "@/models/users.model"

export function saveLocation(locate: Locations) {
    try {
        return endpoint.post<Location>(enviromentDev.user+ '/save-location', locate)
    } catch (error) {
        throw error
    }
}

export function findUsers(page: number, limit: number) {
    try {
        return endpoint.get<Users[]>(enviromentDev.user+ `?page=${page}&limit=${limit}`)
    } catch (error) {
        throw error
    }
}