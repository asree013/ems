import { HelicopterById } from "@/models/vehicle.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type THelicopterByIdDetail = {
    halicoptorById: HelicopterById
    setHelicopterById: Dispatch<SetStateAction<HelicopterById>>
}

export const HelicopterByIdDetailContext = createContext<THelicopterByIdDetail>({} as THelicopterByIdDetail)