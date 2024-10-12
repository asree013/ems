import { CarByCarId, Cars } from "@/models/vehicle.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TCarDetailContent ={
    carByid: CarByCarId
    setCarById: Dispatch<SetStateAction<CarByCarId>>
}

export const CarDetailContext = createContext<TCarDetailContent>({} as TCarDetailContent)