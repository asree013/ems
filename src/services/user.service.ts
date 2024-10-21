import { enviromentDev } from "@/configs/enviroment.dev"
import { endpoint } from "./endpoint.service"
import { Locations } from "@/models/location.model"
import { UserRegister, Users } from "@/models/users.model"
import { Vehicles } from "@/models/vehicle.model"

export function saveLocation(locate: Locations) {
    try {
        return endpoint.post<Locations>(enviromentDev.user+ '/save-location', locate)
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

export function getLocationUser() {
    try {
        return endpoint.get<Locations[]>(enviromentDev.user+ '/get-location?page=0&limit=1',)
    } catch (error) {
        throw error
    }
}

export function findCurrentVehicleByUser() {
    try {
        return endpoint.get<Vehicles>(enviromentDev.user + '/current-vehicle')
    } catch (error) {
        throw error
    }
}

export function editUserByUserCookie(data: Users) {
    try {
        return endpoint.put<Users>(enviromentDev.user, data)
    } catch (error) {
        throw error
    }
}

export function convertGender(gender: string) {
    if(gender?.toLocaleLowerCase()?.includes('male')) {
        return 'เพศชาย'
    }
    else{
        return 'เพศหญิง'
    }
}

export function registerByUser(data: Users) {
    try {
        return endpoint.post<UserRegister>(`${enviromentDev.auth}/sign-up/user-register`, data)
    } catch (error) {
        throw error
    }
}