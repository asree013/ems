import { Vehicles } from "@/models/vehicle.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TVehicleHomeContext = {
    vehicle: Vehicles
    setVehicle: Dispatch<SetStateAction<Vehicles>>
}

export const VehiclesHomeContext = createContext<TVehicleHomeContext>({} as TVehicleHomeContext)