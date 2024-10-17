import { HelicopterById } from "@/models/vehicle.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type THelicopterById = {
    halicoptorById: HelicopterById
    setHelicopterById: Dispatch<SetStateAction<HelicopterById>>
}

export const HelicopterByIdContext = createContext<THelicopterById>({} as THelicopterById)