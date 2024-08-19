import { Cars } from "@/models/vehicle.model";
import { endpoint } from "./endpoint.service";
import { enviromentDev } from "@/configs/enviroment.dev";

export function createCar(data: Cars){
    try {
        return endpoint.post<Cars>(enviromentDev.car, data)
    } catch (error) {
        throw error
    }
}

export function findCarAll(page?:number, limit?: number){
    try {
        return endpoint.get<Cars[]>(enviromentDev.car+ `?page=${page?? 0}&limit=${limit?? 10}`)
    } catch (error) {
        throw error
    }
}

export function findCarByCarId(car_id: string){
    try {
        return endpoint.get<Cars>(enviromentDev.car+ `/${car_id}`)
    } catch (error) {
        throw error
    }
}

export function updateDriverInCar(car_id: string, user_id: string){
    try {
        return endpoint.put<Cars>(enviromentDev.car+ `/${car_id}/assign_driver/${user_id}`)
    } catch (error) {
        throw error
    }
}