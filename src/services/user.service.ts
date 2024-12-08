import { enviromentDev } from "@/configs/enviroment.dev"
import { endpoint } from "./endpoint.service"
import { Locations } from "@/models/location.model"
import { UserRegister, Users } from "@/models/users.model"
import { Vehicles } from "@/models/vehicle.model"
import { toast } from "./alert.service"
import * as mgrs from 'mgrs';

const utmObj = require('utm-latlng')
const UTM = new utmObj('Everest');

export function saveLocation(locate: Locations) {
    try {
        return endpoint.post<Locations>(enviromentDev.user + '/save-location', locate)
    } catch (error) {
        throw error
    }
}

export function onSaveLocation(): Promise<Locations | void> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const utm = UTM.convertLatLngToUtm(longitude, latitude, 1);
                        const mgrss = mgrs.forward([longitude, latitude]);
                        const g = {} as Locations
                        g.lat = latitude.toString(),
                            g.long = longitude.toString(),
                            g.mgrs = mgrss,
                            g.utm = JSON.stringify(utm),

                            resolve(g); // Return the location object via resolve
                    } catch (error) {
                        toast('ไม่สามารถรับที่อยู่ได้', 'error');
                        reject(error); // Reject with error
                    }
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                    reject(error); // Reject with geolocation error
                }
            );
        } else {
            const error = new Error("Geolocation is not supported by this browser.");
            console.error(error);
            reject(error); // Reject with unsupported geolocation error
        }
    });
}

export function findUsers(page: number, limit: number) {
    try {
        return endpoint.get<Users[]>(enviromentDev.user + `?page=${page}&limit=${limit}`)
    } catch (error) {
        throw error
    }
}

export function findUserById(user_id: string) {
    try {
        return endpoint.get<Users>(enviromentDev.user + `/${user_id}`)
    } catch (error) {
        throw error
    }
}

export function getLocationUser() {
    try {
        return endpoint.get<Locations[]>(enviromentDev.user + '/get-location?page=0&limit=1',)
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
    if (gender?.toLocaleLowerCase()?.includes('male')) {
        return 'เพศชาย'
    }
    else {
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

export function userCreateRespository(user_id: string) {
    const data = {
        user_id: user_id,
        role: "Leader"
    }
    try {
        return endpoint.post(`${enviromentDev.respository}/assing`, data)
    } catch (error) {
        throw error
    }
}