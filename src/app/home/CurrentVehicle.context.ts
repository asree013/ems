import { Vehicles } from "@/models/vehicle.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TCurrentVehicles = {
    vehicle: Vehicles
    setVehicle: Dispatch<SetStateAction<Vehicles>>
}

export const CurrentVehicleContext = createContext<TCurrentVehicles>({} as TCurrentVehicles)