import {  Vehicles } from "@/models/vehicle.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TCurrentVehicles = {
    vehicle: Vehicles
    setVehicle: Dispatch<SetStateAction<Vehicles>>
}

export const CurrentVehicleContext = createContext<TCurrentVehicles>({} as TCurrentVehicles)

export type TCurrentCars = {
    car: Vehicles
    setCar: Dispatch<SetStateAction<Vehicles>>
}

export const CurrentCarsContext = createContext<TCurrentCars>({} as TCurrentCars)

