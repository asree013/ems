import { enviromentDev } from "@/configs/enviroment.dev"
import { endpoint } from "./endpoint.service"
import { Locations } from "@/models/location.model"
import { UserRegister, Users } from "@/models/users.model"
import { Vehicles } from "@/models/vehicle.model"
import { toast } from "./alert.service"
import * as mgrs from 'mgrs';
import { checkOnline } from "./worker.service"
import { dbDexie } from "@/configs/dexie.config"
import { AxiosResponse } from "axios"
import { v4 } from "uuid"
import { assingPatinetToCarByCarIdAndPatientId } from "./car.service"
import { PatientBelongCar, Patients } from "@/models/patient"

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
                        console.log('======>', position);

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

export async function findCurrentVehicleByUser() {
    try {
        if (await checkOnline()) {
            const result = await endpoint.get<Vehicles>(enviromentDev.user + '/current-vehicle')
            result.data.id = v4()
            const findAddInVehicel = await dbDexie.currentVehicle.toArray()
            if (
                !findAddInVehicel[0] || !findAddInVehicel[0].car || !findAddInVehicel[0].ship
                || !findAddInVehicel[0].helicopter
            ) {
                await dbDexie.currentVehicle.clear()
                await dbDexie.currentVehicle.add(result.data).catch(e => null)
            }

            if (result.data.car) {
                const checkMatchDataCar = findAddInVehicel[0].car.Car.PatientBelongCar.filter(r =>
                    !result.data.car.Car.PatientBelongCar.some(result => result.Patient.id === r.Patient.id)
                );

                if (checkMatchDataCar.length > 0) {
                    console.log('------ update p i v ------');
                    await Promise.all(checkMatchDataCar.map(async (r) => await assingPatinetToCarByCarIdAndPatientId(r.car_id, r.Patient.id)))
                }

                await dbDexie.currentVehicle.clear()
                await dbDexie.currentVehicle.add(result.data).catch(e => null)
                return result
            }
            if (result.data.helicopter) {
                const checkMatchDataHelicopter = findAddInVehicel[0].helicopter.Helicopter.PatientBelongHelicopter.filter(r =>
                    !result.data.helicopter.Helicopter.PatientBelongHelicopter.some(result => result.Patient.id === r.Patient.id)
                );

                if (checkMatchDataHelicopter.length > 0) {
                    console.log('------ update p i v ------');
                    await Promise.all(checkMatchDataHelicopter.map(async (r) => await assingPatinetToCarByCarIdAndPatientId(r.car_id, r.Patient.id)))
                }

                await dbDexie.currentVehicle.clear()
                await dbDexie.currentVehicle.add(result.data).catch(e => null)
                await dbDexie.patients.bulkAdd(result.data.helicopter.Helicopter.PatientBelongHelicopter.map(r => r.Patient) as any).catch(e => null)
                return result
            }
        }
        else {
            const find = await dbDexie.currentVehicle.toArray()
            const p = await dbDexie.patients.toArray()
            const h = await dbDexie.historys.toArray()
            const checkPatient = find[0].car.Car.PatientBelongCar.filter(r =>
                p.some(res => res.id === r.id)
            )
            if (checkPatient.length > 0 && p.length > 0) await dbDexie.patients.bulkAdd(find[0].car.Car.PatientBelongCar.map(r => r.Patient) as any).catch(e => '')
            console.log(find[0].car.Car.PatientBelongCar[0].Patient.History);
            
            const checkHistory = find[0].car.Car.PatientBelongCar.filter(r =>
                h.some(res => {
                    if(!res){
                        return r.Patient.History[0]
                    }
                    if(res.id === r.Patient?.History[0]?.id){
                        return res
                    }
                })
            )
            console.log('check hist ', checkHistory );     
            if(checkHistory.length > 0) await dbDexie.historys.bulkAdd(find[0].car.Car.PatientBelongCar.map(r => r.Patient?.History[0]) as any).catch(e => '')
            const data = find[0]
            return { data } as AxiosResponse
        }
    } catch (error) {
        throw error
    }
}

export async function editUserByUserCookie(data: Users) {
    try {
        if (await checkOnline() === false) {
            toast('ไม่สามารถแก้ไขข้อมูลในคณะที่ ofline ได้', 'error')
            return { data } as AxiosResponse
        }
        else {
            return endpoint.put<Users>(enviromentDev.user, data)
        }

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