import { CarByCarId } from "@/models/vehicle.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TCarIdContext = {
    carByid: CarByCarId
    setCarById: Dispatch<SetStateAction<CarByCarId>>
}

export const CarByIdContext = createContext<TCarIdContext>({} as TCarIdContext)