import { Cars } from "@/models/vehicle.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TCarDetailContent ={
    car: Cars
    setCar: Dispatch<SetStateAction<Cars>>
}

export const CarDetailContext = createContext<TCarDetailContent>({} as TCarDetailContent)